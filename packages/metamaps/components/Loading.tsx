import { CircularProgress } from "@chakra-ui/core";
import { FC } from 'react';
import { connect } from 'react-redux';

import { LoadingContainer } from '../styles/Loading';

export interface LoadingInterface {
    loading: boolean;
}

export const LoadingComponent: FC<LoadingInterface> = ({ loading }) => {
    return(
        <LoadingContainer style={{ opacity: loading ? 1 : 0 }}>
            <CircularProgress isIndeterminate color="blue" size="92px" />
        </LoadingContainer>
    );
}

export const Loading = connect(
    (state: any) => ({
        loading: state.loading,
    }),
)(LoadingComponent);