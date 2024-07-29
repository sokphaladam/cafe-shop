'use client'
import { useCustomToast } from "@/components/custom/CustomToast"
import { PolarisLayout } from "@/components/polaris/PolarisLayout"
import { ProductList } from "@/components/ProductList"
import { Topbar } from "@/components/Topbar"
import { ProviderOrderContext, useOrderContext } from "@/context/OrderContext"
import { useProductListQuery } from "@/gql/graphql"
import { Layout, Thumbnail } from "@shopify/polaris"
import { ProductItem } from "./components/ProductItem"
import { LayoutCart } from "./components/LayoutCart"

export function CustomerOrderScreen() {
  const { data, loading } = useProductListQuery();

  if (loading) {
    return <></>
  }

  const groups = data?.productList?.reduce((a: any, b: any) => {
    const key = b?.category?.name;

    if (!a[key]) {
      a[key] = []
    }

    a[key].push(b)
    return a
  }, {});

  return (
    <ProviderOrderContext>
      <Topbar />
      <br />
      <div className="max-w-[1200px] mx-auto flex flex-row gap-4">
        <div className="w-[70%] flex flex-col gap-4">
          {
            Object.keys(groups).map(g => {
              return (
                <div key={g}>
                  <div className="text-xl my-2 font-semibold">{g}</div>
                  <div className="grid grid-cols-2 gap-4">
                    {
                      groups[g].map((x: any, i: any) => {
                        return <ProductItem key={i} product={x} />
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <LayoutCart />
      </div>
    </ProviderOrderContext>
  )
}