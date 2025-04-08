'use client'

import Link from 'next/link';
import { useState, useEffect } from "react";
import { PaginationResponse } from "./_components/_dtos/paginationResponse";
import { RoomItemDto } from "./_components/_dtos/userSession/roomItemDto";
import { getAllRooms } from "./_lib/_gateways/userSession";
import { RequestParamsDto } from "@/app/_components/_dtos/requestParamsDto";
import { ModalComponent } from "@/app/_components/modal";
import { PuzzlePieceIcon, FingerPrintIcon, IdentificationIcon  } from '@heroicons/react/24/outline';
import { PostCreateRoomForm } from "./_components/_forms/postCreateRoomForm";
import { PostLoginForm } from '@/app/_components/_forms/postLoginForm';
import Background from '@/app/_components/background';
import { PostRegisterForm } from './_components/_forms/postRegisterForm';

export default function Home() {
  const [createRoomModalIsOpen, setCreateRoomModal] = useState<boolean>(false);
  const [loginisOpen, setLoginisOpen] = useState<boolean>(false);
  const [registerIsOpen, setRegisterIsOpen] = useState<boolean>(false);

  return (
    <section>
      <Background />
      <div className="mx-auto max-w-2xl py-5 sm:py-12 lg:py-12 pt-20">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Start playing now!
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Create your account or sign up to start playing now with friends.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => setLoginisOpen(true)}
              className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Login
            </button>
            <button
              onClick={() => setRegisterIsOpen(true)}
              className="text-sm/6 font-semibold text-grey-900">
              Register <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <ModalComponent
        title="Sing in"
        open={loginisOpen}
        setOpen={setLoginisOpen}
        icon={FingerPrintIcon}
        description="Login into your account, and start play now.">
        <PostLoginForm />
      </ModalComponent>

      <ModalComponent
        title="Sing in"
        open={registerIsOpen}
        setOpen={setRegisterIsOpen}
        icon={IdentificationIcon }
        description="Create your account and start play now.">
        <PostRegisterForm />
      </ModalComponent>
    </section>
  );
}