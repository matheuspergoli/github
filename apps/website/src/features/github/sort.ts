import type { GitHubRepo } from "@/features/github/query"

export type RepoSortOrder = "stars_desc" | "stars_asc" | "name_asc" | "name_desc"

export const REPO_SORT_LABELS: Record<RepoSortOrder, string> = {
	name_asc: "Nome (A-Z)",
	name_desc: "Nome (Z-A)",
	stars_desc: "Mais estrelados",
	stars_asc: "Menos estrelados"
}

export const sortRepositories = (repos: GitHubRepo[], order: RepoSortOrder) => {
	const sorted = [...repos]

	sorted.sort((left, right) => {
		switch (order) {
			case "stars_asc":
				return left.stargazers_count - right.stargazers_count
			case "name_asc":
				return left.name.localeCompare(right.name)
			case "name_desc":
				return right.name.localeCompare(left.name)
			default:
				return right.stargazers_count - left.stargazers_count
		}
	})

	return sorted
}
