import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { type DeleteDialogProps, type  FinanceDialogFormProps } from "@/components/page/finance/FinancePaymentsPage.tsx";
import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";
import { zodResolver } from "@hookform/resolvers/zod"
import { EditIcon, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FinanceRoom, type FinanceRoomOptionalDefaults, FinanceRoomOptionalDefaultsSchema } from "shared/dist/lib/validate" // or your local type path
import useSWR from "swr";


export default function FinanceRoomPage() {
	const financeRoom = useSWR<FinanceRoom[]>("/api/finance-room", fetcher)
	const [ openDialog, setOpenDialog ] = useState(false)
	const [ editData, setEditData ] = useState<FinanceRoomOptionalDefaults | null>(null)


	const handleCreate = async (formData: FinanceRoomOptionalDefaults) => {
		await fetcherMutation("/api/finance-room", "POST", formData)
		await financeRoom.mutate()

	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleUpdate = async ({ createdAt, updatedAt, ...formData }: FinanceRoomOptionalDefaults) => {
		await fetcherMutation(`/api/finance-room/${ formData.id }`, "PUT", formData)
		await financeRoom.mutate()
	}

	const handleDelete = async (id: string) => {
		await fetcherMutation(`/api/finance-room/${ id }`, "DELETE")
		await financeRoom.mutate()
	}


	if (financeRoom.isLoading) return <Spinner />
	if (!financeRoom.data) return <EmptyComponent />

	return (
		<div className=" space-y-6">
			<Card>
				<CardHeader>
					<div className="flex justify-between">
						<CardTitle>Biaya Ruangan Sekolah</CardTitle>
						<FinanceRoomDialogForm
							open={ openDialog && !editData }
							onOpenChange={ setOpenDialog }
							onSubmit={ handleCreate }
							mode="create"
							trigger={ <Button onClick={ () => setEditData(null) }><PlusIcon /></Button> }
						/>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Ruangan</TableHead>
								<TableHead>Biaya</TableHead>
								<TableHead>Keterangan</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ financeRoom.data.map((r) => (
								<TableRow key={ r.id }>
									<TableCell>{ r.room }</TableCell>
									<TableCell>Rp{ r.cost.toLocaleString("id-ID") }</TableCell>
									<TableCell>{ r.note }</TableCell>
									<TableCell>
										<Badge
											variant={ r.cost > 200000 ? "destructive" : "outline" }
										>
											{ r.cost > 200000 ? "Tinggi" : "Normal" }
										</Badge>
									</TableCell>
									<TableCell>
										<FinanceRoomDialogForm
											open={ openDialog && editData?.id === r.id }
											onOpenChange={ (open) => {
												setOpenDialog(open)
												if (!open) setEditData(null)
											} }
											onSubmit={ handleUpdate }
											mode="update"
											defaultValues={ r }
											trigger={
												<Button
													size="sm"
													variant="outline"
													onClick={ () => setEditData(r) }
												>
													<EditIcon />
												</Button>
											}
										/>
										<DeleteDialog onConfirm={ () => handleDelete(r.id) } />

									</TableCell>
								</TableRow>
							)) }
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}


function FinanceRoomDialogForm(
	{
		defaultValues,
		mode = "create",
		onOpenChange,
		onSubmit,
		open,
		trigger,
	}: FinanceDialogFormProps<FinanceRoomOptionalDefaults>) {
	const form = useForm<FinanceRoomOptionalDefaults>({
		resolver: zodResolver(FinanceRoomOptionalDefaultsSchema),
		defaultValues: {
			room: "",
			cost: 0,
			note: "",
			...defaultValues,
		},
	})


	function handleSubmit(values: FinanceRoomOptionalDefaults) {
		onSubmit(values)
		onOpenChange(false)
	}


	return (
		<Dialog open={ open } onOpenChange={ onOpenChange }>
			{ trigger && <DialogTrigger asChild>{ trigger }</DialogTrigger> }
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>
						{ mode === "create" ? "Tambah Data Ruangan" : "Edit Data Ruangan" }
					</DialogTitle>
				</DialogHeader>

				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(handleSubmit) } className="space-y-4">
						<FormField
							control={ form.control }
							name="room"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Nama Ruangan</FormLabel>
									<FormControl>
										<Input placeholder="Masukkan nama ruangan" { ...field } />
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="cost"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Biaya</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Masukkan biaya"
											{ ...field }
											onChange={ (e) => field.onChange(Number(e.target.value)) }
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="note"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Catatan</FormLabel>
									<FormControl>
										<Input placeholder="Opsional"
											//       { ...field }
											   value={ field.value ?? "" }
											   onChange={ e => field.onChange(e.target.value) }
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<DialogFooter>
							<Button type="submit">
								{ mode === "create" ? "Simpan" : "Perbarui" }
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}


export function DeleteDialog(
	{
		title = "Delete Item",
		description = "Are you sure you want to delete this item? This action cannot be undone.",
		onConfirm,
	}: DeleteDialogProps) {
	const [ open, setOpen ] = useState(false)
	const [ loading, setLoading ] = useState(false)

	const handleConfirm = async () => {
		setLoading(true)
		await onConfirm()
		setLoading(false)
		setOpen(false)
	}

	return (
		<Dialog open={ open } onOpenChange={ setOpen }>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm">
					<Trash2 />
					{/*Delete*/ }
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{ title }</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-muted-foreground">{ description }</p>
				<DialogFooter className="mt-4 flex justify-end space-x-2">
					<Button variant="outline" onClick={ () => setOpen(false) }>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={ handleConfirm }
						disabled={ loading }
					>
						{ loading ? "Deleting..." : "Delete" }
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
