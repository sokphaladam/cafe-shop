'use client';
import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { useFirebase } from '@/hook/useFirebsae';
import { getDownloadURL } from 'firebase/storage';

export function GeneratePrint() {
  const { file } = useFirebase();
  const ref = useRef<HTMLDivElement>(null);

  function dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const downloadImage = async () => {
    if (ref.current) {
      const dataUrl = await htmlToImage.toPng(ref.current);

      console.log(dataUrl);
      const task = file.upload(dataURLtoFile(dataUrl, new Date().getTime() + '.png'));
      task.on(
        'state_changed',
        function (snap: any) {
          console.log(snap.state);
        },
        function (err: any) {
          console.log(err.message);
        },
        function () {
          getDownloadURL(task.snapshot.ref).then((url) => {
            console.log(url);
          });
        },
      );
      // download image
      // const link = document.createElement('a');
      // link.download = 'html-to-img.png';
      // link.href = dataUrl;
      // link.click();
    }
  };

  return (
    <React.Fragment>
      <button onClick={downloadImage}>download image</button>
      <div ref={ref} style={{ backgroundColor: 'white' }}>
        <div className="pagebreak" style={{ pageBreakAfter: 'always' }}>
          <b>Table #1</b>
          <br />
          <small>{'2024-02-10 10:29:29'}</small>
          <table id="print_table">
            <thead>
              <tr>
                <td className="text-start">1. ស៊ុបគុយទាវ (សាមញ្ញ)</td>
                <td className="!text-right">X1</td>
              </tr>
              <tr>
                <td className="text-start">Addons</td>
                <td className="!text-right">{'ស៊ុត X1, មី X1'}</td>
              </tr>
              <tr>
                <td className="text-start">Remark</td>
                <td className="!text-right">{'ត្រូវការគ្រឿងទេស'}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}
