import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLoaderData } from "react-router-dom";
import { profileLoader } from "@/action/auth.action.ts";
import { LoaderProps } from "shared";

export default function ProfilePage() {
	const user = useLoaderData<LoaderProps<typeof profileLoader>>();

	return (
		<div className="p-6 max-w-md mx-auto">
			<Card>
				<CardHeader className="flex flex-col items-center text-center">
					<Avatar className="w-20 h-20 mb-2">
						<AvatarFallback>
							{user.name
								.split(" ")
								.map((word) => word[0])
								.join("")
								.toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<CardTitle className="text-lg font-semibold">
						{user.name}
					</CardTitle>
					<p className="text-sm text-muted-foreground">{user.email}</p>
				</CardHeader>

				<CardContent className="space-y-2">
					<div className="text-sm">
						<strong>Role:</strong> {user.role}
					</div>
					<div className="text-sm">
						<strong>Dibuat:</strong>{" "}
						{new Date(user.createdAt).toLocaleString()}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
