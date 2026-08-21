// Single source of truth for per-route <head> metadata and JSON-LD.
// Consumed at build time by prerender.js (head injection) and the sitemap generator.
// Plain data only — no JSX/imports — so Node can read it via the SSR bundle without
// rendering React. The path strings here must match the <Route path> values in App.jsx.

const BASE = 'https://www.signalworks.live'
const ORG_ID = `${BASE}/#organization`

// The canonical Organization/ProfessionalService entity. Reused in every page's @graph
// so each page is self-describing to engines that read one page in isolation. Kept
// identical to the entity facts in the off-site profile pack.
const orgNode = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: 'SignalWorks',
  legalName: 'SignalWorks LLC',
  url: `${BASE}/`,
  foundingDate: '2025',
  areaServed: [
    { '@type': 'City', name: 'Los Angeles' },
    { '@type': 'AdministrativeArea', name: 'San Francisco Bay Area' },
  ],
  slogan: 'Automation that actually gets built.',
  description:
    'Your AI department, sized to how you want to work. SignalWorks builds, deploys, and maintains custom AI systems for small businesses, founder-led brands, and agencies.',
  email: 'hello@signalworks.live',
  image: `${BASE}/og-image.png`,
  logo: `${BASE}/og-image.png`,
  sameAs: [
    'https://www.linkedin.com/company/signalworks-ai/',
    'https://www.crunchbase.com/organization/signalworks-36cf',
    'https://www.g2.com/products/signalworks-ai/',
    'https://clutch.co/profile/signalworks-0',
    'https://www.wikidata.org/wiki/Q140041701',
    'https://share.google/RmDHvRAGs8rT1myib',
    'https://github.com/signalworks-hq',
  ],
  knowsAbout: [
    'Artificial intelligence automation',
    'AI agents',
    'Answer Engine Optimization',
    'AI search visibility',
    'Retrieval-augmented generation',
    'AI knowledge systems',
    'AI security and governance',
    'Custom software development',
    'AI training for teams',
  ],
  founder: [
    { '@type': 'Person', name: 'Trenton Johnson', jobTitle: 'Co-founder', alumniOf: 'Yale University' },
    { '@type': 'Person', name: 'Jahleel Heath', jobTitle: 'Co-founder' },
  ],
}

const websiteNode = {
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  name: 'SignalWorks',
  url: `${BASE}/`,
  inLanguage: 'en-US',
  publisher: { '@id': ORG_ID },
  dateModified: '2026-06-24',
}

// Helper: a Service node provided by the SignalWorks organization. provider links by @id
// to the orgNode that ships in the same @graph, so the page is self-describing to engines.
const serviceNode = ({ name, description, serviceType, path, areaServed }) => ({
  '@type': 'Service',
  name,
  description,
  serviceType,
  provider: { '@id': ORG_ID },
  areaServed: areaServed || [
    { '@type': 'City', name: 'Los Angeles' },
    { '@type': 'AdministrativeArea', name: 'San Francisco Bay Area' },
  ],
  url: `${BASE}${path}`,
})

// AEO FAQ — shared between the visible FaqList on /services/ai-search-visibility and the
// FAQPage JSON-LD below, so the on-page answers and the structured data never drift.
export const aeoFaq = [
  {
    q: 'What is answer engine optimization (AEO)?',
    a: 'AEO is the practice of measuring and improving how AI answer engines like ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews describe your brand. Where SEO is about ranking in a list of links, AEO is about whether the engine names you, and names you correctly, in the answer it gives a buyer.',
  },
  {
    q: 'How is AEO different from SEO?',
    a: 'SEO optimizes for where you appear in a ranked list of search results. AEO optimizes for the synthesized answer an AI gives directly, where there may be no list at all. They share inputs like content and structured data, but AEO also depends on entity signals the engines use to know who you are.',
  },
  {
    q: 'Which AI engines do you measure?',
    a: 'We measure across five: ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews. Engines disagree with each other, so measuring one is not enough to know what buyers actually see.',
  },
  {
    q: 'How do you know it is working?',
    a: 'We take a baseline of how each engine describes you, make fixes, and re-measure at 30 days with 95% confidence intervals. We report measured movement in what the engines say, not the number of articles published.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Entity and content signals take time to propagate into the engines’ answers. We re-baseline at 30 days as the first checkpoint, and changes often continue past that as the engines update.',
  },
]

