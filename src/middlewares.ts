import { NextFunction, request, Request, Response } from "express";
import list from "./database";
import { iShopList, ShopListRequiredKeys } from "./interfaces";



export const orderContaiAllKeys = (request: Request, response: Response, next: NextFunction): Response | void => {

    const keys: Array<string> = Object.keys(request.body)
    
    const requiredKeys: Array<ShopListRequiredKeys> = ["listName", "data"]

    const containAllKeys: boolean = requiredKeys.every((key: string) => {
        return keys.includes(key)
    })

    if(!containAllKeys){
        return response.status(400).json({
            message: `These keys are required: ${requiredKeys}`
        })
    }

    return next()
}

export const validateId = (request: Request, response: Response, next: NextFunction): Response | void => {

    const id = parseInt(request.params.id)

    const IDIsTrue: boolean = list.every((item: iShopList ) => {
        return item.id === id
    })

    if(!IDIsTrue){
        return response.status(404).json({
            message: "Id don`t exist"
        })
    }

    return next()
}

export const validateName = (request: Request, response: Response, next: NextFunction): Response | void => {
    
    const name: string = request.params.name

    const id: number = parseInt(request.params.id)

    list.map((element: any) => {
        if(element.id === id){
            element.data.map((item: any )=> {
                const itemExist = item.name.toLowerCase() === name.toLowerCase()
                if(itemExist){
                    return next()
                }
            })
        }
    })

    return response.status(404).json({
        message: "Name not found"
    })
}

