import { useState, useEffect } from 'react';
import { RoomItem } from '../Rooms/RoomItem';
import { FetchRooms, AddPlayerToRoom } from '../Repositories/RoomRepository';

const List = ( { rooms } ) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {rooms.map((room) => (
        <RoomItem 
          key={room.roomCode}
          RoomCode={room.roomCode}
          RoomType={room.roomType}
          RoomName={room.roomName}
          AmountOfPlayers={room.amountOfPlayers}
          MaxAmountOfPlayers={room.maxAmountOfPlayers}
          Owner={room.owner} />
      ))}
    </ul>
  )
}

export { List };
