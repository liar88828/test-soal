import { type ActionFunctionArgs, redirect } from "react-router-dom";
import { SERVER_URL } from "@/lib/constants.ts";
import { decodeToken, isExpired } from "react-jwt";


export function getToken() {
	const token = localStorage.getItem("token"); // Simpan token
	return {
		token,
		isValid: !isExpired(token ?? ''),
		user: decodeToken(token ?? '')
	}
}

export async function homeLoader() {
	return getToken()
}

export async function loginAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	try {
		const res = await fetch(`${ SERVER_URL }/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		// console.log(await res.json());
		if (!res.ok) {
			const errorData = await res.json();
			return { error: errorData.error || "Gagal login" };
		}

		const { token } = await res.json();
		console.log("token", token);
		localStorage.setItem("token", token); // Simpan token

		return redirect("/");
	} catch {
		return { error: "Terjadi kesalahan pada server" };
	}
}

export async function registerAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	try {
		const res = await fetch(`${ SERVER_URL }/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});

		if (!res.ok) {
			const errorData = await res.json();
			return { error: errorData.error || "Gagal register" };
		}

		return redirect("/login");
	} catch {
		return { error: "Terjadi kesalahan saat mendaftar" };
	}
}

const exampleUser = {
	id: 1,
	name: "Febrian Alif",
	email: "febrian@example.com",
	role: "USER",
	createdAt: "2024-01-15T10:00:00Z",
};

export async function profileLoader() {
	const token = getToken().token

	if (!token) {
		return redirect("/login");
	}

	try {
		const res = await fetch(`${ SERVER_URL }/auth/profile`, {
			headers: {
				Authorization: `Bearer ${ token }`,
			},
		});

		if (!res.ok) {
			// token tidak valid atau expired
			return redirect("/login");
		}

		const data = await res.json();
		console.log("profile", data);
		// return data.user;
		return exampleUser
	} catch (error) {
		console.error("Gagal mengambil profil:", error);
		return redirect("/login");
	}
}
