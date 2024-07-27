import { ProductInput, useCategoryListQuery } from "@/gql/graphql";
import { Select, Spinner } from "@shopify/polaris";

export function ProductCategory(props: {
  value: ProductInput
  setValue: (v: ProductInput) => void
}) {
  const { data, loading } = useCategoryListQuery();

  if (loading || !data) {
    return <Spinner size="small" />
  }

  const options = [
    {
      label: 'Select on category',
      value: '0'
    },
    ...(data.categoryList as any[]).map(x => {
      return {
        label: x.name,
        value: x.id + ''
      }
    })
  ]

  return (
    <Select
      label="Category"
      options={options}
      value={(props.value.category || '').toString()}
      onChange={v => {
        props.setValue({ ...props.value, category: Number(v) })
      }}
      requiredIndicator
    />
  )
}