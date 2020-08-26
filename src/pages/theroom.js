import React from "react";
import styles from "./theRoom.module.css";
import Layout from "@theme/Layout";

function TheRoom() {
  return (
    <Layout title="The Room" description="A 3D Audio Virtual Meeting Space">
      <iframe className={styles.theRoom} allow="microphone" src="https://map.highfidelity.com/yC943b9F2bPxjq0U/?map=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F747895452921233468%2F747926639777677382%2FSpeakeasy-BG-default-70m.png" />
    </Layout>
  );
}

export default TheRoom;
