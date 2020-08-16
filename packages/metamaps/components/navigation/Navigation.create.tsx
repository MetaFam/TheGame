import { FC } from 'react';
import { connect } from 'react-redux';

import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/core";
import { NavigationCreateContainer } from './style/Navigation.create.style';

import { SaveNavigation } from './dispatch/Navigation';

export interface NavigationCreateInterface {
    dispatch: any;
    ethAccounts: Array<string>;
    navigationInput: string;
    navigationItems: Array<any>;
};

export const NavigationCreateComponent: FC<NavigationCreateInterface> = ({ dispatch, ethAccounts, navigationInput, navigationItems }) => {
    return(
        <NavigationCreateContainer>
            <p>Create a new metamap</p>
            <InputGroup margin="15px" width="100%">
                <Input
                    placeholder="Name"
                    type="text"
                    value={navigationInput}
                    onChange={e => dispatch({ type: 'UPDATE_NAVIGATION_INPUT', value: e.target.value })}
                />
                <InputRightElement width="96px">
                    <Button
                        variantColor="purple"
                        size="sm"
                        fontSize="16px"
                        onClick={
                            async e => { 
                                const data = navigationItems;           
                                data.unshift({ name: navigationInput, image: '' });                   
                                dispatch(await SaveNavigation(ethAccounts[0], data));
                                dispatch({ type: 'UPDATE_NAVIGATION_INPUT', value: '' });
                            }
                        }
                        >
                        Create
                    </Button>
                </InputRightElement>
            </InputGroup>
        </NavigationCreateContainer>
    );
}

export const NavigationCreate = connect(
    (state: any) => ({
        ethAccounts: state.ethAccounts,
        navigationInput: state.navigationInput,
        navigationItems: state.navigationItems,
    })
)(NavigationCreateComponent);