# 🛡️ SOC Operations Portal: The Sandbox

This repository is a lightweight, low-attack-surface security portal hosted on GitHub Pages. Because it has no internal infrastructure dependencies, it remains accessible during internal system outages as long as internet connectivity is available.

**Live portal**: https://dfirsec.github.io/the-sandbox/

## 🚀 Key Components

* **Incident Response Playbooks**: Markdown-based runbooks covering 14 threat scenarios including Ransomware, BEC, Phishing, Data Exfiltration, Insider Threat, Privilege Escalation, and more.
* **Tooling Registry**: Centralized JSON database of security vendors with ownership, deployment status, contract notes, and tool URLs.
* **CIS Controls Tracker**: Implementation dashboard mapped to all 18 groups of the CIS Critical Security Controls v8 framework.
* **Escalation Directory**: On-call contacts, vendor support lines, and external agency reporting paths (CISA, FBI) for use during active incidents.

## 🛠️ Technology Stack

* **Framework**: Astro v5 (Content Layer API)
* **Styling**: Tailwind CSS v4 (Typography plugin enabled)
* **Deployment**: Automated via GitHub Actions (CI/CD) with pre-build schema validation
* **Architecture**: Static Site Generation (SSG) for maximum security and performance.

## 📝 How to Add Content

The portal is designed for "Documentation as Code." To update the site, add files to the following directories.

### 1. Add a Playbook

* **Path**: `src/content/playbooks/your-filename.md`
* **Required fields**: `title`, `description`, `severity` (Low | Medium | High | Critical), `lastUpdated`
* **Optional fields**: `author`, `tags` (string array), `relatedPlaybooks` (string array of playbook IDs)

### 2. Add a Tool to the Registry

* **Path**: `src/content/registry/tool-name.json`
* **Required fields**: `toolName`, `category`, `status` (Active | Under Review | Deprecated), `internalOwner`
* **Optional fields**: `url`, `contractExpiry`, `notes`

### 3. Update a CIS Control

* **Path**: `src/content/controls/cis-x-y.json`
* **Required fields**: `controlId` (e.g. "CIS 4.1"), `title`, `implementationStatus` (Implemented | Partial | Not Started | N/A), `notes`
* **Optional fields**: `cisGroup`, `evidenceLink`

### 4. Add an Escalation Contact

* **Path**: `src/content/escalation/contact-name.json`
* **Required fields**: `name`, `type` (Internal | Vendor | External), `role`, `priority` (P1 | P2 | P3 | Any)
* **Optional fields**: `phone`, `email`, `notes`

## 🛰️ Deployment Pipeline

1. **Commit Changes**: `git add . && git commit -m "Add [Asset Name]"`
2. **Push to Main**: `git push origin main`
3. **Automatic Build**: GitHub Actions runs `astro check` to validate content schemas, then builds and deploys to GitHub Pages. Pushes with invalid frontmatter will fail before deployment.

---
**Maintained by**: SecOps Team  
**Last Infrastructure Audit**: 2026-05-03
