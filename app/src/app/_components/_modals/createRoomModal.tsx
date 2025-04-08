'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { PuzzlePieceIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { PostCreateRoomForm } from '../_forms/postCreateRoomForm'

export function CreateRoomModal() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            {/* Exit Button */}
            <div
                onClick={() => setOpen(false)}
                className="absolute top-4 right-6 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-red-500 rounded-full"
            >
                <XCircleIcon aria-hidden="true" className='text-gray-700 hover:text-gray-900' />
            </div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:size-10">
                  <PuzzlePieceIcon aria-hidden="true" className="size-6 text-emerald-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Create a Room
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Create a room to play with up to 4 people
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <PostCreateRoomForm />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
