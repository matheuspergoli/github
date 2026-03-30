import { queryOptions } from "@tanstack/react-query"
import { api } from "@/libs/api"

export interface GitHubUser {
	login: string
	avatar_url: string
	html_url: string
	name: string | null
	bio: string | null
	email: string | null
	public_repos: number
	followers: number
	following: number
	location: string | null
	company: string | null
	blog: string | null
	created_at: string
}

export interface GitHubRepo {
	id: number
	name: string
	full_name: string
	description: string | null
	html_url: string
	stargazers_count: number
	forks_count: number
	language: string | null
	updated_at: string
	fork: boolean
	open_issues_count: number
}

export const getUserQueryOptions = ({ username }: { username: string }) => {
	return queryOptions({
		queryKey: ["get-user", username],
		queryFn: async () => {
			const { data } = await api.get<GitHubUser>(`/users/${encodeURIComponent(username)}`)

			return data
		}
	})
}

export const getUserReposQueryOptions = ({ username }: { username: string }) => {
	return queryOptions({
		queryKey: ["get-user-repos", username],
		queryFn: async () => {
			const { data } = await api.get<GitHubRepo[]>(
				`/users/${encodeURIComponent(username)}/repos`,
				{
					params: { per_page: 100 }
				}
			)

			return data
		}
	})
}

export const getRepoQueryOptions = ({ fullname }: { fullname: string }) => {
	return queryOptions({
		queryKey: ["get-repo", fullname],
		queryFn: async () => {
			const [owner, repository] = fullname.split("/")

			const encodedOwner = encodeURIComponent(owner ?? "")
			const encodedRepository = encodeURIComponent(repository ?? "")

			const { data } = await api.get<GitHubRepo>(`/repos/${encodedOwner}/${encodedRepository}`)

			return data
		}
	})
}
