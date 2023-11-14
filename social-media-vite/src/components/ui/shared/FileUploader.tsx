"use client";

import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

type FileUploaderProps = {
  fieldchange: (FILES: File[]) => void; // 注意
  mediaUrl: string;
};

// rafce
const FileUploader = ({ fieldchange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File[]>([]); // file itself

  // 以下はファイルがドロップされたときの処理
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldchange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", "jpeg", "jpg", ".png", "svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full lg:p-10">
            {/* ドロップ/選択した画像の表示 */}
            <img
              src={fileUrl}
              alt="uploaded image"
              className="file_uploader-img"
            />
          </div>
          <p className="text-light-4 text-center small-regular w-full p-4 border-t border-t-dark-4">
            Click or drag a photo to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="/assets/react.svg" alt="drop-here" width={96} height={96} />
          test2
          <h3 className="text-light-2 base-medium mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-3 text-[14px] font-normal leading-[140%] mb-4">
            SVG, JPG, PNG
          </p>
          <Button className="shad-button_dark_4">Select from local</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
