export type Item = {
    name:string;
    description: string;
    img: string;
    price?: string
};

export type Monster = {
    name:string;
    description: string;
    img: string;
    health?: string
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
    value?: string
};