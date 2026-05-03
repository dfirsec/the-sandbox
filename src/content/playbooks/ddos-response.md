---
title: "DDoS Response"
description: "Detection, mitigation, and recovery procedures for Distributed Denial of Service attacks targeting internet-facing infrastructure."
severity: "High"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Detection & Classification

*The goal is to confirm the event is a DDoS and classify the attack type.*

1. **Confirm Attack Type:** Analyze traffic patterns to classify the attack — volumetric (bandwidth exhaustion), protocol (SYN flood, ICMP), or application-layer (HTTP flood, Slowloris). Each type requires a different mitigation strategy.
2. **Identify Targeted Surface:** Determine which IP addresses, hostnames, or services are being targeted. Prioritize by business criticality.
3. **Establish Attack Metrics:** Capture baseline metrics — incoming packets per second, bandwidth (Gbps), connection rate, and affected services — to track mitigation progress.
4. **Declare the Incident:** Notify the Incident Response Lead, Network Operations, and relevant business stakeholders. For large-scale attacks, engage executive communication immediately.

## Phase 2: Mitigation

*The goal is to maintain service availability or fail over to backup infrastructure.*

1. **Activate Upstream Scrubbing:** Contact your DDoS mitigation provider (e.g., Cloudflare, Akamai, NETSCOUT) to activate traffic scrubbing. Reroute traffic through the scrubbing center via BGP blackholing or traffic diversion.
2. **Apply Rate Limiting:** Implement aggressive rate limiting at the network edge and WAF for application-layer attacks. Block top offending source IPs and ASNs at the firewall.
3. **Geo-Block Non-Essential Regions:** If attack traffic originates predominantly from specific countries and those countries are non-critical for business operations, apply temporary geo-blocking.
4. **Enable Anycast / CDN Absorption:** If the targeted service is web-based, ensure all traffic is routed through the CDN to distribute and absorb attack volume.
5. **Failover to Backup Systems:** If primary infrastructure is overwhelmed and SLAs are at risk, execute the failover procedure to activate backup or cloud-burst capacity.

## Phase 3: Monitoring & Communication

*The goal is to track mitigation effectiveness and keep stakeholders informed.*

1. **Monitor Mitigation Effectiveness:** Continuously monitor traffic dashboards, service health checks, and synthetic monitors. Validate that legitimate traffic is successfully reaching services.
2. **Preserve Logs:** Ensure firewall, CDN, and NetFlow logs are being retained at full resolution during the attack for post-incident analysis and potential law enforcement use.
3. **Stakeholder Updates:** Provide regular status updates (every 30 minutes during active incident) to business stakeholders, customer success, and executive leadership.
4. **Customer/External Communication:** If customer-facing services are degraded, coordinate with Communications to post a status page update. Do not attribute the outage to a "DDoS attack" in external communications without Legal approval.

## Phase 4: Recovery & Post-Incident Actions

*The goal is to safely return to normal operations and improve resilience.*

1. **Staged Withdrawal of Mitigations:** Remove emergency mitigations (geo-blocks, aggressive rate limits) gradually, monitoring for attack resumption at each step.
2. **Restore Normal Routing:** Once the attack subsides, coordinate with the DDoS mitigation provider to restore normal traffic routing and disable scrubbing.
3. **Post-Mortem Traffic Analysis:** Analyze captured logs to fully characterize the attack — source ASNs, attack vectors, peak volume — and assess whether the attack was a smokescreen for a concurrent intrusion attempt.
4. **Infrastructure Hardening:** Review and implement any identified gaps — additional upstream scrubbing capacity, improved anycast coverage, stricter rate limits, or improved failover automation.
5. **Update Runbooks:** Document what worked and what failed during mitigation. Update ISP and DDoS provider emergency contact information and escalation procedures.
