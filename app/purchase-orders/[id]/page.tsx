import { PurchaseOrderDetail } from "@/features/purchase-orders/detail/PurchaseOrderDetail";

type PurchaseOrderDetaislPageProps = {
  params: Promise<{
    id: string
  }>
}

const PurchaseOrdersDetailPage = async ({ params }: PurchaseOrderDetaislPageProps) => {
  const { id } = await params;

  return (
    <div>
      <PurchaseOrderDetail
        id={Number(id)}
      />
    </div>
  )
}

export default PurchaseOrdersDetailPage