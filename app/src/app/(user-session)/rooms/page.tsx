'use client';

import { useState, useEffect, Suspense } from 'react';
import { Pagination } from '../../ui/pagination'
import { fetchRooms } from '../../_repositories/roomsRepository';
import { RoomList } from './_components/roomList';
import { DataRoomResponse, PaginationResponse } from '../../_models/Rooms';
import { EnterIntoRoomForm } from './_components/enterIntoRoomForm';

export default function Page() {
    const [pagination, setPagination] = useState<PaginationResponse | null>(null);
    const [rooms, setRooms] = useState<DataRoomResponse[] | null>(null)

    const fetchDataRooms = async (page: number) => {
        setRooms(null);
        const data = await fetchRooms(page);
        setPagination(data);
        setRooms(data.Data);
    }

    useEffect(() => {
        fetchDataRooms(1);
    }, []);

    const handler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const page = parseInt(event.currentTarget.value);
        fetchDataRooms(page);
    };

    return (
        <Suspense fallback={<div>Loading Data...</div>}>
            <EnterIntoRoomForm/>
            <Pagination
                pagination={pagination}
                handlerPagination={handler}
                >
                    <RoomList rooms={rooms}/>
            </Pagination>
        </Suspense>
  )
}