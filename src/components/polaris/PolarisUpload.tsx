import { useFirebase } from '@/hook/useFirebsae';
import { Banner, DropZone, LegacyStack, List, Spinner, Text, Thumbnail } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { getDownloadURL } from 'firebase/storage';

export function PolarisUpload(props: { url: string; setUrl: (url: string) => void; onLoading: (v: boolean) => void }) {
  const { file } = useFirebase();
  const [files, setFiles] = useState<any[]>(props.url ? [props.url] : []);
  const [loading, setLoading] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState<any[]>([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles: File[], acceptedFiles: File[], rejectedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const task = file.upload(acceptedFiles[0]);
        task.on(
          'state_changed',
          function (snap: any) {
            console.log(snap.state);
            setLoading(true);
            props.onLoading(true);
          },
          function (err: any) {
            console.log(err.message);
            setLoading(false);
            props.onLoading(false);
          },
          function () {
            getDownloadURL(task.snapshot.ref).then((url) => {
              setFiles([url]);
              props.setUrl(url);
              setLoading(false);
              props.onLoading(false);
            });
          },
        );
      }
      // setFiles((files) => [acceptedFiles[0]]);
      setRejectedFiles(rejectedFiles);
    },
    [file, props],
  );

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div className="flex flex-col justify-center items-center h-full">
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail size="large" alt={file.name} source={file} />
        </LegacyStack>
      ))}
    </div>
  );

  const errorMessage = hasError && (
    <Banner title="The following images couldn’t be uploaded:" tone="critical">
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>{`"${file}" is not supported. File type must be .gif, .jpg, .png or .svg.`}</List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <LegacyStack vertical>
      {errorMessage}
      <DropZone accept="image/*" type="image" onDrop={handleDrop} allowMultiple={false}>
        {loading && (
          <div className="flex flex-col justify-center items-center h-full">
            <LegacyStack alignment="center">
              <Spinner size="small" />
            </LegacyStack>
          </div>
        )}
        {!loading && uploadedFiles}
        {fileUpload}
      </DropZone>
    </LegacyStack>
  );
}
