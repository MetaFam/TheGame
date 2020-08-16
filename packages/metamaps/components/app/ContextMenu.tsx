import { Button, ButtonGroup } from '@chakra-ui/core';
import { FC } from 'react';
import { connect } from 'react-redux';

import { ContextMenuContainer } from '../../styles/Menu';
import { ButtonColor,WhiteColor } from '../../styles/Styles';

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

export const ContextMenuComponent: FC<MenuProps> = ({ dispatch, menu, menuType, selectedItem, menuX, menuY, urlText, popupText }) => {
    if (menuType === 'normal') {
        return(
            <ContextMenuContainer style={{ left: menuX, top: menuY, opacity: menu ? 1 : 0, pointerEvents: menu ? 'inherit': 'none' }}>
                <ButtonGroup spacing={4}>
                    <Button
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'CREATE_SQUARE' })
                        }}
                        >Square</Button>
                    <Button
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'CREATE_CIRCLE' })
                        }}
                        >Circle</Button>
                    <Button
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'CREATE_LINE' })
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
                            dispatch({ type: 'CREATE_IMAGE' });
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
                            reader.onload = (e2: any) => {
                                const img: any = document.querySelector(`img#image-${selectedItem}`);
                                img.setAttribute('src', e2.target.result);
                            }
                            reader.readAsDataURL(file);
                        }}
                    />
                </ButtonGroup>
            </ContextMenuContainer>
        )
    } if (menuType === 'SQUARE' || menuType === 'CIRCLE' || menuType === 'IMAGE') {
        return(
            <ContextMenuContainer style={{ left: menuX, top: menuY, opacity: menu ? 1 : 0, pointerEvents: menu ? 'inherit': 'none' }}>
                <ButtonGroup spacing={4}>
                    <Button
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'RESIZE_ITEM', index: selectedItem })
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
                            dispatch({ type: 'UPDATE_URL_BUTTON', index: selectedItem })
                        }}
                        >Add URL</Button>
                    <Button
                        data-type="no-left-click"
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'UPDATE_POPUP_BUTTON', index: selectedItem })
                        }}
                        >Add Popup</Button>
                    <Button
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'DELETE_ITEM', index: selectedItem })
                        }}
                        >Delete</Button>
                </ButtonGroup>
            </ContextMenuContainer>
        )
    } if (menuType === 'LINE') {
        return(
            <ContextMenuContainer style={{ left: menuX, top: menuY, opacity: menu ? 1 : 0, pointerEvents: menu ? 'inherit': 'none' }}>
                <ButtonGroup spacing={4}>
                    <Button
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'DELETE_ITEM', index: selectedItem })
                        }}
                        >Delete</Button>
                </ButtonGroup>
            </ContextMenuContainer>
        )
    } if (menuType === 'url') {
        return(
            <ContextMenuContainer style={{ left: menuX, top: menuY, opacity: menu ? 1 : 0, pointerEvents: menu ? 'inherit': 'none' }} data-type="no-left-click">
                <input
                    data-type="no-left-click"
                    type="text"
                    placeholder="URL"
                    value={urlText}
                    onChange={e => dispatch({ type: 'UPDATE_URL_TEXT', value: e.target.value })}
                />
                <ButtonGroup spacing={4}>
                    <Button
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'UPDATE_URL', index: selectedItem })
                        }}
                        >Update URL</Button>
                </ButtonGroup>
            </ContextMenuContainer>
        )
    } if (menuType === 'popup') {
        return(
            <ContextMenuContainer
                className="textarea"
                style={{ left: menuX, top: menuY, opacity: menu ? 1 : 0, pointerEvents: menu ? 'inherit': 'none' }}
                data-type="no-left-click">
                <textarea
                    data-type="no-left-click"
                    placeholder="Popup Text"
                    value={popupText}
                    onChange={e => dispatch({ type: 'UPDATE_POPUP_TEXT', value: e.target.value })}
                />
                <ButtonGroup spacing={4}>
                    <Button
                        size="sm"
                        leftIcon="plus-square"
                        backgroundColor={ButtonColor}
                        color={WhiteColor}
                        onClick={(e: any) => {
                            dispatch({ type: 'UPDATE_POPUP', index: selectedItem })
                        }}
                        >Update Popup</Button>
                </ButtonGroup>
            </ContextMenuContainer>
        )
    } 
    return(<div/>)
}

export const ContextMenu = connect(
(state: any) => ({
    menu: state.menu,
    menuType: state.menuType,
    selectedItem: state.selectedItem,
    menuX: state.menuX,
    menuY: state.menuY,
    urlText: state.urlText,
    popupText: state.popupText,
})
)(ContextMenuComponent);