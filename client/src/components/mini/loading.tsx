import { Loader2 } from "lucide-react";


export function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
			<div className="flex flex-col items-center gap-4">
				<Loader2 className="h-12 w-12 animate-spin text-primary" />
				<p className="text-lg font-medium text-gray-600">Loading, please wait...</p>
			</div>
		</div>
	);
}
