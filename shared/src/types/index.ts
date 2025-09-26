export * from './soal-type'
export type ApiResponse = {
	message: string;
	success: true;
}

// export type LoaderProps<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>;
export type LoaderProps<T extends (...args: any[]) => any> =
	Exclude<Awaited<ReturnType<T>>, Response>;

export type SessionPayload = {
	userId: string
	exp: number
	name: string
	role: string
	email: string
}
