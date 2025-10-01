import { Card, CardContent, } from "@/components/ui/card.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { exampleAnnouncements } from "@/assets/example/announcements.ts";

export default function StudentAnnouncementsPage() {
	// const { user } = useLoaderData<typeof studentHomeLoader>()
	// const navigate = useNavigate()

	return (
		<div className="min-h-screen bg-muted ">
			<div className="max-w-4xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold text-primary">Pengumuman Siswa</h1>

				<div className="space-y-4">
					{ exampleAnnouncements.map((item, idx) => (
						<Card key={ idx }>
							<CardContent className="p-5 space-y-2">
								<div className="flex justify-between items-center">
									<h2 className="text-xl font-semibold">{ item.title }</h2>
									<Badge>{ item.category }</Badge>
								</div>
								<p className="text-sm text-muted-foreground">{ item.date }</p>
								<p className="text-gray-700 text-sm">{ item.content }</p>
							</CardContent>
						</Card>
					)) }
				</div>
			</div>
		</div>
	)
}
