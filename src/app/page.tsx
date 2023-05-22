import React from "react";

// components
import { EmptyMemories } from "@/components/EmptyMemories";
import { cookies } from "next/headers";
import { api } from "@/server/api";

import dayjs from "dayjs";
import prBr from "dayjs/locale/pt-br";
import Image from "next/image";

dayjs.locale(prBr);

interface Memory {
  id: string;
  coverUrl: string;
  content: string;
  createdAt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const { data } = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });

  if (data.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="mt-16 flex flex-col gap-10">
      {data.map((memory: Memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format("D [ de ] MMMM[,] YYYY")}
            </time>

            <Image
              src={memory.coverUrl}
              alt="Memory"
              width={800}
              height={400}
            />
          </div>
        );
      })}
    </div>
  );
}
