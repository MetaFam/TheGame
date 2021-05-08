A deeper understanding of the C4
=================================
I was very surprised to learn that the core software which ultra-reliable high frequency trading platforms are built upon was constructed using a software development process with no leadership, no vision, no roadmaps, no planning, and no meetings.   

ZeroMQ is the [core that these systems are built on](https://umbrella.cisco.com/blog/2015/11/05/the-avalanche-project-when-high-frequency-trading-meets-traffic-classification/), and ZeroMQ was built with the C4. The reason Blockrazor and Krazor uses the C4 is quite simple: centralization is a blocking process which yields inaccurate results.

The C4 is a hill-climbing algorithm, and an evolution of the GitHub [Fork + Pull Model](http://help.github.com/send-pull-requests/). It is an _extremely_ powerful and fully battle-tested approach to developing software, with proven results. It's probably not possible for any non-C4 project to win in the free market against a project that (properly) uses the C4. Now we get to find out if this holds true in the fierce and brutal cryptocurrency battleground.   


Language
--------

> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

By starting with the RFC 2119 language, the C4 text makes very clear its intention to act as a protocol rather than a randomly written set of recommendations. A protocol is a contract between parties that defines the rights and obligations of each party. These can be peers in a network or they can be strangers working in the same project.

I think C4 is the first time anyone has attempted to codify a community's rulebook as a formal and reusable protocol spec. Previously, ZMQ rules were spread out over several wiki pages and were quite specific to libzmq in many ways. But experience teaches us that the more formal, accurate, and reusable the rules, the easier it is for strangers to collaborate up-front. And less friction means a more scalable community. At the time of C4, we also had some disagreement in the libzmq project over precisely what process we were using. Not everyone felt bound by the same rules. Let's just say some people felt they had a special status, which created friction with the rest of the community. So codification made things clear.

It's easy to use C4: just host your project on GitHub, get one other person to join, and open the floor to pull requests. In your README, put a link to C4 and that's it. We've done this in quite a few projects and it does seem to work. I've been pleasantly surprised a few times just applying these rules to my own work, like CZMQ. _None_ of us are so amazing that we can work without others.

Goals
-----

> C4 is meant to provide a reusable optimal collaboration model for open source software projects.

The short term reason for writing C4 was to end arguments over the libzmq contribution process. The dissenters went off elsewhere. [The ZeroMQ community blossomed](https://github.com/zeromq/libzmq/graphs/contributors) smoothly and easily. Most people were surprised, but gratified. There's been no real criticisms of C4 except its branching policy, which I'll come to later as it deserves its own discussion.

There's a reason I'm reviewing history here: as founder of a community, you are asking people to invest in your property, trademark, and branding. In return, and this is what we do with ZeroMQ, you can use that branding to set a bar for quality. When you download a product labeled "ZeroMQ", you know that it's been produced to certain standards. It's a basic rule of quality: write down your process; otherwise you cannot improve it. Our processes aren't perfect, nor can they ever be. But any flaw in them can be fixed, and tested.

Making C4 reusable is therefore really important. To learn more about the best possible process, we need to get results from the widest range of projects.

> It has these specific goals: To maximize the scale of the community around a project, by reducing the friction for new Contributors and creating a scaled participation model with strong positive feedbacks;

The number one goal is size and health of the community--not technical quality, not profits, not performance, not market share. The goal is simply the number of people who contribute to the project. The science here is simple: the larger the community, the more accurate the results (The Wisdom of Crowds provides a basic introduction to the research in this field).

> To relieve dependencies on key individuals by separating different skill sets so that there is a larger pool of competence in any required domain;

Perhaps the worst problem we faced in libzmq was dependence on people who could understand the code, manage GitHub branches, and make clean releases--all at the same time. It's like looking for athletes who can run marathons and sprint, swim, and also lift weights. We humans are really good at specialization. Asking us to be really good at two contradictory things reduces the number of candidates sharply, which is a Bad Thing for any project. We had this problem severely in libzmq in 2009 or so, and fixed it by splitting the role of maintainer into two: one person makes patches and another makes releases.

> To allow the project to develop faster and more accurately, by increasing the diversity of the decision making process;

This is theory--not fully proven, but not falsified. The diversity of the community and the number of people who can weigh in on discussions, without fear of being criticized or dismissed, the faster and more accurately the software develops. Speed is quite subjective here. Going very fast in the wrong direction is not just useless, it's actively damaging (and we suffered a lot of that in libzmq before we switched to C4).

> To support the natural life cycle of project versions from experimental through to stable, by allowing safe experimentation, rapid failure, and isolation of stable code;

It's quite an interesting effect of the process: _the git master is almost always perfectly stable_. This has to do with the size of changes and their _latency_, i.e., the time between someone writing the code and someone actually using it fully. However, the healthy design learning process tends to cycle through drafts until becoming stable, and inviolable.

> To reduce the internal complexity of project repositories, thus making it easier for Contributors to participate and reducing the scope for error;

Curious observation: people who thrive in complex situations like to create complexity because it keeps their value high. It's the Cobra Effect (Google it). Git made branches easy and left us with the all too common syndrome of "git is easy once you understand that a git branch is just a folded five-dimensional lepton space that has a detached history with no intervening cache". Developers should not be made to feel stupid by their tools. I've seen too many top-class developers confused by repository structures to accept conventional wisdom on git branches. We'll come back to dispose of git branches shortly, dear reader.

> To enforce collective ownership of the project, which increases economic incentive to Contributors and reduces the risk of hijack by hostile entities.

Ultimately, we're economic creatures, and the sense that "we own this, and our work can never be used against us" makes it much easier for people to invest in an open source project like ZeroMQ. And it can't be just a feeling, it has to be real. There are a number of aspects to making collective ownership work, we'll see these one-by-one as we go through C4.

Preliminaries
-------------

> The project SHALL use the git distributed revision control system.

Git has its faults. Its command-line API is horribly inconsistent, and it has a complex, messy internal model that it shoves in your face at the slightest provocation. But despite doing its best to make its users feel stupid, git does its job really, really well. More pragmatically, I've found that if you stay away from certain areas (branches!), people learn git rapidly and don't make many mistakes. That works for me.

> The project SHALL be hosted on github.com or equivalent, herein called the "Platform".

I'm sure one day some large firm will buy GitHub and break it, and another platform will rise in its place. Until then, Github serves up a near-perfect set of minimal, fast, simple tools. I've thrown hundreds of people at it, and they all stick like flies stuck in a dish of honey.

> The project SHALL use the Platform issue tracker.

We made the mistake in libzmq of switching to Jira because we hadn't learned yet how to properly use the GitHub issue tracker. Jira is a great example of how to turn something useful into a complex mess because the business depends on selling more "features". But even without criticizing Jira, keeping the issue tracker on the same platform means one less UI to learn, one less login, and smooth integration between issues and patches.

> The project SHOULD have clearly documented guidelines for code style.

This is a protocol plug-in: insert code style guidelines here. If you don't document the code style you use, you have no basis except prejudice to reject patches.

> A "Contributor" is a person who wishes to provide a patch, being a set of commits that solve some clearly identified problem. A "Maintainer" is a person who merge patches to the project. Maintainers are not developers; their job is to enforce process.

Now we move on to definitions of the parties, and the splitting of roles that saved us from the sin of structural dependency on rare individuals. This worked well in libzmq, but as you will see it depends on the rest of the process. C4 isn't a buffet; you will need the whole process (or something very like it), or it won't hold together.

> Contributors SHALL NOT have commit access to the repository unless they are also Maintainers. Maintainers SHALL have commit access to the repository.

What we wanted to avoid was people pushing their changes directly to master. This was the biggest source of trouble in libzmq historically: large masses of raw code that took months or years to fully stabilize. We eventually followed other ZeroMQ projects like PyZMQ in using pull requests. We went further, and stipulated that _all_ changes had to follow the same path. No exceptions for "special people".

> Everyone, without distinction or discrimination, SHALL have an equal right to become a Contributor under the terms of this contract.

We had to state this explicitly. It used to be that the libzmq maintainers would reject patches simply because they didn't like them. Now, that may sound reasonable to the author of a library (though libzmq was not written by any one person), but let's remember our goal of creating a work that is owned by as many people as possible. Saying "I don't like your patch so I'm going to reject it" is equivalent to saying, "I claim to own this and I think I'm better than you, and I don't trust you". Those are toxic messages to give to others who are thinking of becoming your co-investors.

I think this fight between individual expertise and collective intelligence plays out in other areas. It defined Wikipedia, and still does, a decade after that work surpassed anything built by small groups of experts. For me, we make software by slowly synthesizing the most accurate knowledge, much as we make Wikipedia articles.

Licensing and Ownership
-----------------------

> The project SHALL use a share-alike license such as the MPLv2, or a GPLv3 variant thereof (GPL, LGPL, AGPL).

I've already explained how full remixability creates better scale and why MPLv2 or GPL and its variants seems the optimal contract for remixable software. If you're a large business aiming to dump code on the market, you won't want C4, but then you won't really care about community either.

> All contributions to the project source code ("patches") SHALL use the same license as the project.

This removes the need for any specific license or contribution agreement for patches. You fork the MPLv2 or GPL code, you publish your remixed version on GitHub, and you or anyone else can then submit that as a patch to the original code. BSD doesn't allow this. Any work that contains BSD code may also contain unlicensed proprietary code so you need explicit action from the author of the code before you can remix it.

> All patches are owned by their authors. There SHALL NOT be any copyright assignment process.

Here we come to the key reason people trust their investments in ZeroMQ: it's logistically impossible to buy the copyrights to create a closed source competitor to ZeroMQ. iMatix can't do this either. And the more people that send patches, the harder it becomes. ZeroMQ isn't just free and open today--this specific rule means it will remain so forever. Note that it's not the case in all MPLv2/GPL projects, many of which still ask for copyright transfer back to the maintainers.

> Each Contributor SHALL be responsible for identifying themselves in the project Contributor list.

In other words, the maintainers are not karma accountants. Anyone who wants credit has to claim it themselves.

Patch Requirements
------------------

In this section, we define the obligations of the contributor: specifically, what constitutes a "valid" patch, so that maintainers have rules they can use to accept or reject patches.

> Maintainers and Contributors MUST have a Platform account and SHOULD use their real names or a well-known alias.

In the worst case scenario, where someone has submitted toxic code (patented, or owned by someone else), we need to be able to trace who and when, so we can remove the code. Asking for real names or a well-known alias is a theoretical strategy for reducing the risk of bogus patches. We don't know if this actually works because we haven't had the problem yet.

> A patch SHOULD be a minimal and accurate answer to exactly one identified and agreed problem.

This implements the Simplicity Oriented Design process that I'll come to later in this chapter. One clear problem, one minimal solution, apply, test, repeat.

> A patch MUST adhere to the code style guidelines of the project if these are defined.

This is just sanity. I've spent time cleaning up other peoples' patches because they insisted on putting the else beside the if instead of just below as Nature intended. Consistent code is healthier.

> A patch MUST adhere to the "Evolution of Public Contracts" guidelines defined below.

Ah, the pain, the pain. I'm not speaking of the time at age eight when I stepped on a plank with a 4-inch nail protruding from it. That was relatively OK. I'm speaking of 2010-2011 when we had multiple parallel releases of ZeroMQ, each with different _incompatible_ APIs or wire protocols. It was an exercise in bad rules, pointlessly enforced, that still hurts us today. The rule was, "If you change the API or protocol, you SHALL create a new major version". Give me the nail through the foot; that hurt less.

One of the big changes we made with C4 was simply to ban, outright, this kind of sanctioned sabotage. Amazingly, it's not even hard. We just don't allow the breaking of existing public contracts, period, unless everyone agrees, in which case no period. As Linus Torvalds famously put it on 23 December 2012, "WE DO NOT BREAK USERSPACE!"

> A patch SHALL NOT include nontrivial code from other projects unless the Contributor is the original author of that code.

This rule has two effects. The first is that it forces people to make minimal solutions because they cannot simply import swathes of existing code. In the cases where I've seen this happen to projects, it's always bad unless the imported code is very cleanly separated. The second is that it avoids license arguments. You write the patch, you are allowed to publish it as LGPL, and we can merge it back in. But you find a 200-line code fragment on the web, and try to paste that, we'll refuse.

> A patch MUST compile cleanly and pass project self-tests on at least the principle target platform.

For cross-platform projects, it is fair to ask that the patch works on the development box used by the contributor.

> *   A patch commit message MUST consist of a single short (less than 50 characters) line stating the problem ("Problem: ...") being solved, followed by a blank line and then the proposed solution ("Solution: ...").

This is a good format for commit messages that fits into email (the first line becomes the subject, and the rest becomes the email body).

> A "Correct Patch" is one that satisfies the above requirements.

Just in case it wasn't clear, we're back to legalese and definitions.

Development Process
-------------------

In this section, we aim to describe the actual development process, step-by-step.

> Change on the project SHALL be governed by the pattern of accurately identifying problems and applying minimal, accurate solutions to these problems.

This is a unapologetic ramming through of thirty years' software design experience. It's a profoundly simple approach to design: make minimal, accurate solutions to real problems, nothing more or less. In ZeroMQ, we don't have feature requests. Treating new features the same as bugs confuses some newcomers. But this process works, and not just in open source. Enunciating the problem we're trying to solve, with every single change, is key to deciding whether the change is worth making or not.

> To request changes, a user SHOULD log an issue on the project Platform issue tracker.

This is how users talk to contributors. Track your problems, so others can (maybe) try to solve them for you.

> The user or Contributor SHOULD write the issue by describing the problem they face or observe.

"Problem: we need feature X. Solution: make it" is not a good issue. "Problem: user cannot do common tasks A or B except by using a complex workaround. Solution: make feature X" is a decent explanation. Because everyone I've ever worked with has needed to learn this, it seems worth restating: document the real problem first, solution second.

> The user or Contributor SHOULD seek consensus on the accuracy of their observation, and the value of solving the problem.

And because many apparent problems are illusionary, by stating the problem explicitly we give others a chance to correct our logic. "You're only using A and B a lot because function C is unreliable. Solution: make function C work properly."

> Users SHALL NOT log feature requests, ideas, suggestions, or any solutions to problems that are not explicitly documented and provable.

There are several reasons for not logging ideas, suggestions, or feature requests. In our experience, these just accumulate in the issue tracker until someone deletes them. But more profoundly, when we treat all change as problem solutions, we can prioritize trivially. Either the problem is real and someone wants to solve it now, or it's not on the table. Thus, wish lists are off the table.

> Thus, the release history of the project SHALL be a list of meaningful issues logged and solved.

I'd love the GitHub issue tracker to simply list all the issues we solved in each release. Today we still have to write that by hand. If one puts the issue number in each commit, and if one uses the GitHub issue tracker, which we sadly don't yet do for ZeroMQ, this release history is easier to produce mechanically.

> To work on an issue, a Contributor SHALL fork the project repository and then work on their forked repository.

Here we explain the GitHub fork + pull request model so that newcomers only have to learn one process (C4) in order to contribute.

> To submit a patch, a Contributor SHALL create a Platform pull request back to the project.

GitHub has made this so simple that we don't need to learn git commands to do it, for which I'm deeply grateful. Sometimes, I'll tell people who I don't particularly like that command-line git is awesome and all they need to do is learn git's internal model in detail before trying to use it on real work. When I see them several months later they look... changed.

> A Contributor SHALL NOT commit changes directly to the project.

Anyone who submits a patch is a contributor, and all contributors follow the same rules. No special privileges to the original authors, because otherwise we're not building a community, only boosting our egos.

> To discuss a patch, people MAY comment on the Platform pull request, on the commit, or elsewhere.

Randomly distributed discussions may be confusing if you're walking up for the first time, but GitHub solves this for all current participants by sending emails to those who need to follow what's going on. We had the same experience and the same solution in Wikidot, and it works. There's no evidence that discussing in different places has any negative effect.

> To accept or reject a patch, a Maintainer SHALL use the Platform interface.

Working via the GitHub web user interface means pull requests are logged as issues, with workflow and discussion. I'm sure there are more complex ways to work. Complexity is easy; it's simplicity that's incredibly hard.

> Maintainers SHALL NOT accept their own patches.

There was a rule we defined in the FFII years ago to stop people burning out: no less than two people on any project. One-person projects tend to end in tears, or at least bitter silence. We have quite a lot of data on burnout, why it happens, and how to prevent it (even cure it). I'll explore this later in the chapter, because if you work with or on open source you need to be aware of the risks. The "no merging your own patch" rule has two goals. First, if you want your project to be C4-certified, you have to get at least one other person to help. If no one wants to help you, perhaps you need to rethink your project. Second, having a control for every patch makes it much more satisfying, keeps us more focused, and stops us breaking the rules because we're in a hurry, or just feeling lazy.

> Maintainers SHALL NOT make value judgments on correct patches.

We already said this but it's worth repeating: the role of Maintainer is not to judge a patch's substance, only its technical quality. The substantive worth of a patch only emerges over time: people use it, and like it, or they do not. And if no one is using a patch, eventually it'll annoy someone else who will remove it, and no one will complain.

> Maintainers SHALL merge correct patches rapidly.

There is a criteria I call _change latency_, which is the round-trip time from identifying a problem to testing a solution. The faster the better. If maintainers cannot respond to pull requests as rapidly as people expect, they're not doing their job (or they need more hands).

> Maintainers MAY merge incorrect patches from other Contributors with the goals of (a) ending fruitless discussions, (b) capturing toxic patches in the historical record, (c) engaging with the Contributor on improving their patch quality.

It turns out that accepting imperfect patches rapidly, which I call "optimistic merging", works better all-round than insisting that contributors deliver perfect work.

Standard practice (Pessimistic Merging, or PM) is to wait until continuous integration testing (CI) is done, then do a code review, then test the patch on a branch, and then provide feedback to the author. The author can then fix the patch and the test/review cycle starts again. At this stage the maintainer can (and often does) make value judgments such as "I don't like how you do this" or "this doesn't fit with our project vision."

In the worst case, patches can wait for weeks, or months, to be accepted. Or they are never accepted. Or, they are rejected with various excuses and argumentation.

PM is how most projects work, and I believe most projects get it wrong. Let me start by listing the problems PM creates:

*   _It tells new contributors, "guilty until proven innocent,"_ which is a negative message that creates negative emotions. Contributors who feel unwelcome will always look for alternatives. Driving away contributors is bad. Making slow, quiet enemies is worse.
    
*   _It gives maintainers power over new contributors_, which many maintainers abuse. This abuse can be subconscious. Yet it is widespread. Maintainers inherently strive to remain important in their project. If they can keep out potential competitors by delaying and blocking their patches, they will.
    
*   _It opens the door to discrimination_. One can argue, a project belongs to its maintainers, so they can choose who they want to work with. My response is: projects that are not aggressively inclusive will die, and deserve to die.
    
*   _It slows down the learning cycle_. Innovation demands rapid experiment-failure-success cycles. Someone identifies a problem or inefficiency in a product. Someone proposes a fix. The fix is tested and works or fails. We have learned something new. The faster this cycle happens, the faster and more accurately the project can move.
    
*   _It gives outsiders the chance to troll the project_. It is a simple as raising an objection to a new patch. "I don't like this code." Discussions over details can use up much more effort than writing code. It is far cheaper to attack a patch than to make one. These economics favor the trolls and punish the honest contributors.
    
*   _It puts the burden of work on individual contributors_, which is ironic and sad for open source. We want to work together yet we're told to fix our work alone.
    

Now let's see how this works when we use Optimistic Merging, or OM. To start with, understand that not all patches nor all contributors are the same. We see at least four main cases in our open source projects:

1.  Good contributors who know the rules and write excellent, perfect patches.
2.  Good contributors who make mistakes, and who write useful yet broken patches.
3.  Mediocre contributors who make patches that no-one notices or cares about.
4.  Trollish contributors who ignore the rules, and who write toxic patches.

PM assumes all patches are toxic until proven good (4). Whereas in reality most patches tend to be useful, and worth improving (2).

Let's see how each scenario works, with PM and OM:

1.  PM: depending on unspecified, arbitrary criteria, patch may be merged rapidly or slowly. At least sometimes, a good contributor will be left with bad feelings. OM: good contributors feel happy and appreciated, and continue to provide excellent patches until they are done using the project.
2.  PM: contributor retreats, fixes patch, comes back somewhat humiliated. OM: second contributor joins in to help first fix their patch. We get a short, happy patch party. New contributor now has a coach and friend in the project.
3.  PM: we get a flamewar and everyone wonders why the community is so hostile. OM: the mediocre contributor is largely ignored. If patch needs fixing, it'll happen rapidly. Contributor loses interest and eventually the patch is reverted.
4.  PM: we get a flamewar which troll wins by sheer force of argument. Community explodes in fight-or-flee emotions. Bad patches get pushed through. OM: existing contributor immediately reverts the patch. There is no discussion. Troll may try again, and eventually may be banned. Toxic patches remain in git history forever.

In each case, OM has a better outcome than PM.

In the majority case (patches that need further work), Optimistic Merging creates the conditions for mentoring and coaching. And indeed this is what we see in ZeroMQ projects, and is one of the reasons they are such fun to work on.

> The user who created an issue SHOULD close the issue after checking the patch is successful.

When one person opens an issue, and another works on it, it's best to allow the original person to close the issue. That acts as a double-check that the issue was properly resolved.

> Any Contributor who has value judgments on a patch SHOULD express these via their own patches.

In essence, the goal here is to allow users to try patches rather than to spend time arguing pros and cons. As easy as it is to make a patch, it's as easy to revert it with another patch. You might think this would lead to "patch wars", but that hasn't happened. We've had a handful of cases in libzmq where patches by one contributor were killed by another person who felt the experimentation wasn't going in the right direction. It is easier than seeking up-front consensus.

> Maintainers SHOULD close user issues that are left open without action for an uncomfortable period of time.

Just keep the issue tracker clean.

Branches and Releases
---------------------

When C4 is working, we get two massive simplifications of our delivery process. One, we don't need or use branches. Two, we deliver from master.

This is the process we explain in this section.

> The project SHALL have one branch ("master") that always holds the latest in-progress version and SHOULD always build.

This is redundant because every patch always builds but it's worth restating. If the master doesn't build (and pass its tests), someone needs waking up.

> The project SHALL NOT use topic branches for any reason. Personal forks MAY use topic branches.

I'll come to branches soon. In short (or "tl;dr", as they say on the webs), branches make the repository too complex and fragile, and require up-front agreement, all of which are expensive and avoidable.

> To make a stable release a Maintainer shall tag the repository. Stable releases SHALL always be released from the repository master.

Evolution of Public Contracts
-----------------------------

By "public contracts", I mean APIs and protocols. Up until the end of 2011, libzmq's naturally happy state was marred by broken promises and broken contracts. We stopped making promises (aka "road maps") for libzmq completely, and our dominant theory of change is now that it emerges carefully and accurately over time. At a 2012 Chicago meetup, Garrett Smith and Chuck Remes called this the "drunken stumble to greatness", which is how I think of it now.

We stopped breaking public contracts simply by banning the practice. Before then it had been "OK" (as in we did it and everyone complained bitterly, and we ignored them) to break the API or protocol so long as we changed the major version number. Sounds fine, until you get ZeroMQ v2.0, v3.0, and v4.0 all in development at the same time, and not speaking to each other.

> All Public Contracts (APIs or protocols) SHALL be documented.

You'd think this was a given for professional software engineers but no, it's not. So, it's a rule. You want C4 certification for your project, you make sure your public contracts are documented. No "It's specified in the code" excuses. Code is not a contract. (Yes, I intend at some point to create a C4 certification process to act as a quality indicator for open source projects.)

> All Public Contracts SHOULD have space for extensibility and experimentation.

Now, the real thing is that public contracts _do change_. It's not about not changing them. It's about changing them safely. This means educating (especially protocol) designers to create that space up-front.

> A patch that modifies a stable Public Contract SHOULD not break existing applications unless there is overriding consensus on the value of doing this.

Sometimes the patch is fixing a bad API that no one is using. It's a freedom we need, but it should be based on consensus, not one person's dogma. However, making random changes "just because" is not good. In ZeroMQ v3.x, did we benefit from renaming ZMQ_NOBLOCK to ZMQ_DONTWAIT? Sure, it's closer to the POSIX socket recv() call, but is that worth breaking thousands of applications? No one ever reported it as an issue. To misquote Stallman: "your freedom to create an ideal world stops one inch from my application."

> A patch that introduces new features SHOULD do so using new names (a new contract).

We had the experience in ZeroMQ once or twice of new features using old names (or worse, using names that were _still in use_ elsewhere). ZeroMQ v3.0 had a newly introduced "ROUTER" socket that was totally different from the existing ROUTER socket in 2.x. Dear lord, you should be face-palming, why? The reason: apparently, even smart people sometimes need regulation to stop them doing silly things.

> New contracts SHOULD be marked as "draft" until they are stable and used by real users.
> 
> Old contracts SHOULD be deprecated in a systematic fashion by marking new contracts as "draft" until they are stable, then marking the old contracts as "deprecated".

This life cycle notation has the great benefit of actually telling users what is going on with a consistent direction. "Draft" means "we have introduced this and intend to make it stable if it works". It does not mean, "we have introduced this and will remove it at any time if we feel like it". One assumes that code that survives more than one patch cycle is meant to be there. "Deprecated" means "we have replaced this and intend to remove it".

> Old contracts SHOULD be deprecated in a systematic fashion by marking them as "deprecated" and replacing them with new contracts as needed.
> 
> When sufficient time has passed, old deprecated contracts SHOULD be removed.

In theory this gives applications time to move onto stable new contracts without risk. You can upgrade first, make sure things work, and then, over time, fix things up to remove dependencies on deprecated and legacy APIs and protocols.

> Old names SHALL NOT be reused by new features.

Ah, yes, the joy when ZeroMQ v3.x renamed the top-used API functions (zmq_send\[3\] and zmq_recv\[3\]) and then recycled the old names for new methods that were utterly incompatible (and which I suspect few people actually use). You should be slapping yourself in confusion again, but really, this is what happened and I was as guilty as anyone. After all, we did change the version number! The only benefit of that experience was to get this rule.

Project Administration
----------------------

> The project founders SHALL act as Administrators to manage the set of project Maintainers.

Someone needs to administer the project, and it makes sense that the original founders start this ball rolling.

> The Administrators SHALL ensure their own succession over time by promoting the most effective Maintainers.

At the same time, as founder of a project you really want to get out of the way before you become over-attached to it. Promoting the most active and consistent maintainers is good for everyone.

> A new Contributor who makes correct patches, who clearly understands the project goals, and the process SHOULD be invited to become a Maintainer.

Promote your contributors rapidly, when they show they get it. Anything else is counter-productive.

> Administrators SHOULD remove Maintainers who are inactive for an extended period of time, or who repeatedly fail to apply this process accurately.

This was Ian Barber's suggestion: we need a way to crop inactive maintainers. Originally maintainers were self-elected but that makes it hard to drop troublemakers (who are rare, but not unknown).

> Administrators SHOULD block or ban "bad actors" who cause stress and pain to others in the project. This should be done after public discussion, with a chance for all parties to speak. A bad actor is someone who repeatedly ignores the rules and culture of the project, who is needlessly argumentative or hostile, or who is offensive, and who is unable to self-correct their behavior when asked to do so by others.

Now and then, your projects will attract people of the wrong character. You will get better at seeing these people, over time. C4 helps in two ways. One, by setting out strong rules, it discourages the chaos-seekers and bullies, who cannot tolerate others' rules. Two, it gives you the Administrator the power to ban them. I like to give such people time, to show themselves, and get their patches on the public record (a reason to merge bad patches, which of course you can remove after a suitable pause).


License and Further Reading
=======
The C4, along with this breakdown of it, was created (primarily) by the late Pieter Hintjens. If the C4 interests you it's a very good idea to check out Pieter's blog and watch his videos to get a deep understanding of his research into this field. Here's a good one to start with: [How Conway's law is eating your job](https://www.youtube.com/watch?v=7HECD3eLoVo).   

The text on this page is Copyright (c) 2007-2014 iMatix Corporation and Contributors, 2017-2018 Blockrazor and Contributors and is released under [CC-BY-SA-4](https://creativecommons.org/licenses/by/4.0/)

This breakdown and description of the C4 is an excerpt from [chapter 6 of _ØMQ - The Guide_](http://zguide.zeromq.org/page:all#The-ZeroMQ-Process-C), which is maintained at [booksbyus/zguide on github](https://github.com/booksbyus/zguide/blob/master/chapter6.txt). 