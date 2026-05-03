---
title: "Credential Compromise & Account Takeover"
description: "Response procedures for compromised user credentials including impossible travel, MFA bypass, password spray, and token theft."
severity: "High"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Containment (Immediate Action)

*The goal is to sever the attacker's authenticated access immediately.*

1. **Revoke All Sessions:** Force sign-out of all active sessions for the suspected account across all identity providers (Entra ID, Okta, Google Workspace). Revoke all refresh tokens.
2. **Disable the Account:** Temporarily disable the account if the compromise is confirmed or if the user cannot be reached out-of-band for immediate verification.
3. **Revoke Issued Tokens:** Invalidate all OAuth tokens, API keys, and PATs issued by or to the compromised account.
4. **Notify the User:** Contact the account owner via a secondary, trusted channel (phone or personal email) — not the potentially compromised account — to confirm whether the activity was legitimate.

## Phase 2: Investigation & Scoping

*The goal is to determine the attack vector, dwell time, and all affected resources.*

1. **Analyze Authentication Logs:** Review sign-in logs for impossible travel, unfamiliar ASNs, sign-ins from Tor/VPN exit nodes, token replays from unexpected locations, or MFA fatigue attack patterns.
2. **Determine Attack Vector:** Identify the likely method: phishing credential harvest, password spray, token theft from infected endpoint, MFA bypass (e.g., adversary-in-the-middle proxy), or SIM swap.
3. **Enumerate Accessed Resources:** Audit what data, systems, and applications the compromised session touched. Check for file downloads, email access, admin console activity, and API calls.
4. **Check for Lateral Movement:** Search authentication and VPN logs for other accounts that logged in from the same source IPs or that the compromised account accessed.
5. **Review MFA Device Registration:** Confirm no rogue authenticator apps, phone numbers, or hardware keys were registered during the compromise window.

## Phase 3: Eradication

*The goal is to fully evict the attacker and close the entry vector.*

1. **Reset Credentials:** Issue a new strong password to the user via an out-of-band secure channel. Enforce password uniqueness against previous hashes.
2. **Re-Enroll MFA:** Revoke all existing MFA devices and require the user to re-register through a verified, in-person or supervised process.
3. **Remove Rogue Configurations:** Delete any OAuth application consents, mailbox forwarding rules, conditional access exclusions, or admin roles added during the compromise.
4. **Patch the Vector:** If the compromise resulted from a password spray, enforce account lockout policies. If token theft, remediate the endpoint. If phishing, refer to the Phishing Triage playbook.
5. **Hunt for Persistence:** Search for other accounts with matching activity patterns — especially if this was part of a larger password spray campaign.

## Phase 4: Post-Incident Actions

*The goal is to prevent recurrence and fulfill compliance obligations.*

1. **Restore Access:** Once credentials are secured and MFA is re-enrolled, re-enable the account and validate normal access with the user.
2. **Data Breach Assessment:** If the account had access to PII, PHI, or regulated data, initiate a formal breach assessment with the compliance team.
3. **Identity Posture Review:** Evaluate whether phishing-resistant MFA (e.g., FIDO2/passkeys) should be enforced for this user tier or broader population.
4. **Report & Tune:** Document the incident, update threat intelligence with discovered IOCs, and tune SIEM detection rules to catch similar patterns earlier.
