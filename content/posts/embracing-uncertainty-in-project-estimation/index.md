---
authors: [daniel-orbach]
date: 2026-02-16
draft: false
title: "The One About Embracing Uncertainty in Project Estimation"
---

> **💭**
>
> In this article, we will challenge the default management paradigm for software development teams. We propose to
> shift the focus from accuracy to clarity.
>
> I hope that by the end of this article, you will have reflected on your pains as developers or their managers with
> optimism, knowing that the next time uncertainty arises, there's a sensible method to reduce the concomitant stress.

The other day, I set out to replace the kitchen's light fixtures. Nothing complicated—just swapping out the E27 bulb
sockets. Eager to get it done, I figured it would take five minutes per socket. There were three sockets total, so I
mentally penciled in 15 minutes. Easy.

What I didn't account for were the sockets' "screw-less" wire plugs. Whoever designed them clearly thought they were
clever, but they turned my simple task into an hour of struggle. By the end, I resorted to brute force and broke the
original socket casing to finish the job.

This experience is a perfect example of the problem with time estimates: **we can only hope a task takes the time we
imagine before actually doing it.**

The same principle applies to software development. Wishful thinking and guesswork lead to wildly inaccurate
projections: missed deadlines, frustrated teams, and endless explanations to stakeholders.

Full disclosure: when I first started thinking about this, it felt like a genuine revelation. Turns out, disciplines
that build bridges and launch spacecraft figured this out decades ago. Systems engineering, construction, aerospace.
They all plan around what they *don't* know rather than pretending they do. Software, somehow, keeps rediscovering this
the hard way. So if anything in this post strikes you as obvious, congratulations, you're ahead of most of our industry.
For the rest of us, here's what clicking into place felt like.

## The Problem Space

Every group of people working together requires planning and coordination. When it comes to software-centric
organizations, teams intuitively reach for time estimates as their primary tool for managing uncertainty. The specific
flavors vary: some companies use story points, others prefer t-shirt sizes, and a few brave souls still commit to fixed
dates, but the underlying pattern is remarkably consistent.

> **💡**
>
> Of course, your company does it differently. Every organization has its own rituals and terminology. But unless
> you've deliberately redesigned your estimation process, chances are you'll recognize the dynamics described here.
> Covering every variant would require a book; this article focuses on the typical case.

### The Problem with Traditional Time Estimation

When managing projects, teams often rely on two primary methods for estimating time:

**1. Top-down planning**

Before consulting those who will do the work, estimates are often reverse-engineered from external deadlines: product
launches, customer commitments, or market windows. These constraints get coerced into opaque projections that sound
reasonable but are fundamentally wishful. Risk assessments, when they happen at all, tend to rely on hand-wavy
assumptions drawn from personal experience, often acquired at different companies, under different technical stacks,
with different team dynamics. The relevance is assumed, rarely validated.

**2. Bottom-up planning**

Estimates from those close to the implementation account for technical complexity and execution details, but often
miss dependencies, organizational constraints, and broader system interactions that become apparent only at different
levels of abstraction.

Both approaches share a fundamental flaw: they operate with incomplete information. Each perspective sees certain
risks clearly while being blind to others. The challenge isn't choosing between them—it's that neither can succeed in
isolation.

### The Work-to-Buffer Ratio

Here's where estimation processes typically break down: each layer in the organization attempts to "improve" the
estimate by adjusting for risks they perceive. But rather than integrating these perspectives, the typical flow is
sequential transformation—each adjustment obscures what came before.

It's analogous to a signal processing chain where every stage adds a noise filter. In theory, filters clean up noise.
In practice, cascading filters without feedback degrades the original signal. You can't tell what information is
load-bearing and what's artifact of the transformation.

When someone at one level adds adjustment for uncertainty, that adjustment becomes opaque to the next level, who then
adds their own. The compound effect isn't improved accuracy—it's loss of signal. No one can trace back to understand
what assumptions drive the estimate, which risks have been accounted for multiple times, or which haven't been
considered at all.

The system lacks integration points where information from different perspectives can be synthesized rather than
serially transformed. Those closest to technical implementation can't communicate the shape of their uncertainty
upward. Those with visibility into organizational constraints can't inject that context downward in a way that refines
rather than replaces the technical assessment.

### The Human Element

This isn't a failure of competence—it's a mismatch between the tools we instinctively reach for and the nature of the
problem. Uncertainty is uncomfortable. Our minds want concrete answers: "When will this be done?" Point estimates and
fixed deadlines provide psychological comfort. They create an illusion of control.

The adjustments at each level are our attempt to manage risk while maintaining that illusion. We suppress the stress
of uncertainty by pretending we've accounted for it, adding padding that feels like insurance. In the absence of better
tools, this is a reasonable coping mechanism.

But reasonable doesn't mean effective.

## A Probabilistic Approach to Time Estimates

The alternative isn't simply "better estimates"—it's a fundamentally different relationship with uncertainty. Instead
of treating estimates as commitments to be defended, treat them as models to be continuously refined through
integration of risk from across the organization.

