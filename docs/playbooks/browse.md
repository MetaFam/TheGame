---
title: 📚 Browse playbooks
---


<details>
<summary>🤔 Wait, WTF are playbooks!?</summary>
<br />

Playbooks are like lessons or tutorials that help you find your way!

MetaGame playbooks are quite special though as some have been written by OGs of the Metaverse! 😱

If you'd like to write a playbook for MetaGame, hop into [our Discord](https://discord.gg/ZqdPP9b) and say Hi!

</details>


<p></p>


import { PlayBooks } from "../../src/components/playbooks.js";

<!-- add playbooks in this section  -->
export const books = [
  {
    id: 1,
    title: "😎 Make it Without Technical Skills",
    author: "@cooopahtroopa",
    imgURL: "https://i.imgur.com/BWIoQ9Q.jpg",
    bookPath: "playbooks/how-to-make-it-without-technical-skills",
    description: "",
  }
];

<PlayBooks books={books} />
