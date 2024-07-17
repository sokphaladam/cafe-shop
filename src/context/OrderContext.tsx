import React, { PropsWithChildren, useState } from "react";

interface Props {
  items?: any[];
  setItems?: (x: any[]) => void;
}

const OrderContext = React.createContext<Props>({})

export function useOrderContext() {
  return React.useContext(OrderContext);
}

export function ProviderOrderContext({ children }: PropsWithChildren<unknown>) {
  const [carts, setCarts] = useState<any[]>([]);
  return (
    <OrderContext.Provider value={{ items: carts, setItems: setCarts }}>
      {children}
    </OrderContext.Provider>
  )
}