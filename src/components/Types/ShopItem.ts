export type RatingType = {
    userId: string,
    rate: number
}

export type ShopItemType = {
    name: string,
    _id: string,
    description: string,
    price: number,
    image: [string],
    category: string,
    availability: boolean,
    cod: number,
    rating: RatingType[]
}