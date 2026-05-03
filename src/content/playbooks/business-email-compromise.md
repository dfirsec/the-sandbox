---
title: "Business Email Compromise (BEC) & Account Takeover"
description: "Identification, containment, and remediation of compromised corporate email or cloud workspace accounts."
severity: "High"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Containment (Immediate Action)

*The goal is to immediately sever the attacker's access to the compromised account.*

1. **Revoke Active Sessions:** Force a sign-out of all active sessions for the compromised user across all cloud services (e.g., Microsoft 365, Google Workspace).
2. **Reset Credentials:** Force an immediate password reset for the compromised account. Ensure the new password is provided directly to the user out-of-band (e.g., via phone call), not to their compromised inbox.
3. **Isolate the Host:** If the compromise likely originated from credential-harvesting malware on the user's endpoint, isolate the endpoint from the network.
4. **Disable Forwarding Rules:** Immediately check for and disable any malicious inbox rules (e.g., auto-forwarding emails to an external address or moving financial emails to the RSS/Archive folder).

## Phase 2: Investigation & Scoping

*The goal is to determine how the attacker got in and what data they accessed.*

1. **Review Authentication Logs:** Analyze sign-in logs for the past 30 days to identify the origin of the compromise (e.g., look for "impossible travel," unknown IP addresses, or bypassed MFA).
2. **Audit Mailbox Activity:** Review mail access logs to determine if the attacker downloaded attachments, synced files (e.g., OneDrive/SharePoint), or exported the mailbox.
3. **Trace Internal Phishing:** Search the email gateway logs to see if the compromised account was used to send internal phishing emails to other employees.
4. **Identify External Fraud:** Check sent items and deleted items for attempts to redirect payroll, alter vendor payment invoices, or contact clients maliciously.

## Phase 3: Eradication & Recovery

*The goal is to clean up the environment and safely restore user access.*

1. **Search and Destroy:** Purge any malicious emails sent by the compromised account from all internal employee inboxes.
2. **Block Infrastructure:** Add the attacker's IP addresses, domains, and malicious URLs to the firewall, EDR, and email security gateway blocklists.
3. **Re-Enroll MFA:** Require the user to re-register their Multi-Factor Authentication devices to ensure the attacker has not added a rogue device.
4. **Restore Access:** Once the endpoint is confirmed clean and credentials are secured, restore the user's access to the network.

## Phase 4: Post-Incident Actions

*The goal is to manage legal risk and prevent recurrence.*

1. **External Notification:** If the attacker emailed external clients or vendors with fraudulent invoices/phishing links, coordinate with Legal and PR to notify the affected external parties.
2. **Data Privacy Review:** If the mailbox contained PII, PHI, or sensitive intellectual property, initiate a formal data breach assessment with the compliance team.
3. **Tune Email Security:** Update the email security gateway (SEG) policies to better detect the specific phishing lure or payload that originally compromised the user.
4. **User Training:** Provide targeted security awareness training to the affected user and their department to prevent future compromises.