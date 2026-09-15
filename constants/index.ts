import data from "./data-detail.json"

export const listWarehouses = data.warehouses
export const listUsers = data.users
export const listProducts = data.products
export const listSuppliers = data.suppliers
export const listPurchaseRequests = data.purchaseRequests
export const listPurchaseOrders = data.purchaseOrders
export const listGoodsReceipts = data.goodsReceipts
export const listInventoryMovements = data.inventoryMovements
export const listInventoryStocks = data.inventoryStocks

export const listStatus = [
    {value:"", label: "All Status"},
    {value:"DRAFT", label: "Draft"},
    {value:"SUBMITTED", label: "Submitted"},
    {value:"APPROVED", label: "Approved"},
    {value:"REJECTED", label: "Rejected"}
]

export const listStatusPurchaseOrders = [
    {value:"", label: "All Status"},
    {value:"DRAFT", label: "Draft"},
    {value:"ORDERED", label: "Ordered"},
    {value:"PARTIALLY_RECEIVED", label: "Partially Received"},
    {value:"RECEIVED", label: "Received"},
    {value:"CANCELLED", label: "Cancelled"}
]
