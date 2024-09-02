/* eslint-disable @next/next/no-sync-scripts */
'use client';
import { useRef, useState } from 'react';
import * as JSPM from 'jsprintmanager';
import { Order } from '@/gql/graphql';
import './style.css';
import { Button } from '@shopify/polaris';

interface Props {
  order?: Order | null;
  subtotal?: string;
  vat?: string;
  total?: string;
  kitchen?: boolean;
}

export function PrintOrderToKitchen(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [doc, setDoc] = useState('');

  const onPrintClicked = () => {
    if (ref.current && iframeRef.current) {
      setDoc(
        `<style type="text/css">
          @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
        </style>
        <style>
          html, body { 
            margin: 0; 
            padding: 0; 
            text-align: center; 
            color: '#3E4B5B'; 
            font-family: "Lato", "Avenir Next W01", "Proxima Nova W01", "Rubik", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }
          
          #print_table {
            font-family: 'Lato', sans-serif;
            border-collapse: collapse;
            width: 100%;
            font-size: 9pt;
            /* color: black; */
          }

          #print_table td,
          #print_table th {
            padding: 4px;
            border: 1px solid #000;
            border-left-width: 0;
            border-right-width: 0;
            color: black;
          }

          #print_table th {
            padding-top: 6px;
            padding-bottom: 6px;
            text-align: left;
          }

          @media print {
            .pagebreak {
              clear: both;
              page-break-before: always;
            }
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
      <div ref={ref} style={{ position: 'fixed', top: 999999 }}>
        {props.order?.items?.map((x, i) => {
          return (
            <div key={x?.id} className="pagebreak" style={{ pageBreakAfter: 'always' }}>
              <table id="print_table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="text-right">Qty</th>
                    <th className="text-right">Addons</th>
                    <th className="text-right">Note</th>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {i + 1}. {x?.product?.title} ({x?.sku?.name})
                    </td>
                    <td className="!text-center">{x?.qty}</td>
                    <td className="text-right">{x?.addons}</td>
                    <td className="text-right">{x?.remark}</td>
                  </tr>
                </thead>
              </table>
            </div>
          );
        })}
        {/* <div>
          <div className="pagebreak" style={{ pageBreakAfter: 'always' }}>
            Test print 1
          </div>
          <div className="pagebreak" style={{ pageBreakAfter: 'always' }}>
            Test print 2
          </div>
          <div className="pagebreak" style={{ pageBreakAfter: 'always' }}>
            Test print 3
          </div>
        </div> */}
      </div>
      <div style={{ display: 'block' }}>
        <Button
          size="micro"
          onClick={() => {
            onPrintClicked();
            // JSPM.JSPrintManager.auto_reconnect = true;
            // JSPM.JSPrintManager.start();
            // var cpj = new JSPM.ClientPrintJob();
            // cpj.clientPrinter = new JSPM.DefaultPrinter();
            // //@ts-ignore
            // cpj.printerCommands = JSPM.PrinterCommands.createFromHTML(ref.current?.innerHTML);
            // cpj.sendToClient();
          }}
        >
          {'Print to Kitchen'}
        </Button>
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
