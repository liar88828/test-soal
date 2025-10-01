import { Link, useLoaderData, useSubmit } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { announcementDetailLoader } from "@/action/announcement.ts";

// Dummy data – replace with fetch from API or context

export default function AnnouncementDetailPage() {
	const { announcement } = useLoaderData<typeof announcementDetailLoader>()
	const submit = useSubmit()

	async function handleDelete(id: number) {
		if (confirm("Yakin ingin menghapus pengumuman ini?")) {
			const formData = new FormData();
			formData.append("id", String(id))
			await submit(formData, {
				method: "delete",
				action: `/announcement/${ id }`,
			});
		}
	}

	if (!announcement) {
		return (
			<div className="max-w-4xl mx-auto py-12 space-y-6">
				<p className="text-muted-foreground text-lg">Pengumuman tidak ditemukan.</p>
				<Button asChild>
					<Link to="/announcement">Kembali ke Daftar Pengumuman</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className=" space-y-8">
			{/* Back button */ }
			<div>
				<Button variant="outline" asChild>
					<Link to="/announcement">
						<ArrowLeft className="w-4 h-4 mr-2" /> Kembali
					</Link>
				</Button>
			</div>

			{/* Big Title */ }
			<div className="space-y-3">
				<h1 className="text-4xl font-extrabold tracking-tight text-primary">
					{ announcement.title }
				</h1>
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					<p>📅 { announcement.date }</p>
					<p>✍️ { announcement.author }</p>
				</div>
				<div className="flex gap-2 flex-wrap">
					{ announcement.category.map((c) => (
						<Badge key={ c } variant="secondary">{ c }</Badge>
					)) }
				</div>
			</div>

			{/* Content */ }
			<Card className="p-6">
				<CardContent>
					<div className="prose max-w-none leading-7 text-lg whitespace-pre-line">
						{ announcement.content }
					</div>
				</CardContent>
			</Card>

			{/* Action buttons */ }
			<div className="flex gap-4">
				<Button variant="outline" asChild>
					<Link to="/announcement">Lihat Semua Pengumuman</Link>
				</Button>
				<Button variant="destructive"
				        onClick={ () => handleDelete(announcement.id) }
				>Hapus Pengumuman</Button>
			</div>
		</div>
	)
}
