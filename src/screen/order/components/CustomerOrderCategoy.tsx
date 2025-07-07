'use client';

import { SliderWrap } from '@/components/SliderWrap';
import { Status_Product, useCategoryListQuery } from '@/gql/graphql';
import { isMobile } from '@/hook/isMobile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import './style.css';

interface Props {
  productGroup: any[];
  onSelected?: (e: any) => void;
  selected?: any;
  isOutStock?: boolean;
}

export function CustomerOrderCategory(props: Props) {
  const params = useSearchParams();
  const isMobileScreen = isMobile();
  const mediaScrollRef = useRef<HTMLUListElement>();
  const [category, setCategory] = useState([]);

  useCategoryListQuery({
    skip: !params.get('token'),
    onCompleted: (res) => {
      setCategory(res.categoryList.hash[0].children);
    },
  });

  useEffect(() => {
    if (process) {
      let fetchLoading = false;
      const threshold = 100;
      const onScroll = () => {
        if (mediaScrollRef?.current) {
          const diff =
            mediaScrollRef?.current?.scrollWidth -
            mediaScrollRef?.current?.scrollLeft -
            mediaScrollRef?.current.offsetWidth;

          if (diff < threshold && !fetchLoading) {
            fetchLoading = true;
          }
        }
      };
      mediaScrollRef?.current?.addEventListener('scroll', onScroll);
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mediaScrollRef?.current?.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  return (
    <div className={'Action_slider_Wrap'}>
      <ul ref={mediaScrollRef as any} className="Action_slider gap-4">
        <SliderWrap dataLenght={category.length} disable={isMobileScreen ? true : false}>
          <li
            className={`p-3 hover:bg-emerald-700 font-bold rounded-md cursor-pointer ml-2 ${
              props.selected === null ? 'bg-emerald-700 text-white' : ''
            }`}
            onClick={() => {
              props.onSelected && props.onSelected(null);
            }}
          >
            All
          </li>
          {category
            .filter((f: any) => props.productGroup[f.name] && props.productGroup[f.name].length > 0)
            .map((c: any) => {
              const count = props.productGroup
                ? (props.productGroup[c.name] || [])
                    .filter((f: any) =>
                      !props.isOutStock
                        ? [Status_Product.Available].includes(f.status)
                        : [Status_Product.Available, Status_Product.OutOfStock].includes(f.status),
                    )
                    .reduce(
                      (a: any, b: any) =>
                        (a =
                          a +
                          b.sku.filter((f: any) => {
                            return [Status_Product.Available].includes(f.status);
                          }).length),
                      0,
                    )
                : 0;
              return (
                <li
                  key={c.id}
                  className={`p-3 hover:bg-emerald-700 font-bold rounded-md  cursor-pointer ${
                    props.selected && props.selected.name === c.name ? 'bg-emerald-700 text-white' : ''
                  }`}
                  onClick={() => {
                    props.onSelected && props.onSelected(c);
                  }}
                >
                  {c.name} {count > 0 ? `(${c.name === 'Beer' ? count - 1 : count})` : ''}
                </li>
              );
            })}
        </SliderWrap>
      </ul>
    </div>
  );
}
