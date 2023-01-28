import express, { Application } from 'express'
import { createShopListOrder, showShopList } from './logic'

const app: Application = express()
app.use(express.json())


app.post('/purchaseList', createShopListOrder)
app.get('/purchaseList', showShopList)


app.listen(3000, () => {
    console.log("Server is runnig!")
})