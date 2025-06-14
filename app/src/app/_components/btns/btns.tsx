"use client"

import { useState } from "react";
import { FingerPrintIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { ModalComponent } from "@/app/_components/modal";
import { PostCreateRoomForm } from "@/app/_components/_forms/postCreateRoomForm";
import {LoginModal} from "@/app/_components/_modals/loginModal";

export const BtnLogin = () => {
    const [loginisOpen, setLoginisOpen] = useState<boolean>(false);

    return (
        <>
            <button
              onClick={() => setLoginisOpen(true)}
              className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Login
            </button>
            <ModalComponent
                title="Sing in"
                open={loginisOpen}
                setOpen={setLoginisOpen}
                icon={FingerPrintIcon}
                description="Login into your account, and start play now.">
                <LoginModal />
            </ModalComponent>
        </>
    );
}

export const BtnEnterInRoom = () => {
    const [createRoomModalIsOpen, setCreateRoomModal] = useState<boolean>(false);
    return (
        <>
            <button
              onClick={() => setCreateRoomModal(true)}
              className="rounded-md bg-emerald-600 px-13.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Play
            </button>
            <ModalComponent
                title="Create a Room"
                open={createRoomModalIsOpen}
                setOpen={setCreateRoomModal}
                icon={PuzzlePieceIcon}
                description="Create a room to play with up to 4 people">
                <PostCreateRoomForm />
            </ModalComponent>
        </>
    );
}