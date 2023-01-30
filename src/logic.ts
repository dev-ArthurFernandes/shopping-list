import { iShopList, iShopListRequest, ShopListRequiredKeys, iData } from "./interfaces";
import { request, Request, Response } from "express";
import list from "./database";

let id: number = 1

const validateDataOrder = (payload: any): iShopListRequest => {

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
   
    try {
        const listRequest: iShopListRequest = request.body


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

    return response.status(200).json(list[indexShopList])
}

export const deleteShopList = (request: Request, response: Response): Response => {

    const id: number = parseInt(request.params.id)

    const indexShopList = list.findIndex(element => element.id === id)

    list.splice(indexShopList, 1)

    return response.status(204).send()
}

export const deleteItem = (request: Request, response: Response) => {

    const name: string = request.params.name

    const id: number = parseInt(request.params.id)

    list.map((element) => {
        if(element.id === id){
            element.data.map(item => {
                const itemIndex = element.data.findIndex(el => el.name === item.name)
                element.data.splice(itemIndex, 1)
            })
        }
    })

    return response.status(204).send()

}