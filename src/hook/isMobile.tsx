/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

export const isMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(!true);
    }
  }, []);
  return isMobile;
};
