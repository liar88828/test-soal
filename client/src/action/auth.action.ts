import { userLoginSchema, userRegisterSchema } from 'shared/src/lib/validate/user.schema.ts';
import { type ActionFunctionArgs, redirect } from "react-router-dom";
import { SERVER_URL } from "@/lib/constants.ts";
import { decodeToken, isExpired } from "react-jwt";
import { LoaderProps, PayloadToken } from 'shared';



export function getToken() {
	const token = localStorage.getItem("token"); // Simpan token
	const user = decodeToken(token ?? '') as PayloadToken
	const data = {
		token,
		user,
		isValid: !isExpired(token ?? ''),
	}
	// console.log("getToken", data);
	return data
}


export function getUser() {
	const token = localStorage.getItem("token"); // Simpan token
	return decodeToken(token ?? '') as PayloadToken
}
export type GetUserLoader = LoaderProps<typeof getUser>;

export async function layoutLoader() {
	const { isValid } = getToken();

	// Only open sidebar if sidebar_state is "true" AND user is logged in
	const stored = localStorage.getItem("sidebar_state");
	const sidebarOpen = stored === "true";

	return {
		isReady: true,
		defaultOpen: isValid ? sidebarOpen : false,
		isLogin: isValid
	};
}


export async function logoutAction(_ctx: ActionFunctionArgs) {
	localStorage.removeItem("token")
	localStorage.removeItem("sidebar_state")
	return redirect("/logout")
}

export async function sessionLoader() {
	return getToken()
}
export type SessionLoader = LoaderProps<typeof sessionLoader>;

export async function homeLoader() {
	return getToken()
}

export async function loginAction({ request }: ActionFunctionArgs) {

	try {

		const formData = await request.formData();

		const data = userLoginSchema.parse({
			email: formData.get("email") as string,
			password: formData.get("password") as string
		})

		const res = await fetch(`${SERVER_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
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


	try {

		const formData = await request.formData();

		const data = userRegisterSchema.parse({
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,

		})

		const res = await fetch(`${SERVER_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
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
		const res = await fetch(`${SERVER_URL}/auth/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
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
