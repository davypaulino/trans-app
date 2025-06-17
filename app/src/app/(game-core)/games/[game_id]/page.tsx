"use server"

import { Board } from "../_components/Board";

export default async function Page() {
    return (
        <div className="container mx-auto bg-slate-300 flex justify-center items-center">
            <div className="bg-slate-500">
                <Board />
            </div>
        </div>
    );
}