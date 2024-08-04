import { useSearchParams } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  items?: any[];
  setItems?: (x: any[]) => void;
}

const OrderContext = React.createContext<Props>({})

export function useOrderContext() {
  return React.useContext(OrderContext);
}

export function ProviderOrderContext({ children }: PropsWithChildren<unknown>) {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [carts, setCarts] = useState<any[]>([]);

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
    <OrderContext.Provider value={{ items: carts, setItems: setCarts }}>
      {children}
    </OrderContext.Provider>
  )
}