import BtnCopy from '../../../ui/btn/btnCopy';
import { ETypesOfRoom } from '../../../_enums/ETypesOfRoom'
import { FC } from 'react';
import { BsCopy } from "react-icons/bs";

interface RoomItemProps {
    RoomCode: string;
    RoomType: keyof typeof ETypesOfRoom;
    RoomName: string;
    AmountOfPlayers: number;
    MaxAmountOfPlayers: number;
    Owner: string;
}

const RoomItem: FC<RoomItemProps> = (props) => {
    return (
      <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4 items-center">
              <BtnCopy RoomCode={props.RoomCode}/>
              <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">{ETypesOfRoom[props.RoomType]}: {props.RoomName}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">{"code: " + props.RoomCode}</p>
              </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">{props.AmountOfPlayers}/{props.MaxAmountOfPlayers}</p>
              <p className="mt-1 text-xs/5 text-gray-500">Owner: {props.Owner}</p>
          </div>
      </li>
    );
}

const RoomItemSkeleton: React.FC = () => {
    return (
      <li className="flex justify-between gap-x-6 py-5 animate-pulse">
        <div className="flex min-w-0 gap-x-4 items-center">
          <div className="flex items-center space-x-2 p-2 w-8 h-8 bg-gray-300 rounded">
            <BsCopy className='text-gray-500' />
          </div>
          <div className="min-w-0 flex-auto">
            <div className="w-50 h-4 bg-gray-300 rounded mb-2" />
            <div className="mt-1 truncate text-xs/5 text-gray-500 bg-gray-300 rounded h-4 w-1/2"></div>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="w-6 h-4 bg-gray-300 rounded mb-2" />
            <div className="w-10 h-4 bg-gray-300 rounded mb-2" />
        </div>
      </li>
    );
};
  

export { RoomItem, RoomItemSkeleton };
export type { RoomItemProps };