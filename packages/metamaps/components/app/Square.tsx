import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { connect } from 'react-redux';

import { SquareContainer } from '../../styles/Mapping';

export interface SquareProps {
    dispatch: any;
    id: number;
    type: string;
    left: number;
    top: number;
    width: number;
    height: number;

    selectedItem: number;
    resizingItem: boolean;

    mouseX: number;
    mouseY: number;

    url: string;
    popup: string;
}

export const SquareComponent: FC<SquareProps> = ({
    dispatch,

    id,
    type,
    left,
    top,
    width,
    height,

    selectedItem,
    resizingItem,
    mouseX,
    mouseY,

    url,
    popup,
}) => {
    const [, drag] = useDrag({
        item: { id, type, left, top }
    })

    if (selectedItem === id && resizingItem) {
        let rleft; let rtop; let rwidth; let rheight;

        if (mouseX > left) {
            rleft = left;
            rwidth = mouseX - left + 5;
        } else {
            rleft = mouseX - 5;
            rwidth = left - mouseX + 5;
        }

        if (mouseY > top) {
            rtop = top;
            rheight = mouseY - top + 5;
        } else {
            rtop = mouseY - 5;
            rheight = top - mouseY + 5;
        }

        dispatch({ type: 'UPDATE_VECTOR', rleft, rtop, rwidth, rheight });

        return(
            <SquareContainer
                ref={drag}
                style={{ left: rleft, top: rtop, width: rwidth, height: rheight }}
                data-id={id}
                data-type={type}
                onClick={(e: any) => dispatch({ type: 'RESIZE_ITEM_UPDATE' })}
            />
        )
    } if (url) {
        return (
            <a href={url}>
                <SquareContainer
                    ref={drag}
                    style={{ left, top, width, height }}
                    data-id={id}
                    data-type={type}
                />
            </a>
        )
    } 
        return (
            <SquareContainer
                ref={drag}
                style={{ left, top, width, height }}
                data-id={id}
                data-type={type}
                data-popup={popup}
                onClick={(e: any) => dispatch({ type: 'OPEN_POPUP', popup })}
            />
        )
    
}

export const Square = connect(
    (state: any) => ({
        selectedItem: state.selectedItem,
        resizingItem: state.resizingItem,

        mouseX: state.mouseX,
        mouseY: state.mouseY,
    })
)(SquareComponent);