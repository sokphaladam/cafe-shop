'use client'
import { PolarisLayout, role_permission } from "@/components/polaris/PolarisLayout"
import { prefix } from "@/lib/prefix";
import { Box, Card, Divider, Layout, Text, TextField } from "@shopify/polaris"
import { useCallback, useState } from "react";
import { UploadProductType } from "./components/upload/UploadProductType";
import { PolarisUpload } from "@/components/polaris/PolarisUpload";
import { UploadProductSku } from "./components/upload/UploadProductSku";
import { ProductInput, Sku } from "@/gql/graphql";
import { PolarisCategory } from "@/components/polaris/PolarisCategory";
import { UploadProductAddon } from "./components/upload/UploadProductAddon";
import { UploadIntegration } from "./components/upload/UploadIntegration";

interface Props {
  value: ProductInput;
  setValue: (e: ProductInput) => void;
  onSubmit: (v: ProductInput) => void;
  loading: boolean;
}

export function UploadProduct({ value, setValue, onSubmit, loading, }: Props) {
  const [unit, setUnit] = useState((value.sku as any)[0]?.unit || '');
  const [error, setError] = useState<{
    type: '',
    message: ''
  }[]>([])

  const [uploading, setUploading] = useState(false);

  const handleSave = useCallback(() => {
    const input: ProductInput = {
      ...value,
      sku: value.sku?.map(x => {
        return {
          ...x,
          unit,
          price: Number(x?.price),
          discount: Number(x?.discount)
        }
      })
    }

    const allow = ['description'];

    let errors: any[] = Object.keys(input).filter(x => !allow.includes(x)).filter(x => !(input as any)[x]).map(x => {
      return {
        type: x,
        message: `${x} is required.`
      }
    })

    if (input.sku?.length === 1 && !input.sku[0]?.name) {
      errors = [
        ...errors,
        {
          type: 'sku',
          message: `sku is the most importan required.`
        }
      ]
    }

    setError(errors);

    if (error.length > 0) {
      return;
    }

    onSubmit(input)

  }, [error, onSubmit, unit, value])

  const allow = ['description'];

  let errors: any[] = Object.keys(value).filter(x => !allow.includes(x)).filter(x => !(value as any)[x]).map(x => {
    return {
      type: x,
      message: `${x} is required.`
    }
  })

  if (value.sku?.length === 1 && !value.sku[0]?.name) {
    errors = [
      ...errors,
      {
        type: 'sku',
        message: `sku is the most importan required.`
      }
    ]
  }

  return (
    <PolarisLayout
      title='Upload Product'
      permission={[role_permission.SUPER_ADMIN, role_permission.ADMIN]}
      primaryAction={{ content: 'Save', onAction: handleSave, disabled: errors.length > 0 || loading, loading: loading }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">1. Basic Information*</Text>
              <br />
              <TextField
                disabled={loading || uploading}
                error={error.find((f: any) => f.type === 'title')?.message}
                autoComplete="off"
                label="Title"
                placeholder="Enter the product title"
                value={value.title || ''}
                onChange={v => {
                  setValue({ ...value, title: v, code: prefix(v) })
                }}
                requiredIndicator
              />
              <br />
              <TextField disabled={loading || uploading} autoComplete="off" label="Description" placeholder="Enter the details of the product" multiline={5} value={value.description || ''} onChange={v => {
                setValue({ ...value, description: v })
              }} />
            </Box>
          </Card>
          <br />
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">2. Product SKU*</Text>
              <small className="text-red-500">{error.find((f: any) => f.type === 'sku')?.message}</small>
              <br />
              <TextField disabled={loading || uploading} requiredIndicator autoComplete="off" label="Unit" placeholder="Enter the product sku unit" value={unit} onChange={v => setUnit(v)} />
              <br />
              {!uploading && <UploadProductSku value={value} setValue={setValue} />}
            </Box>
          </Card>
          <br />
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">3. Product Addons</Text>
              <br />
              <UploadProductAddon value={value} setValue={setValue} />
            </Box>
          </Card>
          {
            (value.type as any)?.includes('PRODUCTION') && <>
              <br />
              <Card>
                <Box>
                  <Text as="h3" variant="headingMd">5. Product Ingredients*</Text>
                  <br />
                  <UploadIntegration />
                </Box>
              </Card></>
          }
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h3" variant="headingMd">4. Product Organization*</Text>
              <br />
              <PolarisUpload url={value.images + ''} setUrl={url => {
                setValue({
                  ...value,
                  images: url
                })
              }} onLoading={setUploading} />
              <br />
              <TextField disabled={loading || uploading} requiredIndicator autoComplete="off" label="Code" placeholder="Enter the product code" value={value.code || ''} onChange={v => setValue({ ...value, code: v })} />
              <br />
              {
                !uploading && <UploadProductType value={value} setValue={setValue} />
              }
              <br />
              {
                !uploading && <PolarisCategory value={value} onChange={setValue} />
              }
              <br />
              <TextField disabled={loading || uploading} autoComplete="off" label="Quantity Alert" placeholder="How many is minimum quantity for alter?" type="number" />
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </PolarisLayout>
  )
}