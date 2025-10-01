export const fetcher = (...args: unknown[]) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return fetch(...args)
	.then(res => res.json());
}
