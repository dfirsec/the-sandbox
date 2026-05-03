---
title: "Data Exfiltration Response"
description: "Detection, containment, and investigation procedures for suspected or confirmed unauthorized data exfiltration events."
severity: "Critical"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Containment (Immediate Action)

*The goal is to stop outbound data flow without destroying evidence.*

1. **Block Egress Channel:** Identify the suspected exfiltration channel (cloud upload, SMTP, SFTP, DNS tunneling, HTTP POST) and block it at the firewall or proxy without alerting the adversary if possible.
2. **Preserve Network Evidence:** Before blocking, ensure NetFlow, proxy logs, and PCAP captures are being retained. Do not flush or rotate logs while the investigation is active.
3. **Isolate the Source:** If exfiltration is originating from a specific endpoint, isolate it via EDR while preserving its running state. Do not power off.
4. **Freeze Relevant Cloud Storage:** If data was staged in a corporate cloud storage bucket or SharePoint site, apply a legal hold or restrict sharing permissions immediately.
5. **Declare the Incident:** Notify the Incident Response Lead, Legal, and the Data Privacy/DPO function immediately given potential regulatory implications.

## Phase 2: Investigation & Scoping

*The goal is to determine what data left the organization, how, and where it went.*

1. **Quantify the Transfer:** Analyze proxy, firewall, and DLP logs to calculate the volume of data transferred (bytes out), the timeframe, and all destination IPs/domains.
2. **Classify the Data:** Work with data owners to determine the sensitivity classification of the exfiltrated data — PII, PHI, financial records, trade secrets, source code, credentials.
3. **Identify the Source User/Process:** Determine whether exfiltration was performed by a compromised account, an insider, or malware acting autonomously.
4. **Trace the Staging Path:** Identify whether data was aggregated or compressed into an archive before exfiltration (e.g., zip files, RAR archives) — check for temporary staging directories.
5. **Identify Additional Exfil Channels:** Adversaries often use multiple channels. Check for email forwarding, USB device usage, printing activity, and personal cloud sync clients.

## Phase 3: Eradication

*The goal is to eliminate the adversary's access and remove their tooling.*

1. **Revoke Attacker Access:** Rotate all credentials and revoke sessions for any accounts involved in the exfiltration, whether compromised or insider.
2. **Remove Malicious Tools:** If exfiltration was malware-assisted, remove the malware and all associated persistence mechanisms. Refer to the Malware/Endpoint Infection playbook.
3. **Revoke Cloud Tokens:** Invalidate any OAuth grants, SAS tokens, or API keys used to authenticate to external storage destinations.
4. **Request Takedown:** If data was uploaded to a public cloud service (e.g., Pastebin, Mega, public S3 bucket), coordinate with Legal to issue takedown requests.

## Phase 4: Post-Incident & Regulatory Actions

*Regulatory timelines are strict — begin this phase in parallel with investigation.*

1. **Formal Data Breach Assessment:** Engage Legal and Compliance to assess notification obligations (GDPR 72-hour window, HIPAA 60-day window, state breach notification laws, SEC materiality).
2. **Notify Affected Individuals:** If PII or PHI was confirmed exfiltrated, prepare breach notification letters per legal guidance.
3. **Law Enforcement Referral:** If criminal activity is suspected (insider threat, nation-state, ransomware group), coordinate with Legal on law enforcement engagement (FBI, CISA).
4. **DLP Tuning:** Use the specific data types and egress patterns observed to tune DLP policies and create new detection rules for SIEM and CASB.
5. **Root Cause & Lessons Learned:** Document dwell time, detection gap, and data classification failures. Brief executive leadership within 14 days.
