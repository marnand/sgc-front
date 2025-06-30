import { useState } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedItems = items.slice(startIndex, endIndex)

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    displayedItems,
    totalItems: items.length
  }
}