import { NextFunction, Request, Response } from "express";
import { dataRequiredKeys, ShopListRequiredKeys } from "./interfaces";



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

export const dataContaiAllKeys = (request: Request, response: Response, next: NextFunction): Response | void => {

    const requiredKeys: Array<dataRequiredKeys> = ["name", "quantity"]

    

    return next()
}