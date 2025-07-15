import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function LogoutPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<Card className="w-full max-w-md shadow-lg rounded-2xl">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Berhasil Logout</CardTitle>
				</CardHeader>
				<CardContent className="text-center space-y-4">
					<p className="text-muted-foreground">
						Kamu telah berhasil keluar dari akunmu.
					</p>
					<Button asChild className="w-full">
						<Link to="/login">Login Kembali</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
