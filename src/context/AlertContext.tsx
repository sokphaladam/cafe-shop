import React, { PropsWithChildren, useState } from "react";

interface Props {
  items?: any[];
  setItems?: (x: any[]) => void;
}

const AlertContext = React.createContext<Props>({})

export function useAlertContext() {
  return React.useContext(AlertContext);
}

export function ProviderAlertContext({ children }: PropsWithChildren<unknown>) {
  const [carts, setCarts] = useState<any[]>([]);
  return (
    <AlertContext.Provider value={{ items: carts, setItems: setCarts }}>
      {children}
    </AlertContext.Provider>
  )
}