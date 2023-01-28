import { iShopList, iShopListRequest, ShopListRequiredKeys } from "./interfaces";
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

    const  validateKeyType: boolean = requiredKeys.every((key: any) => {
        return isNaN(key)
    })

    if(!validateKeyType){
        throw new Error("All keys must be a string")
    }

    if(payload.listName === ''){
        throw new Error("List name is required")
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