---
title: 📚 Browse playbooks
---


<details>
<summary>🤔 Wait, WTF are playbooks!?</summary>
<br />
Playbooks are short lessons written by those who have already found their way through the muck, here to help you find your way.

Want to write a playbook yourself? Hop into [our Discord](https://discord.gg/ZqdPP9b) and say Hi first!

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
