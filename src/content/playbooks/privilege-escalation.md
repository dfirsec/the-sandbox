---
title: "Privilege Escalation & Lateral Movement"
description: "Detection and response for unauthorized privilege escalation, Active Directory abuse, and lateral movement within the environment."
severity: "Critical"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Containment (Immediate Action)

*The goal is to limit the adversary's blast radius before they reach their objective.*

1. **Disable Compromised Privileged Accounts:** Immediately disable any admin, service, or privileged accounts identified as compromised. Do not simply reset — disable and investigate first.
2. **Revoke Active Sessions:** Terminate all active sessions for compromised accounts across all systems. For Entra ID / Active Directory, revoke Kerberos tickets (krbtgt rotation may be required for Golden Ticket scenarios).
3. **Isolate Affected Hosts:** Network-isolate any hosts where unauthorized privilege escalation was confirmed via EDR. Preserve volatile state.
4. **Declare the Incident:** Notify the Incident Response Lead and engage the Active Directory / Identity team immediately. This class of incident can escalate to full domain compromise rapidly.

## Phase 2: Investigation & Scoping

*The goal is to fully map the adversary's path and the scope of elevated access.*

1. **Reconstruct the Escalation Path:** Review SIEM, EDR, and Windows Security Event Logs (Event IDs 4624, 4672, 4728, 4732, 4756) to reconstruct how the attacker moved from initial access to elevated privilege.
2. **Identify Techniques Used:** Classify the escalation technique — DCSync, Pass-the-Hash, Pass-the-Ticket, Kerberoasting, AS-REP Roasting, token impersonation, UAC bypass, sudo abuse, or SUID exploitation.
3. **Audit Privileged Group Membership:** Immediately audit Domain Admins, Enterprise Admins, Schema Admins, and all privileged local groups on critical servers for unauthorized additions.
4. **Review Service Account Abuse:** Enumerate service accounts with SPNs (Kerberoast targets) and check for recent password changes or anomalous authentication activity.
5. **Map Lateral Movement:** Trace all authentication events (WMI, PsExec, RDP, SMB, WinRM, SSH) originating from compromised accounts to identify all systems the adversary accessed.
6. **Check for Persistence:** Search for newly created accounts, scheduled tasks, GPO modifications, rogue certificates (ADCS abuse), and unauthorized changes to privileged group policies.

## Phase 3: Eradication

*The goal is to fully evict the adversary from all elevated positions.*

1. **Rotate krbtgt (if Golden Ticket suspected):** If a Golden Ticket or DCSync attack is confirmed or suspected, rotate the krbtgt account password twice with a minimum 10-hour gap between rotations to invalidate all forged tickets.
2. **Rotate All Compromised Credentials:** Reset passwords for all compromised accounts, service accounts, and any accounts authenticated from compromised hosts. Assume credentials are harvested if LSASS was accessed.
3. **Remove Unauthorized Persistence:** Delete any rogue accounts, unauthorized group memberships, malicious scheduled tasks, GPO changes, and rogue ADCS certificates.
4. **Patch the Escalation Vector:** Apply the relevant patch or configuration fix for the escalation technique used (e.g., disable Print Spooler if PrintNightmare was used, enforce Protected Users security group).
5. **Rebuild Critically Compromised Systems:** Domain Controllers or Tier 0 systems with confirmed adversary access should be rebuilt from known-good baselines.

## Phase 4: Post-Incident Actions

*The goal is to recover a trusted identity environment and reduce attack surface.*

1. **Full AD Security Assessment:** Conduct a comprehensive AD security review to identify all remaining misconfigurations, Kerberoastable accounts, ACL abuses, and excessive permissions.
2. **Implement Tiered Admin Model:** If not in place, prioritize implementing AD tiering (Tier 0/1/2) to prevent credential exposure across trust boundaries.
3. **Enable Advanced Auditing:** Ensure Windows Advanced Audit Policy is configured to capture all relevant privilege use, account management, and object access events.
4. **Purple Team Exercise:** Schedule a follow-up purple team exercise focused on the specific escalation path used to validate that new detections are effective.
