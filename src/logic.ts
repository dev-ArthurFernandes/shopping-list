import { iShopList, iShopListRequest, ShopListRequiredKeys, iData } from "./interfaces";
import { Request, Response } from "express";
import list from "./database";

let id: number = 1

const validateDataOrder = (payload: any): iShopListRequest => {

    const keys: Array<string> = Object.keys(payload)
    
    const requiredKeys: Array<ShopListRequiredKeys> = ["listName", "data"] 

    const containAllKeys: boolean = requiredKeys.every((key: string) => {
        return keys.includes(key)
    })

    if(!containAllKeys){
        throw new Error(`Required keys are: ${requiredKeys}`)
    }

    if(payload.listName === '' || payload.listName === undefined){
        throw new Error("List name is required")
    }

    const validateListName = isNaN(payload.listName)

    const validateData: boolean = Array.isArray(payload.data)

    if(!validateData){
        throw new Error("Data must be an Array")
    }

    if(!validateListName){
        throw new Error("List name must be an string")
    }
    
    return payload
}

export const createShopListOrder = (request: Request, response: Response): Response => {
    console.log(request.body)
    try {
        const listRequest: iShopListRequest = validateDataOrder(request.body)


        const shopList: iShopList = {
            id: id,
            ...listRequest
        }

        id += 1

        list.push(shopList)

        return response.status(201).json(shopList)
    } catch (error) {
        if(error instanceof Error){
            return response.status(400).json({
                message: error.message
            })
        }
        console.log(error)
        return response.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const showShopList = (request: Request, response: Response): Response => {
    return response.status(200).json(list)
}

export const retriveShopList = (request: Request, response: Response): Response => {

    const id: number = parseInt(request.params.id)

    const indexShopList = list.findIndex(element => element.id === id)
    console.log(indexShopList)

    if(indexShopList === -1){
        return response.status(404).json({
            message: "Id don't exist"
        })
    }

    return response.status(200).json(list[indexShopList])
}