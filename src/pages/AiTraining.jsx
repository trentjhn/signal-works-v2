import React from 'react'
import { Section, CardGrid } from '../components/ui/Prose'
import PageHero from '../components/ui/PageHero'
import StepRail from '../components/ui/StepRail'
import CtaBand from '../components/ui/CtaBand'
import RelatedLinks from '../components/ui/RelatedLinks'
import { CALENDLY } from '../lib/constants'

// The tools row mirrors the KnowledgeSystems sources-to-brain motif:
// scattered tools on the left, one competent team on the right.
const tools = [
  { label: 'Claude', icon: 'simple-icons:anthropic' },
  { label: 'Claude Code', icon: 'solar:code-square-linear' },
  { label: 'ChatGPT', icon: 'simple-icons:openai' },
  { label: 'Gemini', icon: 'simple-icons:googlegemini' },
  { label: 'Copilot', icon: 'simple-icons:githubcopilot' },
  { label: 'Perplexity', icon: 'simple-icons:perplexity' },
]

const covered = [
  {
    icon: 'solar:chat-square-like-linear',
    title: 'Prompting that holds up on real work',
    body: 'How to ask so the answer is useful the first time: context, constraints, examples, and how to push back when the output is almost right. The gap between a chat toy and a work tool is mostly in how you talk to it.',
  },
  {
    icon: 'solar:widget-4-linear',
    title: 'The tools, side by side',
    body: 'Claude, Cowork, ChatGPT, Gemini, Copilot. What each one is genuinely good at, where each falls down, and which to reach for in a given job, so your team stops guessing.',
  },
  {
    icon: 'solar:document-text-linear',
    title: 'The everyday workload',
    body: 'Drafting, summarizing, research, analysis, meeting notes, first passes at anything. The unglamorous daily work where these tools quietly return hours to your week.',
  },
  {
    icon: 'solar:shield-check-linear',
    title: 'Judgment, not just usage',
    body: 'Where AI gets things wrong with total confidence, and how to verify before you rely on it. Knowing when not to trust the output is half of being good at this.',
  },
  {
    icon: 'solar:bolt-linear',
    title: 'Agents, in plain language',
    body: 'What tools like Claude Code and Cowork actually do: AI that takes a goal and works through the steps itself. What that makes possible for a team, explained without the jargon.',
  },
  {
    icon: 'solar:users-group-two-rounded-linear',
    title: 'A practice that sticks',
    body: 'A shared prompt library, working habits, and a way to keep learning after we leave. The session is the start of a team practice, not a one-day event.',
  },
]

const steps = [
  {
    n: '01',
    title: 'A scoping call',
    body: 'We learn what your team does all day, which tools you already pay for, and where the hours go. That call shapes everything that follows.',
  },
  {
    n: '02',
    title: 'A curriculum from your work',
    body: 'The exercises come out of your documents and your workflows, not a canned demo. Nobody has to translate a generic example into their own job.',
  },
  {
    n: '03',
    title: 'The session',
    body: 'Half day or full day, in person or remote. Everyone works on their own machine, on their own tasks, and leaves having done real work a new way.',
  },
  {
    n: '04',
    title: 'What you keep',
    body: 'A recording of the session, the prompt library the room built together, and a written Q&A answering everything that came up.',
  },
]

function AiTraining() {
  return (
    <>
      <PageHero
        eyebrow="Service / AI Training"
        title="Your team, fluent in AI."
        intro="Hands-on training for teams that want real work out of Claude, ChatGPT, Gemini, and the tools around them. Half day or full day, in person or remote, built from the work your team already does."
        ctaLabel="Book a training call"
        ctaHref={CALENDLY}
      />

      {/* Tool tiles -> one competent team. */}
      <Section
        title="The tools your team already has. The fluency it doesn't."
        lede="Most companies bought the licenses before anyone learned the tools. We close that gap."
        beamDelay={0}
      >
        <div className="flex flex-wrap items-center gap-3 lg:gap-4 scroll-reveal">
          {tools.map((t) => (
            <div key={t.label} className="card-surface rounded-md px-4 py-3 flex items-center gap-2.5">
              <iconify-icon icon={t.icon} class="relative z-10 text-lg text-white/70"></iconify-icon>
              <span className="relative z-10 text-sm text-white/70 font-light">{t.label}</span>
            </div>
          ))}
          <iconify-icon icon="solar:arrow-right-linear" class="text-xl text-purple-300/50 mx-1"></iconify-icon>
          <div className="card-surface rounded-md px-5 py-3 flex items-center gap-2.5 border border-purple-400/25">
            <iconify-icon icon="solar:user-check-rounded-bold-duotone" class="relative z-10 text-lg text-purple-300"></iconify-icon>
            <span className="relative z-10 text-sm text-white/90 font-medium">A team that knows what it's doing</span>
          </div>
        </div>
      </Section>

      {/* Q&A-shaped sections: the title is the question, house pattern. */}
      <Section title="Everyone has AI. Why is nobody faster?" beamDelay={2}>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          Because a license is not a skill. A few people on every team get good on their own. Everyone
          else types a sentence into a chat window, gets a mediocre answer, and quietly goes back to
          doing it the old way. The distance between what these tools can do and what most teams get
          out of them is enormous, and it does not close by itself. Training closes it: your people,
          on their own work, with someone in the room who does this every day.
        </p>
      </Section>

      <Section
        title="What we cover"
        lede="A working understanding of AI, taught in plain language through the work your team already does."
        beamDelay={1}
        glow
      >
        <CardGrid items={covered} variant="balanced" />
      </Section>

      <Section title="What does a session look like?" beamDelay={3}>
        <StepRail steps={steps} />
      </Section>

      <Section title="Our team ranges from power users to people who avoid it. Does that work?" beamDelay={2}>
        <p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-3xl scroll-reveal">
          That is the normal room, and the session is built for it. Everything is taught in plain
          language, grounded in examples from your own company, and nobody gets left behind for not
          knowing a term. The power users leave with sharper technique and the skeptics leave having
          watched AI do an hour of their own week in minutes. Skepticism usually survives a demo. It
          rarely survives that.
        </p>
      </Section>

      <CtaBand
        heading="Want a team that actually knows these tools?"
        sub="Tell us what your team does all day, and we build the session around it."
        ctaLabel="Book a training call"
        ctaHref={CALENDLY}
      />

      <RelatedLinks
        title="Explore more"
        links={[
          { to: '/services/ai-automations', label: 'AI Automations' },
          { to: '/services/knowledge-systems', label: 'Knowledge Systems' },
          { to: '/approach', label: 'Our Approach' },
        ]}
      />
    </>
  )
}

export default AiTraining
