import styled from 'styled-components';

import {
  ContextBorderColor,
  ContextColor,
  Easing,
  PrimaryBackground,
} from '../../../theme/Theme.colors';

export const MapPopoverContainer = styled.div`
  position: fixed;
  z-index: 1111;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
  transition: ${Easing};
  opacity: 0;
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: inherit;
  }

  div.popover-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.popover {
    position: relative;
    z-index: 1111;
    background: ${ContextColor};
    border-radius: 5px;
    border: 2px solid ${ContextBorderColor};
    width: 640px;
    max-width: 100%;
    min-height: 240px;
    margin: 0 0 120px 0;
    transition: ${Easing};
    padding: 15px 0;

    opacity: 0;
    pointer-events: none;
    &.active {
      opacity: 1;
      pointer-events: inherit;
    }

    h2 {
      font-size: 24px;
      text-align: center;
    }

    div.input {
      padding: 15px;
    }

    .profiles {
      padding: 15px 0;
    }

    .profile {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      font-size: 18px;
    }

    div.button-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.options {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      button.option {
        width: 50%;
        padding: 30px;
        cursor: pointer;

        div.option-bg {
          position: relative;
          background: ${PrimaryBackground};
          border: 2px solid ${ContextBorderColor};
          width: 100%;
          height: 160px;
          border-radius: 8px;
          margin: 0 0 15px 0;
          overflow: hidden;

          video {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }

        p {
          font-size: 18px;
          text-align: center;
        }
      }
    }
  }
`;
