export interface iList{
    id: Number,
    lsitName: String,
    data: Array<iData>
}

export interface iData{
    name: String,
    quantity: String
}