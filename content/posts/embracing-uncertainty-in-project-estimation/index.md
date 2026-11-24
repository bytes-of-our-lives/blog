---
authors: [daniel-orbach]
date: 2026-02-16
draft: false
title: "The One About Embracing Uncertainty in Project Estimation"
---

> **💭**
>
> In this article, we will challenge the default management paradigm for software development teams.
> We propose to shift the focus from accuracy to clarity.
>
> I hope that by the end of this article, you will have reflected on your pains as developers or their managers with optimism, knowing that the next time uncertainty arises, there's a sensible method to reduce the concomitant stress.

The other day, I set out to replace the kitchen's light fixtures.
Nothing complicated—just swapping out the E27 bulb sockets.
Eager to get it done, I figured it would take five minutes per socket.
There were three sockets total, so I mentally penciled in 15 minutes.
Easy.

What I didn't account for were the sockets' "screw-less" wire plugs.
Whoever designed them clearly thought they were clever, but they turned my simple task into an hour of struggle.
By the end, I resorted to brute force and broke the original socket casing to finish the job.

My 15-minute estimate assumed the wires would come out of the old sockets easily.
I didn't realize I was making that assumption until I was standing in the kitchen with a broken socket.

On a software team, other people plan around our estimates.
If all they hear is a number, they're left guessing what has to go right and what could change the estimate.

When this first clicked for me, it felt like a revelation.
Systems engineers have been planning around uncertainty for decades.
I wanted to see what that habit could do for an ordinary software team.

## The Problem Space

Every group of people working together requires planning and coordination.
When it comes to software-centric organizations, teams intuitively reach for time estimates as their primary tool for managing uncertainty.
The specific flavors vary: some companies use story points, others prefer t-shirt sizes, and a few brave souls still commit to fixed dates, but the underlying pattern is remarkably consistent.

> **💡**
>
> Of course, your company does it differently.
> Every organization has its own rituals and terminology.
> But unless you've deliberately redesigned your estimation process, chances are you'll recognize the dynamics described here.
> Covering every variant would require a book; this article focuses on the typical case.

### The Problem with Traditional Time Estimation

When managing projects, teams often rely on two primary methods for estimating time:

**1. Top-down planning**

Before consulting those who will do the work, estimates are often reverse-engineered from external deadlines: product launches, customer commitments, or market windows.
These constraints get coerced into opaque projections that sound reasonable but are fundamentally wishful.
Risk assessments, when they happen at all, tend to rely on hand-wavy assumptions drawn from personal experience, often acquired at different companies, under different technical stacks, with different team dynamics.
The relevance is assumed, rarely validated.

**2. Bottom-up planning**

Estimates from those close to the implementation account for technical complexity and execution details, but often miss dependencies, organizational constraints, and broader system interactions that become apparent only at different levels of abstraction.

Both approaches share a fundamental flaw: they operate with incomplete information.
Each perspective sees certain risks clearly while being blind to others.
The challenge isn't choosing between them—it's that neither can succeed in isolation.

### How Padding Hides Risk

Here's where estimation processes typically break down: each layer in the organization attempts to "improve" the estimate by adjusting for risks they perceive.
But rather than integrating these perspectives, the typical flow is sequential transformation—each adjustment obscures what came before.

It's analogous to a signal processing chain where every stage adds a noise filter.
In theory, filters clean up noise.
In practice, cascading filters without feedback degrades the original signal.
You can't tell what information is load-bearing and what's artifact of the transformation.

When someone at one level adds adjustment for uncertainty, that adjustment becomes opaque to the next level, who then adds their own.
The compound effect isn't improved accuracy—it's loss of signal.
No one can trace back to understand what assumptions drive the estimate, which risks have been accounted for multiple times, or which haven't been considered at all.

The system lacks integration points where information from different perspectives can be synthesized rather than serially transformed.
Those closest to technical implementation can't communicate the shape of their uncertainty upward.
Those with visibility into organizational constraints can't inject that context downward in a way that refines rather than replaces the technical assessment.

### The Human Element

This isn't a failure of competence—it's a mismatch between the tools we instinctively reach for and the nature of the problem.
Uncertainty is uncomfortable.
Our minds want concrete answers: "When will this be done?"
Point estimates and fixed deadlines provide psychological comfort.
They create an illusion of control.

The adjustments at each level are our attempt to manage risk while maintaining that illusion.
We suppress the stress of uncertainty by pretending we've accounted for it, adding padding that feels like insurance.
In the absence of better tools, this is a reasonable coping mechanism.

But reasonable doesn't mean effective.

## A Probabilistic Approach to Time Estimates

The alternative isn't simply "better estimates"—it's a fundamentally different relationship with uncertainty.
Instead of treating estimates as commitments to be defended, treat them as models to be continuously refined through integration of risk from across the organization.

