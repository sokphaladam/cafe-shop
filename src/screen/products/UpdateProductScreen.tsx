'use client'
import React, { useCallback, useState } from 'react';
import { UploadProduct } from './UploadProduct';
import { useParams, useRouter } from 'next/navigation'
import { ProductInput, useProductQuery, useUpdateProductMutation } from '@/gql/graphql';
import { Loading, Page } from '@shopify/polaris';
import { useCustomToast } from '@/components/custom/CustomToast';

export function UpdateProductScreen() {
  const { push } = useRouter();
  const { toasts, setToasts } = useCustomToast();
  const params = useParams<{ id: string }>();
  const [sleep, setSleep] = useState(true);
  const [value, setValue] = useState<ProductInput>({
    title: '',
    code: '',
    category: 0,
    description: '',
    images: '',
    sku: [{
      name: '',
      discount: 0,
      price: 0,
      unit: ''
    }],
    type: []
  });
  const { loading } = useProductQuery({
    variables: {
      productId: Number(params.id)
    },
    onCompleted: res => {
      const x = res.product;
      setValue({
        title: x?.title,
        code: x?.code,
        category: x?.category?.id || 0,
        description: x?.description,
        images: x?.images,
        sku: (x?.sku || []).length > 0 ? x?.sku?.map(s => {
          return {
            id: s?.id,
            name: s?.name,
            unit: s?.unit,
            discount: s?.discount,
            price: s?.price
          }
        }) : [{
          name: '',
          discount: 0,
          price: 0,
          unit: ''
        }],
        type: x?.type,
        addons: x?.addons?.map(a => {
          return {
            id: a?.id,
            name: a?.name,
            value: a?.value,
            isRequired: a?.isRequired
          }
        })
      });
      setTimeout(() => {
        setSleep(false)
      }, 2000)
    }
  })

  const [update, updateProps] = useUpdateProductMutation({
    refetchQueries: ['productList']
  });

  const handleSubmit = useCallback((v: ProductInput) => {
    update({
      variables: {
        updateProductId: Number(params.id),
        data: {
          ...v,
          sku: v.sku?.map(s => {
            if (s?.id) {
              return {
                id: s?.id,
                name: s?.name,
                unit: s?.unit,
                discount: Number(s?.discount),
                price: Number(s?.price)
              }
            }
            return {
              name: s?.name,
              unit: s?.unit,
              discount: Number(s?.discount),
              price: Number(s?.price)
            }
          })
        }
      }
    }).then(res => {
      if (res.data?.updateProduct) {
        setToasts([...toasts, { content: 'Update new product was success', status: 'success' }]);
        push('/products')
      }
      else {
        setToasts([...toasts, { content: 'Somthing was wrong with update product', status: 'error' }])
      }
    }).catch(() => {
      setToasts([...toasts, { content: 'Somthing was wrong with update product', status: 'error' }])
    })
  }, [params.id, push, setToasts, toasts, update])

  if (sleep) {
    return <Page>
      <Loading />
    </Page>
  }

  return (
    <div>
      {!sleep && <UploadProduct value={value} setValue={setValue} loading={loading || updateProps.loading} onSubmit={handleSubmit} />}
    </div>
  )
}