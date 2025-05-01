import { FC } from "react";
import BtnCopy from "@/app/_components/btnCopy";
import { RoomItemDto } from "@/app/_components/_dtos/userSession/roomItemDto";
import { ERoomType } from "@/app/_lib/RoomType";
import { BsCopy } from "react-icons/bs";

interface Props {
    content: RoomItemDto
}

const RoomItemComponent: FC<Props> = ({content}) => {
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4 items-center">
                <BtnCopy className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" roomCode={content.roomCode}/>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{ERoomType[content.type]}: {content.roomName}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{"code: " + content.roomCode}</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">{content.numberOfPlayers}/{content.maxNumberOfPlayers}</p>
                <p className="mt-1 text-xs/5 text-gray-500">Owner: {content.owner}</p>
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

export { RoomItemComponent, RoomItemSkeleton };