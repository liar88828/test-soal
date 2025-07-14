export type ApiResponse = {
	message: string;
	success: true;
}

// export type LoaderProps<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>;
export type LoaderProps<T extends (...args: any[]) => any> =
	Exclude<Awaited<ReturnType<T>>, Response>;
