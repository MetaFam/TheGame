import { FC } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';

import { LineContainer } from '../styles/Mapping';
import { LineColor } from '../styles/Styles';

export interface LineProps {
    dispatch: any;
    id: number;
    type: string;

    left: number;
    top: number;
    width: number;
    height: number;

    x1: number;
    y1: number;
    x2: number;
    y2: number;

    createLine: boolean;
    menuX: number;
    menuY: number;
    mouseX: number;
    mouseY: number;
}

export const LineComponent: FC<LineProps> = ({ dispatch, menuX, menuY, mouseX, mouseY, createLine, id, type, left, top, width, height, x1, y1, x2, y2 }) => {
    const [, drag] = useDrag({ item: { id, type, left, top } })

    if (createLine) {
        let rleft: number, rtop: number, rwidth: number, rheight: number;

        if (mouseX > menuX) {
            rleft = menuX;
            rwidth = mouseX - menuX + 5;
        } else {
            rleft = mouseX - 5;
            rwidth = menuX - mouseX + 5;
        }

        if (mouseY > menuY) {
            rtop = menuY;
            rheight = mouseY - menuY + 5;
        } else {
            rtop = mouseY - 5;
            rheight = menuY - mouseY + 5;
        }

        let x1: number = 0;
        let y1: number = 0;
        let x2: number = rwidth;
        let y2: number = rheight;

        if (mouseX > menuX && mouseY < menuY) {
            y1 = rheight;
            y2 = 0;
        }

        if (mouseX < menuX && mouseY > menuY) {
            y1 = rheight;
            y2 = 0;
        }

        return(
            <LineContainer
                ref={drag}
                style={{ left: rleft, top: rtop, width: rwidth, height: rheight }}
                data-id={id}
                data-type={type}
                onClick={(e: any) => dispatch({
                    type: 'DRAW_LINE',
                    index: id,
                    rleft,
                    rtop,
                    rwidth,
                    rheight,
                    x1,
                    x2,
                    y1,
                    y2,
                })}
            >
                <polyline
                    points={`${x1},${y1} ${x2},${y2}`}
                    style={{ fill: 'none', stroke: LineColor, strokeWidth: 5 }}
                />
            </LineContainer>
        )
    } else {
        return (
            <LineContainer
                ref={drag}
                style={{ left, top, width, height }}
                data-id={id}
                data-type={type}
            >
                <polyline
                    points={`${x1},${y1} ${x2},${y2}`}
                    style={{ fill: 'none', stroke: LineColor, strokeWidth: 5 }}
                />
            </LineContainer>
        )
    }
}

export const Line = connect(
    (state: any) => ({
        createLine: state.createLine,
        menuX: state.menuX,
        menuY: state.menuY,
        mouseX: state.mouseX,
        mouseY: state.mouseY,
    })
)(LineComponent);