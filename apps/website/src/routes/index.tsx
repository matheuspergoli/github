import { InputGroup, InputGroupAddon, InputGroupInput } from "@repo/ui/components/input-group"
import { IconSearch } from "@tabler/icons-react"
import { createFileRoute, useRouter } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: RouteComponent
})

function RouteComponent() {
	const router = useRouter()

	const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const username = String(formData.get("username") ?? "")

		const trimmed = username.trim()
		if (trimmed.length > 0 && trimmed.length <= 39) {
			router.navigate({
				to: "/user/$username",
				params: { username: trimmed }
			})
		}
	}

	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-5">
			<section>
				<h1 className="font-extrabold text-4xl tracking-tight sm:text-5xl">
					<span className="text-green-500">Git</span>Explorer
				</h1>
				<p className="mt-3 text-muted-foreground">Explore repositórios e perfis do GitHub</p>
			</section>

			<form onSubmit={handleSearch} className="w-full max-w-96">
				<InputGroup className="max-w-sm">
					<InputGroupInput name="username" placeholder="Digite um username do GitHub..." />
					<InputGroupAddon>
						<IconSearch className="text-muted-foreground" />
					</InputGroupAddon>
				</InputGroup>
			</form>

			<footer>
				<p className="text-muted-foreground text-xs">
					Powered by GitHub API · Nenhuma autenticação necessária
				</p>
			</footer>
		</main>
	)
}
