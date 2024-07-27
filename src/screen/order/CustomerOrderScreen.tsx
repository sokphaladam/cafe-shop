'use client'
import { PolarisLayout } from "@/components/polaris/PolarisLayout"
import { ProductList } from "@/components/ProductList"
import { Topbar } from "@/components/Topbar"
import { ProviderOrderContext } from "@/context/OrderContext"
import { Layout } from "@shopify/polaris"

export function CustomerOrderScreen() {
  return (
    <ProviderOrderContext>
      <Topbar />
      <br />
      <ProductList />
    </ProviderOrderContext>
  )
}