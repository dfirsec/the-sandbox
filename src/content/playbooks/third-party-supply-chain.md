---
title: "Third-Party & Supply Chain Incident"
description: "Response procedures for vendor compromise notifications, software supply chain attacks, and trust boundary assessment for third-party dependencies."
severity: "Critical"
lastUpdated: 2026-05-03
author: "SecOps Team"
---

## Phase 1: Initial Assessment

*The goal is to rapidly determine if the organization is affected and the scope of exposure.*

1. **Validate the Notification:** Confirm the vendor compromise notification through official vendor channels (direct communication, official security advisory, CVE publication). Do not rely solely on media reports or social media.
2. **Inventory Affected Products:** Query the CMDB, software inventory, and SBOM (Software Bill of Materials) to identify all instances of the compromised vendor product, library, or component in the environment.
3. **Classify the Attack Type:** Determine the nature of the supply chain attack — compromised software update, malicious package in a registry (npm, PyPI, NuGet), backdoored source code, or compromised vendor credentials used to access your environment.
4. **Assess Integration Depth:** For each affected instance, assess what network access, data access, or credentials the vendor product or integration has within the environment.
5. **Declare the Incident:** Notify the Incident Response Lead, Legal, and Procurement. Depending on the affected vendor, also notify the CISO and executive team immediately.

## Phase 2: Containment

*The goal is to sever or minimize trust with the compromised third party.*

1. **Suspend Vendor Access:** Immediately revoke or suspend all standing access granted to the affected vendor — VPN accounts, API tokens, service accounts, remote access credentials, and SSO integrations.
2. **Block Compromised Software Communication:** If the compromised product is known to beacon to attacker infrastructure, block its outbound communications at the firewall while preserving the application if removal would cause disruption.
3. **Freeze Software Updates:** Halt all automated updates from the affected vendor/registry until the compromise scope is confirmed and a clean version is verified.
4. **Isolate Affected Systems:** Network-isolate any systems where the compromised component is running if active exploitation is confirmed or suspected.

## Phase 3: Investigation

*The goal is to determine whether the compromise resulted in unauthorized access to your environment.*

1. **Hunt for IOCs:** Search SIEM and EDR telemetry for all known indicators of compromise (IOCs) published by the vendor and threat intelligence community related to the specific supply chain attack.
2. **Audit Vendor Access Logs:** Review all authentication events and actions performed by the vendor's credentials or service accounts during the suspected compromise window.
3. **Analyze Network Traffic:** Review proxy and firewall logs for unexpected outbound connections from systems running the compromised product to attacker-controlled infrastructure.
4. **Assess Data Exposure:** Determine what data the vendor integration had access to and whether any data was exfiltrated through the compromised component.
5. **Check for Lateral Movement:** If the vendor had privileged access, audit whether the compromise enabled lateral movement into internal systems or privilege escalation.

## Phase 4: Eradication & Recovery

*The goal is to remove the compromised component and restore trusted operations.*

1. **Remove or Patch Compromised Software:** Uninstall or replace the compromised version with a verified clean version once available from the vendor. Validate integrity using official checksums or signatures.
2. **Rotate All Vendor-Adjacent Credentials:** Rotate all credentials, API keys, and tokens that the compromised vendor component had access to, regardless of confirmed exploitation.
3. **Re-Evaluate Vendor Trust:** Engage Procurement and Legal to assess the vendor's incident response quality, contractual SLA compliance, and whether the relationship should continue.

## Phase 5: Post-Incident Actions

*The goal is to reduce future supply chain risk.*

1. **SBOM Improvement:** If the affected component was not in your SBOM, prioritize SBOM completeness. Implement automated SBOM generation in CI/CD pipelines.
2. **Vendor Risk Assessment Update:** Update the vendor's risk rating in your Third-Party Risk Management (TPRM) program. Require a security attestation before re-enabling their access.
3. **Implement Software Composition Analysis (SCA):** Ensure all code pipelines have SCA tooling to detect known-vulnerable or compromised open-source dependencies before they reach production.
4. **Regulatory Notification:** If the supply chain attack resulted in a data breach, engage Legal to assess notification obligations under applicable regulations.
