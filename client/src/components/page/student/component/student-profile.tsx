import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx"

{/* Single Big Card */
}

export function StudentProfileModal() {
	return (
		<div className="min-h-screen bg-muted ">
			<div className="max-w-2xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold text-primary">Profil Siswa</h1>

				<Card>
					<CardContent className=" space-y-4">
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Nama Lengkap</Label>
								<Input
									id="name"
									placeholder="Contoh: Rafi Maulana"
									defaultValue="Rafi Maulana"
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="nisn">NISN</Label>
								<Input
									id="nisn"
									placeholder="Contoh: 1234567890"
									defaultValue="1234567890"
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="kelas">Kelas</Label>
								<Input
									id="kelas"
									placeholder="Contoh: XII IPA 2"
									defaultValue="XII IPA 2"
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Contoh: rafi@email.com"
									defaultValue="rafi@email.com"
								/>
							</div>
						</div>

						<Button className="w-full">Simpan Perubahan</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
