
export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string,
}

export type TProducts ={
    id:string,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
}

export interface TPurchase{
    id:string,
    buyer:string,
    total_price:number
}


 
 export interface TFinalPurchase {
    purchaseId: string
    buyerId: string
    buyerName:string
    buyerEmail:string
    totalPrice: number
    createdAt: string
    products:Array<{
        id:string
        name:string
        price:number
        description:string
        imageUrl:string
        quantity:number
    }>
} 