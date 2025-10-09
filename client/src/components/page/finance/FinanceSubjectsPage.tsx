import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { type DeleteDialogProps, type  FinanceDialogFormProps } from "@/components/page/finance/FinancePaymentsPage.tsx";
import { type VariantCSS } from "@/components/page/finance/VariantCSS.tsx";
import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner.tsx";
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";
import { zodResolver } from "@hookform/resolvers/zod"
import { EditIcon, EyeIcon, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { type FinanceSubject, type FinanceSubjectOptionalDefaults, FinanceSubjectOptionalDefaultsSchema } from "shared/dist/lib/validate" // or your local type path
import useSWR from "swr";


export default function FinanceSubjectsPage() {
	const financeSubjects = useSWR<FinanceSubject[]>("/api/finance-subjects", fetcher)
	const [ openDialog, setOpenDialog ] = useState(false)
	const [ editData, setEditData ] = useState<FinanceSubject | null>(null)


	const handleCreate = async (formData: FinanceSubjectOptionalDefaults) => {
		await fetcherMutation("/api/finance-subjects", "POST", formData)
		await financeSubjects.mutate()
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleUpdate = async ({ createdAt, updatedAt, ...formData }: FinanceSubjectOptionalDefaults) => {
		await fetcherMutation(`/api/finance-subjects/${ formData.id }`, "PUT", formData)
		await financeSubjects.mutate()
	}

	const handleDelete = async (id: string) => {
		await fetcherMutation(`/api/finance-subjects/${ id }`, "DELETE")
		await financeSubjects.mutate()
	}


	if (financeSubjects.isLoading) return <Spinner />
	if (!financeSubjects.data) return <EmptyComponent title={ "Finance Subjects Data is Not Found" } />

	return (
		<div className=" space-y-6">
			<Card>
				<CardHeader>
					<div className="flex justify-between">
						<CardTitle>Keuangan Berdasarkan Mata Pelajaran</CardTitle>
						<FinanceSubjectDialogForm
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
								<TableHead>Mata Pelajaran</TableHead>
								<TableHead>Biaya</TableHead>
								<TableHead>Keterangan</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ financeSubjects.data.map((subject) => (
								<TableRow key={ subject.id }>
									<TableCell>{ subject.name }</TableCell>
									<TableCell>
										Rp{ subject.cost.toLocaleString("id-ID") }
									</TableCell>
									<TableCell>{ subject.description }</TableCell>
									<TableCell>
										<Badge
											variant={
												( subject.cost > 100000 ? "warning" : "success" ) as VariantCSS
											}
										>
											{ subject.cost > 100000 ? "Biaya Tinggi" : "Normal" }
										</Badge>
									</TableCell>
									<TableCell className={ "space-x-2" }>
										<Button asChild={ true } size={ "sm" }>
											<Link to={ `/finance/subjects/${ subject.id }` }>
												<EyeIcon />
											</Link>
										</Button>
										<FinanceSubjectDialogForm
											open={ openDialog && editData?.id === subject.id }
											onOpenChange={ (open) => {
												setOpenDialog(open)
												if (!open) setEditData(null)
											} }
											onSubmit={ handleUpdate }
											mode="update"
											defaultValues={ subject }
											trigger={
												<Button
													size="sm"
													variant="outline"
													onClick={ () => setEditData(subject) }
												>
													<EditIcon />
												</Button>
											}
										/>
										<DeleteDialog onConfirm={ () => handleDelete(subject.id) } />

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


export function FinanceSubjectDialogForm(
	{
		defaultValues,
		mode = "create",
		onOpenChange,
		onSubmit,
		open,
		trigger,
	}: FinanceDialogFormProps<FinanceSubjectOptionalDefaults>
) {
	const form = useForm<FinanceSubjectOptionalDefaults>({
		resolver: zodResolver(FinanceSubjectOptionalDefaultsSchema),
		defaultValues: defaultValues ?? {
			name: "",
			code: "",
			category: "",
			cost: 0,
			description: "",
			semester: 1,
			isActive: true,
		},
	})


	function handleSubmit(values: FinanceSubjectOptionalDefaults) {
		onSubmit(values)
		onOpenChange(false)
	}


	return (
		<Dialog open={ open } onOpenChange={ onOpenChange }>
			{ trigger && <DialogTrigger asChild>{ trigger }</DialogTrigger> }
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>
						{ mode === "create"
							? "Tambah Data Keuangan"
							: "Edit Data Keuangan" }
					</DialogTitle>
				</DialogHeader>

				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(handleSubmit) } className="space-y-4">
						<FormField
							control={ form.control }
							name="name"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Nama Mata Pelajaran</FormLabel>
									<FormControl>
										<Input placeholder="Masukkan nama" { ...field } />
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="code"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Kode</FormLabel>
									<FormControl>
										<Input placeholder="Kode unik" { ...field } />
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="category"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Kategori</FormLabel>
									<FormControl>
										<Input placeholder="Kategori (misal: Akademik)" { ...field } />
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
							name="semester"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Semester</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Semester"
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
							name="description"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Keterangan</FormLabel>
									<FormControl>
										<Input placeholder="Opsional"
											//{ ...field }
											   defaultValue={ field.value ?? "" }
											   onChange={ e => field.onChange(e.target.value) }
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="isActive"
							render={ ({ field }) => (
								<FormItem className="flex items-center justify-between">
									<FormLabel>Status Aktif</FormLabel>
									<FormControl>
										<Switch checked={ field.value } onCheckedChange={ field.onChange } />
									</FormControl>
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
