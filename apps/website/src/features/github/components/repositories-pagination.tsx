import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "@repo/ui/components/pagination"
import type { PaginationPageItem } from "@/features/github/pagination"

interface RepositoriesPaginationProps {
	currentPage: number
	totalPages: number
	pageItems: PaginationPageItem[]
	onPageChange: (page: number) => void
}

export const RepositoriesPagination = ({
	currentPage,
	totalPages,
	pageItems,
	onPageChange
}: RepositoriesPaginationProps) => {
	if (totalPages <= 1) return null

	return (
		<Pagination className="pt-3">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						text="Anterior"
						className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
						onClick={(event) => {
							event.preventDefault()
							onPageChange(Math.max(1, currentPage - 1))
						}}
					/>
				</PaginationItem>

				{pageItems.map((page) => (
					<PaginationItem key={String(page)}>
						{typeof page === "number" ? (
							<PaginationLink
								href="#"
								isActive={currentPage === page}
								onClick={(event) => {
									event.preventDefault()
									onPageChange(page)
								}}
							>
								{page}
							</PaginationLink>
						) : (
							<PaginationEllipsis />
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href="#"
						text="Próxima"
						className={
							currentPage === totalPages ? "pointer-events-none opacity-50" : undefined
						}
						onClick={(event) => {
							event.preventDefault()
							onPageChange(Math.min(totalPages, currentPage + 1))
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
