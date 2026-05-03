---
title: "Alert Triage Standard Operating Procedure"
description: "Severity classification matrix, escalation paths, and on-call handoff format for consistent SOC alert handling."
severity: "Low"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Severity Classification Matrix

Assign severity at the start of triage. Upgrade immediately if new information warrants it.

| Severity | Criteria | Initial Response SLA | Escalation |
|---|---|---|---|
| **P1 – Critical** | Active breach, ransomware, confirmed data exfiltration, domain compromise | Immediate — page on-call lead | CISO + IR Lead within 15 min |
| **P2 – High** | Confirmed malware, credential compromise, active lateral movement | 15 minutes | IR Lead within 30 min |
| **P3 – Medium** | Suspicious activity requiring investigation, policy violation, failed attack attempt | 1 hour | Shift lead review |
| **P4 – Low** | Informational, expected behavior, closed as false positive | 4 hours | No escalation required |

## Phase 1: Initial Alert Review

*Target: complete within the SLA for the assigned severity tier.*

1. **Read the Full Alert:** Review the raw alert details, including the detection rule that fired, the data source, the affected asset, and the associated user account or process.
2. **Gather Context:** Pull 5 minutes of surrounding context from the data source. Determine if the alert is an isolated event or part of a pattern. Check SIEM for correlated events on the same host or user within the last 24 hours.
3. **Assign Initial Severity:** Use the classification matrix above. When in doubt, assign the higher severity and downgrade with justification.
4. **Check for Known False Positives:** Consult the SOC knowledge base and previous similar tickets for known benign causes of this alert before investing significant investigation time.

## Phase 2: Investigation & Decision

*The goal is to reach a clear disposition: Escalate, Close, or Monitor.*

1. **Collect Evidence:** Gather all relevant artifacts — process trees, network connections, file hashes, authentication events, and email headers as applicable to the alert type.
2. **Assess Intent & Impact:** Determine whether the activity appears malicious, suspicious-but-unconfirmed, or benign. Assess the potential impact if this is a true positive.
3. **Disposition Decision:**
   - **Escalate:** Open a formal incident ticket and refer to the relevant response playbook. Page the on-call lead for P1/P2.
   - **Monitor:** Create a watchlist item and set a follow-up check time. Document what would cause escalation.
   - **Close (False Positive):** Document the reason thoroughly. If this alert type fires frequently as a false positive, create a tuning request.

## Phase 3: Documentation Requirements

*Every alert must have a complete audit trail regardless of disposition.*

1. **Mandatory Fields:** Analyst name, investigation start/end time, severity assigned, data sources reviewed, evidence collected, disposition, and justification.
2. **False Positive Documentation:** For false positives, document the root cause and whether a tuning ticket has been filed to reduce future noise.
3. **Escalation Documentation:** For escalated incidents, document the handoff time, the name of the person paged, and confirmation that they acknowledged the page.

## Phase 4: On-Call Handoff Format

*Use this format for all shift handoffs and on-call escalations.*

```
HANDOFF — [DATE/TIME] [ANALYST NAME] → [NEXT ANALYST/ON-CALL]

OPEN INCIDENTS:
- [Ticket ID] | [Severity] | [Summary] | Status: [Current action] | Next step: [What needs to happen]

MONITORING ITEMS:
- [Asset/User] | Watching for [specific indicator] | Check by [time]

NOTES:
- [Any environmental context: known maintenance, elevated noise from specific source, etc.]
```

## Tuning & Continuous Improvement

1. **Weekly False Positive Review:** Compile all false positives from the week. Identify the top 3 noisiest rules and file tuning requests with the detection engineering team.
2. **Monthly Metrics:** Track and report: Total alerts, true positive rate, MTTD, MTTR, escalation rate by severity. Report to security leadership monthly.
