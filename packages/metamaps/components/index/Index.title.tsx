import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IndexTitleContainer } from './styles/Index.title.styles';

export interface IndexTitleProps {
  dispatch: Dispatch;
}

export const IndexTitleComponent: FC<IndexTitleProps> = ({ dispatch }) => {
  return (
    <IndexTitleContainer>
      <div className="title">
        <img src="/image/logo.png" alt="metamaps-logo" />
        <h1>MetaMaps</h1>
      </div>
      <div className="subtitle">
        <h2>A fun, interactive and engaging way to create diagrams and maps</h2>
      </div>
    </IndexTitleContainer>
  );
};

export const IndexTitle = connect()(IndexTitleComponent);
