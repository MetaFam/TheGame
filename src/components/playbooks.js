import React from "react";
import styles from "./playbooks.module.scss";
import { someSidebar } from "../../sidebars";


export function bookList() {
  const pages = Object.entries(someSidebar);

  let playbooks = pages.filter((page) => {
    return page[0].includes("📚 Playbooks") && page;
  });

  return playbooks[0];
}

export function PlayBook({ book }) {
  return (
    <div className={styles.playbook}>
      <a href={`/docs/${book.bookPath}`}>
        <img src={book.imgURL} />
        <div className={styles.bookInfo}>
          <h4>{book.title}</h4>
          {book.author && <p>{book.author}</p>}
        </div>
      </a>
    </div>
  );
}

export function PlayBooks({ books }) {
  return (
    <ul className={styles.playbooks}>
      {books &&
        books.map((book, i) => (
          <li key={`pb-${i}`}>
            <PlayBook key={`pb-${i}`} book={book} />
          </li>
        ))}
    </ul>
  );
}
