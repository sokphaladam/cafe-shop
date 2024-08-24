"use client";
import React, { useEffect } from 'react';

export function NetworkProvider({ children }: React.PropsWithChildren<any>) {

  useEffect(() => {
    if (process.browser) {
      window.addEventListener('load', () => {

        if (navigator.onLine) {
          //
        }

        window.addEventListener('offline', () => {
          alert('You might be offline please check you internet connection!')
        });
      })
    }
  }, [])

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}