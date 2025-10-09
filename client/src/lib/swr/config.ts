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
// export const fetcherQuery = <T>(url: string) => useSWR<T>(url, fetcher)

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

		const res = await fetch(`${ SERVER_URL }${ url }`, options);

		if (!res.ok) {
			const errText = await res.text();
			throw new Error(errText || res.statusText);
		}
		toast.success("Success ✅")
		return await res.json();
	} catch (error: unknown) {
		if (error instanceof Error) {
			toast.error(error.message);
			console.error(error);
			return null;
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		toast.error(`${ error.message } ❌`);
		return null
	}
};
