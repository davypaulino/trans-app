'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { PaginationResponse } from '@/app/_components/_dtos/paginationResponse';

function Pagination<T>({
    children,
    handlerPagination,
    pagination,
    className
}: {
    children: React.ReactNode
    handlerPagination: (event: React.MouseEvent<HTMLButtonElement>) => void
    pagination: PaginationResponse<T> | null,
    className?: string
}) {
    const currentBtn: string = "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
    const defaultBtn: string = "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0";
    if (pagination == null) {
        return (<p></p>);
    }
    return (
    <section className={`max-w-[450px] shadow-lg rounded-lg px-5 py-3 ${className ?? ""}`}>
        {children}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                value={pagination?.hasPreviousPage ? pagination.previousPage ?? "1" : "1"}
                disabled={!pagination?.hasPreviousPage}
                onClick={handlerPagination}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                Previous
                </button>
                <button
                value={pagination?.hasNextPage ? pagination.nextPage ?? "1" : "1"}
                disabled={!pagination?.hasNextPage}
                onClick={handlerPagination}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                        {(pagination?.currentPage - 1) * pagination?.pageSize + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                        {Math.min(pagination?.currentPage * pagination?.pageSize, pagination.totalItems)}
                    </span>{' '}
                    of <span className="font-medium">{pagination.totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav aria-label="pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                    <button
                        value={pagination?.previousPage ?? 1}
                        disabled={!pagination?.hasPreviousPage}
                        onClick={handlerPagination}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon aria-hidden="true" className="size-5" />
                    </button>

                    {Array.from({ length: pagination?.totalPages }, (_, index) => (
                        <button
                        key={`pagination-key-${index + 1}`}
                        value={index + 1}
                        onClick={handlerPagination}
                        className={`relative inline-flex items-center px-3 py-2 ${
                            index + 1 === pagination?.currentPage ? currentBtn : defaultBtn
                        }`}
                        >
                        {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={!pagination?.hasNextPage}
                        value={pagination?.nextPage ?? 1}
                        onClick={handlerPagination}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon aria-hidden="true" className="size-5" />
                    </button>
                    </nav>
                </div>
            </div>

        </div>
    </section>
  );
}

export { Pagination };