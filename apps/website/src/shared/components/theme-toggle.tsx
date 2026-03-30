import { Button } from "@repo/ui/components/button"
import { useTheme } from "@repo/ui/components/theming"
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react"

const modeLabel = {
	light: "Claro",
	dark: "Escuro",
	system: "Sistema"
} as const

export const ThemeToggle = () => {
	const { colorMode, toggleColorMode } = useTheme()

	const icon = (() => {
		switch (colorMode) {
			case "light":
				return <IconSun className="h-4 w-4" />
			case "dark":
				return <IconMoon className="h-4 w-4" />
			default:
				return <IconDeviceDesktop className="h-4 w-4" />
		}
	})()

	return (
		<div className="fixed top-3 right-3 z-50">
			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={toggleColorMode}
				aria-label={`Alternar modo de cor. Atual: ${modeLabel[colorMode]}`}
				title={`Tema: ${modeLabel[colorMode]}`}
			>
				{icon}
				{modeLabel[colorMode]}
			</Button>
		</div>
	)
}
