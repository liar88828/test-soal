'use client'
import { Link, Outlet, useLoaderData } from "react-router-dom";
import type { Soal } from "shared/dist/lib/validate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DrawerDialog } from "@/components/DrawerDialog.tsx";
import { SoalCreate } from "@/pages/SoalCreate.tsx";


export function SoalPage() {
	const soals = useLoaderData() as ( Soal & { _count: { list: number } } )[]

	// console.log(data)
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Daftar Soal</h1>
			{/* add button */ }
			<div className="mb-6">

				<DrawerDialog
					title="Tambah Soal"
					triggerLabel="Tambah Soal"
				>
					<SoalCreate />
				</DrawerDialog>

				{/*<Button asChild>*/ }
				{/*	<Link to="/soal/create">+ Tambah Soal</Link>*/ }
				{/*</Button>*/ }
			</div>
			<div className="space-y-2 overflow-y-auto pb-4 ">
				{ soals.map((soal) => (
					<Card key={ soal.id } className="  flex flex-row justify-between">
						<CardHeader>
							<CardTitle>{ soal.name }</CardTitle>
							<CardDescription className={ 'text-nowrap' }>Dibuat oleh: { soal.author }</CardDescription>
							<p>Jumlah : {soal._count.list}</p>
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
