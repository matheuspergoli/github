import { Badge } from "@repo/ui/components/badge"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@repo/ui/components/card"
import { IconGitFork, IconStar } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { LANGUAGE_COLORS } from "@/features/github/language-colors"
import type { GitHubRepo } from "@/features/github/query"

interface RepositoryCardProps {
	repo: GitHubRepo
}

export const RepositoryCard = ({ repo }: RepositoryCardProps) => {
	const [owner, repository] = repo.full_name.split("/")

	if (!owner || !repository) return null

	return (
		<Link className="block" to="/repo/$owner/$repository" params={{ owner, repository }}>
			<Card className="outline-accent-foreground hover:outline-1">
				<CardHeader>
					<CardTitle className="text-green-500">{repo.name}</CardTitle>
					<CardDescription>{repo.description ?? "Sem descrição."}</CardDescription>
					<CardAction>
						<div className="flex items-center gap-3 text-muted-foreground text-sm">
							<span className="flex items-center gap-1">
								<IconStar className="h-3.5 w-3.5" />
								{repo.stargazers_count}
							</span>
							<span className="flex items-center gap-1">
								<IconGitFork className="h-3.5 w-3.5" />
								{repo.forks_count}
							</span>
						</div>
					</CardAction>
				</CardHeader>
				<CardContent>
					<Badge variant="secondary" className="gap-1.5 text-xs">
						<span
							className="inline-block h-2.5 w-2.5 rounded-full"
							style={{ backgroundColor: LANGUAGE_COLORS[repo.language ?? ""] || "#888" }}
						/>
						{repo.language}
					</Badge>
				</CardContent>
			</Card>
		</Link>
	)
}
