export type Item = {
    name:string;
    description: string;
    img: string;
    price?: number
};

export type Monster = {
    name:string;
    description: string;
    img: string;
    health?: number
};

export type Location = {
    name:string;
    description: string;
    img: string;
};

export type Treasure = {
    name:string;
    description: string;
    img: string;
    value?: number
};