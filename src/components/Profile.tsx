import { getUsers } from "@/app/lib/auth";
import Image from "next/image";
import React from "react";

export const Profile = () => {
  const { name, avatarUrl } = getUsers();

  return (
    <div className="flex items-center gap-3 text-left ">
      <Image
        src={avatarUrl}
        alt="Avatar"
        width={40}
        height={40}
        className=" h-10 w-10 rounded-full"
      />

      <p className="text-sm leading-snug">
        {" "}
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 transition-all hover:text-red-300"
        >
          Quero sair
        </a>
      </p>
    </div>
  );
};
