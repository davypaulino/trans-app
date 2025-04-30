'use client'
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import * as THREE from 'three'; 
import { Board } from "../_components/Board";
import { Board3D } from "../_components/Board3D";

export default function Page() {
    return (
        <div className="container mx-auto bg-slate-300 flex justify-center items-center">
            <div className="bg-slate-500">
                <Board />
                {/* <Board3D /> */}
            </div>
        </div>
    );
}