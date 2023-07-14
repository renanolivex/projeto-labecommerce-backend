
export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string,
}

export type TProducts ={
    id:string,
    name: string,
    price: number,
    description: string,
    image_url: string,
}

export interface TPurchase{
    id:string,
    buyer:string,
    total_price:number,
    created_at:string
}
export interface TPurchaseProducts{
    product_id: any,
    purchase_id:any,
    quantity:number,
}


 
 export type TFinalPurchase ={
    purchaseId: string,
    buyerId: string,
    buyerName:string,
    buyerEmail:string,
    totalPrice: number,
    createdAt: string,
    products:Array<{
        id:string,
        name:string,
        price:number,
        description:string,
        imageUrl:string,
        quantity:number,
    }>
} 