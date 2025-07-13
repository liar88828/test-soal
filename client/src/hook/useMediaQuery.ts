import { useEffect, useState } from "react"

/**
 * Custom hook to check if a media query matches.
 *
 * @param query - The media query string, e.g. "(min-width: 768px)"
 * @returns boolean - Whether the query matches
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(() => {
		if (typeof window === "undefined") return false
		return window.matchMedia(query).matches
	})

	useEffect(() => {
		if (typeof window === "undefined") return

		const media = window.matchMedia(query)
		const updateMatch = () => setMatches(media.matches)

		updateMatch()
		media.addEventListener("change", updateMatch)

		return () => media.removeEventListener("change", updateMatch)
	}, [query])

	return matches
}
