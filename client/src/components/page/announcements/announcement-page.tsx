import { AnnouncementsModal } from "@/components/page/announcements/components/announcements-modal.tsx";
import { exampleAnnouncements } from "@/assets/example/announcements.ts";
import { AnnouncementsCard } from "@/components/page/announcements/components/announcements-card.tsx";

export default function AnnouncementPage() {
	return (
		<div className=" space-y-6">
			<div className="flex  justify-between">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-primary">Kelola Pengumuman</h1>
					<p className="text-muted-foreground">
						Tambahkan atau hapus pengumuman untuk siswa atau guru lainnya.
					</p>
				</div>
				{/* Form Tambah Pengumuman */ }
				<AnnouncementsModal />
			</div>
			{/* List Pengumuman */ }
			<AnnouncementsCard announcements={ exampleAnnouncements } />
		</div>
	)
}
