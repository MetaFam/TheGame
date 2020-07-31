import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { connect } from 'react-redux';

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
        let rleft: number; let rtop: number; let rwidth: number; let rheight: number;

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
        
        const X1 = x1;
        const X2 = rwidth;
        let Y1 = y1;
        let Y2 = rheight;

        if (mouseX > menuX && mouseY < menuY) {
            Y1 = rheight;
            Y2 = 0;
        }

        if (mouseX < menuX && mouseY > menuY) {
            Y1 = rheight;
            Y2 = 0;
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
                    x1: X1,
                    x2: X2,
                    y1: Y1,
                    y2: Y2,
                })}
            >
                <polyline
                    points={`${X1},${Y1} ${X2},${Y2}`}
                    style={{ fill: 'none', stroke: LineColor, strokeWidth: 5 }}
                />
            </LineContainer>
        )
    }

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

export const Line = connect(
    (state: any) => ({
        createLine: state.createLine,
        menuX: state.menuX,
        menuY: state.menuY,
        mouseX: state.mouseX,
        mouseY: state.mouseY,
    })
)(LineComponent);