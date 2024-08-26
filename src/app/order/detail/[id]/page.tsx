import { OrderDetailScreen } from "@/screen/order/detail/OrderDetailScreen";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetailScreen id={Number(params.id)} />
}