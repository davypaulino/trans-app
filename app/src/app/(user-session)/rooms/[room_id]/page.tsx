'use client'

import { useParams } from "next/navigation";
import { MatchRoom } from "../_components/_room/matchRoom";

export default function Page() {
    const params = useParams();

    return (
        <section className="container mx-auto h-[90vh] w-[80vw] bg-slate-300 rounded-b-lg p-6">
            <MatchRoom />
        </section>
    );
}