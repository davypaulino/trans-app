"use client";

import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';

import Link from 'next/link';

import {
    XMarkIcon,
} from '@heroicons/react/24/outline'

import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from 'react';

const NavOptions = (props) => {
        const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

        return (
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                        <div className="fixed inset-0 z-10" />
                        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">
                                        <a href="#" className="-m-1.5 p-1.5">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                                alt=""
                                                src="/assets/icon/favicon.svg"
                                                className="h-8 w-auto"
                                        />
                                        </a>
                                        <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                        >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                        </button>
                                </div>
                                <div className="mt-6 flow-root">
                                        <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                                <Disclosure as="div" className="-mx-3">
                                                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                                        Game Section
                                                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                                                </DisclosureButton>
                                                <DisclosurePanel className="mt-2 space-y-2">
                                                        {[...props.Actions, ...props.SubActions].map((item) => (
                                                        <DisclosureButton
                                                                key={item.name}
                                                                as="a"
                                                                href={item.href}
                                                                className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                        >
                                                                {item.name}
                                                        </DisclosureButton>
                                                        ))}
                                                </DisclosurePanel>
                                                </Disclosure>
                                                <Link
                                                href="/perfil"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                >
                                                Perfil
                                                </Link>
                                                <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                >
                                                Marketplace
                                                </a>
                                                <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                >
                                                Company
                                                </a>
                                        </div>
                                        <div className="py-6">
                                                <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                >
                                                Log in
                                                </a>
                                        </div>
                                        </div>
                                </div>
                        </DialogPanel>
                </Dialog>
        );
}

export  { NavOptions }