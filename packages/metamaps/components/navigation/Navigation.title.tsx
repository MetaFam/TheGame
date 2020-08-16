import { FC } from 'react';
import { connect } from 'react-redux';

import { NavigationTitleContainer } from './style/Navigation.title.style';

export interface NavigationTitleInterface {

};

export const NavigationTitleComponent: FC<NavigationTitleInterface> = ({ }) => {
    return(
        <NavigationTitleContainer>
            <div className="title-heading">
                <h2>Meta</h2>
                <img src={require('../../image/logo.png')}/>
                <h2>Maps</h2>
            </div>
        </NavigationTitleContainer>
    );
}

export const NavigationTitle = connect(
    (state: any) => ({

    })
)(NavigationTitleComponent);