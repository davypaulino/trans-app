'use client'

import { useState, } from "react";
import { ModalComponent } from "@/app/_components/modal";
import { PuzzlePieceIcon} from '@heroicons/react/24/outline';
import { PostCreateRoomForm } from "@/app/_components/_forms/postCreateRoomForm";
import Background from '@/app/_components/background';

export default function Home() {
  const [createRoomModalIsOpen, setCreateRoomModal] = useState<boolean>(false);
  const [createSinglePlayerIsOpen, setCreateSinglePlayerIsOpen] = useState<boolean>(false);

  return (
    <section>
      <Background />
      <div className="mx-auto max-w-2xl py-5 sm:py-12 lg:py-12 pt-20">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Start playing now!
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Create a room and look for partners.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => setCreateRoomModal(true)}
              className="rounded-md bg-emerald-600 px-13.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Play
            </button>
          </div>
        </div>
      </div>
      <ModalComponent
        title="Create a Room"
        open={createRoomModalIsOpen}
        setOpen={setCreateRoomModal}
        icon={PuzzlePieceIcon}
        description="Create a room to play with up to 4 people">
        <PostCreateRoomForm />
      </ModalComponent>
    </section>
  );
}