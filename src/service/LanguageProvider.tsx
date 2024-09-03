'use client';
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

const LanguageContext = React.createContext<{ lng: 'en' | 'km'; setLng: any }>({
  lng: 'en',
  setLng: () => {
    //
  },
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useScriptLanguage() {
  const { lng } = useLanguage();

  const data = require(`@/lib/lng/${lng}.json`);
  return data;
}

export function LanguageProvider(props: PropsWithChildren<unknown>) {
  const local = process.browser ? (localStorage.getItem('lng') ? localStorage.getItem('lng') : 'en') : 'en';
  const [lng, setLng] = useState<any>(local);

  return (
    <LanguageContext.Provider
      value={{
        lng,
        setLng: (v: any) => {
          setLng(v);
          localStorage.setItem('lng', v);
        },
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
}
