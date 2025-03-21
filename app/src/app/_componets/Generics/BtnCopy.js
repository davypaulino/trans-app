import { BsCopy } from "react-icons/bs";
import Link from 'next/link';

const BtnCopy = () => {
    return (
        <Link href='/' className='flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
            <BsCopy />
        </Link>
    );
}

export default BtnCopy;