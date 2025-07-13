import { useAsyncError, useRouteError } from "react-router-dom";


export function ReviewsError() {
	const error = useAsyncError();
	console.log(error)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return <div>Error loading reviews: { error.message as string }</div>;
}
export function ErrorBoundary() {
	const error = useRouteError();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return <div>{error.message}</div>;
}
