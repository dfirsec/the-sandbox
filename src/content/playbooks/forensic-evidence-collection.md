---
title: "Forensic Evidence Collection"
description: "Procedures for memory acquisition, disk imaging, log preservation, and maintaining chain of custody for digital forensic evidence."
severity: "Medium"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Guiding Principles

Digital evidence is fragile and perishable. Always follow the **Order of Volatility** (RFC 3227) — collect the most volatile data first:

1. CPU registers, cache, running processes
2. Network state (ARP cache, active connections)
3. RAM / volatile memory
4. Temporary file systems, swap
5. Disk images
6. Remote/cloud logs (subject to retention windows)
7. Physical media (backups, removable storage)

**Do not alter the evidence source.** Every action on a live system modifies it. Document every command run on a subject system, by whom, and at what time.

## Phase 1: Preservation & Chain of Custody Initiation

*Do this before any collection activity.*

1. **Open an Evidence Log:** Create a formal evidence log (digital or physical) with: Case ID, date/time (UTC), analyst name, and a description of each item collected.
2. **Photograph/Screenshot the Scene:** Capture the current state of the system — screen contents, running applications, network connections — before any interaction.
3. **Record System Time:** Note the system clock time and compare it against a reliable time source (NTP). Document any clock skew — this is critical for log correlation.
4. **Do Not Power Off:** Unless the system contains self-destructing malware confirmed to be actively wiping, leave it powered on. Powering off destroys volatile evidence.

## Phase 2: Volatile Memory (RAM) Acquisition

*Highest priority — RAM is lost the moment the system loses power.*

1. **Select Acquisition Tool:** Use an approved memory acquisition tool appropriate for the OS and architecture (e.g., WinPmem, LiME for Linux, osxpmem for macOS, or EDR-based memory capture).
2. **Write to External Media:** Always write the memory image to an external, forensically clean device (USB or network share). Never write to the subject system's local disk.
3. **Capture Supplementary Volatile Data:** In parallel with or immediately after RAM, capture: running processes (`tasklist`/`ps aux`), network connections (`netstat -ano`), logged-in users, and scheduled tasks.
4. **Hash the Image:** Immediately compute MD5 and SHA-256 hashes of the memory image. Record these in the evidence log. This is the integrity anchor for all subsequent analysis.

## Phase 3: Disk Imaging

*For live systems, use forensic tools to create verified bit-for-bit copies.*

1. **Select Imaging Method:** For live systems, use a tool that supports live acquisition without modifying the source (e.g., FTK Imager, dd with appropriate flags, or EDR disk acquisition). For offline media, boot from a forensic live USB.
2. **Write-Block the Source:** Always interpose a hardware or software write blocker between the evidence disk and the imaging workstation to prevent accidental modification.
3. **Create Forensic Image:** Image to a recognized forensic format (E01/EWF preferred for built-in hashing; raw dd for compatibility). Write to external forensically clean media.
4. **Dual Hashing:** Compute MD5 and SHA-256 of the completed image using the imaging tool's built-in verification. Record in the evidence log. If hashes do not match, the image is corrupt — re-image.
5. **Create Working Copy:** Always work from a verified copy of the image, never the original. Label originals and store them securely.

## Phase 4: Log Preservation

*Logs have defined retention windows — act quickly to avoid loss.*

1. **Identify Critical Log Sources:** For each incident, identify the relevant log sources — Windows Event Logs, Syslog, SIEM, EDR telemetry, cloud provider logs, email gateway, proxy/firewall, and authentication logs.
2. **Export Immediately:** Export logs for the relevant time window plus a 7-day buffer on each side. For cloud logs (CloudTrail, Entra ID Sign-in Logs), download raw JSON exports immediately — some sources have short default retention.
3. **Apply Legal Hold:** Notify the SIEM and log management platform administrators to place a legal hold on relevant log streams to prevent automated purging.
4. **Hash Log Exports:** Compute SHA-256 hashes of all exported log archives and record in the evidence log.

## Phase 5: Chain of Custody Maintenance

*Evidence without a documented chain of custody is inadmissible.*

1. **Transfer Documentation:** Every time evidence changes hands, both parties sign and timestamp the evidence log. Include the method of transfer and the storage location.
2. **Secure Storage:** Store all evidence in a physically or logically access-controlled location. Digital evidence should be stored encrypted (AES-256) on hardware accessible only to the IR team.
3. **Access Log:** Maintain a log of every analyst who accesses evidence, when, and for what purpose.
4. **Integrity Verification:** Before any analysis session, re-hash the evidence and verify it matches the recorded hash. If it does not match, escalate immediately — the chain of custody has been broken.
