import { BsCopy } from "react-icons/bs";
import Link from 'next/link';
import { useState, useEffect } from 'react';

// const rooms = [
//   {
//     nickname: 'Leslie Alexander',
//     owner: 'leslie.alexander@example.com',
//     numberOfPlayers: 1,
//     roomSize: 2,
//     roomCode: "2db56cbe",
//     role: 'Co-Founder / CEO',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     nickname: 'Michael Foster',
//     owner: 'michael.foster@example.com',
//     numberOfPlayers: 3,
//     roomSize: 4,
//     roomCode: "1db12cbe",
//     role: 'Co-Founder / CTO',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
// ]

const ETypesOfRoom = {
  0: "Match",
  1: "Tournament",
  2: "Single Player"
}

const Endpoint = "https://didactic-telegram-w9xqw6x46pxf5gv4-8443.app.github.dev";

const List = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null);

    useEffect(() => {
        // Example API endpoint
        const fetchRooms = async () => {
            try {
            const response = await fetch(`${Endpoint}/api/v1/user-session/rooms/?currentPage=1&pageSize=5&filterLabel=`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
                if (!response.ok) {
                    throw new Error("Failed to fetch rooms");
                }
                const data = await response.json();
                console.log(data);
                setRooms(data.paginatedItems.Data); // store the data in the state
            } catch (err) {
                setError(err.message); // set error if fetching fails
            } finally {
                setLoading(false); // set loading to false after fetching
            }
        };

        fetchRooms(); // fetch the rooms when the component mounts
    }, []); 

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {rooms.map((room) => (
        <li key={room.roomCode} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4 items-center">
            <CopyButton RoomCode={room.roomCode}/>
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{ETypesOfRoom[room.roomType]}: {room.roomName}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">{"code: " + room.roomCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">{room.amountOfPlayers}/{room.maxAmountOfPlayers}</p>
            <p className="mt-1 text-xs/5 text-gray-500">Owner: {room.owner}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

const CopyButton = (Props) => {
    return (
        <Link href='/' className='flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
            <BsCopy />
        </Link>
    );
}

export { List }
