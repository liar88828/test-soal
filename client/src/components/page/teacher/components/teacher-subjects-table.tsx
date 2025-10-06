import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { baseClasses } from "@/components/page/teacher/components/base-classes.tsx";
import { subjects } from "@/assets/subjects.tsx";
import type { FormDialog } from "@/interface/form-dialog.tsx";
import { teacherGetID } from "@/lib/swr/teacher-swr.ts";
import { mapelDelete, mapelGetByTeacherID, mapelUpdate } from "@/lib/swr/mapel-swr.ts";
import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { type MapelOptionalDefaults, MapelOptionalDefaultsSchema } from "shared/dist/lib/validate";
import { onError } from "@/lib/on-error.tsx";


function AcademicTeacherDetailForm(props: FormDialog<MapelOptionalDefaults>) {
	const { setOpen, editData, open, onSubmit, } = props

	const suffixes = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
	const [ base, setBase ] = useState<string>("");
	const [ suffix, setSuffix ] = useState<string>("");

	const form = useForm<MapelOptionalDefaults>({
		resolver: zodResolver(MapelOptionalDefaultsSchema),
		defaultValues: editData ? editData : {
			id: "",
			idGrade: "",
			idTeacher: "",
			nameTeacher: "",
			name: "",
			jp: 1,

		},
	});

	useEffect(() => {
		if (editData) {
			form.setValue("idGrade", editData.idGrade)
			setOpen(true) // auto-open when editData
		}
	}, [ editData, form ])

	const updateValue = (newBase: string, newSuffix: string) => {
		const value = `${ newBase }${ newSuffix }`;
		form.setValue("idGrade", value);
	};

	return (
		<Dialog open={ open } onOpenChange={ setOpen }>
			<DialogTrigger asChild>
				<Button>Add Subject</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{ editData ? "Edit Subject" : "Add Subject" }</DialogTitle>
					<DialogDescription>Fill in subject details.</DialogDescription>
				</DialogHeader>

				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit, onError) } className="space-y-4">

						<FormField
							control={ form.control }
							name="idGrade"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Class</FormLabel>
									<div className="flex gap-2 mt-2">
										{/* The editable input */ }
										<FormControl>
											<Input placeholder="e.g. SMA-12A" { ...field } />
										</FormControl>

										{/* Two selects below input */ }

										{/* Select Base */ }
										<Select
											onValueChange={ (val) => {
												setBase(val);
												updateValue(val, suffix);
											} }
											defaultValue={ base }
										>
											<FormControl>
												<SelectTrigger className="w-[160px]">
													<SelectValue placeholder="Select level" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{ baseClasses.map((cls) => (
													<SelectItem key={ cls } value={ cls }>
														{ cls }
													</SelectItem>
												)) }
											</SelectContent>
										</Select>

										{/* Select Suffix */ }
										<Select
											onValueChange={ (val) => {
												setSuffix(val);
												updateValue(base, val);
											} }
											defaultValue={ suffix }
										>
											<FormControl>
												<SelectTrigger className="w-[100px]">
													<SelectValue placeholder="A-Z" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{ suffixes.map((sfx) => (
													<SelectItem key={ sfx } value={ sfx }>
														{ sfx }
													</SelectItem>
												)) }
											</SelectContent>
										</Select>
									</div>

									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="name"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Subject</FormLabel>
									<Select onValueChange={ field.onChange } defaultValue={ field.value }>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select subject" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{ subjects.map((subject) => (
												<SelectItem key={ subject } value={ subject }>
													{ subject }
												</SelectItem>
											)) }
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="jp"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>SKS</FormLabel>
									<FormControl>
										<Input type="number"
										       max={ 6 }
										       placeholder="2"
										       defaultValue={ field.value }
										       onChange={ e => field.onChange(Number(e.target.value)) }
										/></FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<DialogFooter>
							<Button type="submit">{ editData ? "Update" : "Save" }</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default function TeacherSubjectsTable(props: { idTeacher: string }) {
	const teacher = teacherGetID(props.idTeacher)
	const mapels = mapelGetByTeacherID(props.idTeacher)

	const [ open, setOpen ] = useState(false)
	const [ editing, setEditing ] = useState<MapelOptionalDefaults | null>(null);

	const onSubmit = async (values: MapelOptionalDefaults) => {
		if (editing && editing.id) {
			await mapelUpdate(editing.id, values)
			setEditing(null)
		} else {
			// await mapelCreate(values)
		}
	}

	if (!teacher) {
		return null;
	}
	if (mapels.isLoading) {
		return <Spinner />
	}
	if (!mapels.data) {
		return <EmptyComponent />
	}
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Subjects Taught</CardTitle>

			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className={ "text-center" }>No</TableHead>
							<TableHead className={ "text-center" }>Class</TableHead>
							<TableHead className={ "text-center" }>Mapel</TableHead>
							<TableHead className={ "text-center" }>JP</TableHead>
							<TableHead className={ "text-center" }>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ mapels.data.map((subj, i) => (
							<TableRow key={ subj.id }>
								<TableCell className={ "text-center" }>{ i + 1 }</TableCell>
								<TableCell className={ "text-center" }>{ subj.idGrade }</TableCell>
								<TableCell className={ "text-center" }>{ subj.name }</TableCell>
								<TableCell className={ "text-center" }>{ subj.jp }</TableCell>
								<TableCell className=" flex gap-2 justify-center">
									<Button
										size="sm"
										variant="outline"
										onClick={ () => {
											setEditing(subj);
											// form.reset(subj);
										} }
									>
										<PencilIcon size={ 16 } />
									</Button>
									<Button
										size="sm"
										variant="destructive"
										onClick={ () => mapelDelete(subj.id) }
									>
										<TrashIcon size={ 16 } />
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell className={ "text-center" }>Total </TableCell>
							<TableCell className={ "text-center" }>Min/Max 20/40 </TableCell>
							<TableCell className={ "text-center" }>JP :
								{/*{ totalJP }*/ }
								xxx
							</TableCell>
							<TableCell className={ "text-center" }>Jam :
								{/*{ totalSchedule }*/ }
								xxx
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
			<AcademicTeacherDetailForm
				setOpen={ setOpen }
				open={ open }
				editData={ editing }
				onSubmit={ onSubmit }
			/>
		</Card>
	);
}
