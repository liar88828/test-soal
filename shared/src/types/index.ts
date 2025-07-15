export type ApiResponse = {
	message: string;
	success: true;
}

// export type LoaderProps<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>;
export type LoaderProps<T extends (...args: any[]) => any> =
	Exclude<Awaited<ReturnType<T>>, Response>;



export type PayloadToken = {
	userId: string;
	exp: number;
	name: string;
	email: string;
	role: string
};
