import Link from 'next/link';
import { Button,ButtonGroup } from '@chakra-ui/core';
import { FC } from 'react';
import { connect } from 'react-redux';

import { Load3BoxUrl, Save3BoxUrl } from '../../redux/ThreeBox';

import { ButtonColor, WhiteColor } from '../../styles/Styles';
import { MenuContainer } from '../../styles/Menu';

export interface MenuProps {
    dispatch: any;
    ethAccounts: Array<string>;
    activeSpace: string;
    items: Array<any>;
}

export const MenuComponent: FC<MenuProps> = ({
    dispatch,
    ethAccounts,
    activeSpace,
    items,
}) => {
    return(
        <MenuContainer>
            <div className="title">
                <div className="title-image">
                    <img src={require('../../image/logo.png')}/>
                </div>
                <h3>{activeSpace}</h3>
            </div>
            <ButtonGroup position="fixed" top="30px" right="15px">
                <Button
                    size="sm"
                    variantColor="red"
                    width="90px"
                >
                        Delete
                </Button>
                <Button
                    size="sm"
                    variantColor="green"
                    width="90px"
                    onClick={async e => dispatch(await Save3BoxUrl(ethAccounts[0], activeSpace, items))}>
                        Save
                </Button>
                <Link href="/">
                    <Button
                        size="sm"
                        variantColor="purple"
                        width="90px">
                            Home
                    </Button>
                </Link>
            </ButtonGroup>
        </MenuContainer>
    );
}

export const Menu = connect(
    (state: any) => ({
        ethAccounts: state.ethAccounts,
        activeSpace: state.activeSpace,
        items: state.items,
    })
)(MenuComponent);