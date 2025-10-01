import { redirect } from "react-router";
import { userContext } from "@/hooks/context.ts";
import { LoaderFunctionArgs } from "react-router-dom";
import { getSession, } from "@/action/session.ts";


export async function publicMiddleware(
	{ context }: LoaderFunctionArgs,
) {
	const session = getSession()
	context.set(userContext, session)
}

export async function testMiddleware(
	{ context }: LoaderFunctionArgs,
) {
	const session = getSession()
	console.log("testMiddleware : ", session);
	if (session) {
		if (session.user?.role === "USER") {
			redirect("/student");
		}
	}
	context.set(userContext, session)
}

// Server-side Authentication Middleware
export async function validMiddleware(
	{ context }: LoaderFunctionArgs,
	// next
) {
	const session = getSession()
	// const session: SessionContext = context.get(userContext);
	// console.log(session)
	if (!session.isValid) {
		throw redirect("/auth/login");
	}
	context.set(userContext, session)
}

// Server-side Authentication Middleware
export async function authMiddleware({ context }: LoaderFunctionArgs) {
	const session = getSession();
	if (!session.isValid) {
		throw redirect("/auth/login");
	}
	context.set(userContext, session);
}

// // Client-side timing middleware
// async function timingMiddleware(_: LoaderFunctionArgs, next: MiddlewareNextFunction) {
// 	const start = performance.now();
// 	await next();
// 	const duration = performance.now() - start;
// 	console.log(`Navigation took ${ duration }ms`);
// }
//
// export async function loader({ context, }: LoaderFunctionArgs) {
// 	const user = context.get(userContext);
// 	const profile = await getProfile(user);
// 	return { profile };
// }
