import {
    Popover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react';
import Link from "next/link";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import type { INavItem } from '@/app/_lib/_nav/navOptions'

interface NavPopoverProps {
    item: INavItem;
    className?: string;
}

export const NavPopoverComponent = ({
    item,
    className,
}: NavPopoverProps) => {
    return (
        <Popover className={`relative ${className}`}>
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-gray-200">
                Game Section
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-900 dark:text-gray-200" />
            </PopoverButton>
    
            <PopoverPanel
            transition
            className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
                <div className="p-4">
                    {item.options?.map((item) => (
                    <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                    >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon aria-hidden={true} className="size-6 text-gray-600 group-hover:text-indigo-600" />
                        </div>
                        <div className="flex-auto">
                        <Link href={item.href} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {item.sideOptions?.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                    >
                        <item.icon aria-hidden={true} className="size-5 flex-none text-gray-400" />
                        {item.name}
                    </a>
                    ))}
                </div>
            </PopoverPanel>
        </Popover>
    );
}