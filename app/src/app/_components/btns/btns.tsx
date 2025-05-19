"use client"

import { useState } from "react";
import { FingerPrintIcon, IdentificationIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { ModalComponent } from "@/app/_components/modal";
import { PostRegisterForm } from '@/app/_components/_forms/postRegisterForm';
import { PostLoginForm } from '@/app/_components/_forms/postLoginForm';
import { PostCreateRoomForm } from "@/app/_components/_forms/postCreateRoomForm";

export const BtnRegister = () => {
    const [registerIsOpen, setRegisterIsOpen] = useState<boolean>(false);
    return (
        <>
            <button
                onClick={() => setRegisterIsOpen(true)}
                className="text-sm/6 font-semibold text-grey-900">
                Register <span aria-hidden="true">→</span>
            </button>
            <ModalComponent
                title="Sing in"
                open={registerIsOpen}
                setOpen={setRegisterIsOpen}
                icon={IdentificationIcon }
                description="Create your account and start play now.">
                <PostRegisterForm />
            </ModalComponent>
        </>
    );
}

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
                <PostLoginForm />
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