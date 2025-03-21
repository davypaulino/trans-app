import { RoomItem, RoomItemSkeleton } from './roomItem';
import { DataRoomResponse } from '../../../_models/Rooms';
import { ETypesOfRoom } from '../../../_enums/ETypesOfRoom';

const RoomList = ({ rooms }: { rooms: DataRoomResponse[] }) => {

  if ( !rooms )
  {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {Array(5).fill(0).map((_, index) => (
          <RoomItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {rooms.map((room) => (
        <RoomItem 
          key={room.roomCode}
          RoomCode={room.roomCode}
          RoomType={room.roomType as keyof typeof ETypesOfRoom}
          RoomName={room.roomName}
          AmountOfPlayers={room.amountOfPlayers}
          MaxAmountOfPlayers={room.maxAmountOfPlayers}
          Owner={room.owner} />
      ))}
    </ul>
  );
}

export { RoomList };
