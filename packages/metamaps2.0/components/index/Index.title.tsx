import React from 'react';
import { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/Reducer';

import { IndexTitleContainer } from './style/Index.title.style';

export interface IndexTitleProps {
    dispatch: any;
};

export const IndexTitleComponent: FC<IndexTitleProps> = ({ dispatch }) => {
    return(
        <IndexTitleContainer>
            <img src={require('../../image/logo.png')}/>
            <h1>Meta Maps</h1>
        </IndexTitleContainer>
    );
}

export const IndexTitle = connect(
    (State: State) => ({

    })
)(IndexTitleComponent);