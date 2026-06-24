# Site redesign: per-page identity + surface + net-new content

**Goal:** Make every page feel like its own room of one premium building (not 8 clones of a template), give cards a real surface, and replace recycled homepage copy with net-new, prospect-useful substance. The homepage stays the standalone showpiece; inner pages get distinct skeletons.

**Decisions (TJ, 2026-06-24):**
- Nav: `Services ▾ · Work · Approach · About`. The `/ai-agency-los-angeles` page stays as an SEO landing linked from the footer, not a top tab.
- Pricing stays OFF the site. Lead with the three-options frame ("hire a dev / big agency / us — same outcomes, fraction of the cost, no hiring risk").
- Proof stays lean + honest: the dogfood 4%→28% result (own brand), cited third-party benchmarks, clearly-anonymized capability examples. No named clients or testimonials until sign-off.
- **Approach page spine = security-first.** "We build so the AI horror stories don't happen to you." Anchored in the real 5-layer production harness + 6-step build discipline + ABA Op. 512.
- Brand stays DARK (the shipped signal-works-v2 look). The cream/editorial `DESIGN.md` is a different/older direction; ignore it here.

## Do-not-publish guardrails (from internal research)
- No prices. No named clients (Casa Mate, Brett Roberts, Integrity Decks, Elevo, etc.) without sign-off. No headcount number ("two people") — senior-led, no count.
- No SOC2/HIPAA claims (not certified). Casa Mate findings only anonymized ("a premium tequila brand"). No Channel Partner section. No PayPal stat specifics (140M/$2.4M/52%) on the site.
- Voice: direct, warm, specific. No em-dashes in customer copy. Banned words: supercharge, seamless, leverage, unlock, transform, empower, revolutionize, effortlessly.

## 1. Card surface system (global — fixes the "see-through" complaint)
New `.card-surface` treatment, applied via shared primitives:
- Fill: `bg-gradient-to-br from-[#160f33] via-[#130d2e] to-[#0f0a26]` (opaque, no transparency).
- Grain: `::before` SVG fractal-noise at ~4% opacity (added to index.css) for physical texture.
- Border: `border-[rgba(255,255,255,0.10)]` (double current).
- Inset top highlight: `shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`.
- Hover: `hover:bg-[#18113a]` + keep FlashlightCard glow/tilt. Drop `backdrop-blur` (nothing behind it).
- Founder photo container gets `bg-[#0a051e]` fallback + `object-center` + centered (`mx-auto` or full-height magazine layout).

## 2. Motion system (CSS + existing primitives, no GSAP)
- PageHero: `animate-reveal` staggered (eyebrow 0 / h1 .1 / intro .2 / cta .3) — fires on mount (above the fold).
- Section top borders: `beam-h` sweep with staggered delay.
- AEO mention bars: animate width 0→value on mount (`bar-grow` keyframe).
- CountUp stat strips where numbers matter (AEO, Approach).
- Founder cards: FlashlightCard tilt.

## 3. Section primitive upgrade
Add `size` prop to `Section`: `display` (homepage-scale `lg:text-7xl/8xl` headers) vs `standard` (current 4xl). Add `CardGrid` `variant="balanced"` (`lg:grid-cols-3`) + optional `featured` first card (bento) to kill the orphaned 5th card. LA service menu → horizontal strip, not a grid.

## 4. Per-page identities
- **Home** — untouched showpiece (full-viewport scramble hero). No inner page copies it.
- **AI Automations** — connected step-rail (process as process), "anatomy of a build" wide card, one concrete before/after ("lead data hand-copied into 3 sheets + CRM → captured, deduped, routed in <90s"), 2-4 wk timeline.
- **Custom AI Software** — split hero + recurring CSS system-diagram motif (Your Data → Agent Layer → Your CRM); services as full-width accordion; "when a custom build is the right call" qualifier section.
- **Knowledge Systems** — typed "ask your company" search demo; Q&A-shaped sections; source tiles → one brain; answers the "we already have Notion" objection; setup/indexing specifics.
- **AI Security & Governance** — editorial single-column; amber "Risk: Unassessed" pill (only off-brand accent allowed); risk-assessment TABLE not cards; opens with the contract-pasted-into-ChatGPT scenario; deliverable preview (risk register + vendor scorecard + draft policy).
- **AEO** — animated mention-rate bars + confidence-interval visuals; spell out the actual method (N=5 × 3 sessions, 48h spacing, Wilson 95% CI); "what if you do nothing"; the dogfood result as live proof.
- **About** — magazine founder profiles (photo fills a third of a tall card; fixes centering); NET-NEW: origin, how an engagement starts week-by-week, anti-persona ("probably not a fit if…"). No recycled belief cards.
- **LA (footer landing)** — real local specificity: entertainment / DTC food & bev / law-firms-under-50; LA industries + common AI problems; services as a strip, not the homepage cards.

## 5. New pages
- **/work** — lead with dogfood 4%→28% (Gemini 52 / ChatGPT 32 / Claude 0) as a real before/after case; cited benchmarks (58% ChannelEngine 2025; MIT specialist 67% vs in-house ⅓); 1-2 anonymized capability demos ("a premium tequila brand: AI engines confused it with a competitor and called it 'budget'"; "a governance dashboard pulling 5 public boards daily, zero hallucinations"). Honest, lean, no testimonials.
- **/approach** — security-first spine. Hero: "We build so the AI horror stories don't happen to you." Sections: the horror-story scenario; the 5-layer production harness (Vendor & Contract / Data Minimization / Infrastructure / Prompt & Output / Observability & Audit); the 6-step build discipline; frameworks (NIST AI RMF, OWASP LLM Top 10, ABA 1.6 + Op. 512, AICPA SSTS 1.4) as a definition list; the three-options frame; "client owns the build" (source + infra-as-code). Honest limits ("not SOC2 certified").

## 6. Net-new content sources (all internal, cited)
service-catalog.md (three-options, sprint flow, deliverables), aeo-discoverability-playbook.md (7-layer stack, benchmarks), security/methodology.md (5-layer harness, 6-step discipline, compliance table), signalworks-entity-resolution-result-2026-06-24.md (dogfood proof), competitor one-liners (methodology+CI moat).

## Phasing
- **Phase 1 (build first, review before rolling out):** global card-surface + grain in index.css; motion foundation; Section/CardGrid upgrades; headshot + 5-grid fixes; nav (add Work/Approach, LA→footer). Then **redesign About** (net-new) + build **Approach** as the two taste exemplars. Verify in browser, show TJ.
- **Phase 2:** roll per-page identities across the 5 service pages + LA; build /work; content depth pass.
- **Phase 3:** /insights blog (separate, later).

Verification each phase: prerender all routes (real h1/title/JSON-LD), 0 hydration errors served directory-index, browser pass desktop+mobile via playwright.
