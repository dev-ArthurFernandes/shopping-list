interface iShopListRequest{
    listname: string,
    data: Array<iData> | Array<never>
}

interface iShopList extends iShopListRequest{
    id: number,
}

interface iData{
    name: string,
    quantity: string
}

type ShopListRequiredKeys = "listName" | "data"

export {iShopListRequest, iShopList, iData, ShopListRequiredKeys}