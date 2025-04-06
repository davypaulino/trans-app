'use client'

import { useState, useEffect } from "react";
import { Pagination } from "./_components/pagination";
import { PaginationResponse } from "./_components/_dtos/paginationResponse";
import { RoomItemDto } from "./_components/_dtos/userSession/roomItemDto";
import { getAllRooms } from "./_lib/_gateways/userSession";
import { RequestParamsDto } from "./_components/_dtos/requestParamsDto";
import { RoomsComponent } from "./(user-session)/rooms/_components/rooms";

const paginationTest: PaginationResponse<string> = {
  currentPage: 2,
  pageSize: 5,
  nextPage: 3,
  previousPage: 1,
  hasNextPage: true,
  hasPreviousPage: true,
  totalPages: 3,
  content: ["hello"]
}

export default function Home() {
  const [pagination, setPagination] = useState<PaginationResponse<RoomItemDto> | null>(null);
  const [rooms, setRooms] = useState<RoomItemDto[] | null>(null)

  const fetchDataRooms = async (page: number) => {
      setRooms(null);
      const requestParams: RequestParamsDto<string> = { page: page };
      const data = await getAllRooms(requestParams);
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

  return (
  <Pagination pagination={paginationTest} handlerPagination={handler}>
    <RoomsComponent rooms={rooms}/>
  </Pagination>);
}
