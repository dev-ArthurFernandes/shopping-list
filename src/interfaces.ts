export interface iShopList{
    id: number,
    lsitName: string,
    data: Array<iData>
}

export interface iData{
    name: string,
    quantity: string
}