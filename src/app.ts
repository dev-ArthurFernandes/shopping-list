import express, { Application } from 'express'
import { createShopListOrder, deleteItem, deleteShopList, retriveShopList, showShopList } from './logic'
import { orderContaiAllKeys, validateId, validateName } from './middlewares'

const app: Application = express()
app.use(express.json())


app.post('/purchaseList', orderContaiAllKeys, createShopListOrder)
app.get('/purchaseList', showShopList)
app.get('/purchaseList/:id', validateId, retriveShopList)
app.delete('/purchaseList/:id', validateId, deleteShopList)
app.delete('/purchaseList/:id/:name', validateId, validateName, deleteItem)


app.listen(3000, () => {
    console.log("Server is runnig!")
})