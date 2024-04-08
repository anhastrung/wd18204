export interface ICart {
    id?: number | string;
    user: number;
    product: {
        id?: number | string;
        title: string;
        price: number;
        thumbnail: string;
    },
    quantity: number;
}