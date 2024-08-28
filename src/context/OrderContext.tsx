import { StatusOrder, useOrderLazyQuery, useOrderQuery, useOrderSubscriptSubscription } from "@/gql/graphql";
import { useSearchParams } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  orderId?: number;
  items?: any[];
  setItems?: (x: any[]) => void;
  refetch?: any;
  status?: any
  vat?: any
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
  const [vat, setVat] = useState(0);
  const { data, refetch } = useOrderQuery({
    fetchPolicy: 'no-cache',
    skip: !isNaN(Number(params.get('token'))) || !params.get('otpCode'),
    variables: {
      token: params.get('token')
    },
    onCompleted: (data) => {
      setId(data?.order?.id || 0)
      setVat(Number(data.order?.vat || 0))
      // const cartItems = (data?.order?.items || []).map(x => {
      //   return {
      //     orderItemid: x?.id,
      //     ...x?.product,
      //     status: x?.status,
      //     addon_value: x?.addons?.split(','),
      //     sku: [x?.sku],
      //     sku_id: x?.sku?.id,
      //     qty: x?.qty,
      //     remark: x?.remark,
      //     price: x?.price,
      //     discount: x?.discount
      //   }
      // })

      // setCarts(cartItems)
    }
  });

  useOrderSubscriptSubscription({
    skip: !isNaN(Number(params.get('token'))) || !params.get('otpCode'),
    variables: {
      channel: params.get('token')
    },
    onData: (res) => {
      console.log(res.data.data?.orderSubscript)
      refetch();
    }
  });

  // useEffect(() => {
  //   startPolling(5000);

  //   return () => {
  //     stopPolling()
  //   }
  // }, [startPolling, stopPolling])

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
          price: x?.price,
          discount: x?.discount
        }
      }) : carts, setItems: setCarts, orderId: id, refetch: refetch, status: data ? data.order?.status : undefined, vat
    }}>
      {children}
    </OrderContext.Provider>
  )
}