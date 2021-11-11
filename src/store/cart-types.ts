export type Item = {
    _id: string;
    title: string;
    quantity: number;
    description: string;
    img: string;
    price: number;
    _ownerId: string;
}

export type CartSliceState = {
    items: Item[];
    totalPrice: number;
    totalQuantity: number;
}
