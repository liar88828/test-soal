import { useFetcher } from "react-router-dom";
import { announcementCreate } from "@/action/announcement.ts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DrawerDialog } from "@/components/mini/DrawerDialog.tsx";
import { Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";

export const categoryOptions = [ "Umum", "Akademik", "Kegiatan", "Darurat" ]

export const announcementSchema = z.object({
	title: z.string().min(3, "Judul minimal 3 karakter"),
	content: z.string().min(5, "Isi pengumuman minimal 5 karakter"),
	date: z.string().nonempty("Tanggal wajib diisi"),
	category: z.array(z.string()).min(1, "Pilih minimal 1 kategori"),
	author: z.string().optional(),
})

export type AnnouncementSchema = z.infer<typeof announcementSchema>

export function AnnouncementsModal() {
	const fetcher = useFetcher<typeof announcementCreate>()
	const [ isOpen, setIsOpen ] = useState(false)
	const form = useForm<AnnouncementSchema>({
		resolver: zodResolver(announcementSchema),
		defaultValues: {
			title: "",
			content: "",
			date: new Date().toISOString().split("T")[0],
			category: [],
			author: "",
		},
	})

	async function onSubmit(values: AnnouncementSchema) {
		const formData = new FormData()
		formData.append("title", values.title)
		formData.append("content", values.content)
		formData.append("date", values.date)

		values.category.forEach((c) => formData.append("category", c))
		if (values.author) formData.append("author", values.author)

		await fetcher.submit(formData, {
			method: "post",
			action: "/announcement?index", // adjust to your action route
			encType: "multipart/form-data",
		})
		// console.log("📢 New announcement:", values)
		setIsOpen(false)
	}

	return (
		<DrawerDialog
			isOpen={ isOpen }
			onOpen={ setIsOpen }
			triggerLabel={
				<>
					<Plus className="mr-2 h-4 w-4" />
					Add
				</>
			}
			title="Buat Pengumuman Baru"
		>
			<Form { ...form }>
				<form onSubmit={ form.handleSubmit(onSubmit) } className="grid gap-4">
					{/* Title */ }
					<FormField
						control={ form.control }
						name="title"
						render={ ({ field }) => (
							<FormItem>
								<FormLabel>Judul</FormLabel>
								<FormControl>
									<Input placeholder="Judul Pengumuman" { ...field } />
								</FormControl>
								<FormMessage />
							</FormItem>
						) }
					/>

					{/* Content */ }
					<FormField
						control={ form.control }
						name="content"
						render={ ({ field }) => (
							<FormItem>
								<FormLabel>Isi Pengumuman</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Tulis isi pengumuman..."
										rows={ 4 }
										{ ...field }
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						) }
					/>

					{/* Date */ }
					<FormField
						control={ form.control }
						name="date"
						render={ ({ field }) => (
							<FormItem>
								<FormLabel>Tanggal</FormLabel>
								<FormControl>
									<Input type="date" { ...field } />
								</FormControl>
								<FormMessage />
							</FormItem>
						) }
					/>

					{/* Category (Checkbox array) */ }
					<FormField
						control={ form.control }
						name="category"
						render={ () => (
							<FormItem>
								<FormLabel>Kategori</FormLabel>
								<div className="grid gap-2">
									{ categoryOptions.map((option) => (
										<FormField
											key={ option }
											control={ form.control }
											name="category"
											render={ ({ field }) => {
												return (
													<FormItem
														key={ option }
														className="flex flex-row items-center space-x-2"
													>
														<FormControl>
															<Checkbox
																checked={ field.value?.includes(option) }
																onCheckedChange={ (checked) => {
																	return checked
																		? field.onChange([ ...field.value, option ])
																		: field.onChange(
																			field.value?.filter(
																				(val) => val !== option
																			)
																		)
																} }
															/>
														</FormControl>
														<FormLabel className="font-normal">
															{ option }
														</FormLabel>
													</FormItem>
												)
											} }
										/>
									)) }
								</div>
								<FormMessage />
							</FormItem>
						) }
					/>

					{/* Author */ }
					<FormField
						control={ form.control }
						name="author"
						render={ ({ field }) => (
							<FormItem>
								<FormLabel>Penulis (opsional)</FormLabel>
								<FormControl>
									<Input placeholder="Nama Penulis" { ...field } />
								</FormControl>
								<FormMessage />
							</FormItem>
						) }
					/>

					<Button type="submit">Kirim</Button>
				</form>
			</Form>
		</DrawerDialog>
	)
}
