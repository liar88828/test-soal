import { isRouteErrorResponse, Link, useAsyncError, useRouteError } from "react-router-dom";
import { AlertTriangle, ArrowLeftCircleIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


export function ErrorBoundary() {
	const error = useRouteError();

	let title = "Unexpected Error";
	let message = "Something went wrong. Please try again later.";
	let status = 500;

	if (isRouteErrorResponse(error)) {
		status = error.status;
		title = error.statusText || "Error";
		message = error.data || message;
	} else if (error instanceof Error) {
		message = error.message;
	}

	// console.groupCollapsed(`[ErrorBoundary] ❌ Caught route error`);
	// console.log("Status:", status);
	// console.log("Title:", title);
	// console.log("Message:", message);
	// console.log("Stack Trace:", error instanceof Error ? error.stack : "No stack trace");
	// console.log("Full Error Object:", error);
	// console.groupEnd();

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-100 via-white to-gray-100 px-6">
			<motion.div
				initial={ { opacity: 0, y: 30, scale: 0.95 } }
				animate={ { opacity: 1, y: 0, scale: 1 } }
				transition={ { duration: 0.4, ease: "easeOut" } }
				className="w-full max-w-xl"
			>
				<Card className="overflow-hidden shadow-2xl border-0 rounded-2xl">
					<CardHeader className="mx-10 text-center space-y-4 py-10 bg-gradient-to-r from-red-500 to-pink-500 text-white  rounded-2xl">
						<motion.div
							initial={ { scale: 0.8, rotate: -10 } }
							animate={ { scale: 1, rotate: 0 } }
							transition={ { type: "spring", stiffness: 200, damping: 12 } }
							className="flex justify-center"
						>
							<AlertTriangle className="h-16 w-16 drop-shadow-lg" />
						</motion.div>
						<h1 className="text-7xl font-extrabold tracking-tight drop-shadow">{ status }</h1>
						<CardTitle className="text-2xl font-bold">{ title }</CardTitle>
						<CardDescription className="text-gray-100">{ message }</CardDescription>
					</CardHeader>

					<CardContent className="flex justify-center ">
						<Button asChild className="gap-2 px-6 text-lg rounded-xl mt-6 bg-red-600">
							<Link to="/" viewTransition>
								<ArrowLeftCircleIcon className="h-5 w-5" />
								Back to Home
							</Link>
						</Button>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}

export function ReviewsError() {
	const error = useAsyncError();
	console.log(error)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return <div>Error loading reviews: { error.message as string }</div>;
}
