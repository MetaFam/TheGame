import styled from 'styled-components';

import { BackgroundColor } from '../../../theme/Theme.colors';

export const IndexItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 968px;
  min-height: 180px;
  margin: auto;
  padding: 15px;

  h3 {
    font-size: 24px;
  }

  div.map {
    display: flex;
    align-items: center;
    background: ${BackgroundColor};
    border-radius: 5px;
    width: 100%;
    padding: 15px;
    margin: 15px 0;
    cursor: pointer;

    img {
      height: 64px;
      margin: 0 15px 0 0;
    }

    div.text {
      h4 {
        font-size: 24px;
        font-weight: bold;
        padding: 0 0 5px 0;
      }
      p {
        font-size: 16px;
      }
    }
  }
`;
