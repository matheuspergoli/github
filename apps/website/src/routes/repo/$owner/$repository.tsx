import { Badge } from "@repo/ui/components/badge"
import { Button, buttonVariants } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@repo/ui/components/card"
import { cn } from "@repo/ui/libs/utils"
import { IconArrowLeft, IconExternalLink, IconGitFork, IconStar } from "@tabler/icons-react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { LANGUAGE_COLORS } from "@/features/github/language-colors"
import { getRepoQueryOptions } from "@/features/github/query"

export const Route = createFileRoute("/repo/$owner/$repository")({
	component: RouteComponent,
	beforeLoad: async ({ context, params }) => {
		const fullname = `${params.owner}/${params.repository}`
		const repo = await context.queryClient.ensureQueryData(getRepoQueryOptions({ fullname }))
		return { repo }
	}
})

function RouteComponent() {
	const { repo } = Route.useRouteContext()
	const [owner] = repo.full_name.split("/")

	return (
		<main className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
			<header className="flex flex-wrap items-center gap-3">
				<Link
					to="/user/$username"
					params={{ username: owner ?? "" }}
					className={cn(buttonVariants({ variant: "outline" }))}
				>
					<IconArrowLeft className="h-4 w-4" />
					Voltar para perfil
				</Link>
			</header>

			<Card>
				<CardHeader className="space-y-2">
					<CardTitle className="text-balance text-2xl tracking-tight">{repo.name}</CardTitle>
					<CardDescription className="text-base">
						{repo.description ?? "Sem descrição disponível para este repositório."}
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-5">
					<div className="flex flex-wrap items-center gap-2">
						<Badge variant="secondary" className="gap-1.5 text-xs">
							<span
								className="inline-block h-2.5 w-2.5 rounded-full"
								style={{ backgroundColor: LANGUAGE_COLORS[repo.language ?? ""] || "#888" }}
							/>
							{repo.language ?? "Sem linguagem definida"}
						</Badge>
					</div>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<div className="rounded-md border p-4">
							<p className="text-muted-foreground text-xs">Estrelas</p>
							<p className="mt-1 flex items-center gap-2 font-semibold text-lg">
								<IconStar className="h-4 w-4" />
								{repo.stargazers_count}
							</p>
						</div>

						<div className="rounded-md border p-4">
							<p className="text-muted-foreground text-xs">Forks</p>
							<p className="mt-1 flex items-center gap-2 font-semibold text-lg">
								<IconGitFork className="h-4 w-4" />
								{repo.forks_count}
							</p>
						</div>
					</div>

					<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
						<Button className="w-full sm:w-auto">
							<IconExternalLink className="mr-2 h-4 w-4" />
							Abrir no GitHub
						</Button>
					</a>
				</CardContent>
			</Card>
		</main>
	)
}
