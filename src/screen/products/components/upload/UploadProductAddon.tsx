import { ProductInput } from '@/gql/graphql';
import { Checkbox, Icon, TextField } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import react, { useCallback } from 'react';

interface Props {
  value: ProductInput;
  setValue: (v: ProductInput) => void
}

export function UploadProductAddon(props: Props) {

  const handleChangeText = useCallback((v: string | boolean, text: string, index: number) => {
    let dummy: any = (props.value.addons as any).map((x: any) => {
      return {
        ...x
      }
    })
    dummy[index][text] = v;
    props.setValue({
      ...props.value,
      addons: dummy
    })
  }, [props])

  return (
    <div className='flex flex-col gap-1'>
      {
        props.value.addons?.map((x, i) => {
          return (
            <div key={i} className='p-2 flex flex-row gap-2 justify-between'>
              <div>
                <TextField autoComplete='off' value={x?.name || ''} label labelHidden placeholder='Enter name addon' onChange={v => {
                  handleChangeText(v, 'name', i)
                }} />
              </div>
              <div className='w-[350px]'>
                <TextField autoComplete='off' value={x?.value || ''} label labelHidden placeholder='Enter value addon separated by (,)' helpText={'Ex: 10%,25%,50%,...'} onChange={v => handleChangeText(v, 'value', i)} />
              </div>
              <div>
                <Checkbox checked={x?.isRequired || false} label="Required" onChange={v => handleChangeText(v, 'isRequired', i)} />
              </div>
            </div>
          )
        })
      }
      <div className='border-collapse border-dotted border-[0.5px] rounded-md p-2 hover:bg-gray-300 cursor-pointer' onClick={() => {
        props.setValue({
          ...props.value,
          addons: [...props.value.addons || [], { name: '', value: '', isRequired: false }]
        })
      }}><Icon source={PlusIcon} /></div>
    </div>
  )
}