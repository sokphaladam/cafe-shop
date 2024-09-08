'use client';
import React, { CSSProperties, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface Props {
  position?: 'top-star' | 'top-end' | 'bottom-start' | 'bottom-end';
  status?: 'success' | 'error' | 'warning' | 'info';
  content?: string;
  index?: number;
  onClose?: () => void;
}

export function CustomToast(props: Props) {
  let style: CSSProperties = { top: '3.5rem', right: '.5rem' };
  let classname: string = 'bg-gray-300 fill-slate-600 text-slate-600';
  // let icon = StatusActiveMajor;

  switch (props.position) {
    case 'top-end':
      style = {
        top: `${3.5 * (props.index || 1)}rem`,
        right: '.5rem',
      };
      break;
    case 'top-star':
      style = {
        top: `${3.5 * (props.index || 1)}rem`,
        left: '.5rem',
      };
      break;
    case 'bottom-start':
      style = {
        bottom: `${1.5 * (props.index || 1)}rem`,
        left: '.5rem',
      };
      break;
    case 'bottom-end':
      style = {
        bottom: `${1.5 * (props.index || 1)}rem`,
        right: '.5rem',
      };
      break;
  }

  switch (props.status) {
    case 'success':
      classname = 'bg-green-700 fill-slate-200 text-slate-200';
      // icon = StatusActiveMajor;
      break;
    case 'error':
      classname = 'bg-red-500 fill-slate-200 text-slate-200';
      // icon = CircleDisableMinor;
      break;
    case 'warning':
      classname = 'bg-yellow-500 fill-slate-600 text-slate-600';
      // icon = RiskMinor;
      break;
    case 'info':
      classname = 'bg-gray-600 fill-slate-300 text-slate-300';
      // icon = QuestionMarkMinor;
      break;
  }

  return (
    <div className={`rounded-md fixed flex-wrap items-center toast flex z-[999] ${classname}`} style={style}>
      <div className="p-3">{/* <Icon source={icon as any} /> */}</div>
      <div className="ml-3 pt-3 pb-3 pr-2 max-w-md">
        <i>{props.content}</i>
      </div>
      <div className="p-3 cursor-pointer rounded-e-md h-[100%]" onClick={props.onClose && props.onClose}>
        {/* <Icon source={CancelMajor as any} /> */}
      </div>
    </div>
  );
}

const dummy = [
  {
    content: 'This is a success toast component',
    status: 'success',
  },
  {
    content: 'This is a failure toast message.',
    status: 'error',
  },
  {
    content: 'This is a warning toast message.',
    status: 'warning',
  },
];

interface PropsContext {
  content: string;
  status?: 'success' | 'error' | 'warning' | 'info';
}

const CustomContext = React.createContext<{
  toasts: PropsContext[];
  setToasts: (e: PropsContext[]) => void;
}>({
  toasts: [],
  setToasts: () => {},
});

export function useCustomToast() {
  return useContext(CustomContext);
}

export function CustomToastMultiple(props: PropsWithChildren<unknown>) {
  const ref = useRef<HTMLDivElement>(null);
  const [item, setItem] = useState<PropsContext[]>([]);

  if (item.length > 0) {
    setTimeout(() => {
      handleRemove(0);
    }, 8500);
  }

  const handleAdd = useCallback(() => {
    const x = [...item];

    x.push({ content: '', status: 'success' });

    if (x.length > 7) {
      x.splice(0, 1);
    }

    setItem(x);
  }, [item]);

  const handleRemove = (index: number) => {
    setItem((prevItem) => prevItem.filter((x, i) => i !== index));
  };

  return (
    <CustomContext.Provider value={{ toasts: item, setToasts: setItem }}>
      <div ref={ref} style={{ display: 'none' }} onClick={handleAdd}>
        add
      </div>
      {item.map((x, i) => {
        return (
          <CustomToast
            position="top-end"
            status={x.status as any}
            content={x.content}
            key={i}
            index={i + 1}
            onClose={() => handleRemove(i)}
          />
        );
      })}
      {props.children}
    </CustomContext.Provider>
  );
}
