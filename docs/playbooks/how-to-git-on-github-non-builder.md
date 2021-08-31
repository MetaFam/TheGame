---
title: 📚 How to Git on GitHub as a non-builder
description: 'This Playbook focuses on contributing to the MetaGame wiki but the core concepts can be applied to any repository you want to contribute to and most DAOs & projects use similar set-ups for their wikis & documentation.'
image: https://i.imgur.com/6abIIsy.png
---

by @luxumbra

<details>
<summary>🤔 Wait, WhoTF is @luxumbra!?</summary>
<br />
 luxumbra is a builder and a community focused resident of MetaGame. He can be found in Discord or on Twitter as @bdgrdev.
</details>

<br />

<details>
<summary>WTF is Git?!</summary>
<br />

Git is (pretty much) the industry standard software for tracking changes in any set of files. Usually used for coordinating work among developers who are collaboratively developing source code in the software development industry.

In MetaGame, we use it on the wiki (among other places) for updating the content and making updates to the code. The former is what we will be looking at here.
</details>

<br />

<details>
<summary>Git is not GitHub.</summary>
<br />
 GitHub is the worlds biggest software development platform. 3 million organisations store their code and project files in Git repositories hosted by GitHub.

Developers and the more tech focused folk will reach for the GitHub Command Line Interface (CLI) but rest assured, there's other ways to use it without needing a degree in Computer Science. :smile:
</details>

## Get your Git on
As a non-builder you're unlikely to know WTF a 'terminal' or 'command line interface' is ([WTF even is 'terminal'?!](https://www.pcmag.com/encyclopedia/term/terminal-window)); let alone feel at ease running commands in one, so I won't go into that. Luckily for you, there's a handful of decent desktop applications that'll make using Git a lot less painful.

This Playbook focuses on contributing to the MetaGame wiki, but the core concepts can be applied to any repository you want to contribute to. Most DAOs & projects use similar set-ups for their wikis & documentation.

