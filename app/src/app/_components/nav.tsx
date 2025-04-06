'use client'

import Link from "next/link";
import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavItems } from "../_lib/_nav/navOptions";
import { NavPopoverComponent } from "./navPopover";

export const NavComponent = () => {
    return (
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Pung Game</span>
                    <img
                    alt=""
                    src="/assets/icon/favicon.svg"
                    className="h-8 w-auto"
                    />
                </Link>
            </div>
            <div className="flex lg:hidden">
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
            </div>

            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                {NavItems.map((item) => (
                    item.href === null ?
                    <NavPopoverComponent item={item} />
                    : <Link href={item.href ?? ""} className="text-sm/6 font-semibold text-gray-900">
                        {item.name}
                    </Link>
                ))}
            </PopoverGroup>
        </nav>
    );
}