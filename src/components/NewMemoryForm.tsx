"use client";

import React, { FormEvent, useState } from "react";
import { Camera } from "lucide-react";
import { MidiaPicker } from "./MediaPicker";
import { api } from "@/server/api";
import { useRouter } from "next/navigation";

import Cookie from "js-cookie";

export const NewMemoryForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl") as File;

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);

      const { data } = await api.post("/upload", uploadFormData);

      coverUrl = data.url;
    }

    await api.post(
      "/memories",
      {
        content: formData.get("content"),
        coverUrl,
        isPublic: formData.get("isPublic"),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      }
    );

    router.push("/");

    setIsLoading(false);
  }

  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={handleCreateMemory}>
      <div className="flex items-center gap-4">
        <label
          htmlFor="midia"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value={"true"}
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />

          <p>Tornar publico</p>
        </label>
      </div>
      <MidiaPicker />

      <textarea
        name="content"
        id="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar foto, vídeos e relatos sobre sua experiência que você quer lembrar para sempre."
      />

      <button className=" inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-all hover:bg-green-600">
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
};
