import BtnCopy from '../Generics/BtnCopy';
import { ETypesOfRoom } from '../Enums/ETypesOfRoom';

const RoomItem = (props) => {
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

export { RoomItem };