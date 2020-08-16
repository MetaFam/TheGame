export interface Square {
    type: string;
    left: number;
    top: number;
    width: number;
    height: number;
    url: string;
    popup: string;
}

export interface Circle {
    type: string;
    left: number;
    top: number;
    width: number;
    height: number;
    url: string;
    popup: string;
}

export interface Line {
    type: string;
    left: number;
    top: number;
    width: number;
    height: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface Image {
    type: string;
    left: number;
    top: number;
    width: number;
    height: number;
    url: string;
    popup: string;
}