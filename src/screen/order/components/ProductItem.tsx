/* eslint-disable @next/next/no-img-element */
import { useCustomToast } from '@/components/custom/CustomToast';
import { useOrderContext } from '@/context/OrderContext';
import { CartItemInput, Product, Sku, Status_Product, StatusOrder, useAddOrderItemMutation } from '@/gql/graphql';
import { config_app } from '@/lib/config_app';
import { Divider, Icon, Modal, RadioButton, Thumbnail } from '@shopify/polaris';
import { CartAbandonedFilledIcon, PackageOnHoldIcon } from '@shopify/polaris-icons';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

interface Props {
  product: Product;
  keyItem: string;
  defaultSku?: Sku;
  display?: 'CARD' | 'LIST';
}

export function ProductItem(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const { items, setItems, orderId, refetch, status } = useOrderContext();
  const [open, setOpen] = useState(false);
  const [addons, setAddons] = useState<any[]>(
    props.product.addons?.map((ad) => {
      return {
        ...ad,
        qty: 0,
      };
    }) || [],
  );
  const [sku, setSku] = useState<number>(
    props.defaultSku
      ? props.defaultSku.id || 0
      : (props.product.sku?.length || 0) > 0
      ? (props.product.sku || [])[0]?.id || 0
      : 0,
  );
  const [remark, setRemark] = useState('');

  const [addCart] = useAddOrderItemMutation({
    refetchQueries: ['order'],
  });

  const edited = [StatusOrder.Pending, StatusOrder.Delivery, StatusOrder.Verify].includes(status);
  const addon = addons
    .filter((x) => x.qty > 0)
    .reduce((a, b) => (a = a + Number(b.qty || '0') * (isNaN(Number(b.value || '0')) ? 0 : Number(b.value || '0'))), 0);

  const skuSelect = props.product.sku?.find((f) => f?.id === sku);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        title={
          <div>
            <img src={config_app.public.assets.logo} alt="" className="w-14 h-auto object-contain" />
          </div>
        }
      >
        <Modal.Section flush>
          <img
            src={skuSelect?.image ? skuSelect?.image || '' : props.product.images || ''}
            alt=""
            className="w-full max-h-[275px] object-contain"
          />
          <div className="p-4">
            <div className="text-lg font-bold">
              {props.product.title} ({skuSelect?.name})
            </div>
            <div>{props.product.description}</div>
            <br />
            <div className="text-red-500 font-bold">${Number(Number(skuSelect?.price) + addon).toFixed(2)}</div>
            <br />
            <Divider />
            <br />
            <div className="border-solid border-[0.5px] rounded-md mb-2 p-2 border-red-400">
              {props.product.sku?.map((x, i) => {
                return (
                  <RadioButton
                    checked={sku === x?.id}
                    onChange={(v) => setSku(v === true ? x?.id || 0 : 0)}
                    label={x?.name}
                    key={i}
                    helpText={(<div>${x?.price}</div>) as any}
                    disabled={x?.status === Status_Product.OutOfStock || x?.status === Status_Product.TimeOut}
                  />
                );
              })}
            </div>
          </div>
        </Modal.Section>
      </Modal>
      {props.display === 'CARD' ? (
        <div
          onClick={() => {
            if (
              props.product.status === Status_Product.Available &&
              props.defaultSku?.status === Status_Product.Available
            ) {
              !!edited && setOpen(true);
              if (props.defaultSku) {
                setSku(props.defaultSku.id || 0);
              }
            }
          }}
          className={`${
            props.product.status === Status_Product.Available && props.defaultSku?.status === Status_Product.Available
              ? 'bg-white'
              : 'bg-gray-50'
          } rounded-lg overflow-hidden justify-between items-center cursor-pointer ${
            props.product.status === Status_Product.Available && props.defaultSku?.status === Status_Product.Available
              ? `hover:scale-105 hover:bg-gray-50`
              : ''
          } transition-all`}
        >
          <div className="w-full h-[150] flex flex-row justify-center items-center">
            <Image
              src={props.defaultSku?.image ? props.defaultSku.image + '' : props.product.images || ''}
              alt=""
              width={180}
              height={180}
              className="object-contain"
              style={{ width: 'fit-contain', height: 180 }}
            />
          </div>
          <div className="py-2 px-4">
            <b
              className={`text-lg ${
                props.product.status === Status_Product.OutOfStock ||
                props.defaultSku?.status === Status_Product.OutOfStock ||
                props.defaultSku?.status === Status_Product.TimeOut
                  ? 'text-gray-400'
                  : ''
              }`}
            >
              {props.product.title} ({props.defaultSku?.name})
            </b>
            <div className="text-red-500 font-bold my-2">${Number(props.defaultSku?.price).toFixed(2)}</div>
            {(props.product.status === Status_Product.OutOfStock ||
              props.defaultSku?.status === Status_Product.OutOfStock) && (
              <div className="flex flex-row items-center gap-1">
                <div>
                  <Icon source={CartAbandonedFilledIcon} tone="critical" />
                </div>
                <small className="text-red-500">(Out Of Stock)</small>
              </div>
            )}
            {props.defaultSku?.status === Status_Product.TimeOut && (
              <div className="flex flex-row items-center gap-1">
                <div>
                  <Icon source={PackageOnHoldIcon} tone="critical" />
                </div>
                <small className="text-red-500">(Time Out)</small>
              </div>
            )}
            <div className="max-h-[30px] truncate">{props.product.description}</div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            if (
              props.product.status === Status_Product.Available &&
              props.defaultSku?.status === Status_Product.Available
            ) {
              !!edited && setOpen(true);
              if (props.defaultSku) {
                setSku(props.defaultSku.id || 0);
              }
            }
          }}
          className={`${
            props.product.status === Status_Product.Available || props.defaultSku?.status === Status_Product.Available
              ? 'bg-white'
              : 'bg-gray-100'
          } rounded-lg py-2 px-4 flex flex-row justify-between items-center cursor-pointer ${
            props.product.status === Status_Product.Available || props.defaultSku?.status === Status_Product.Available
              ? `hover:scale-105 hover:bg-gray-50`
              : ''
          } transition-all`}
        >
          <div className="max-w-[250px] max-sm:w-[210px] max-lg:w-[180px]">
            <b
              className={`text-lg ${
                props.product.status === Status_Product.OutOfStock ||
                props.defaultSku?.status === Status_Product.OutOfStock ||
                props.defaultSku?.status === Status_Product.TimeOut
                  ? 'text-gray-400'
                  : ''
              }`}
            >
              {props.product.title} ({props.defaultSku?.name})
            </b>
            <div className="text-red-500 font-bold my-2">${Number(props.defaultSku?.price).toFixed(2)}</div>
            {(props.product.status === Status_Product.OutOfStock ||
              props.defaultSku?.status === Status_Product.OutOfStock) && (
              <div className="flex flex-row items-center gap-1">
                <div>
                  <Icon source={CartAbandonedFilledIcon} tone="critical" />
                </div>
                <small className="text-red-500">(Out Of Stock)</small>
              </div>
            )}
            {props.defaultSku?.status === Status_Product.TimeOut && (
              <div className="flex flex-row items-center gap-1">
                <div>
                  <Icon source={PackageOnHoldIcon} tone="critical" />
                </div>
                <small className="text-red-500">(Time Out)</small>
              </div>
            )}
            <div className="max-h-[30px] truncate">{props.product.description}</div>
          </div>
          <div className="w-[75px]">
            <Thumbnail
              alt=""
              source={props.defaultSku?.image ? props.defaultSku.image + '' : props.product.images || ''}
              size="large"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
