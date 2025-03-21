import { BsCopy } from "react-icons/bs";

interface BtnCopyProps {
    RoomCode: string;
}

const BtnCopy = ({ RoomCode }: BtnCopyProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(RoomCode)
            .then(() => {
                alert("Room code copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <button
            onClick={handleCopy}
            className='flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
            <BsCopy />
        </button>
    );
}

export default BtnCopy;