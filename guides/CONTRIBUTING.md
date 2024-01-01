# Welcome to MetaGame!

This guide's purpose is to help orient new (and existing) builders to our development lifecycle so that we all have the tools to collaborate more effectively, both within the Builder's guild and other guilds within MetaGame.

[Go here](https://wiki.metagame.wtf/docs/enter-metagame/join-metagame) if you haven't joined MetaGame yet, but would like to.

<details>
  <summary>I'm new to crypto. What's in it for me?</summary>
  
  There are seemingly infinite open source projects out there. The vast majority of contributors to these projects receive no monetary compensation whatsoever. They do it because they love it.

MetaGame does it better. We also love what we do, but we get paid for our contributions too! We have our own (crypto)currency backing the community, and through GitHub's API, most activity in GitHub is automatically accounted for! That means that once you are registered (an Ethereum address is required), you will earn "XP" for pull requests, new issues, code reviews, etc, which is then included in a monthly calculation to issue ("mint") new currency. This currency can then be exchanged for ETH and traded for USD or your currency of choice, or held as an investment in the community / project.

See [this document](https://docs.google.com/document/d/1MQX_SVndyXrHazzSN6MyfwxWm9bmd2tbwBl9Yeii96I) for much more detail.

</details>

## I'm in! How do I proceed?

We have two development workflows, depending on if you have joined our [GitHub organization](https://github.com/MetaFam) yet:

### The development flow for new builders:

1. Go to the [Issues board](https://github.com/MetaFam/TheGame/issues) here. At the top are a few pinned issues. These are the highest priority. Ideally, work on one of these; otherwise, scroll through to choose another of your fancy.
1. Clone this repo from the `develop` branch and fire up your editor of choice!
   - Ask questions in the #🏗-builders-guild in our [Discord](https://chat.metagame.wtf/) server
   - Or, join our [weekly Builder's call](https://calendar.google.com/calendar/u/0/embed?src=nih59ktgafmm64ed4qk6ue8vv4@group.calendar.google.com&ctz=Europe/Belgrade) on Discord, weekly at 7a PT / 10a ET / 4p CET _(Come half an hour early for a new builders’ meet-and-greet.)_
1. Once you're done, create a [Pull Request (PR)](https://github.com/MetaFam/TheGame/pulls) via GitHub. _Include the issue number when filling in the description._ This is critical.
   - We use Vercel to automatically deploy the `web` package of PR branches. This is quite useful for pointing folks to a live version of your code, but only works if there are no dependent changes in backend code.
   - If your PR is under your own repository (rather than [MetaFam](https://github.com/MetaFam)), someone will have to manually approve this deployment.
1. Your PR should be reviewed within a couple days and either approved or rejected with requested changes.
   - No worries if your PR gets rejected! Reviewers are overwhelmingly polite and gracious, and we're appreciative of any good-faith contribution.
1. Upon approval and merge, your code will be deployed at [test.metagame.wtf](https://test.metagame.wtf). We do merges to master periodically, depending on the complexity of merged changes (and thus need for subsequent testing).
   - After a few merged PRs, ask to join the MetaFam organization, and use the development flow
1. All of this will earn you XP, which is updated daily on your player card at [my.metagame.wtf](https://my.metagame.wtf).

### The development flow for existing builders / members of `MetaFam`:

We use a [ZenHub](https://app.zenhub.com/workspaces/metaos-6012e782d1bec10015d7f4e5/board?repos=255885896) board for project management. Following the process below helps everyone stay on sync with who is doing what and when:

1. When choosing to work on an issue, assign it to yourself. This will move the issue to the "In Progress" lane automatically in ZenHub and signals that the issue has been claimed.
1. If you have a large PR, it's very useful to create and update PRs that are in progress. Just push your branch and create a PR per git's suggestion, then mark it as "draft" and give it the "WIP" tag. This helps us be aware of progress, and if you get pulled away for a week or two, someone can pick up where you left off.
1. Once a PR is complete, tag it with `ready-for-review` and it will get some attention soon.
   - Anybody can do code reviews, don't be shy! XP awaits as well 😄

### Some Tips

- If your PR contains both frontend and backend changes, then it is recommended that you split the PR into two where the first PR would contain only the backend changes while the second PR would contain the frontend changes.
- If you mention another github user in a PR or commit using [something like](https://sourcecred.io/docs/beta/plugins/github#edges) `paired with @dysbulic`, the XP will be split with that user. This can be useful when you want to give someone props for significantly helping.
- MetaGame builders are distributed all over the world, which has both benefits and drawbacks. Don't be afraid to post in Discord to e.g. give us a nudge to review a PR or merge to master.
