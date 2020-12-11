import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IndexCreate } from '../components/index/Index.create';
import { IndexItems } from '../components/index/Index.items';
import { IndexTitle } from '../components/index/Index.title';
import { Metamask } from '../components/shared/Metamask';
import { State } from '../redux/Reducer.state';
import { AppContainer } from '../theme/Theme.components';

export interface IndexProps {
  dispatch: Dispatch;
}

export const IndexComponent: FC<IndexProps> = ({ dispatch }) => {
  return (
    <AppContainer>
      <Metamask />
      <IndexTitle />
      <IndexCreate />
      <IndexItems />
    </AppContainer>
  );
};

export default connect((state: State) => ({}))(IndexComponent);
