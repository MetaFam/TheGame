import { FC } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';

import { ImageContainer } from '../styles/Mapping';

export interface ImageProps {
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

export const ImageComponent: FC<ImageProps> = ({
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

        return(
            <ImageContainer
                ref={drag}
                style={{ left: rleft, top: rtop, width: rwidth, height: rheight }}
                data-id={id}
                data-type={type}
                onClick={(e: any) => dispatch({ type: 'RESIZE_ITEM_UPDATE' })}
            >
                <img id={`image-${id}`}/>
            </ImageContainer>
        )
    } else if (url) {
        return (
            <a href={url}>
                <ImageContainer
                    ref={drag}
                    style={{ left, top, width, height }}
                    data-id={id}
                    data-type={type}
                >
                    <img id={`image-${id}`}/>
                </ImageContainer>
            </a>
        )
    } else {
        return (
            <ImageContainer
                ref={drag}
                style={{ left, top, width, height }}
                data-id={id}
                data-type={type}
            >
                <img id={`image-${id}`}/>
            </ImageContainer>
        )
    }
}

export const Image = connect(
    (state: any) => ({
        selectedItem: state.selectedItem,
        resizingItem: state.resizingItem,

        mouseX: state.mouseX,
        mouseY: state.mouseY,
    })
)(ImageComponent);