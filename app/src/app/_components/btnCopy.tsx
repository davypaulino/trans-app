import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { showToast } from "@/app/_components/toastComponent";

interface BtnCopyProps {
    roomCode: string;
    className?: string
    showCode?: boolean
}

const BtnCopy: React.FC<BtnCopyProps> = ({ roomCode, className, showCode }) => {
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
            className={`${className}`}
        >
            <BsCopy />
            {showCode ? <span>{roomCode}</span> : ""}
        </button>
    );
}

export default BtnCopy;