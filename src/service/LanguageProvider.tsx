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
  const [lng, setLng] = useState<'en' | 'km'>('en');
  return <LanguageContext.Provider value={{ lng, setLng }}>{props.children}</LanguageContext.Provider>;
}
