---
title: "Insider Threat Investigation"
description: "Structured response to suspected malicious or negligent insider activity, including investigation boundaries, HR/Legal coordination, and chain-of-custody requirements."
severity: "High"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Pre-Investigation Preparation

*The goal is to establish a proper legal and procedural foundation before any overt action.*

1. **Engage Legal & HR Immediately:** Do not proceed with any investigation steps without explicit sign-off from Legal and HR. All actions must comply with employment law, privacy regulations, and any applicable union agreements.
2. **Establish Need-to-Know:** Restrict knowledge of the investigation to a strict compartment — Security Lead, Legal, HR, and executive sponsor only. Do not discuss via standard communication channels.
3. **Define Scope & Predicate:** Document the specific indicators or behaviors that triggered the investigation. Ensure there is a documented, legitimate business reason before accessing employee data.
4. **Identify Evidence Sources:** Inventory available evidence sources: DLP alerts, UEBA scores, badge access logs, endpoint telemetry, email logs, cloud activity logs, and print logs.

## Phase 2: Covert Evidence Collection

*The goal is to gather evidence without alerting the subject.*

1. **Preserve Evidence in Place:** Apply legal holds to the subject's email, cloud storage, and endpoint backups without notifying the subject or modifying any data.
2. **Collect Logs Passively:** Extract relevant logs from SIEM, DLP, CASB, and badge systems for the relevant time window. Document chain of custody for each log source.
3. **UEBA Review:** Pull the subject's UEBA risk score history and review specific high-risk events — anomalous data access, off-hours activity, bulk file downloads, or deviations from peer group behavior.
4. **Network & Endpoint Analysis:** Review proxy logs for large uploads to personal cloud services, USB device usage logs, and endpoint DLP events. Do not install additional monitoring software on the subject's device without Legal approval.
5. **Document Everything:** Maintain a detailed, timestamped investigation log. Every action, access, and finding must be recorded by name with timestamp.

## Phase 3: Assessment & Decision Point

*The goal is to assess findings and determine the appropriate course of action.*

1. **Evidence Review with Legal:** Present all collected evidence to Legal for assessment of sufficiency and admissibility. Legal determines whether there is a basis for escalation.
2. **Classify the Threat Type:** Determine whether the behavior is malicious (intentional data theft, sabotage), negligent (unintentional policy violation), or a false positive.
3. **Determine Remediation Path:** Legal and HR jointly determine the response — administrative action, termination, civil litigation, or criminal referral. Security executes the technical actions that support this decision.

## Phase 4: Overt Action & Remediation

*Execute only after Legal and HR have authorized the specific actions.*

1. **Coordinated Offboarding:** Coordinate with HR to revoke all logical access (accounts, badges, VPN, cloud) simultaneously at the moment of termination or suspension. Do not pre-revoke access before HR action.
2. **Asset Recovery:** Collect all corporate devices, tokens, and access cards. Forensically image the subject's endpoint before wiping.
3. **Remediate Data Exposure:** Address any data that was exfiltrated or shared outside authorized channels. Refer to the Data Exfiltration playbook if applicable.
4. **Notify Affected Systems Owners:** Inform owners of systems the subject had privileged access to so they can audit for unauthorized changes, backdoors, or sabotage.

## Phase 5: Post-Incident Actions

*The goal is to close gaps and fulfill legal obligations.*

1. **Evidence Preservation for Litigation:** Maintain all collected evidence in a legally defensible format under the direction of Legal counsel.
2. **Access Review:** Conduct a formal Privileged Access Review for the subject's peer group to identify any over-permissioned accounts or unreviewed access.
3. **Lessons Learned (Restricted):** Conduct a restricted after-action review with the core team only. Identify detection gaps and UEBA tuning opportunities.
4. **Policy Review:** Assess whether acceptable use policies, data handling policies, or offboarding procedures contributed to the incident and update accordingly.
