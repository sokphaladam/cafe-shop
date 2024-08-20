'use client'
import { useCustomToast } from "@/components/custom/CustomToast"
import { PolarisLayout } from "@/components/polaris/PolarisLayout"
import { ProductList } from "@/components/ProductList"
import { Topbar } from "@/components/Topbar"
import { ProviderOrderContext, useOrderContext } from "@/context/OrderContext"
import { Type_Product, useGenerateTokenOrderMutation, useOrderLazyQuery, useOrderQuery, useProductListQuery } from "@/gql/graphql"
import { Layout, Thumbnail } from "@shopify/polaris"
import { ProductItem } from "./components/ProductItem"
import { LayoutCart } from "./components/LayoutCart"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function CustomerOrderScreen() {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [info] = useState({
    set: params.get('token') ? params.get('token')?.split('@')[0] : 1,
    name: params.get('token') || "1@" + new Date().getTime()
  })

  const [generate] = useGenerateTokenOrderMutation();

  const { data, loading } = useProductListQuery({
    variables: {
      filter: {
        type: [Type_Product.Production]
      }
    }
  });

  useEffect(() => {
    if (info.set) {
      if (!isNaN(Number(info.name))) {
        generate({
          variables: {
            set: Number(info.set)
          }
        }).then(res => {
          if (res.data?.generateTokenOrder) {
            const newParams = new URLSearchParams(params.toString())
            newParams.set('token', res.data.generateTokenOrder.toString())
            router.push(path + '?' + newParams.toString())
          }
        })
      }
    }
  }, [generate, info.name, info.set, params, path, router])

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
      <div className="max-w-[1200px] mx-auto flex flex-row gap-4 max-sm:w-full max-sm:gap-0 max-sm:p-4">
        <div className="w-[70%] flex flex-col gap-4 max-sm:w-full">
          {
            groups && Object.keys(groups).map(g => {
              return (
                <div key={g}>
                  <div className="text-xl my-2 font-semibold">{g}</div>
                  <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    {
                      groups[g].map((x: any, i: any) => {
                        return <ProductItem key={i} product={x} keyItem={info.name} />
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