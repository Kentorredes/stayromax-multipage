# Stayro Max multipage project handoff

## Scope and boundaries
This is an isolated copy of the existing multipage website, prepared for work in Claude Desktop/Claude Code. Preserve the original project and its ChatGPT/Codex conversation. Work only in this copy unless the user directs otherwise. Do not change ChatGPT/Codex configuration, authentication, application bundles, integrations, or processes. Do not change global FCC settings. Do not publish or deploy externally without approval.

## Approved design: preserve it
- Brand: Stayro Max, with the supplied Alsharq logo.
- Premium white/light interface; indigo #2e3192, blue #42ade2, violet #5a2f83.
- Apple system font stack, display weight 400; restrained glass cards, editorial type scale, spatial indigo fields, and subtle Apple-like motion.
- Hero letter spacing around -.035em desktop / -.03em mobile, line height 1.04 / 1.08, generous margins.
- Preserve the current Home composition. A generic multipage shell was previously rejected because it discarded the approved design. Inner pages must inherit the existing design system.
- Desktop Products dropdown; other main pages use direct links. Mobile navigation keeps the compact two-line icon that becomes an X and small popover with expandable products. Oversized mobile menus/type were rejected.
- Hero uses CSS placeholder EPS/XPS panels rotating as a close back-to-back pair. Actual SketchUp models and verified photos/documents are pending.

## Latest user-approved terminology
Use Expanded Polystyrene for EPS and Extruded polystyrene for XPS. Do not narrow the materials to EPS insulation or XPS Boards, as they have other uses. Preserve this change in navigation, cards, headings, descriptions, and enquiry options.

## Pages and implementation
Static HTML/CSS/JavaScript with Vite configuration; package.json and package-lock.json are included. Home contains the established design; app.js includes shared navigation and product-page behavior. multipage.css and styles.css both exist: inspect actual imports and behavior before editing. Some HTML is completed dynamically, so review pages in a browser, not from source alone.
Pages: Home, Products index, Applications, Technical Library, About, Contact, Privacy, Terms; seven product routes under products/: eps, xps, epp, eifs, geofoam, profiles, packaging. Font comparison pages are historical references, not approved replacements.

## Content truth and production limits
Do not invent product specifications, sizes, certifications, clients, projects, or technical claims. Use honest placeholders until verified company material is provided. Product flow is Overview, Applications, Specifications, Available sizes, Downloads, Request quote.
The enquiry flow is mailto-only, not a connected backend. Privacy/terms are prototype pages requiring company review. SECURITY-DEPLOYMENT.md describes intended production work, not proof it was implemented. _headers must be checked against the eventual hosting and integrations; this handoff does not certify production security.

## Running and checking
For a static local preview from this folder: python3 -m http.server 4176 --bind 127.0.0.1 (choose another free port if occupied). Alternatively inspect package scripts, then use npm ci and npm run dev -- --host 127.0.0.1 after dependency installation is authorized. npm run build is the configured production build. The handoff was copied and hash-verified; no fresh build or browser QA was run during packaging. Prior port 4175 was used in the earlier chat; do not assume that server is still running.
Check Home and all product routes, desktop/mobile menus, relative paths, enquiry behavior, and visible labels after changes. Inspect whether _headers is included in any deployment artifact; do not assume the Vite build copies it with publicDir disabled.

## Working style and skills
Use concise, direct language. Discover skills/plugins available in your session and read the relevant skill instructions; do not activate every skill. Inspect before changing, implement only the requested work, verify the outcome, and explain remaining limitations. Avoid simultaneous edits to the same files by multiple assistants.

## First action
Read this file and inspect the current site. Confirm the source structure and approved design before proposing changes. Ask the user for their next requested change if none is specified. Do not redesign on import.
