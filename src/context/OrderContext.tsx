import { StatusOrder, useOrderLazyQuery, useOrderQuery } from "@/gql/graphql";
import { useSearchParams } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  orderId?: number;
  items?: any[];
  setItems?: (x: any[]) => void;
  refetch?: any;
  status?: any
}

const OrderContext = React.createContext<Props>({})

export function useOrderContext() {
  return React.useContext(OrderContext);
}

export function ProviderOrderContext({ children }: PropsWithChildren<unknown>) {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [carts, setCarts] = useState<any[]>([]);
  const [id, setId] = useState(0);
  const { data, refetch } = useOrderQuery({
    fetchPolicy: 'no-cache',
    skip: !isNaN(Number(params.get('token'))),
    variables: {
      token: params.get('token')
    },
    onCompleted: (data) => {
      setId(data?.order?.id || 0)
      const cartItems = (data?.order?.items || []).map(x => {
        return {
          orderItemid: x?.id,
          ...x?.product,
          addon_value: x?.addons?.split(','),
          sku: [x?.sku],
          sku_id: x?.sku?.id,
          qty: x?.qty,
          remark: x?.remark
        }
      })

      // setCarts(cartItems)
    }
  });

  useEffect(() => {
    if (params.get('token')) {
      setLoading(true);
      const local: any = localStorage.getItem(params.get('token') || '');
      setCarts(JSON.parse(local))
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [params])

  console.log(carts)

  return (
    <OrderContext.Provider value={{
      items: data ? (data?.order?.items || []).map(x => {
        return {
          orderItemid: x?.id,
          ...x?.product,
          status: x?.status,
          addon_value: x?.addons?.split(','),
          sku: [x?.sku],
          sku_id: x?.sku?.id,
          qty: x?.qty,
          remark: x?.remark,
        }
      }) : carts, setItems: setCarts, orderId: id, refetch: refetch, status: data ? data.order?.status : undefined
    }}>
      {children}
    </OrderContext.Provider>
  )
}