'use client';
import { useCustomToast } from '@/components/custom/CustomToast';
import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { ProductList } from '@/components/ProductList';
import { Topbar } from '@/components/Topbar';
import { ProviderOrderContext, useOrderContext } from '@/context/OrderContext';
import {
  Type_Product,
  useGenerateTokenOrderMutation,
  useOrderLazyQuery,
  useOrderQuery,
  useProductListQuery,
} from '@/gql/graphql';
import { ProductItem } from './components/ProductItem';
import { LayoutCart } from './components/LayoutCart';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { VerifyCustomerOrderScreen } from './VerifyCustomerOrderScreen';
import { useSetting } from '@/service/useSettingProvider';
import { haversineDistance } from '@/lib/loacationDistance';

export function CustomerOrderScreen() {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const setting = useSetting();
  const [info] = useState({
    set: params.get('token') ? params.get('token')?.split('@')[0] : null,
    name: params.get('token') || '1@' + new Date().getTime(),
    code: params.get('otpCode') || '',
  });
  const ref = useRef<HTMLButtonElement | null>(null);
  const [oneTime, setOneTime] = useState(false);
  const [count, setCount] = useState(0);
  const [verify, setVerify] = useState(true);
  const [allow, setAllow] = useState(true);

  const [generate] = useGenerateTokenOrderMutation();

  const { data, loading } = useProductListQuery({
    skip: !params.get('token'),
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        type: [Type_Product.Production],
      },
    },
  });

  useEffect(() => {
    if (process.browser && setting.length > 0) {
      const center = setting.find((f: any) => f?.option === 'LOCATION')?.value;
      navigator.geolocation.getCurrentPosition((msg) => {
        const str: any = center?.split(',');
        const km = haversineDistance(
          Number(str[0]),
          Number(str[1]),
          Number(msg.coords.latitude),
          Number(msg.coords.longitude),
        );

        console.log(km);

        if (Number(km) < 0.1) {
          setAllow(true);
        }
      });
    }
  }, [setting]);

  useEffect(() => {
    if (setting.length > 0) {
      if (!oneTime && !loading) {
        ref.current?.click();
      }
    }
  }, [loading, oneTime, setting.length]);

  const handleGenerate = useCallback(() => {
    if (!isNaN(Number(params.get('token')))) {
      const check = !oneTime && info.set && !isNaN(Number(info.name)) && count < 1;
      if (check) {
        setCount(count + 1);
        setOneTime(true);
        generate({
          variables: {
            set: Number(info.set),
          },
        }).then((res) => {
          if (res.data?.generateTokenOrder) {
            const newParams = new URLSearchParams(params.toString());
            newParams.set('token', res.data.generateTokenOrder.toString());
            router.push(path + '?' + newParams.toString());
          }
        });
      }
    }
  }, [count, generate, info.name, info.set, oneTime, params, path, router]);

  const pwdwifi = setting.find((f) => f.option === 'GUEST_WIFI')?.value;

  if (loading || !params.get('token')) {
    return (
      <>
        <Topbar isCart={false} />
        {/* <div className="w-full text-center">
          <div>
            Wifi: <b>MooD-WiFi</b>
          </div>
          <div>
            Password: <b>{pwdwifi}</b>
          </div>
        </div> */}
      </>
    );
  }

  const groups = data?.productList?.reduce((a: any, b: any) => {
    const key = b?.category?.name;

    if (!a[key]) {
      a[key] = [];
    }

    a[key].push(b);
    return a;
  }, {});

  return (
    <Suspense>
      <div>
        <button ref={ref} onClick={handleGenerate} style={{ position: 'fixed', top: -9999, display: 'none' }}>
          generate click
        </button>
        {!verify ? (
          <VerifyCustomerOrderScreen onVerify={setVerify} />
        ) : (
          <ProviderOrderContext>
            <Topbar isCart={allow} />
            {!!allow && (
              <>
                {/* <div className="w-full text-center">
                  <div>
                    Wifi: <b>MooD-WiFi</b>
                  </div>
                  <div>
                    Password: <b>{pwdwifi}</b>
                  </div>
                </div>
                <br /> */}
                <div className="max-w-[1200px] mx-auto flex flex-row gap-4 max-sm:w-full max-sm:gap-0 max-sm:p-4">
                  <div className="w-[70%] flex flex-col gap-4 max-sm:w-full">
                    {groups &&
                      Object.keys(groups).map((g) => {
                        return (
                          <div key={g}>
                            <div className="text-xl my-2 font-semibold">{g}</div>
                            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                              {groups[g].map((x: any, i: any) => {
                                return <ProductItem key={i} product={x} keyItem={info.name} />;
                              })}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {/* <LayoutCart /> */}
                </div>
              </>
            )}
          </ProviderOrderContext>
        )}
      </div>
    </Suspense>
  );
}