> If you're completely new to Git itself, it is recommended to get a bit of a grounding with that before you start contributing to projects and such. Here's a couple of handy articles on this very subject: [Basics of Git](https://docs.github.com/en/github/getting-started-with-github/using-git) & the [Git Book](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line)

> Also note: When contributing to MetaGame, to avoid potential gaming of XP please use the correct workflow for adding content. Write your post in Notion or [HackMD](https://hackmd.io/) and submit it for feedback & review. Once it has received the go ahead and requires no more edits, then you're good to submit it to GitHub. What we do not want is people making commits for small typos through the feedback phase and gaining XP for these micro edits.

With no further ado, here's How to Git on GitHub as a non-builder:

### 1. Go get an account on [GitHub](https://github.com/)
It is free and takes a jiffy.

### 2. Get the required apps
If you don't know the command line, download and install a desktop app for Git (this guide focuses on GitHub Desktop). If you do know Command line, there will be another playbook for you...soon:tm:

Recommended app for starters:
[GitHub Desktop - Mac/Win](https://desktop.github.com/)

Alternatives to try:
[GitKraken - Mac/Win/Linux](https://www.gitkraken.com/)(Free for basic use or $4.95p/m for the Pro)
[Tower - Mac/Win](https://www.git-tower.com/)(Not free but a pretty UI for $69p/y)


You will also need a text editor or ideally a free code editor like [VSCode](https://code.visualstudio.com/download) that will enable you to see all of the projects files and edit them with much clearer formatting than a simple text editor. *Word, Google Docs or other desktop publishing apps will not work for this purpose*.

> If you get stuck, hop into [#!?-ask-anything](https://discord.gg/5vhfXtZ9g2) on our Discord or DM myself and I will do my best to help.

So, once you've installed a desktop app for GitHub and for editing the files...move on the the next step. :point_down:

### 3. Login to GitHub via the GitHub Desktop app
![](https://cdn.discordapp.com/attachments/826223136609534002/879688650789650462/unknown.png)

If this is your first time using the app, you will see the Welcome screen and the sign in button.

![](https://cdn.discordapp.com/attachments/826223136609534002/879689373719875595/unknown.png)

Once you've logged in and authorised the app, you will see the Configure screen. Select the email address you want to be associated with your Git activity and hit 'Finish'

### 4. Clone / Fork the repository
Now you're signed in, you can copy (clone or fork) the repository you are going to be working on.
> Copying a repository is called 'cloning' or 'forking'. Forking is used when we don't have full access to a repository.
>
For the purposes of this Playbook, we will be *forking* the [MetaFam wiki repository](https://github.com/MetaFam/metagame-wiki) and adding a new page.

![](https://cdn.discordapp.com/attachments/826223136609534002/879689884657418270/unknown.png)

#### Select "Clone a repository from the internet..."
Wait, weren't we just *forking*?! Yes, but we *clone* initially and will set-up our *fork* a bit later. :smile:

![](https://media.discordapp.net/attachments/826223136609534002/879694360919302144/unknown.png)

Select the 'URL' tab, enter either the GitHub name of the repo or the URL of the repository you wish to work on (`metafam/metagame-wiki` or `https://github.com/MetaFam/metagame-wiki`), choose a local directory to download to and click 'Clone'.

*Don't forget where you selected, so you can find it later*.😆

![](https://media.discordapp.net/attachments/826223136609534002/879694469639864350/unknown.png)

This will 'clone' the project's repository to the folder you selected on your computer.

### 5. Create a new branch from `master`

Once the repo has finished downloading, make sure the 'Current branch' selected is `master` and go to `Branch > New Branch...` in the app menu.

![](https://cdn.discordapp.com/attachments/826223136609534002/881208321120550922/unknown.png)

Enter your branch name with a name like `content/adding-git-playbook` (using this format helps to organise all branches of a specific type in Git, a bit like folders) and hit 'Create branch'.


### 6. Adding content
Now you have a branch to work on you can open up the project in an application like VSCode to make your changes.

![](https://media.discordapp.net/attachments/826223136609534002/879697782712172574/unknown.png)

Go to `File > Open folder` and navigate to the location you selected earlier when we cloned the repo and open the folder in your editor. If in VSCode, you are safe to "Trust the authors" if it asks you.

![](https://media.discordapp.net/attachments/826223136609534002/879698389112061972/unknown.png)

As you can see in the image, there's a ton of folders & files here. Don't be intimidated, if you mess something up, there's no possible way you can mess up the original codebase. If you do accidentally delete everything, you can always checkout the `master` branch again and start over with a new branch or clone.

#### Creating a new page
Navigate to `docs/playbooks` and take a look at the files already there. Open one. We will use this as a template.

Once opened, go to `File > Save as...` or you can use the shortcut `Ctrl+Shift+S` (Win) / `Cmd+Shift+S` (Mac) to save the file as a new file. A pop up will appear asking you to give your file a name.

![](https://cdn.discordapp.com/attachments/826223136609534002/879740091621335060/unknown.png)

Ensure you use 'kebab casing' when naming the file - use hyphens in place of spaces and *all lower case letters* eg: `how-to-git`. Make sure 'Markdown' is selected in the 'Save as type' field. You shouldn't need to add an extension but if you do, use `.md`. Click 'Save'.

> :warning: At this point, look at the files in VSCode and check the name of the file you just created has the `.md` extension at the end. If it doesn't, right click the file in VSCode and select 'Rename' in the context menu and add in the `.md`. Without it, the wiki build will fail.

![](https://media.discordapp.net/attachments/826223136609534002/879699853821759498/unknown.png)

Now, remove the contents of the file **except** for the 'Frontmatter' at the top, that is what is between and including the triple hyphens `---` and replace the title with your own, and for consistency's sake, use the 📚 emoji as in the example.

![](https://media.discordapp.net/attachments/826223136609534002/879709576524611664/unknown.png)

While you're in the Frontmatter, you can also add in image and description properties, which will be displayed as a preview when sharing the URL to your post in Discord, Twitter and other social networks.

![](https://media.discordapp.net/attachments/826223136609534002/879711593380839444/unknown.png)

Add your content using [markdown syntax](https://www.markdownguide.org/cheat-sheet/) or using basic HTML such as `<h2>, <h3>, <p>, <a>, <img/>`.

>Please do not use the `<h1> or #` level 1 headings in your post as there should only be one of those on the page and it will be generated automatically from the `title` property in the Frontmatter.

> ℹ️ If you press `Shift+Ctrl+P`/`Shift+Cmd+P` in VSCode and type 'preview', you will see 'Markdown: Open preview...'. That will give you a preview to check how your file looks when parsed - Handy for checking your links and images are not broken.

#### Edit `sidebars.js`
Next, - this is critically important when working on the MG wiki! 😱 - You need to add a reference to your new file in the `sidebars.js` file in the root of the project. The sidebars file is used to create the main menu for the wiki and your page will not display correctly if it is not added.

![](https://media.discordapp.net/attachments/826223136609534002/879698671174836244/unknown.png)

Open `sidebars.js` and find where you need to place the reference to your page. For this example, we want to add to the 'Playbooks' section as highlighted in the image above.

![](https://media.discordapp.net/attachments/826223136609534002/879709994449272852/unknown.png)

Add your entry below the others - pay close attention to how you named your new file as it needs to match in the sidebar file. **Do not** include the file's `.md` extension in the sidebar. Make sure to leave a `,` at the end of the new line, eg; `"playbooks/how-to-git",`. Also check there is a `,` at the end of the line above or the wiki build will not work. :cry:

Once you are happy, save the file and return to the GitHub desktop app where you will see the changes you have just made. :smile:

### 7. Commit & publish to GitHub
![](https://media.discordapp.net/attachments/826223136609534002/879712419058958337/unknown.png)

Here you see your changes - the green plus icon denotes a new file, and the amber dot an existing file with edits. The right hand pane shows you the edits that were made for the selected file.

#### Fork it

![](https://cdn.discordapp.com/attachments/826223136609534002/879751377910382693/unknown.png)

If you are not yet a member of the MetaFam organisation in GitHub, there will be a warning that you do not have access to the upstream repo - in this case the **metagame-wiki** repo - and a link to 'create a fork'. Click the 'create a fork' link. *Now we're forkin'!* :eyes:

> A fork is what we want because we will be using this branch to contribute to the original 'upstream' repository. As you may not be a member of the organisation in GitHub, you need to push your changes to your own GitHub account, and then create a Pull Request to be merged into the original, upstream `master` branch.

![](https://media.discordapp.net/attachments/826223136609534002/879712690325573672/unknown.png)

Next click the 'Fork this repository' button in the subsequent pop up.

![](https://media.discordapp.net/attachments/826223136609534002/879712763511996416/unknown.png)

On the next screen, Select 'To contribute to the parent project' and hit Continue.

![](https://media.discordapp.net/attachments/826223136609534002/879713236134531092/unknown.png)

Double check your changes and if happy, add a summary of your update and a longer description in the form at the bottom left of the screen. When done, hit the commit button.

Once committed, and before we publish (or 'push') our branch, we should check for and 'pull' the latest updates from the MetaFam repo (upstream) to ensure your branch is in sync and to reduce the chance of conflicts when we create our pull request.

![](https://media.discordapp.net/attachments/826223136609534002/881215625886847016/unknown.png?width=1093&height=614)

Switch to the `master` branch and click 'Fetch origin'. This will update your repo with any updates from the MetaFam repo.

![](https://media.discordapp.net/attachments/826223136609534002/881220783924469780/unknown.png?width=875&height=468)

Next, we need to 'rebase' `upstream/master` onto our branch. So switch back to your branch and go to `Branch > Rebase curent branch...`

![](https://media.discordapp.net/attachments/826223136609534002/881218185561530378/unknown.png?width=874&height=470)

In the popup, type 'master' into the search field and select `upstream/master`, if there are updates, there will be a yellow dot as opposed to a green tick, if there are no updates. *The rebase button will be disabled if there are no changes*.

If you have updates, click the 'Rebase' button. If that goes smoothly, you're ready to publish and make a new pull request. :raised_hands:

#### Publish and make a PR

![](https://media.discordapp.net/attachments/826223136609534002/879713354405527612/unknown.png)

Hopefully, there won't be any issues and you are now OK to publish your branch and get a pull request underway. Click 'Publish branch'.

![](https://media.discordapp.net/attachments/826223136609534002/879713745360781362/unknown.png?width=768&height=528)

Once published, you will see 'Create pull request', so hit that and you will be taken to the GitHub website to continue the PR process.

![](https://media.discordapp.net/attachments/826223136609534002/879714110789533706/unknown.png)

Enter the details of the PR in the form, if not sufficiently covered by the commit message

![](https://cdn.discordapp.com/attachments/826223136609534002/879762881158189076/unknown.png)

Select the dropdown arrow in the green 'Create pull request' button. Select 'Draft pull request'.

![](https://cdn.discordapp.com/attachments/826223136609534002/879763465609285672/unknown.png)

We want it to be a draft initially so we can make sure the updates have no issues and check the deployed preview site *before* the PR is opened for review.

![](https://media.discordapp.net/attachments/826223136609534002/879715564128448512/unknown.png)

Once the draft is created, notice the checks that are running; displayed below your comments on the page. Pay particular attention to the 'Vercel' one. Vercel is where we host the wiki and it deploys a preview site on every PR and on any further updates to the PR, so we know our update won't break anything.

> If the tests fail, panic not. There will either be conflicts (shown at the bottom of the PR page), or an error in the page or sidebars file. If it is conflicts, make sure you have updated your branch with the latest from `master`, from within the GitHub desktop app, and then push the updated branch again. If it's not conflicts, double check the Frontmatter in the page you're adding is free of errors or check for a missing `,` or `"` in the `sidebars.js` file. If you get stuck, feel free to tag me (@luxumbra), @chair, or @baconaetor in the PR comments (or find us in Discord), and we will help you get it sorted.

![](https://cdn.discordapp.com/attachments/826223136609534002/879766277382610984/unknown.png)

Once Vercel has deployed your preview, you will see the tests turn green. You can view the preview by clicking the 'Details' link in the last item of the checks list. The one that ends with `/deploy-preview`. This will open up the preview site for you to check out your handiwork. :raised_hands:

#### The moment of truth

![](https://media.discordapp.net/attachments/826223136609534002/879716283833258034/unknown.png)

Navigate to the page you added via the wiki menu to ensure the sidebar item and the new page you added are both as you expect. :heavy_check_mark:

![](https://media.discordapp.net/attachments/826223136609534002/879767831615520858/unknown.png)

If all is well, return to GitHub and move the draft PR to an open PR ready for review, by clicking the 'Ready for review' button.

![](https://media.discordapp.net/attachments/826223136609534002/879716494886445147/unknown.png)

Your PR is now 'Open' and you will notice that the checks section now shows 'Review required' and below that, 'Merging is blocked' in red. This is because all PRs must be reviewed & approved by at least one team member before they can be merged into the `master` branch in the main repository.

> For MetaGame, the best way to notify of your PR is to hop into [our Discord](https://discord.gg/rMa8Ahtv5u) and post the URL for the PR in either the #writers-guild or #playbooks channels (For Player or Engaged Octos), #ask-anything if you're not yet onboarded. Someone will get to reviewing your PR. :pray: For other DAOs and projects, their Discord is probably a good place to let them know of your contributions.

...and you're done!! 🥳 Congratulations, you levelled up! :beers: Let's hope this is the first of many pull requests on your journey through the Metaverse. 🎉