### Putting Probabilities on Finish Dates

Point estimates are lossy compression.
When someone says "three days," you've lost information about their confidence, the shape of their uncertainty, and which assumptions matter most.
Was it "definitely three days" or "probably three, maybe five, could be two if things go well"?

Suppose your team is integrating a vendor API and the billing team needs to know when it can start testing.
You might say, "We think there's a 60% chance the integration will be ready by this Thursday and a 90% chance by next Tuesday.
We expect the vendor's authentication flow to work as documented, and we've allowed time to try a fallback if it doesn't."

Your team might use Thursday to plan its own work.
Billing might plan around Tuesday if it can absorb about a one-in-ten chance of a late handoff.
If billing needs the integration by Thursday, tell them there's roughly a four-in-ten chance it will arrive late.
Before making a commitment, test the authentication flow and talk through what a delay would mean for their plans.

Those dates should reflect what other people know about the work, too.
Someone who knows about an upcoming infrastructure change might push the later date out.
Someone who has done the integration before might recognize a faster way through it.
When they explain what they know, the team can revise the same forecast and see why it changed.

### Continuous Risk Resolution

Early in a project, the range of plausible finish dates is often wide.
Use the time before making a commitment to find out what could change those dates.

Start with the unknowns that could change the forecast the most.
If you need a vendor to meet a performance target, test it before building the integration.
If you're counting on a design to scale, prototype it before committing to it.

Suppose your team tests the vendor's authentication flow and finds it doesn't work as documented.
The fallback requires vendor approval, and the vendor hasn't said how long that takes.
Your team's 60% date moves from Thursday to the following Monday.
Its 90% date moves from next Tuesday to the Tuesday after that.
The team tells billing why the forecast changed and asks the vendor how long approval usually takes.
The dates are farther apart now, and the team has a concrete question to follow up on.

This is continuous integration in the literal sense: constantly incorporating new information, refining the model, and propagating that refined understanding both upward and downward through the organization.

### Bidirectional Information Flow

Traditional estimation flows one direction: up.
Someone at the bottom estimates, someone above adjusts, it moves higher.
By the time it reaches decision-makers, the connection to ground truth is tenuous.

Probabilistic estimation requires bidirectional flow.
When someone with visibility into organizational constraints sees that a range doesn't account for an upcoming platform migration, that information needs to flow back to those doing the technical assessment.
When developers discover that a dependency is more stable than assumed, that should tighten the range at higher levels.

The key is that adjustments refine rather than replace.
Each perspective contributes signal that integrates with others.
The person close to implementation says "technically, this is 3–6 days."
The person aware of team availability says "we have two half-days committed to production support, so effective time available is constrained."
The person tracking dependencies says "this unblocks three other workstreams, so variance here amplifies downstream."
The combined assessment is richer than any single view.

This only works if the integration points are explicit.
When someone adjusts an estimate, they should articulate why, which risks they're accounting for, and what would change their assessment.
The estimate becomes a shared model, not a number passed between layers.

### The Benefits of Continuous Integration

This approach doesn't just produce better predictions.
It changes the nature of planning:

**Explicit assumptions:** When teams put probabilities on dates and name the dependencies behind them, everyone can see what the forecast depends on.
Teams can validate those assumptions, challenge them, or monitor them as the project progresses.

**Risk-driven prioritization:** Knowing which unknowns could change the forecast helps you decide what to test first.

**Adaptive planning:** As the team learns more, it can revisit the dates people are counting on.
If a date is fixed, a change in the odds can still give people time to adjust scope or prepare for a delay.

**Organizational learning:** Each project becomes a source of calibration data.
Teams learn which types of uncertainties they consistently underestimate, which buffers are actually necessary, and how their estimates compare to outcomes.
The process improves over time.

The goal isn't eliminating uncertainty—it's maintaining signal fidelity as uncertainty gets assessed, integrated, and progressively resolved.

## Where to Start

If you've read this far, chances are the way your team handles estimates has let you down, maybe more than once.
The good news is that you don't need to overhaul your entire planning process overnight.

Next time you're in a planning meeting and someone asks "how long will this take?", try redirecting: *"What don't we know yet, and what would it take to find out?"*
That single shift, from pinning down a date to surfacing what's unclear, changes the nature of the conversation.
Instead of negotiating a number that everyone quietly doubts, you're building a shared picture of where the real unknowns live and what to do about them.

Start small.
Pick one upcoming piece of work.
Ask when you think you'll probably finish and when you'd feel comfortable asking someone else to plan around it.
For each date, estimate the chance of finishing by then and say what could change your answer.
Then pick one assumption you can test before anyone commits.

That's the whole shift.
Not a new framework, not a certification, not a different flavor of story points.
Just a willingness to say "we're not sure yet, and here's what we're doing about it," and an organization that learns to hear that as progress rather than failure.
