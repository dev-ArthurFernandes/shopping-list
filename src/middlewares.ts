<<<<<<< HEAD
import { NextFunction, Request, Response } from "express";
import { dataRequiredKeys, ShopListRequiredKeys } from "./interfaces";
=======
import { NextFunction, request, Request, response, Response } from "express";
import list from "./database";
import { dataRequiredKeys, iShopList, ShopListRequiredKeys } from "./interfaces";
>>>>>>> 43d8faf928ce3b9c397ac4d7239876ec308cf492



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

<<<<<<< HEAD
export const dataContaiAllKeys = (request: Request, response: Response, next: NextFunction): Response | void => {

    const requiredKeys: Array<dataRequiredKeys> = ["name", "quantity"]

    

    return next()
=======
export const validateId = (request: Request, response: Response, next: NextFunction): Response | void => {

    const id = parseInt(request.params.id)

    const IDIsTrue: boolean = list.every((item: iShopList ) => {
        return item.id === id
    })

    if(!IDIsTrue){
        return response.status(404).json({
            message: "List not found"
        })
    }

    return next()
}

export const validateShopListName = (request: Request, response: Response, next: NextFunction): Response | void => {
    
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

export const validateDataKeys = (request: Request, response: Response, next: NextFunction):Response | void => {

    const keys: Array<string> = Object.keys(request.body)
    
    const requiredKeys: Array<dataRequiredKeys> = ["name", "quantity"]

    const containAllKeys: boolean = requiredKeys.every((key: string) => {
        return keys.includes(key)
    })

    console.log(containAllKeys)

    if(!containAllKeys){
        return response.status(400).json({
            message: `These keys are required: ${requiredKeys}`
        })
    }

    return next()
}

export const validateChangeItemKey = (request: Request, response: Response, next: NextFunction): Response | void => {

    const keys: Array<string> = Object.keys(request.body)

    console.log(Object.keys(request.body))
    
    const requiredKeys: Array<dataRequiredKeys> = ["name", "quantity"]

    console.log(keys)

    const allKeysIsTrue: Array<boolean> = requiredKeys.map((key: string) => {
        return keys.includes(key)
    })

    if(keys.length === 2){
        if(allKeysIsTrue[0] && !allKeysIsTrue[1]){
            return response.status(400).json({
                message: "These keys are required: name or quantity"
            })
        }else if(!allKeysIsTrue[0] && allKeysIsTrue[1]){
            return response.status(400).json({
                message: "These keys are required: name or quantity"
            })
        }else if(!allKeysIsTrue[0] && !allKeysIsTrue[1]){
            return response.status(400).json({
                message: "These keys are required: name or quantity"
            })
        }
    }else if(keys.length === 1){
        if(!allKeysIsTrue[0]){
            return response.status(400).json({
                message: "These keys are required: name or quantity"
            })
        }
    }else if(keys.length > 2){
        return response.status(400).json({
            message: "These keys are required: name or quantity"
        })
    }
    return next()
>>>>>>> 43d8faf928ce3b9c397ac4d7239876ec308cf492
}