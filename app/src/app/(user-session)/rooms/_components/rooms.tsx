import { ERoomType } from "@/app/_lib/RoomType";
import { RoomItemDto } from "@/app/_components/_dtos/userSession/roomItemDto";
import { RoomItemComponent, RoomItemSkeleton } from "./roomItem";

const RoomsComponent = ({ rooms }: { rooms: RoomItemDto[] | null }) => {

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
          <RoomItemComponent 
            key={room.roomCode}
            content={room} />
        ))}
      </ul>
    );
}

export { RoomsComponent };