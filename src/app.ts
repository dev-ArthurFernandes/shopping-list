import express, { Application } from 'express'
import { changeItem, createShopListOrder, deleteItem, deleteShopList, retriveShopList, showShopList } from './logic'
import { orderContaiAllKeys, validateChangeItemKey, validateDataValues, validateId, validateShopListName } from './middlewares'

const app: Application = express()
app.use(express.json())


app.post('/purchaseList', orderContaiAllKeys, validateDataValues, createShopListOrder)
app.get('/purchaseList', showShopList)
app.get('/purchaseList/:id', validateId, retriveShopList)
app.delete('/purchaseList/:id', validateId, deleteShopList)
app.delete('/purchaseList/:id/:name', validateId, validateShopListName, deleteItem)
app.patch('/purchaseList/:id/:name', validateId, validateShopListName, validateChangeItemKey, validateDataValues,changeItem)


app.listen(3000, () => {
    console.log("Server is runnig!")
})