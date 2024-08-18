'use client'
import React, { useCallback, useState } from 'react';
import { UploadProduct } from './UploadProduct';
import { ProductInput, useCreateProductMutation } from '@/gql/graphql';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useRouter } from 'next/navigation';

export function CreateProductScreen() {
  const { push } = useRouter();
  const { toasts, setToasts } = useCustomToast();
  const [create, { loading }] = useCreateProductMutation({
    refetchQueries: ['productList']
  });
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
    type: [],
    integrate: [],
    stockAlter: 0
  });

  const handleSubmit = useCallback((v: ProductInput) => {
    create({
      variables: {
        data: v
      }
    }).then(res => {
      if (res.data?.createProduct) {
        setToasts([...toasts, { content: 'Create new product was success', status: 'success' }]);
        push('/products')
      }
      else {
        setToasts([...toasts, { content: 'Somthing was wrong with create product', status: 'error' }])
      }
    }).catch(() => {
      setToasts([...toasts, { content: 'Somthing was wrong with create product', status: 'error' }])
    })
  }, [create, push, setToasts, toasts])

  return <UploadProduct value={value} setValue={setValue} onSubmit={handleSubmit} loading={loading} />
}