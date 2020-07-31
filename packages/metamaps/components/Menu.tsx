import { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from '@chakra-ui/core';

import { MenuContainer } from '../styles/Menu';
import { WhiteColor, ButtonColor } from '../styles/Styles';

export interface MenuProps {
    dispatch: any;
    menu: boolean;
    menuType: string;
    selectedItem: number;
    menuX: number;
    menuY: number;
    urlText: string;
    popupText: string;
};

export class MenuComponent extends Component<MenuProps> {
    public render() {
        if (this.props.menuType === 'normal') {
            return(
                <MenuContainer style={{ left: this.props.menuX, top: this.props.menuY, opacity: this.props.menu ? 1 : 0 }}>
                    <ButtonGroup spacing={4}>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'CREATE_SQUARE' })
                            }}
                            >Square</Button>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'CREATE_CIRCLE' })
                            }}
                            >Circle</Button>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'CREATE_LINE' })
                            }}
                            >Line</Button>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                const el: any = document.querySelector('input#file-input');
                                el.click();
                                this.props.dispatch({ type: 'CREATE_IMAGE' });
                            }}
                            >Image</Button>

                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={(e: any) => {
                                const el: any = document.querySelector('input#file-input');
                                const file = el.files[0];
                                const reader = new FileReader();
                                reader.onload = (e: any) => {
                                    console.log(this.props.selectedItem);
                                    const img: any = document.querySelector(`img#image-${this.props.selectedItem}`);
                                    img.setAttribute('src', e.target.result);
                                }
                                reader.readAsDataURL(file);
                            }}
                        />
                    </ButtonGroup>
                </MenuContainer>
            )
        } else if (this.props.menuType === 'SQUARE' || this.props.menuType === 'CIRCLE' || this.props.menuType === 'IMAGE') {
            return(
                <MenuContainer style={{ left: this.props.menuX, top: this.props.menuY, opacity: this.props.menu ? 1 : 0 }}>
                    <ButtonGroup spacing={4}>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'RESIZE_ITEM', index: this.props.selectedItem })
                            }}
                            >Resize</Button>
                        <Button
                            data-type="no-left-click"
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                e.preventDefault();
                                this.props.dispatch({ type: 'UPDATE_URL_BUTTON', index: this.props.selectedItem })
                            }}
                            >Add URL</Button>
                        <Button
                            data-type="no-left-click"
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'UPDATE_POPUP_BUTTON', index: this.props.selectedItem })
                            }}
                            >Add Popup</Button>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'DELETE_ITEM', index: this.props.selectedItem })
                            }}
                            >Delete</Button>
                    </ButtonGroup>
                </MenuContainer>
            )
        } else if (this.props.menuType === 'LINE') {
            return(
                <MenuContainer style={{ left: this.props.menuX, top: this.props.menuY, opacity: this.props.menu ? 1 : 0 }}>
                    <ButtonGroup spacing={4}>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'DELETE_ITEM', index: this.props.selectedItem })
                            }}
                            >Delete</Button>
                    </ButtonGroup>
                </MenuContainer>
            )
        } else if (this.props.menuType === 'url') {
            return(
                <MenuContainer style={{ left: this.props.menuX, top: this.props.menuY, opacity: this.props.menu ? 1 : 0 }} data-type="no-left-click">
                    <input
                        data-type="no-left-click"
                        type="text"
                        placeholder="URL"
                        value={this.props.urlText}
                        onChange={e => this.props.dispatch({ type: 'UPDATE_URL_TEXT', value: e.target.value })}
                    />
                    <ButtonGroup spacing={4}>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'UPDATE_URL', index: this.props.selectedItem })
                            }}
                            >Update URL</Button>
                    </ButtonGroup>
                </MenuContainer>
            )
        } else if (this.props.menuType === 'popup') {
            return(
                <MenuContainer
                    className="textarea"
                    style={{ left: this.props.menuX, top: this.props.menuY, opacity: this.props.menu ? 1 : 0 }}
                    data-type="no-left-click">
                    <textarea
                        data-type="no-left-click"
                        placeholder="Popup Text"
                        value={this.props.popupText}
                        onChange={e => this.props.dispatch({ type: 'UPDATE_POPUP_TEXT', value: e.target.value })}
                    />
                    <ButtonGroup spacing={4}>
                        <Button
                            size="sm"
                            leftIcon="plus-square"
                            backgroundColor={ButtonColor}
                            color={WhiteColor}
                            onClick={(e: any) => {
                                this.props.dispatch({ type: 'UPDATE_POPUP', index: this.props.selectedItem })
                            }}
                            >Update Popup</Button>
                    </ButtonGroup>
                </MenuContainer>
            )
        } else {
            return(<div/>)
        }
    }
}

export const Menu = connect(
(state: any) => ({
    menu: state.menu,
    menuType: state.menuType,
    selectedItem: state.selectedItem,
    menuX: state.menuX,
    menuY: state.menuY,
    urlText: state.urlText,
    popupText: state.popupText,
})
)(MenuComponent);