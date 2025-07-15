import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useFetcher } from "react-router-dom";
import { LoaderProps } from "shared";
import { loginAction } from "@/action/auth.action";

export default function LoginPage() {
	const fetcher = useFetcher<LoaderProps<typeof loginAction>>()
	const data = fetcher.data
	// console.log(fetcher.data)
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<Card className="w-full max-w-md shadow-lg rounded-2xl">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Login ke Akunmu</CardTitle>
				</CardHeader>
				<CardContent>
					<fetcher.Form method="post" className="space-y-4 max-w-md w-full ">

						<h1 className="text-2xl font-bold text-center mb-4">Login</h1>

						{data?.error && <p className="text-red-500">{data.error}</p>}

						<div>
							<Label htmlFor="email">Email</Label>
							<Input name="email" type="email" required />
						</div>

						<div>
							<Label htmlFor="password">Password</Label>
							<Input name="password" type="password" required />
						</div>

						<Button type="submit" className="w-full">Login</Button>
					</fetcher.Form>
					<p className="text-sm text-center mt-2 text-muted-foreground">
						Belum punya akun? <a href="/register" className="underline">Daftar</a>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
