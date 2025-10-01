import { type LoaderFunctionArgs } from "react-router-dom"
import { exampleSiswaList } from "@/assets/example/siswaList.ts";


export async function studentProfileLoader() {
	// const { user, } = getSession()
	// if (!user) {
	// 	return redirect("/auth/login")
	// }
	// console.log(user)
	return { user: exampleSiswaList[0] }

}

export async function studentDetailProfileLoader({ params }: LoaderFunctionArgs) {
	const { nis } = params
	const user = exampleSiswaList.find(item => item.nis === nis)
	return { user }

}

export async function studentHomeLoader() {
	// const { user } = getSession()

	// if (!user) {
	// 	return redirect('/auth/login')
	// }
	// console.log(user)
	// return { user }
}
