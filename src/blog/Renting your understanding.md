---
title: Renting your understanding
description: As LLMs get better at coding, we are starting to see cracks in the notion that looking at and validating the code at all has value.
---

As LLMs get better at coding, we are starting to see cracks in the notion that looking at and validating the code has value.

We are building up a cultural acceptance in not reading what the LLM is outputting. If it doesn't work as long as you have a good enough spec[^1] you can just regenerate the code.

![tweet: "the non fixable code will simply be regenerated from scratch based on the spec and unit tests"](https://i.redd.it/0r7llfj5wmeg1.png)

This attitude is not just a peculiarity of the internet, where you could argue it's all thinkfluencers and grifters, thinking and grifting. I've been talking recently with people who use AI more than I do, and they are admitting[^2] they mostly skim what is outputted and move on. How can you understand what it's doing completely if you have 5 agents chewing on different things? The requirement of your understanding becomes the impediment to progress.

I also don't think this is necessarily just the move fast and break things crowd. I've seen some venerable grey beards inching toward this philosopy:

<iframe width="560" height="315" src="https://www.youtube.com/embed/NsOUKfzyZiU?si=hr2A71P1vRG0uLQc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I think the notion that you write a spec and then get an army of agents to burn down your daily allotted section of the local rain-forest, and then burn it down **again** a month later when what they currently do hits a wall, is foolish.

I am worried we are slipping into a culture of a dereliction of responsibility toward our own output.

# Testing isn't magic

Let's get the obvious issue out of the way, on topic to the video above: you cannot contain and exercise the whole problem space of non-functional requirements. You can politely ask the LLM to follow them, but if you aren't looking at what it's outputting, how do you know it's actually done it?

You can write performance tests, but if you are ignoring the code by the time performance is bad you may have painted yourself into a corner so tight you cannot get out of it easily.

You can write _some_ robustness tests, but you cover everything, and what you can is either imprecise (throw load at it and see if it fails in N seconds) or necessarily tied to implementation, which makes them nontransferable to different implementations and thus next door to useless.

You can test for _very specific_ security issues, but a lot of writing secure software is following damage mitigation strategies (eg zero trust) where you are attempting to control for unknowns.

This is not even getting into UIs, testing subtle visual behaviour or aesthetics, or what happens if UI shifts every time you regenerate your code. Or that the culture we are sleepwalking toward has us not reading tests _either_, so none of it is really getting validated.

But this section is already too long: I really want to talk about something else.

# Renting your own understanding

In Peter Naur's paper [Programming as Theory Building](https://pages.cs.wisc.edu/~remzi/Naur.pdf), he argues that the value of your IP isn't in the code as it's written on disk. It's in the tacit shared knowledge between team members about the thing that you are building. Not only in terms of business requirements, but decisions made in the software development process.

(incidentally this is why it's so damaging in an organisation to constantly reshuffle teams. )

My friend [wrote about this last year](https://gareth.nz/ai-programming-as-theory-building.html), but I really want to put a pin into what he said as his conclusion, in reference to this trend that I am seeing:

> It would be possible to retain ownership of the AI that has built a theory of the software so long as its “memory” was owned by your organisation, but beware of relying on a third party who could change terms of service, price, or implementation without recourse. **If access to the theory is lost, then the product is effectively dead.**

By succumbing to the allure of vibe coding, by running 5 agents at once and barely reading the output, you are outsourcing not only the generation of the code. Not only your own velocity or capability. But the theory of the software to a third party that can change price at will. Or [potentially](https://www.reddit.com/r/GeminiAI/comments/1qjrokj/im_sorry_but_gemini_is_getting_worse_and_worse/) [degrade](https://www.reddit.com/r/ChatGPT/comments/1pgxw2t/is_anyone_else_having_chatgpt_getting/) [overnight](https://www.reddit.com/r/Anthropic/comments/1na3rip/can_someone_explain_to_me_the_recent_assumed/).

# Finally, a hiking metaphor

Many years ago another friend (no blog for this one) told me, in relation to hiking, that you should never hike up a hill you can't hike down. In hiking this is because if you are unable to backtrack you can be caught in dangerous situations with no recourse. But I think this relates to vibe coding in programming as well.

If you outsource your understanding, the AI it is carrying you up a hill you are unlikely to walk yourself down from.

If you don't understand your code, and AI is unable to correctly add a feature, or fix a bug, or solve a problem, where do you go from there?

# I am (mostly) not a hater

I still use these tools. Despite reservations I may write about at some point, they are realistically a requirement of being in this industry.

But, any LLM work I do is split into small chunks that I review. While that "small" is getting larger over time, I am still reviewing every line, and reworking the code until I understand it and I would accept it as my own.

Anything less than that is renting your own understanding.

[^1]: I am reminded of a conversation with a.. _passionate_ types enthusiast a decade ago, who believed that if the type system was good enough you wouldn't need tests, because behaviour would be validated by the types. Then and here, "good enough" is a load-bearing phrase.

[^2]: to their credit, with at least a _soupçon_ of embarrassment
