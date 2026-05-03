---
title: "Phishing & Spearphishing Triage"
description: "Detection, analysis, and remediation of phishing emails targeting employees, including link and attachment detonation."
severity: "High"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Triage & Initial Analysis

*The goal is to rapidly classify the report and determine blast radius.*

1. **Validate the Report:** Confirm the submitted email is a genuine phishing attempt and not a false positive (e.g., legitimate marketing or security awareness test).
2. **Extract Indicators:** Collect the sender address, Reply-To address, originating IP, subject line, all embedded URLs, and attachment hashes (MD5/SHA-256).
3. **Detonate in Sandbox:** Submit all URLs and attachments to an isolated sandbox environment (e.g., Any.run, Hybrid Analysis, or an internal detonation box). Do not click links directly.
4. **Check Threat Intel:** Query IOCs against your threat intelligence platform, VirusTotal, and email security gateway logs to determine if the campaign is known.
5. **Scope the Campaign:** Search email gateway logs for the same sender, subject, or attachment hash to identify all employees who received the email.

## Phase 2: Containment

*The goal is to prevent further exposure and stop any active compromise.*

1. **Quarantine the Email:** Use the email security gateway (SEG) to quarantine or hard-delete the phishing email from all affected inboxes simultaneously.
2. **Block Infrastructure:** Add the malicious sender domain, originating IPs, and embedded URLs to the SEG, firewall, and DNS sinkhole blocklists.
3. **Identify Clickers:** Query email security and proxy logs to identify any users who clicked the malicious link or opened the attachment before containment.
4. **Escalate Clickers:** For each user who interacted with the payload, immediately open a parallel Credential Compromise or Malware/Endpoint Infection incident.

## Phase 3: Investigation

*The goal is to understand the attacker's objective and confirm the scope of impact.*

1. **Classify the Objective:** Determine whether the phish was credential harvesting, malware delivery, reconnaissance, or financial fraud (BEC setup).
2. **Review Interacted Accounts:** For confirmed clickers, review authentication logs for anomalous sign-ins in the 2 hours following the click event.
3. **Check for Replies:** Search email logs for any replies sent by employees to the phishing sender, which may have disclosed sensitive information.
4. **Preserve Evidence:** Export the original email with full headers, sandbox reports, and all relevant log exports as evidence before purging.

## Phase 4: Recovery & Post-Incident Actions

*The goal is to restore a clean state and reduce future susceptibility.*

1. **Notify Affected Users:** Directly contact all users who received the email (especially those who interacted) with clear instructions on what happened and what to do.
2. **Restore Quarantined Legitimate Mail:** If any legitimate email was inadvertently quarantined during response, restore it promptly.
3. **Tune Detection Rules:** Create new SEG rules, SIEM detections, or threat intel feeds based on the specific TTPs observed in this campaign.
4. **Targeted Awareness Training:** Enroll users who clicked in targeted phishing awareness training. Report campaign metrics to security leadership.