// Training FAQ — shared between the visible FaqList on /services/ai-training and the
// FAQPage JSON-LD in that route's entry, same pattern as aeoFaq above.
export const trainingFaq = [
  {
    q: "How long is a training session?",
    a: "Half day or full day. The scoping call decides which fits: a half day covers the core working skills, a full day adds deeper practice on your own workflows and a segment on agents. Both end with a prompt library your team built itself.",
  },
  {
    q: "Remote or in person?",
    a: "Both. In person around Los Angeles and the Bay Area, remote anywhere. The session is hands-on either way: everyone works on their own machine, on their own tasks.",
  },
  {
    q: "Do our people need to be technical?",
    a: "No. Everything is taught in plain language and grounded in examples from your own company. Mixed rooms are the normal case: power users leave with sharper technique, and beginners leave past the blank-page problem.",
  },
  {
    q: "Which tools do you cover?",
    a: "Claude, Claude Code, Cowork, ChatGPT, Gemini, and Copilot, weighted toward whatever your team already pays for. Tool choice is part of the scoping call.",
  },
  {
    q: "How many people can join?",
    a: "It works best between five and twenty-five. Larger groups split into two sessions, so everyone gets hands-on time instead of watching.",
  },
  {
    q: "What do we keep afterward?",
    a: "A recording of the session, the prompt library the room built, and a written Q&A document answering everything that came up, including the questions we went away to check.",
  },
]

