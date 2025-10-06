import { SERVER_URL } from "@/lib/constants.ts";
import { toast } from "sonner";

export const fetcher = async (url: string) => {
	return fetch(`${ SERVER_URL }${ url }`)
	.then(res => res.json())
	.catch((error) => {
		toast.error(error.message);
		console.error(error.message);
	})
};
export const fetcherMutation = async (
	url: string,
	method: "POST" | "PUT" | "DELETE",
	data?: object
) => {
	try {
		const options: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		// ⬇️ hanya tambahkan body kalau data ada
		if (data !== undefined) {
			options.body = JSON.stringify(data);
		}

		const res = await fetch(`${SERVER_URL}${url}`, options);

		if (!res.ok) {
			const errText = await res.text();
			throw new Error(errText || res.statusText);
		}

		return await res.json();
	} catch (error: any) {
		toast.error(error.message);
		console.error(error);
		return null;
	}
};
