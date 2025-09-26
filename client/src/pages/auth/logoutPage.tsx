import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useFetcher } from "react-router-dom";
import { logoutAction } from "@/action/auth.action.ts";

export default function LogoutPage() {
	const fetcher = useFetcher<typeof logoutAction>();

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<Card className="w-full max-w-md shadow-lg rounded-2xl">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Keluar dari Akun</CardTitle>
				</CardHeader>
				<CardContent>
					<fetcher.Form method="post" className="space-y-4 text-center">
						<p className="text-gray-600">Apakah kamu yakin ingin keluar?</p>
						<Button type="submit" className="w-full">Logout</Button>
					</fetcher.Form>
				</CardContent>
			</Card>
		</div>
	);
}