const faqPageNode = {
  '@type': 'FAQPage',
  '@id': `${BASE}/services/ai-search-visibility/#faq`,
  mainEntity: aeoFaq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export const seoRoutes = [
  {
    path: '/',
    title: 'SignalWorks. Automation that actually gets built.',
    description:
      'Your AI department, sized to how you want to work. We build, deploy, and maintain custom AI systems for small businesses, founder-led brands, and agencies.',
    canonical: `${BASE}/`,
    jsonLd: [orgNode, websiteNode],
  },
  {
    path: '/services/ai-automations',
    title: 'AI Workflow Automation Agency | SignalWorks',
    description:
      'We build AI automations that run in your business: lead-gen pipelines, document generation, intent classification, content drafting, and meeting-to-action wiring. Shipped in your infrastructure with documentation and training.',
    canonical: `${BASE}/services/ai-automations`,
    jsonLd: [
      serviceNode({
        name: 'AI Automations',
        description:
          'Background AI workflows that run quietly and produce structured output: lead-gen pipelines, document generation, intent classification, content drafting, and meeting-to-action wiring.',
        serviceType: 'AI workflow automation',
        path: '/services/ai-automations',
      }),
      orgNode,
    ],
  },
  {
    path: '/services/custom-ai-software',
    title: 'Custom AI Software Development | SignalWorks',
    description:
      'Bespoke AI applications, intelligence systems, and custom agents with backend integration, built around your specific workflow and shipped to production in your own infrastructure.',
    canonical: `${BASE}/services/custom-ai-software`,
    jsonLd: [
      serviceNode({
        name: 'Custom AI Software',
        description:
          'Intelligence systems, custom agentic systems with backend integration, and bespoke web applications built around your specific workflow.',
        serviceType: 'Custom AI software development',
        path: '/services/custom-ai-software',
      }),
      orgNode,
    ],
  },
  {
    path: '/services/knowledge-systems',
    title: 'AI Knowledge Systems & Internal Search (RAG) | SignalWorks',
    description:
      'Your scattered docs, Slack, and drives turned into one searchable, permission-aware brain your team can just ask. Internal AI search built on retrieval-augmented generation, shipped in your infrastructure.',
    canonical: `${BASE}/services/knowledge-systems`,
    jsonLd: [
      serviceNode({
        name: 'Knowledge Systems',
        description:
          'Internal AI search and knowledge systems built on retrieval-augmented generation: scattered docs, Slack, and drives turned into one searchable, permission-aware brain.',
        serviceType: 'AI knowledge systems and internal search',
        path: '/services/knowledge-systems',
      }),
      orgNode,
    ],
  },
  {
    path: '/services/ai-security-governance',
    title: 'AI Security Audit & Governance Consulting | SignalWorks',
    description:
      'AI security assessments, vendor and contract audits, internal AI usage policies, and compliance mapping. Built and assessed to NIST AI RMF and the OWASP LLM Top 10.',
    canonical: `${BASE}/services/ai-security-governance`,
    jsonLd: [
      serviceNode({
        name: 'AI Security & Governance',
        description:
          'Security assessments of existing AI deployments, vendor and contract audits, internal AI usage policies, and compliance mapping for the regulations that apply to your industry.',
        serviceType: 'AI security and governance consulting',
        path: '/services/ai-security-governance',
      }),
      orgNode,
    ],
  },
  {
    path: '/services/ai-search-visibility',
    title: 'Answer Engine Optimization (AEO) Services | SignalWorks',
    description:
      'AI search visibility and answer engine optimization. We measure how ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews describe your brand, fix what is wrong, and re-measure at 30 days.',
    canonical: `${BASE}/services/ai-search-visibility`,
    jsonLd: [
      serviceNode({
        name: 'AI Search Visibility (AEO)',
        description:
          'Answer engine optimization: measuring and improving whether your brand surfaces, and surfaces correctly, in AI search across five engines, with a re-baseline at 30 days.',
        serviceType: 'Answer engine optimization',
        path: '/services/ai-search-visibility',
      }),
      faqPageNode,
      orgNode,
    ],
  },
  {
    path: '/services/ai-training',
    title: 'AI Training for Teams & Hands-On Workshops | SignalWorks',
    description:
      'Hands-on AI training for teams: Claude, ChatGPT, Gemini, Copilot, and AI agents, taught in plain language through your own workflows. Half-day and full-day workshops, in person or remote.',
    canonical: `${BASE}/services/ai-training`,
    jsonLd: [
      serviceNode({
        name: 'AI Training',
        description:
          'Hands-on AI training workshops for teams: prompting, tool fluency across Claude, ChatGPT, Gemini, and Copilot, judgment about AI output, and AI agents explained in plain language. Curriculum built from the client\u2019s own workflows. Half-day and full-day formats, in person or remote, with a recorded session and written follow-up.',
        serviceType: 'AI training workshops for teams',
        path: '/services/ai-training',
      }),
      {
        '@type': 'FAQPage',
        '@id': `${BASE}/services/ai-training/#faq`,
        mainEntity: trainingFaq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      orgNode,
    ],
  },
  {
    path: '/ai-agency-los-angeles',
    title: 'AI Automation Agency in Los Angeles | SignalWorks',
    description:
      'SignalWorks is a custom-AI engineering agency based in Los Angeles. AI automation, custom software, knowledge systems, security, and AI search visibility for LA and Bay Area businesses. Senior-led.',
    canonical: `${BASE}/ai-agency-los-angeles`,
    jsonLd: [
      serviceNode({
        name: 'AI Automation Agency in Los Angeles',
        description:
          'Custom-AI engineering for Los Angeles businesses: AI automation, custom software, knowledge systems, AI security and governance, and AI search visibility.',
        serviceType: 'AI automation agency',
        path: '/ai-agency-los-angeles',
        areaServed: [{ '@type': 'City', name: 'Los Angeles' }],
      }),
      // orgNode is typed ProfessionalService (a LocalBusiness subtype) with areaServed
      // Los Angeles, so it carries the LocalBusiness signal for this page.
      orgNode,
    ],
  },
  {
    path: '/about',
    title: 'About SignalWorks | AI Engineering Agency',
    description:
      'SignalWorks is a senior-led custom-AI engineering agency founded in 2025, based in Los Angeles and the Bay Area. Meet the founders and the frameworks we build to: NIST AI RMF, OWASP LLM Top 10, ABA Rule 1.6, AICPA SSTS 1.4.',
    canonical: `${BASE}/about`,
    jsonLd: [
      {
        '@type': 'AboutPage',
        '@id': `${BASE}/about/#aboutpage`,
        url: `${BASE}/about`,
        name: 'About SignalWorks',
        description:
          'About SignalWorks, a senior-led custom-AI engineering agency based in Los Angeles and the San Francisco Bay Area.',
        mainEntity: { '@id': ORG_ID },
      },
      orgNode,
    ],
  },
  {
    path: '/approach',
    title: 'Our Approach | Security-First AI Engineering | SignalWorks',
    description:
      'How SignalWorks builds AI so the horror stories do not happen to you: a five-layer production harness, a six-step build discipline, and the standards we build to (NIST AI RMF, OWASP LLM Top 10, ABA Rule 1.6, AICPA SSTS 1.4). You own the build.',
    canonical: `${BASE}/approach`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${BASE}/approach/#webpage`,
        url: `${BASE}/approach`,
        name: 'Our Approach: Security-First AI Engineering',
        description:
          'SignalWorks’ security-first methodology: a five-layer production harness, a six-step build discipline, and the frameworks every build is held to.',
        about: { '@id': ORG_ID },
        isPartOf: { '@id': `${BASE}/#website` },
      },
      orgNode,
    ],
  },
  {
    path: '/work',
    title: 'Our Work | Measured AI Results | SignalWorks',
    description:
      'Proof, not promises. SignalWorks measures its own brand the way it measures clients: entity recognition moved from 4% to 28% across AI engines in three weeks. Plus anonymized capability examples and the benchmarks that matter.',
    canonical: `${BASE}/work`,
    jsonLd: [
      {
        '@type': 'CollectionPage',
        '@id': `${BASE}/work/#webpage`,
        url: `${BASE}/work`,
        name: 'Our Work: Measured AI Results',
        description:
          'Measured results and anonymized capability examples from SignalWorks, reported with the same candor a client receives.',
        about: { '@id': ORG_ID },
        isPartOf: { '@id': `${BASE}/#website` },
      },
      orgNode,
    ],
  },
]
