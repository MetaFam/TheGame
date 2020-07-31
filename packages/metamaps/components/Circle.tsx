import { FC } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';

import { CircleContainer } from '../styles/Mapping';

export interface CircleProps {
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

export const CircleComponent: FC<CircleProps> = ({
    dispatch,
    selectedItem,
    resizingItem,
    mouseX,
    mouseY,
    id,
    type,
    left,
    top,
    width,
    height,

    url,
    popup,
}) => {
    const [, drag] = useDrag({
        item: { id, type, left, top }
    })

    if (selectedItem === id && resizingItem) {
        let rleft, rtop, rwidth, rheight;

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

        return (
            <CircleContainer
                ref={drag}
                style={{ left: rleft, top: rtop, width: rwidth, height: rheight }}
                data-id={id}
                data-type={type}
                onClick={(e: any) => dispatch({ type: 'RESIZE_ITEM_UPDATE' })}
            >
                <div className="circle"></div>
            </CircleContainer>
        )
    } else if (url) {
        return(
            <a href={url}>
                <CircleContainer
                    ref={drag}
                    style={{ left, top, width, height }}
                    data-id={id}
                    data-type={type}
                >
                    <div className="circle"></div>
                </CircleContainer>
            </a>
        )
    } else {
        return (
            <CircleContainer
                ref={drag}
                style={{ left, top, width, height }}
                data-id={id}
                data-type={type}
                data-popup={popup}
                onClick={(e: any) => dispatch({ type: 'OPEN_POPUP', popup })}
            >
                <div className="circle"></div>
            </CircleContainer>
        )
    }
}

export const Circle = connect(
    (state: any) => ({
        selectedItem: state.selectedItem,
        resizingItem: state.resizingItem,

        mouseX: state.mouseX,
        mouseY: state.mouseY,
    })
)(CircleComponent);