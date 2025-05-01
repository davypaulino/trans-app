'use client'

import { Board } from "../_components/Board";

export default function Page() {
    return (
        <div className="container mx-auto bg-slate-300 flex justify-center items-center">
            <div className="bg-slate-500">
                <Board />
                <div className="flex">
                    <div>
                        <div></div>
                        <div>X</div>
                    </div>
                </div>
                {/* <Board3D /> */}
            </div>
        </div>
    );
}