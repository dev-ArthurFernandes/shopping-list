import express, { Application } from 'express'
import { createShopListOrder, retriveShopList, showShopList } from './logic'

const app: Application = express()
app.use(express.json())


app.post('/purchaseList', createShopListOrder)
app.get('/purchaseList', showShopList)
app.get('/purchaseList/:id', retriveShopList)


app.listen(3000, () => {
    console.log("Server is runnig!")
})