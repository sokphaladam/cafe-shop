import { Maybe, Sku } from "@/gql/graphql";
import { Badge, Icon, IndexTable, Tooltip } from "@shopify/polaris";
import { QuestionCircleIcon } from '@shopify/polaris-icons';

interface Props {
  sku: Maybe<Sku>[]
}

export function ProductListItemSku({ sku }: Props) {
  return (
    <Tooltip content={(
      <div className="w-[250px] bg-white">
        <IndexTable
          headings={[
            { title: "#" },
            { title: 'Name' },
            { title: "Price" },
            { title: "Discount" },
            { title: 'Unit' }]
          }
          itemCount={sku?.length || 0}
          selectable={false}>
          {sku &&
            sku.map(x => {
              return <IndexTable.Row key={x?.id} id={x?.id + ''} position={x?.id || 0}>
                <IndexTable.Cell>{x?.id}</IndexTable.Cell>
                <IndexTable.Cell>{x?.name?.toUpperCase()}</IndexTable.Cell>
                <IndexTable.Cell>${x?.price?.toFixed(2)}</IndexTable.Cell>
                <IndexTable.Cell>{x?.discount?.toFixed(2)}%</IndexTable.Cell>
                <IndexTable.Cell>{x?.unit?.toUpperCase()}</IndexTable.Cell>
              </IndexTable.Row>
            })
          }
        </IndexTable>
      </div>
    )} width={'wide'}>
      <Badge size="small" tone="info-strong">
        {
          <div className="flex flex-row items-center">
            {sku.length + ''} <Icon source={QuestionCircleIcon} />
          </div> as any
        }
      </Badge>
    </Tooltip>
  )
}