import { type ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom"
import { SERVER_URL } from "@/lib/constants"
import { deleteSession, getSession, isLogin, loginSession, SessionContext } from "./session"
import { userContext } from "@/hooks/context.ts";

const exampleUser = {
	id: 1,
	name: "Febrian Alif",
	email: "febrian@example.com",
	role: "USER",
	createdAt: "2024-01-15T10:00:00Z",
}

export async function AuthLoader({ context }: LoaderFunctionArgs) {
	const isValid = isLogin()
	// console.log('AuthLoader', isvalid)
	if (isValid) {
		return redirect("/auth/profile")
	}
	context.set(userContext)
}

export async function sessionLoader({ context }: LoaderFunctionArgs) {
	return context.get(userContext) as SessionContext | null
}

export async function protectLoader({ context }: LoaderFunctionArgs) {
	// const session = getSession()
	const session = context.get(userContext)
	if (!session || !session.isValid) {
		return redirect("/auth/login")
	}
	// console.log(session, 'user context')
	// console.log(context.get(userContext), 'user context')
	// context.set(userContext, session)
	return session
}

export async function loginAction({ request, context }: ActionFunctionArgs) {
	const formData = await request.formData()
	const email = formData.get("email") as string
	const password = formData.get("password") as string

	try {
		const res = await fetch(`${ SERVER_URL }/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		})
		// console.log(await res.json());
		if (!res.ok) {
			const errorData = await res.json()
			return { error: errorData.error || "Gagal login" }
		}

		const { token } = await res.json()
		const session = loginSession(token) // Simpan token
		console.log("session", session)
		context.set(userContext, session);
		return redirect("/")
	} catch {
		return { error: "Terjadi kesalahan pada server" }
	}
}

export async function registerAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const name = formData.get("name") as string
	const email = formData.get("email") as string
	const password = formData.get("password") as string

	try {
		const res = await fetch(`${ SERVER_URL }/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		})

		if (!res.ok) {
			const errorData = await res.json()
			return { error: errorData.error || "Gagal register" }
		}

		const { token } = await res.json()
		await loginAction(token)
		return redirect("/auth/login")
	} catch {
		return { error: "Terjadi kesalahan saat mendaftar" }
	}
}

export async function logoutAction() {
	deleteSession()
	console.log("logout")
	return redirect("/auth/login")
}

export async function profileLoader() {
	const session = getSession()

	if (!session || !session.isValid) {
		return redirect("/auth/login")
	}

	try {
		const res = await fetch(`${ SERVER_URL }/auth/profile`, {
			headers: {
				Authorization: `Bearer ${ session.token }`,
			},
		})

		if (!res.ok) {
			// token tidak valid atau expired
			return redirect("/auth/login")
		}

		await res.json()
		// console.log('profile', dataAvailableOnClass)
		// return dataAvailableOnClass.user;
		return exampleUser
	} catch (error) {
		console.error("Gagal mengambil profil:", error)
		return redirect("/auth/login")
	}
}
