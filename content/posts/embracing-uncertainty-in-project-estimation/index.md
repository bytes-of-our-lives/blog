---
authors: [daniel-orbach]
date: 2026-02-16
draft: false
title: "The One About Embracing Uncertainty in Project Estimation"
---

> **💭**
>
> I want to shift the focus from accuracy to clarity when we talk about software estimates.
>
> I hope this makes the next conversation about a slipping date a little less stressful for everyone involved.

The other day, I set out to replace the kitchen's light fixtures.
Nothing complicated.
Just swapping out the E27 bulb sockets.
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

Each approach sees some risks clearly and misses others.
To plan well, the team needs to hear from the people doing the work and the people who know the constraints around it.

### How Padding Hides Risk

Each layer in the organization tries to improve the estimate by adjusting it for the risks it sees.
When people pass along only the revised number, each adjustment hides some of what the previous group knew.

Think of a signal passing through a series of noise filters.
Each filter can remove some of the signal you meant to keep.

By the time the estimate reaches the people making decisions, it's hard to tell which assumptions shaped it.
A risk may have been counted twice while another was missed altogether.

The people doing the work need a way to explain what could make it take longer.
They also need to hear about constraints other parts of the organization can see.

### The Human Element

When someone asks "when will this be done?", it feels good to have a straight answer.
The person asking may have work of their own to schedule.
The person answering may add a little padding so they feel comfortable giving a date.
Both have plans riding on the answer.

## A Probabilistic Approach to Time Estimates

An estimate is your best account of how the work might go given what you know today.
The people doing the work and the people planning around it can revise that estimate together as they learn more.

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
The dates are farther apart now, and the team knows what to ask the vendor.

Billing had set aside Tuesday for testing, so the delay means rearranging people's schedules.
Once both teams understand what's holding up the work, they can talk about what billing can still test on Tuesday.

### Bidirectional Information Flow

Traditional estimation flows one direction: up.
Someone at the bottom estimates, someone above adjusts, it moves higher.
By the time it reaches decision-makers, the connection to ground truth is tenuous.

Probabilistic estimation requires bidirectional flow.
When someone with visibility into organizational constraints sees that a range doesn't account for an upcoming platform migration, that information needs to flow back to those doing the technical assessment.
When developers discover that a dependency is more stable than assumed, that should tighten the range at higher levels.

The person close to implementation says "technically, this is 3–6 days."
The person aware of team availability says "we have two half-days committed to production support, so effective time available is constrained."
The person tracking dependencies says "this unblocks three other workstreams, so variance here amplifies downstream."
The combined assessment is richer than any single view.

When someone adjusts an estimate, they should explain what changed, which risks they're accounting for, and what would change their mind again.

### Planning Around Uncertainty

When a forecast names its assumptions, people can challenge them.
Start by testing the ones that could change the dates people are counting on.

If a date is fixed, a change in the odds can still give people time to adjust scope or prepare for a delay.

Hearing why a date moved gives people a chance to say what the delay means for their own work.
It's easier to trust a delivery team that makes time for that conversation, especially when the news is disappointing.

## Where to Start

The next time someone asks how long a piece of work will take, try asking, *"What don't we know yet, and what would it take to find out?"*

Pick one upcoming piece of work.
Ask when you think you'll probably finish and when you'd feel comfortable asking someone else to plan around it.
For each date, estimate the chance of finishing by then and say what could change your answer.
Ask the people planning around those dates what a delay would mean for them.
Then pick one assumption you can test before anyone commits.