None of what follows is experimental. Industries where a bad estimate means a collapsed bridge or a failed launch
figured this out long ago: you plan around what you don't know, not around what you hope. The concepts below—ranges,
continuous risk resolution, and bidirectional information flow—are standard practice in systems engineering. The only
novelty here is applying them to an industry that still thinks a sprint planning poker session is a risk mitigation
strategy.

### Preserving Signal: Ranges Over Points

Point estimates are lossy compression. When someone says "three days," you've lost information about their confidence,
the shape of their uncertainty, and which assumptions matter most. Was it "definitely three days" or "probably three,
maybe five, could be two if things go well"?

Expressing estimates as probability distributions preserves that signal. Instead of asking *"How long will this take?"*
ask *"What's the range of time this might take, and what's our confidence in different parts of that range?"*

A feature might be "2–5 days, with 80% confidence, assuming the API documentation is accurate and the authentication
flow works as described." This format communicates not just a number, but the shape of the uncertainty and the
conditions under which it holds.

Critically, ranges can be integrated. When multiple perspectives look at the same work—someone sees technical
complexity, someone else sees organizational dependencies, another sees integration risks—their assessments can be
synthesized rather than serially transformed. The person aware of infrastructure constraints can widen the range at
the high end. The person who knows the team has prior experience can tighten it. The information compounds instead of
obscures.

### Continuous Risk Resolution

Early in a project, uncertainty is highest. The probability distribution is wide, reflecting genuine unknowns. The
instinctive response is to avoid committing until there's more clarity. But waiting for clarity is passive—it leaves
uncertainty in place.

The active approach: identify which unknowns contribute most to the width of your distribution, and resolve them first.
This isn't just "developer focus." It's organizational focus. If the largest uncertainty is whether a third-party
vendor can meet performance requirements, validate that before building the integration layer. If it's whether a
design pattern will scale, prototype it before committing the architecture.

Each resolved uncertainty narrows the distribution. More importantly, it updates the model with ground truth. What you
learn from tackling the high-risk items informs the assessment of everything downstream. The estimate becomes more
accurate not because time has passed, but because the shape of the problem becomes clearer.

This is continuous integration in the literal sense: constantly incorporating new information, refining the model, and
propagating that refined understanding both upward and downward through the organization.

### Bidirectional Information Flow

Traditional estimation flows one direction: up. Someone at the bottom estimates, someone above adjusts, it moves
higher. By the time it reaches decision-makers, the connection to ground truth is tenuous.

Probabilistic estimation requires bidirectional flow. When someone with visibility into organizational constraints sees
that a range doesn't account for an upcoming platform migration, that information needs to flow back to those doing the
technical assessment. When developers discover that a dependency is more stable than assumed, that should tighten the
range at higher levels.

The key is that adjustments refine rather than replace. Each perspective contributes signal that integrates with
others. The person close to implementation says "technically, this is 3–6 days." The person aware of team availability
says "we have two half-days committed to production support, so effective time available is constrained." The person
tracking dependencies says "this unblocks three other workstreams, so variance here amplifies downstream." The combined
assessment is richer than any single view.

This only works if the integration points are explicit. When someone adjusts an estimate, they should articulate why,
which risks they're accounting for, and what would change their assessment. The estimate becomes a shared model, not a
number passed between layers.

### The Benefits of Continuous Integration

This approach doesn't just produce better predictions. It changes the nature of planning:

**Explicit assumptions:** When estimates are ranges with stated confidence levels and identified dependencies,
assumptions that were previously implicit become discussable. Teams can validate them, challenge them, or monitor them
as the project progresses.

**Risk-driven prioritization:** When you know which uncertainties dominate your distribution, you know where to focus.
The work that most reduces aggregate uncertainty gets prioritized naturally.

**Adaptive planning:** As risks resolve and the distribution narrows, commitments can be made with appropriate
confidence at appropriate times. Early-stage flexibility gives way to late-stage precision, but on a timeline driven by
information, not calendar.

**Organizational learning:** Each project becomes a source of calibration data. Teams learn which types of
uncertainties they consistently underestimate, which buffers are actually necessary, and how their estimates compare
to outcomes. The process improves over time.

The goal isn't eliminating uncertainty—it's maintaining signal fidelity as uncertainty gets assessed, integrated, and
progressively resolved.

## Where to Start

If you've read this far, chances are the way your team handles estimates has let you down, maybe more than once. The
good news is that you don't need to overhaul your entire planning process overnight.

Next time you're in a planning meeting and someone asks "how long will this take?", try redirecting: *"What don't we
know yet, and what would it take to find out?"* That single shift, from pinning down a date to surfacing what's unclear,
changes the nature of the conversation. Instead of negotiating a number that everyone quietly doubts, you're building
a shared picture of where the real unknowns live and what to do about them.

Start small. Pick one upcoming piece of work and express the estimate as a range with explicit assumptions: "3–7 days,
assuming the vendor API behaves as documented." Watch what happens. People will challenge the assumptions, surface
concerns you hadn't considered, and start contributing to the estimate rather than merely receiving it. The
conversation moves from *when will it be done* to *what could surprise us and how do we find out sooner.*

That's the whole shift. Not a new framework, not a certification, not a different flavor of story points. Just a
willingness to say "we're not sure yet, and here's what we're doing about it," and an organization that learns to hear
that as progress rather than failure.
