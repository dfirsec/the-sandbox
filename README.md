# 🛡️ SOC Operations Portal: The Sandbox

This repository is a high-availability, zero-attack-surface security portal. It is deployed via GitHub Pages to ensure that critical security documentation remains accessible even if primary internal systems are offline.

## 🚀 Key Components

* **Incident Response Playbooks**: Markdown-based runbooks for standardizing response to Ransomware, BEC, and other threats.
* **Tooling Registry**: A centralized JSON database of security architecture, vendor ownership, and deployment status.
* **CIS Controls Tracker**: A dynamic implementation dashboard mapped to the CIS Critical Security Controls v8 framework.

## 🛠️ Technology Stack

* **Framework**: Astro v5 (Content Layer API)
* **Styling**: Tailwind CSS v4 (Typography plugin enabled)
* **Deployment**: Automated via GitHub Actions (CI/CD)
* **Architecture**: Static Site Generation (SSG) for maximum security and performance.

## 📝 How to Add Content

The portal is designed for "Documentation as Code." To update the site, add files to the following directories:

### 1. Add a Playbook

* **Path**: `src/content/playbooks/your-filename.md`
* **Format**: Markdown with YAML frontmatter (Title, Description, Severity, lastUpdated).

### 2. Add a Tool to the Registry

* **Path**: `src/content/registry/tool-name.json`
* **Format**: JSON (toolName, category, status, internalOwner).

### 3. Update a CIS Control

* **Path**: `src/content/controls/cis-x-y.json`
* **Format**: JSON (controlId, title, implementationStatus, notes).

## 🛰️ Deployment Pipeline

1. **Commit Changes**: `git add . && git commit -m "Add [Asset Name]"`
2. **Push to Main**: `git push origin main`
3. **Automatic Build**: GitHub Actions will automatically validate the schema, build the static files, and deploy to GitHub Pages.

---
**Maintained by**: SecOps Team
**Last Infrastructure Audit**: 2026-05-03
