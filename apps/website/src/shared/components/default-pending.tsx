import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle
} from "@repo/ui/components/empty"
import { Spinner } from "@repo/ui/components/spinner"

export const DefaultPending = () => {
	return (
		<Empty className="flex h-screen w-screen items-center justify-center bg-background">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Spinner />
				</EmptyMedia>
				<EmptyTitle>Carregando dados.</EmptyTitle>
				<EmptyDescription>
					Por favor espere um pouco enquanto carregamos os dados.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}
