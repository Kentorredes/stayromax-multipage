# Stayro Max Security and Deployment Baseline

## Before production launch

1. Connect the company-owned domain to Cloudflare DNS. Enable HTTPS-only mode and keep DNS and registrar recovery contacts under company ownership.
2. Enable Cloudflare managed WAF rules, bot protection, and rate limiting for all enquiry endpoints. Add Cloudflare Turnstile to every public form.
3. Deploy from a private GitHub repository to Vercel. Require multi-factor authentication for GitHub, Vercel, Cloudflare, Sanity, and CRM administrators.
4. Add production-only environment variables in Vercel. Never commit passwords, API keys, CMS write tokens, or CRM credentials to the repository.
5. Create Sanity roles: Owner, Content Editor, Technical Editor, and Developer. Give each person only the access necessary for their work.
6. Configure daily CMS export backups, repository backups, and a recurring restore test. Store technical documents in a company-controlled asset library.
7. Route forms through a server-side endpoint. Validate all fields server-side, scan attachments, limit file types and sizes, and log delivery failures.
8. Use preview deployments for all code changes. Test the page, forms, and downloads before promoting a preview to production.

## Ongoing operating checklist

- Monthly: review users and MFA status; patch dependencies; confirm backups; test contact forms.
- Quarterly: review WAF/rate-limit events; validate access roles; run performance and accessibility checks.
- After every incident: rotate affected credentials, review logs, restore from a known-good backup if necessary, and document the remediation.

## Current project note

The static `_headers` file defines a baseline security-header policy for Cloudflare-compatible static hosting. It needs to be verified against the final CMS, analytics, form, and 3D providers before production because each approved third-party service may require a narrow additional Content Security Policy allowlist entry.
