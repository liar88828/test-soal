import { toast } from "sonner";


export function toastError(message: string) {
	toast.error(message, {
		description: "Please try again later.",
		duration: 4000,
		className: "bg-destructive text-destructive-foreground border border-destructive",
	});
}

// Success toast (green)
export function toastSuccess(message: string, description?: string) {
	toast.success(message, {
		description,
		duration: 4000,
		className:
			"bg-green-600 text-white border border-green-700", // adjust if you use custom tokens
	})
}
