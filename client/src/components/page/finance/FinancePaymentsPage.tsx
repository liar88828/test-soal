import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { type VariantCSS } from "@/components/page/finance/VariantCSS.tsx";
import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";
import { EditIcon, EyeIcon, PlusIcon, Trash2 } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { type FinanceBillStudent, Grade } from "shared/dist/lib/validate";
import useSWR from "swr";


export default function FinancePaymentsPage() {
	const financeBillStudent = useSWR<FinanceBillStudent[]>("/api/finance-bill-student", fetcher)
	const [ openDialog, setOpenDialog ] = useState(false)
	const [ editData, setEditData ] = useState<FinanceBillStudent | null>(null)


	const handleCreate = async (formData: FinanceBillStudent) => {
		await fetcherMutation("/api/finance-bill-student", "POST", formData)
		await financeBillStudent.mutate()

	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleUpdate = async ({ createdAt, updatedAt, ...formData }: FinanceBillStudent) => {
		await fetcherMutation(`/api/finance-bill-student/${ formData.id }`, "PUT", formData)
		await financeBillStudent.mutate()
	}

	const handleDelete = async (id: string) => {
		await fetcherMutation(`/api/finance-bill-student/${ id }`, "DELETE")
		await financeBillStudent.mutate()
	}


	if (financeBillStudent.isLoading) return <Spinner />
	if (!financeBillStudent.data) return <EmptyComponent />


	return (
		<div className="">
			<Card>
				<CardHeader>
					<div className="flex justify-between">
						<CardTitle>Pembayaran Siswa</CardTitle>
						<FinanceDialogForm
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
								<TableHead>Nama</TableHead>
								<TableHead>Kelas</TableHead>
								<TableHead>Bulan</TableHead>
								<TableHead>Nominal</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ financeBillStudent.data.map((payment) => (
								<TableRow key={ payment.id }>
									<TableCell>{ payment.name }</TableCell>
									<TableCell>{ payment.kelas }</TableCell>
									<TableCell>{ payment.bulan }</TableCell>
									<TableCell>{ payment.nominal }</TableCell>
									<TableCell>
										<Badge
											variant={
												( payment.status === "LUNAS" ? "success" : "destructive" ) as VariantCSS
											}
										>
											{ payment.status }
										</Badge>
									</TableCell>
									<TableCell className={ "space-x-2" }>
										<Button
											size="sm"
											variant="outline"
										>
											<EyeIcon />
										</Button>

										<DeleteDialog onConfirm={ () => handleDelete(payment.id) } />

										<FinanceDialogForm
											open={ openDialog && editData?.id === payment.id }
											onOpenChange={ (open) => {
												setOpenDialog(open)
												if (!open) setEditData(null)
											} }
											onSubmit={ handleUpdate }
											mode="update"
											defaultValues={ payment }
											trigger={
												<Button
													size="sm"
													variant="outline"
													onClick={ () => setEditData(payment) }
												>
													<EditIcon />
												</Button>
											}
										/>
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


export type FinanceDialogFormProps<T> = {
	defaultValues?: Partial<T>
	mode?: "create" | "update"
	onOpenChange: (open: boolean) => void
	onSubmit: (data: T) => void
	open: boolean
	trigger?: ReactNode
}


export function FinanceDialogForm(
	{
		open,
		onOpenChange,
		onSubmit,
		defaultValues,
		mode = "create",
		trigger,
	}: FinanceDialogFormProps<FinanceBillStudent>) {

	const grade = useSWR<Grade[]>("/api/grade", fetcher)
	const kelasOptions = ( grade?.data ?? [] ).map(item => `${ item.level } ${ item.name }`)

	const form = useForm<FinanceBillStudent>({
		defaultValues: defaultValues ?? {
			name: "",
			kelas: "",
			bulan: "",
			nominal: 0,
			status: "BELUM",
		},
	})

	// reset form when editing data changes
	useEffect(() => {
		if (defaultValues) form.reset(defaultValues)
	}, [ defaultValues, form ])

	const handleSubmit = form.handleSubmit((data) => {
		onSubmit(data)
		onOpenChange(false)
		form.reset()
	})

	return (
		<Dialog open={ open } onOpenChange={ onOpenChange }>
			{ trigger && <DialogTrigger asChild>{ trigger }</DialogTrigger> }

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>
						{ mode === "create" ? "Tambah Pembayaran" : "Edit Pembayaran" }
					</DialogTitle>
				</DialogHeader>

				<Card>
					<CardContent className="pt-4">
						<Form { ...form }>
							<form onSubmit={ handleSubmit } className="space-y-4">
								<FormField
									control={ form.control }
									name="name"
									render={ ({ field }) => (
										<FormItem>
											<FormLabel>Nama</FormLabel>
											<FormControl>
												<Input placeholder="Nama siswa" { ...field } />
											</FormControl>
											<FormMessage />
										</FormItem>
									) }
								/>

								<FormField
									control={ form.control }
									name="kelas"
									render={ ({ field }) => (
										<FormItem>
											<FormLabel>Kelas</FormLabel>
											<FormControl>
												<Select
													onValueChange={ field.onChange }
													defaultValue={ field.value }
												>
													<SelectTrigger>
														<SelectValue placeholder="Pilih kelas siswa" />
													</SelectTrigger>
													<SelectContent>
														{ kelasOptions.map((item) => (
															<SelectItem key={ item } value={ item }>
																{ item }
															</SelectItem>
														)) }
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									) }
								/>

								<FormField
									control={ form.control }
									name="bulan"
									render={ ({ field }) => (
										<FormItem>
											<FormLabel>Bulan</FormLabel>
											<FormControl>
												<Input placeholder="Contoh: September" { ...field } />
											</FormControl>
											<FormMessage />
										</FormItem>
									) }
								/>

								<FormField
									control={ form.control }
									name="nominal"
									render={ ({ field }) => (
										<FormItem>
											<FormLabel>Nominal</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="Contoh: 500000"
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
									name="status"
									render={ ({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<FormControl>
												<Select
													onValueChange={ field.onChange }
													defaultValue={ field.value }
												>
													<SelectTrigger>
														<SelectValue placeholder="Pilih status" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="LUNAS">LUNAS</SelectItem>
														<SelectItem value="BELUM">BELUM LUNAS</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									) }
								/>

								<div className="flex justify-end pt-4">
									<Button type="submit">
										{ mode === "create" ? "Simpan" : "Perbarui" }
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</DialogContent>
		</Dialog>
	)
}


export type DeleteDialogProps = {
	title?: string
	description?: string
	onConfirm: () => void
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
