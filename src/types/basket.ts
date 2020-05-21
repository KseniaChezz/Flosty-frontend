export interface IBasketProduct {
    id: number;
    basketProductId: number;
    name: string;
    image: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
}

export interface IBasketProductResponse {
    id: number;
    basket_product_id: number;
    name: string;
    price: number;
    total_price: number;
    color: string;
    size: string;
    quantity: number;
    image: string;
}

export interface IDeliveryType {
    id: number;
    name: string;
}
