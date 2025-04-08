'use client'

import { useState, useEffect } from "react";
import { Pagination } from "@/app/_components/pagination";
import { PaginationResponse } from "@/app/_components/_dtos/paginationResponse";
import { RoomItemDto } from "@/app/_components/_dtos/userSession/roomItemDto";
import { getAllRooms } from "@/app/_lib/_gateways/userSession";
import { RequestParamsDto } from "@/app/_components/_dtos/requestParamsDto";
import { RoomsComponent } from "@/app/(user-session)/rooms/_components/rooms";
import { PutPlayerOnRoomForm } from "@/app/_components/_forms/putPlayerOnRoomForm";

export default function Page() {
  const [pagination, setPagination] = useState<PaginationResponse<RoomItemDto> | null>(null);
  const [rooms, setRooms] = useState<RoomItemDto[] | null>(null)

  const fetchDataRooms = async (page: number) => {
      setRooms(null);
      const requestParams: RequestParamsDto<string> = { page: page };
      const data = await getAllRooms(requestParams);
      console.log(data)
      setPagination(data);
      setRooms(data.content);
  }

  useEffect(() => {
      fetchDataRooms(1);
  }, []);

  const handler = async (event: React.MouseEvent<HTMLButtonElement>) => {
      const page = parseInt(event.currentTarget.value);
      fetchDataRooms(page);
  };

  console.log(rooms)

  return (
    <section className="container mx-auto flex justify-around">
      <div>
        <h1 className="text-2xl text-center mb-3 font-bold">Enter in a Room</h1>
        <PutPlayerOnRoomForm className="min-w-[300] max-w-[600] max-h-[500] mx-auto shadow-lg shadow-slate-300/50" />
      </div>
      <Pagination pagination={pagination} handlerPagination={handler}>
        <RoomsComponent rooms={rooms}/>
      </Pagination>
    </section>
  );
}
