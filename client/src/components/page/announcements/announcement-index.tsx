import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link, useLoaderData, useSubmit } from "react-router-dom";
import { Eye, Trash } from "lucide-react";
import { announcementPageLoader } from "@/action/announcement.ts";
import { AnnouncementsModal } from "@/components/page/announcements/components/announcements-modal.tsx";


export function AnnouncementIndex() {
	const data = useLoaderData<typeof announcementPageLoader>()
	const submit = useSubmit()

	async function handleDelete(id: number) {
		if (confirm("Yakin ingin menghapus pengumuman ini?")) {
			const formData = new FormData();
			formData.append("id", String(id))
			await submit(formData, {
				method: "delete",
				action: `/announcement?index`,
			});
		}
	}

	return (
		<div className=" space-y-6">
			<div className="flex  justify-between">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-primary">
						Kelola Pengumuman
					</h1>
					<p className="text-muted-foreground">
						Tambahkan atau hapus pengumuman untuk siswa atau guru lainnya.
					</p>
				</div>

				{/* Form Tambah Pengumuman */ }
				<AnnouncementsModal />
			</div>
			{/* List Pengumuman */ }
			<div className="space-y-6">
				{ data.announcements.map((item) => (
					<Card key={ item.id }>
						<CardHeader className={ "flex justify-between" }>
							<CardTitle>{ item.title }</CardTitle>
							<CardDescription>{ item.date }</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="my-2 text-sm ">
								{ item.content }
							</div>
						</CardContent>
						<CardFooter className={ "flex-col items-start mt-2" }>
							<div className="flex flex-wrap gap-2">
								{ item.category.map(i => (
									<Badge key={ i }>{ i }</Badge>
								)) }
							</div>
							<div className="w-full justify-between flex items-end">
								<div className="flex gap-2">

									<p className="text-sm text-muted-foreground ">{ item.author }</p>
								</div>
								<div className="flex gap-2 mt-2">
									<Button variant="outline" size="sm" asChild>
										<Link to={ `/announcement/${ item.id }` }>
											<Eye />Detail
										</Link>
									</Button>
									<Button
										onClick={ () => handleDelete(item.id) }
										variant="destructive"
										size="sm"
									>
										<Trash />Hapus
									</Button>
								</div>
							</div>
						</CardFooter>
					</Card>
				)) }
			</div>
		</div>
	)
}
