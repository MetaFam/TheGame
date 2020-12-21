import React from "react";

export const ethSafetyLinks = [
  {
    url:
      "https://media.consensys.net/how-to-keep-your-crypto-safe-8-tips-from-the-pros-5c80845bfa8c",
    title: "How to keep your crypto safe - Consensys",
  },
];

export const mmDonts = [
  {
    dont:
      "If you are using @metamask_io extension, do not install any other extensions in the same browser. Some 3rd party extensions can screen read, view & manage browser stuff.",
  },
  {
    do:
      "Lock your metamask when not needed & check for which sites have been granted access to your account at times & revoke unnecessary ones.",
  },
  {
    do:
      "Have some browser discipline & use different browser for different types of activities. Have a separate browser for #web3 with metamask alone (recommend @brave). Turn on shields whenever possible.",
  },
  {
    do:
      "Review your browser security & privacy settings when installed. Don't use password managers if possible (especially in the browser where metamask is installed) Don't use multiple web3 wallets in a same browser.",
  },
  {
    dont:
      "Don't store or save your seed phrases in any digital services. Write it down somewhere safe or use @argentHQ for  better security.",
  },
  {
    do:
      "Cleanup your browser history & cache at some frequency to remove the clutter & unwanted caching of data + cookies.",
  },
  {
    do:
      "Most important of all, think before proceeding to a website & allowing access to your account. Don't ignore security warnings from your browser.",
  },
  {
    dont:
      "Don't import your wallet in whatever wallet providers you come across. Limit yourself to a max of 3 providers.",
  },
  {
    dont:
      "Try not to use mobile phones for web3 activities as of now if possible. It's easier to backdoor mobiles than a PC. **Don't use APKs to install applications on your mobile.**",
  },
  {
    do:
      "Have separate wallets for various usecases (to hold funds, to participate in a DAO, to invest & to experiment)",
  },
  {
    do: "Be super vigilant. Don't let your guard down, even in a rush. ",
  },
];

export const List = (props) => {
  const { data, type } = props;
  !data && <p>No items</p>;

  function ListEl(props) {
    const { type, data } = props;
    if (!type || type === "ul") {
      return (
        <ul>
          <Items data={data} />
        </ul>
      );
    } else {
      return (
        <ol>
          <Items data={data} />
        </ol>
      );
    }
  }

  function Items({ data }) {
    const items = data.map((item, i) => {
      if (item.url) {
        return (
          <li key={`item-${i}`}>
            <a href={item.url}>{item.title}</a>
          </li>
        );
      }
      return <li key={`item-${i}`}>{item.do || item.dont}</li>;
    });

    return items;
  }

  return (
    <>
      <ListEl type={type} data={data} />
    </>
  );
};
