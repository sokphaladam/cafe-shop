/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './ui/style.css';

const PageDot = ({ length, currentIndex }: { length: number; currentIndex: number }) => {
  return (
    <div className={'page_dot'}>
      <ul>
        {new Array(length).fill(0).map((x, idx) => (
          <li
            key={idx}
            style={{
              background: idx === currentIndex ? '#f00' : '#fff',
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

const PageNumber = ({ length, currentIndex }: { length: number; currentIndex: number }) => {
  return (
    <div className={'page_number_wrap'}>
      <div className={'page_number'}>
        {currentIndex + 1}/{length}
      </div>
    </div>
  );
};

interface SubImg {
  index: number;
  setIndex: (x: number) => void;
  imgsData: string[];
  scrollToIndex: (x: number) => void;
}

function SubImage(props: SubImg) {
  return (
    <div className={'sub_img'}>
      <ul>
        <SliderWrap dataLenght={props?.imgsData?.length}>
          {props?.imgsData?.map((x, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  props?.scrollToIndex(i);
                  props?.setIndex(i);
                }}
                className={props?.index === i ? 'active' : ''}
              >
                <img src={x?.toString()} alt="" width={'100%'} />
              </li>
            );
          })}
        </SliderWrap>
      </ul>
    </div>
  );
}
interface Props {
  auto?: boolean;
  speed?: number;
  number?: boolean;
  disable?: boolean;
  dataLenght?: number;
  fadeSlide?: boolean;
  displayDot?: boolean;
  displayNumber?: boolean;
  imgs?: string[];
  indexSelect?: number;
}
export function SliderWrap(props: React.PropsWithChildren<Props>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const getClientWidthRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(props.indexSelect || 0);
  const [speed] = useState(props?.speed || 4000);
  const dataLenght = props?.dataLenght || props?.imgs?.length || 0;

  function scrollToIndex(index: number, behavior: ScrollBehavior = 'smooth') {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.clientWidth * index,
        behavior,
      });
    }
  }

  const onNext = (e: any) => {
    e.preventDefault();
    const newIndex = (dataLenght + index + 1) % dataLenght;
    scrollToIndex(newIndex);
  };

  const onPrev = (e: any) => {
    e.preventDefault();
    const newIndex = (dataLenght + index - 1) % dataLenght;
    scrollToIndex(newIndex);
  };
  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const newIndex = Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth);

    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };

  useEffect(() => {
    if (!!props?.auto) {
      const interval = setInterval(() => {
        const newIndex = (dataLenght + index + 1) % dataLenght;
        setIndex(newIndex);
        scrollToIndex(newIndex);
      }, speed);
      return () => clearInterval(interval);
    }
  }, [dataLenght, index, props, speed]);

  useEffect(() => {
    if (props.indexSelect) {
      setIndex(props.indexSelect);
      const newIndex = (dataLenght + props.indexSelect) % dataLenght;
      scrollToIndex(newIndex);
    }
  }, [dataLenght, props]);

  if (props?.disable) {
    return <>{props.children}</>;
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div className={'slider_wrap'} ref={getClientWidthRef}>
          <div className={'slider'} ref={scrollRef} onScroll={onScroll}>
            {props.children}
          </div>

          {props?.displayDot && <PageDot length={dataLenght} currentIndex={index} />}
          {props?.displayNumber && <PageNumber length={dataLenght} currentIndex={index} />}

          <div className={'btn_wrap'}>
            <button onClick={onNext} className={'btn_next'}>
              <i className="fas fa fa-caret-right" style={{ fontSize: '1.5rem' }}></i>
            </button>
            <button onClick={onPrev} className={'btn_prev'}>
              <i className="fas fa fa-caret-left" style={{ fontSize: '1.5rem' }}></i>
            </button>
          </div>
        </div>
        {props?.imgs && props?.imgs?.length > 0 && (
          <SubImage imgsData={props?.imgs} index={index} setIndex={setIndex} scrollToIndex={scrollToIndex} />
        )}
      </div>
    </>
  );
}
