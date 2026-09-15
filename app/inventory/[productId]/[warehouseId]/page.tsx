import { InventoryMovementsDetail } from "@/features/inventory/detail/InventoryMovementsDetail"

type InventoryMovementsProps = {
  params: Promise<{
    productId: string
    warehouseId: string
  }>
}

const InventoryMovements = async ({ params }: InventoryMovementsProps) => {
  const { productId, warehouseId } = await params;

  return (
    <div>
      <InventoryMovementsDetail
        productId={Number(productId)}
        warehouseId={Number(warehouseId)}
      />
    </div>
  )
}

export default InventoryMovements