import { BsCopy } from "react-icons/bs";
import Link from 'next/link';

interface BtnCopyProps {
    roomCode: string;
    className?: string
}

const BtnCopy: React.FC<BtnCopyProps> = ({ roomCode, className }) => {
    return (
        <Link href='/' className={`flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}>
            <BsCopy />
        </Link>
    );
}

export default BtnCopy;