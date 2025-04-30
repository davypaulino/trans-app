import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { showToast } from "@/app/_components/toastComponent";

interface BtnCopyProps {
    roomCode: string;
    className?: string
}

const BtnCopy: React.FC<BtnCopyProps> = ({ roomCode, className }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(roomCode).then(() => {
            setCopied(true);
            showToast("Código copiado!", "success")
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            showToast("Erro ao copiar", "error");
        });
    };
    return (
        <button 
            onClick={handleCopy} 
            className={`flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
        >
            <BsCopy />
        </button>
    );
}

export default BtnCopy;