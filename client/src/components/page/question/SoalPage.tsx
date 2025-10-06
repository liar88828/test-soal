import { Link, Outlet, useLoaderData } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { SoalCreateModal } from "./SoalCreateModal.tsx";
import { DrawerDialog } from "@/components/mini/DrawerDialog.tsx";
import { LoaderProps } from "shared";
import { getSoalAll } from "@/action/soal.ts";


export function SoalPage() {
	const soals = useLoaderData() as LoaderProps<typeof getSoalAll>
	// console.log(dataAvailableOnClass)
	return (
		<div className="">
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold mb-4">Daftar SoalItem</h1>
				<div className="mb-6">
					<DrawerDialog title="Tambah SoalItem" triggerLabel="Tambah SoalItem">
						<SoalCreateModal />
					</DrawerDialog>

					{/*<Button asChild>*/ }
					{/*	<Link to="/soal/create">+ Tambah SoalItem</Link>*/ }
					{/*</Button>*/ }
				</div>
			</div>
			<div className="space-y-2 overflow-y-auto pb-4 ">
				{ soals.map((soal) => (
					<Card key={ soal.id } className="  flex flex-row justify-between">
						<CardHeader>
							<CardTitle>{ soal.name }</CardTitle>
							<CardDescription className={ "text-nowrap" }>Dibuat oleh: { soal.author }</CardDescription>
							<p>Jumlah : { soal._count.SoalABC }</p>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-2">

								<Button asChild>
									<Link to={ `/soal/${ soal.id }` }>Detail</Link>
								</Button>

								<Button asChild>
									<Link to={ `/soal/${ soal.id }/answer` }>Test</Link>
								</Button>

								<Button asChild>
									<Link to={ `/soal/${ soal.id }/check` }>Check</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				)) }
			</div>
			<><Outlet /></>
		</div>
	)
}
