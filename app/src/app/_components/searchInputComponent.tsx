"use client";

import { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchInputProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

const SearchInputComponent: React.FC<SearchInputProps> = ({ placeholder = "Buscar...", onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleBlur = () => {
        if (onSearch && query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full shadow-sm">
            <BsSearch className="text-gray-500 mr-2" size={18} />
            <input
                type="text"
                value={query}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="bg-transparent outline-none w-full text-gray-800"
            />
        </div>
    );
};

export default SearchInputComponent;
