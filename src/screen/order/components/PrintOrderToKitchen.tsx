/* eslint-disable @next/next/no-sync-scripts */
'use client';
import { useRef, useState } from 'react';
import * as JSPM from 'jsprintmanager';

export function PrintOrderToKitchen() {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [doc, setDoc] = useState('');

  const onPrintClicked = () => {
    if (ref.current && iframeRef.current) {
      setDoc(
        `<style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Nokora&display=swap);
        </style>
        <style>
          html, body { 
            margin: 0; 
            padding: 0; 
            text-align: center; 
            color: '#3E4B5B'; 
            font-family: "Nokora", "Avenir Next W01", "Proxima Nova W01", "Rubik", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          } 
          
          @media print { 
            @page {
              margin: 0;
            }

            .pagebreak { 
              clear: both !important; 
              page-break-after: always; 
              page-break-before: always !important; 
            } 
            
            .center { 
              display: flex; 
              justify-content: center; 
              flex-direction: column; 
              align-items:center 
            }
          }
        </style>
        <div>` +
          ref.current.innerHTML +
          '</div><script>window.print(); /*' +
          Math.random().toString() +
          '*/</script>',
      );
    }
  };

  return (
    <div>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/SheetJS/js-codepage/dist/cptable.js"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/SheetJS/js-codepage/dist/cputils.js"></script>
      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"
      ></script>
      <div ref={ref}>
        <div>
          <div className="pagebreak" style={{ pageBreakAfter: 'always' }}>
            Test print 1
          </div>
          <div className="pagebreak" style={{ pageBreakAfter: 'always' }}>
            Test print 2
          </div>
          <div className="pagebreak" style={{ pageBreakAfter: 'always' }}>
            Test print 3
          </div>
        </div>
      </div>
      <div style={{ display: 'block' }}>
        <button onClick={onPrintClicked}>Print</button>
      </div>
      <iframe
        style={{
          position: 'fixed',
          width: 1,
          height: 1,
          left: -1000,
          top: -1000,
        }}
        srcDoc={doc}
        ref={iframeRef}
        title="myframe"
      ></iframe>
    </div>
  );
}
