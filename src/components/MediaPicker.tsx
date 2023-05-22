"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

// eslint-disable-next-line prettier/prettier, no-unused-expressions

export const MidiaPicker = () => {
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);

    setPreview(previewURL);
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="midia"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={200}
          height={200}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  );
};
