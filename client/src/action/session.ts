import { SessionPayload } from 'shared'
import { decodeToken, isExpired } from 'react-jwt'
import { redirect } from 'react-router-dom'

const TOKEN_KEY = 'token'

export function getSession() {
	const token = localStorage.getItem(TOKEN_KEY)

	return {
		token,
		isValid: !isExpired(token ?? ''),
		user: decodeToken(token ?? '') as SessionPayload | null,
	}
}

export function loginSession(token: string) {
	localStorage.setItem(TOKEN_KEY, token)
}

export function logoutSession() {
	localStorage.removeItem(TOKEN_KEY)
}

export function updateSession(newToken: string) {
	loginSession(newToken) // bisa sama saja dengan login
}

export function deleteSession() {
	logoutSession() // alias dari logout
}
export function isLogin(): boolean {
	const token = localStorage.getItem('token')
	return !!token && !isExpired(token)
}

export function isProtectedRoute(role: 'ADMIN' | 'USER' | null = null) {
	const { isValid, user } = getSession()
	console.log('isProtectedRoute', { isValid, user })
	if (!isValid || !user) {
		// console.log('isProtectedRoute: not valid session')
		return redirect('/auth/login')
	}
	if (role && user.role !== role) {
		// console.log(`isProtectedRoute: not valid role, expected ${role}, got ${user.role}`)
		return redirect('/')
	}
}
