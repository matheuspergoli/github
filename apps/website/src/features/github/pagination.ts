export const REPOSITORIES_PER_PAGE = 12

export type PaginationPageItem = number | "start-ellipsis" | "end-ellipsis"

export const getPaginationPages = (
	currentPage: number,
	totalPages: number
): PaginationPageItem[] => {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, index) => index + 1)
	}

	const pages: PaginationPageItem[] = [1]

	let start = Math.max(2, currentPage - 1)
	let end = Math.min(totalPages - 1, currentPage + 1)

	if (currentPage <= 3) {
		start = 2
		end = 4
	}

	if (currentPage >= totalPages - 2) {
		start = totalPages - 3
		end = totalPages - 1
	}

	if (start > 2) {
		pages.push("start-ellipsis")
	}

	for (let page = start; page <= end; page += 1) {
		pages.push(page)
	}

	if (end < totalPages - 1) {
		pages.push("end-ellipsis")
	}

	pages.push(totalPages)

	return pages
}
