import productList, { CardAndSite, order } from '@/interface/productList'
import React from 'react'


interface Card {
    value: string;
    image: Buffer;
}

interface Site {
    image: Buffer;
}

interface Product {
    _id: string;
    image: Buffer;
    cards: Card[];
    site: Site;
    [key: string]: any
    // Add other fields as needed
}


const bufferToString = (products: productList[] | productList) => {
    const processProduct = (product: productList) => ({
        ...product,
        image: product.image ? product.image.toString('base64') : null,
        cards: product.cards.map((card: CardAndSite) => ({
            ...card,
            image: card.image ? card.image.toString('base64') : null
        })),
        site: product.image ? {
            ...product.site,
            image: product.site.image ? product.site.image.toString('base64') : null
        } : null
    });

    if (Array.isArray(products)) {
        return products.map(processProduct);
    } else {
        return processProduct(products);
    }
}

export default bufferToString;

export const bufferToStringOrders = (orders: order[] | order) => {
    const processProduct = (order: order) => ({
        ...order,
        product: {
            ...order.product,
            image: order.product.image ? (order.product.image as Buffer).toString('base64') : null,
            cards: order.product.cards.map((card: CardAndSite) => ({
                ...card,
                image: card.image ? (card.image as Buffer).toString('base64') : null
            })),
            site: order.product.site ? {
                ...order.product.site,
                image: order.product.site.image ? (order.product.site.image as Buffer).toString('base64') : null
            } : null
        }
    });

    if (Array.isArray(orders)) {
        return orders.map(processProduct);
    } else {
        return processProduct(orders);
    }
}



