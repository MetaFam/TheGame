import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../redux/Reducer.state';

import { AppContainer } from '../theme/Theme.components';
import { Metamask } from '../components/shared/Metamask';
import { IndexTitle } from '../components/index/Index.title';
import { IndexCreate } from '../components/index/Index.create';

export interface IndexProps {
  dispatch: Dispatch;
}

export const IndexComponent: FC<IndexProps> = ({ dispatch }) => {
  return (
    <AppContainer>
      <Metamask/>
      <IndexTitle/>
      <IndexCreate/>
    </AppContainer>
  )
}

export default connect(
  (state: State) => ({

  })
)(IndexComponent);