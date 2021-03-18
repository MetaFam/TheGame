import React from "react";
import styled from "styled-components";

import StartMetafestInstance from "./startMetafestInstance";

const windowKey = "metafest";
const WindowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WindowHeaderElement = styled.div`
  margin: 0.1rem;
`;
const WindowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const WindowContent = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const windowContainerStyle = {
  padding: "5px",
  paddingTop: "0px",
  backgroundColor: "#310C4FDD",
  borderRadius: 10,
  cursor: "all-scroll",
  pointerEvents: "all",
  boxShadow:
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
  "&:active iframe": {
    pointerEvents: "none",
  },
};

const RoomLink = styled.a`
  text-decoration: none;
  padding-left: 1rem;
`;

const Closer = styled.div`
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &::before {
    content: "×";
    color: #fff;
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-size: 30px;
  }
`;

function getFloatingRoomWindow() {
  return <StartMetafestInstance />;
}

function FloatingWindow() {
  return getFloatingRoomWindow();
}

export default FloatingWindow;
