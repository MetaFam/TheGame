import styled from 'styled-components';

import {} from '../../../theme/Theme.colors';

export const IndexTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 420px;

  div.title {
    display: flex;
    align-items: center;
    padding: 30px 0;

    img {
      height: 64px;
    }

    h1 {
      font-size: 32px;
      margin: 0 15px;
      font-weight: bold;
    }
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
  }
`;
