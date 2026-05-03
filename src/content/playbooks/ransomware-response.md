---
title: "Ransomware Containment & Recovery"
description: "Immediate isolation, eradication, and recovery procedures for active ransomware events."
severity: "Critical"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Containment (Immediate Action)

*The goal is to stop the bleeding. Do not destroy evidence.*

1. **Isolate Affected Hosts:** Immediately disconnect infected machines from the network (pull the ethernet cable or isolate via EDR).
2. **Preserve State:** Do **not** power down the machines. Leave them running to preserve RAM for forensic decryption and analysis.
3. **Lock Down Identity:** Disable compromised Active Directory accounts and force a global password reset for suspected compromised administrative accounts.
4. **Block C2 Traffic:** If the Command & Control (C2) IP or domain is known, block it at the perimeter firewall.
5. **Declare the Incident:** Notify the Incident Response Lead, Legal, and executive management.

## Phase 2: Eradication

*The goal is to eliminate the threat from the environment.*

1. **Identify the Variant:** Analyze the ransom note, file extensions, or payload to identify the specific ransomware family.
2. **Determine Scope:** Run enterprise-wide EDR/SIEM queries using discovered Indicators of Compromise (IOCs) to find dormant infections.
3. **Eliminate Persistence:** Identify and remove scheduled tasks, registry run keys, or rogue services created by the attacker.
4. **Patch the Vector:** Identify how the attacker gained entry (e.g., exposed RDP, phishing, unpatched VPN). Close the vulnerability immediately.
5. **Sanitize or Rebuild:** For heavily infected systems, initiate standard wipe-and-rebuild procedures rather than attempting manual malware removal.

## Phase 3: Recovery

*The goal is to return to standard business operations safely.*

1. **Verify Backups:** Ensure offline/immutable backups are untouched before attempting any restoration.
2. **Clean Room Restoration:** Restore critical servers into an isolated VLAN first.
3. **Verify Integrity:** Scan restored systems with updated EDR definitions to ensure they are not re-infected upon boot.
4. **Phased Reconnection:** Bring systems back online in phases (Tier 1 Critical Services first). Monitor network traffic heavily for 48 hours.
5. **Enforce MFA:** Ensure Multi-Factor Authentication is actively enforced on all restored services, especially VPN and email.

## Phase 4: Post-Incident & Compliance (Lessons Learned)

*To be completed within 14 days of incident closure.*

1. **Root Cause Analysis (RCA):** Document the exact timeline, entry vector, and dwell time of the adversary.
2. **Legal & Regulatory:** Coordinate with legal to determine if data exfiltration occurred and if regulatory reporting (e.g., GDPR, HIPAA, SEC) is required.
3. **Insurance Coordination:** Compile required logs and timelines for the cyber insurance claims process.
4. **Process Improvement:** Identify failures in the current security stack and draft a remediation plan to procure necessary tools or adjust configurations.
