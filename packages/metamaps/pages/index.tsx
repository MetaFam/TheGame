import { FC } from 'react';
import { connect } from 'react-redux';

import { Metamask } from '../components/shared/Metamask';
import { NavigationContainer } from '../components/navigation/style/Navigation.style';
import { NavigationTitle } from '../components/navigation/Navigation.title';
import { NavigationItems } from '../components/navigation/Navigation.items';
import { NavigationCreate } from '../components/navigation/Navigation.create';

export interface IndexProps {
  dispatch: any;
}

export const IndexComponent: FC<IndexProps> = ({ dispatch }) => {
  return(
    <NavigationContainer>
      <Metamask/>
      <NavigationTitle/>
      <NavigationCreate/>
      <NavigationItems/>
    </NavigationContainer>
  )
}

export default connect(
  (state: any) => ({

  })
)(IndexComponent);
