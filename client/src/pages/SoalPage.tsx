import { Link, useLoaderData } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from 'client/src//components/ui/card'
import { Button } from 'client/src/components/ui/button'
import { DrawerDialog } from "client/src/components/DrawerDialog.tsx";
import { SoalCreate } from "client/src//pages/SoalCreate.tsx";
import { type LoaderProps } from "shared";
import { getSoalAll } from "@/action/soal.action";


export function SoalPage() {
	const { user, soals } = useLoaderData<LoaderProps<typeof getSoalAll>>()
	return (
		<div className="p-6">
			<div className="flex justify-between">

				<h1 className="text-2xl font-bold mb-4">Daftar Soal</h1>
				<div className="mb-6">

					<DrawerDialog
						title="Tambah Soal"
						triggerLabel="Tambah Soal"
					>
						<SoalCreate user={user} />
					</DrawerDialog>

					{/*<Button asChild>*/}
					{/*	<Link to="/soal/create">+ Tambah Soal</Link>*/}
					{/*</Button>*/}
				</div>
			</div>
			<div className="space-y-2 overflow-y-auto pb-4">
				{soals.length === 0 ? (
					<div className="text-center text-muted-foreground py-8">
						<p>Tidak ada soal yang tersedia.</p>
					</div>
				) : (
					soals.map((soal) => (
						<Card key={soal.id} className="flex flex-row justify-between">
							<CardHeader>
								<CardTitle>{soal.name}</CardTitle>
								<CardDescription className="text-nowrap">
									Dibuat oleh: {soal.author}
								</CardDescription>
								<p>Jumlah : {soal._count.list}</p>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-2">
									<Button asChild>
										<Link to={`/soal/${soal.id}`}>Detail</Link>
									</Button>
									<Button asChild>
										<Link to={`/soal/${soal.id}/answer`}>Test</Link>
									</Button>
									{soal.author === user.name
										? null
										: <Button asChild>
											<Link to={`/soal/${soal.id}/check`}>Check</Link>
										</Button>
									}
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>
			{/* <><Outlet /></> */}
		</div>
	)
}
