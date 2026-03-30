import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Button, buttonVariants } from "@repo/ui/components/button"
import { Label } from "@repo/ui/components/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@repo/ui/components/select"
import { Separator } from "@repo/ui/components/separator"
import { cn } from "@repo/ui/libs/utils"
import {
	IconArrowLeft,
	IconBook,
	IconExternalLink,
	IconMail,
	IconMapPin,
	IconUsers
} from "@tabler/icons-react"
import { createFileRoute, Link } from "@tanstack/react-router"
import React from "react"
import { RepositoriesPagination } from "@/features/github/components/repositories-pagination"
import { RepositoryCard } from "@/features/github/components/repository-card"
import { getPaginationPages, REPOSITORIES_PER_PAGE } from "@/features/github/pagination"
import { getUserQueryOptions, getUserReposQueryOptions } from "@/features/github/query"
import { REPO_SORT_LABELS, type RepoSortOrder, sortRepositories } from "@/features/github/sort"

export const Route = createFileRoute("/user/$username")({
	component: RouteComponent,
	beforeLoad: async ({ context, params }) => {
		const [profile, repos] = await Promise.all([
			context.queryClient.ensureQueryData(getUserQueryOptions({ username: params.username })),
			context.queryClient.ensureQueryData(
				getUserReposQueryOptions({ username: params.username })
			)
		])

		return {
			user: {
				...profile,
				repositories: repos
			}
		}
	}
})

function RouteComponent() {
	const { user } = Route.useRouteContext()
	const [sortOrder, setSortOrder] = React.useState<RepoSortOrder>("stars_desc")
	const [currentPage, setCurrentPage] = React.useState(1)

	const repositories = React.useMemo(() => {
		return sortRepositories(user.repositories, sortOrder)
	}, [sortOrder, user.repositories])

	const totalPages = Math.max(1, Math.ceil(repositories.length / REPOSITORIES_PER_PAGE))

	React.useEffect(() => {
		setCurrentPage(1)
	}, [])

	React.useEffect(() => {
		setCurrentPage((page) => Math.min(page, totalPages))
	}, [totalPages])

	const paginatedRepositories = React.useMemo(() => {
		const start = (currentPage - 1) * REPOSITORIES_PER_PAGE
		return repositories.slice(start, start + REPOSITORIES_PER_PAGE)
	}, [currentPage, repositories])

	const pageItems = React.useMemo(() => {
		return getPaginationPages(currentPage, totalPages)
	}, [currentPage, totalPages])

	return (
		<>
			<header className="border-b py-3">
				<div className="container mx-auto flex flex-wrap items-center gap-3 px-4">
					<Link to="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
						<IconArrowLeft />
						Voltar
					</Link>

					<p className="font-mono text-muted-foreground">/{user.login}</p>
				</div>
			</header>

			<main className="container mx-auto mt-8 grid grid-cols-1 gap-8 px-4 pb-10 lg:grid-cols-12 lg:gap-10">
				<section className="space-y-4 lg:col-span-4">
					<div className="flex justify-center border p-4">
						<Avatar className="size-44 rounded-none">
							<AvatarImage src={user.avatar_url} alt={`Avatar de ${user.login}`} />
							<AvatarFallback className="rounded-none text-base">
								{(user.name ?? user.login).slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</div>

					<div>
						<p className="font-semibold text-2xl tracking-tighter">
							{user.name ?? user.login}
						</p>
						<p className="font-mono text-muted-foreground text-sm">@{user.login}</p>
					</div>

					<p className="text-sm leading-relaxed">{user.bio ?? "Sem bio disponível."}</p>

					<div className="flex gap-1.5 text-sm">
						<span className="flex items-center gap-1">
							<IconUsers className="h-4 w-4 text-muted-foreground" />
							<strong>{user.followers}</strong>
							<span className="text-muted-foreground">seguidores</span>
						</span>
						<span>·</span>
						<span className="flex items-center gap-1">
							<strong>{user.following}</strong>
							<span className="text-muted-foreground">seguindo</span>
						</span>
					</div>

					{user.location && (
						<p className="flex items-center gap-2 text-muted-foreground text-sm">
							<IconMapPin className="h-4 w-4" />
							{user.location}
						</p>
					)}

					<p className="flex items-center gap-2 text-muted-foreground text-sm">
						<IconMail className="h-4 w-4" />
						{user.email ? (
							<a href={`mailto:${user.email}`} className="hover:underline">
								{user.email}
							</a>
						) : (
							<span>Email não público</span>
						)}
					</p>

					<div className="flex items-center gap-2 text-muted-foreground text-sm">
						<IconBook className="h-4 w-4" />
						<span>{user.public_repos} repositórios públicos</span>
					</div>

					<Separator />

					<a href={user.html_url} target="_blank" rel="noopener noreferrer">
						<Button variant="outline" className="mt-2 w-full">
							<IconExternalLink className="mr-2 h-4 w-4" />
							Ver no GitHub
						</Button>
					</a>
				</section>

				<section className="space-y-3.5 lg:col-span-8">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<h3 className="font-semibold text-xl">Repositórios ({repositories.length})</h3>

						<div className="flex items-center gap-2">
							<Label htmlFor="repo-order">Ordenar por</Label>
							<Select
								value={sortOrder}
								onValueChange={(value) => setSortOrder(value as RepoSortOrder)}
							>
								<SelectTrigger id="repo-order" className="min-w-52">
									<SelectValue placeholder="Escolha a ordenação">
										{REPO_SORT_LABELS[sortOrder]}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									{(Object.keys(REPO_SORT_LABELS) as RepoSortOrder[]).map((orderKey) => (
										<SelectItem key={orderKey} value={orderKey}>
											{REPO_SORT_LABELS[orderKey]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{repositories.length === 0 && (
						<Alert>
							<AlertTitle>Nenhum repositório encontrado</AlertTitle>
							<AlertDescription>
								Este usuário não possui repositórios públicos para listar.
							</AlertDescription>
						</Alert>
					)}

					{paginatedRepositories.map((repo) => (
						<RepositoryCard key={repo.id} repo={repo} />
					))}

					<RepositoriesPagination
						currentPage={currentPage}
						totalPages={totalPages}
						pageItems={pageItems}
						onPageChange={setCurrentPage}
					/>
				</section>
			</main>
		</>
	)
}
