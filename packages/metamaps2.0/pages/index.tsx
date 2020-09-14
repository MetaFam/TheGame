import React from 'react';
import { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../redux/Reducer';

import { AppContainer } from '../theme/Theme.components';
import { Metamask } from '../components/shared/Metamask';
import { IndexTitle } from '../components/index/Index.title';
import { IndexInput } from '../components/index/Index.input';
import { IndexItems } from '../components/index/Index.items';

export interface IndexProps {
  dispatch: any;
}

export const IndexComponent: FC<IndexProps> = ({ dispatch }) => {
  return(
    <AppContainer>
      <Metamask/>
      <IndexTitle/>
      <IndexInput/>
      <IndexItems/>
    </AppContainer>
  )
}

export default connect(
  (State: State) => ({

  })
)(IndexComponent);
