import { SubjectSchema } from "@/schema/subject-schema.ts";
import { useSubjectStore_xxx } from "@/stores/use-subject-store_xxx.ts";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
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
import { useMapelClassStore } from "@/stores/use-mapel-class-store.ts";
import { mapelFormSchema, MapelFormValues } from "@/schema/mapel-form-schema.tsx";
import { subjects } from "@/assets/subjects.tsx";
import { useTeacherStore } from "@/stores/use-teacher-store.ts";


export function TeacherSubjectsTable(props: { idTeacher: string }) {
	const [ editing, setEditing ] = useState<MapelFormValues | null>(null);
	const { getSubjectByIdTeacher, removeMapelForTeacher } = useMapelClassStore()
	const { getTeacherById } = useTeacherStore()
	const teacher = getTeacherById(props.idTeacher)

	const { subjectData: newSubject, totalJP, totalSchedule } = getSubjectByIdTeacher(props.idTeacher)

	const form = useForm<MapelFormValues>({
		resolver: zodResolver(mapelFormSchema),
		defaultValues: {
			id: "",
			idGrade: "",
			idTeacher: props.idTeacher,
			nameTeacher: teacher?.name,
			nameSubject: teacher?.subject,
			jp: 1,
		},
	});

	if (!teacher) {
		return null;
	}

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Subjects Taught</CardTitle>
				<AcademicTeacherDetailForm
					form={ form }
					editing={ editing } setEditing={ setEditing }
				/>
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
						{ newSubject.map((subj, i) => (
							<TableRow key={ subj.id }>
								<TableCell className={ "text-center" }>{ i + 1 }</TableCell>
								<TableCell className={ "text-center" }>{ subj.idGrade }</TableCell>
								<TableCell className={ "text-center" }>{ subj.nameSubject }</TableCell>
								<TableCell className={ "text-center" }>{ subj.jp }</TableCell>
								<TableCell className=" flex gap-2 justify-center">
									<Button
										size="sm"
										variant="outline"
										onClick={ () => {
											setEditing(subj);
											form.reset(subj);
										} }
									>
										<PencilIcon size={ 16 } />
									</Button>
									<Button
										size="sm"
										variant="destructive"
										onClick={ () => removeMapelForTeacher(subj.id as string) }
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
							<TableCell className={ "text-center" }>JP : { totalJP }</TableCell>
							<TableCell className={ "text-center" }>Jam : { totalSchedule }</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
		</Card>
	);
}

function AcademicTeacherDetailForm(
	{
		form,
		editing,
		setEditing,
	}: {
		form: UseFormReturn<MapelFormValues>,
		editing: MapelFormValues | null,
		setEditing: (value: MapelFormValues | null) => void
	}) {

	const { updateMapelForTeacher, addMapelForTeacher } = useMapelClassStore();
	const suffixes = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

	const [ open, setOpen ] = useState(false)
	const [ base, setBase ] = useState<string>("");
	const [ suffix, setSuffix ] = useState<string>("");

	useEffect(() => {
		if (editing) {
			form.setValue("idGrade", editing.idGrade)
			setOpen(true) // auto-open when editing
		}
	}, [ editing, form ])

	const updateValue = (newBase: string, newSuffix: string) => {
		const value = `${ newBase }${ newSuffix }`;
		form.setValue("idGrade", value);
	};

	// const [ editing, setEditing ] = useState<SubjectSchema | null>(null);

	const onSubmit = (values: MapelFormValues) => {
		if (editing) {
			updateMapelForTeacher(editing.id as string, values)
			setEditing(null)
		} else {
			addMapelForTeacher(values)
		}
		form.reset()
		setBase("")
		setSuffix("")
	}

	return (
		<Dialog open={ open } onOpenChange={ setOpen }>
			<DialogTrigger asChild>
				<Button>Add Subject</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{ editing ? "Edit Subject" : "Add Subject" }</DialogTitle>
					<DialogDescription>Fill in subject details.</DialogDescription>
				</DialogHeader>

				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">

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
							name="nameSubject"
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
							<Button type="submit">{ editing ? "Update" : "Save" }</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

function AcademicTeacherDetailForm_xx(
	{
		form,
		editing,
		setEditing,
	}: {
		form: UseFormReturn<SubjectSchema>,
		editing: SubjectSchema | null,
		setEditing: (value: SubjectSchema | null) => void
	}) {

	const suffixes = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

	const [ open, setOpen ] = useState(false)
	const [ base, setBase ] = useState<string>("");
	const [ suffix, setSuffix ] = useState<string>("");

	useEffect(() => {
		if (editing) {
			form.setValue("className", editing.className)
			setOpen(true) // auto-open when editing
		}
	}, [ editing, form ])

	const updateValue = (newBase: string, newSuffix: string) => {
		const value = `${ newBase }${ newSuffix }`;
		form.setValue("className", value);
	};

	const { addSubject, updateSubject } = useSubjectStore_xxx();
	// const [ editing, setEditing ] = useState<SubjectSchema | null>(null);

	const onSubmit = (values: SubjectSchema) => {
		if (editing) {
			updateSubject(editing.id as string, values)
			setEditing(null)
		} else {
			addSubject(values)
		}
		form.reset()
		setBase("")
		setSuffix("")
	}

	return (
		<Dialog open={ open } onOpenChange={ setOpen }>
			<DialogTrigger asChild>
				<Button>Add Subject</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{ editing ? "Edit Subject" : "Add Subject" }</DialogTitle>
					<DialogDescription>Fill in subject details.</DialogDescription>
				</DialogHeader>

				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">

						<FormField
							control={ form.control }
							name="className"
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
							name="subjectName"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Subject</FormLabel>
									<Select onValueChange={ field.onChange } defaultValue={ field.value }>
										<FormControl>
											<SelectTrigger className={ "w-full" }>
												<SelectValue placeholder="Select subject" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Math">Math</SelectItem>
											<SelectItem value="Physics">Physics</SelectItem>
											<SelectItem value="Chemistry">Chemistry</SelectItem>
											<SelectItem value="Biology">Biology</SelectItem>
											<SelectItem value="English">English</SelectItem>
											<SelectItem value="History">History</SelectItem>
											<SelectItem value="Geography">Geography</SelectItem>
											<SelectItem value="Computer Science">Computer Science</SelectItem>
											<SelectItem value="Economics">Economics</SelectItem>
											<SelectItem value="Accounting">Accounting</SelectItem>
											<SelectItem value="Sociology">Sociology</SelectItem>
											<SelectItem value="Psychology">Psychology</SelectItem>
											<SelectItem value="Philosophy">Philosophy</SelectItem>
											<SelectItem value="Art">Art</SelectItem>
											<SelectItem value="Music">Music</SelectItem>
											<SelectItem value="Physical Education">Physical Education</SelectItem>
											<SelectItem value="Civics">Civics</SelectItem>
											<SelectItem value="Religious Studies">Religious Studies</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="day"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Day</FormLabel>
									<FormControl>
										<select
											{ ...field }
											className="w-full rounded-md border border-input bg-background px-3 py-2"
										>
											<option value="">Select a day</option>
											<option value="Mon">Monday</option>
											<option value="Tue">Tuesday</option>
											<option value="Wed">Wednesday</option>
											<option value="Thu">Thursday</option>
											<option value="Fri">Friday</option>
											<option value="Sat">Saturday</option>
											<option value="Sun">Sunday</option>
										</select>
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={ form.control }
								name="startTime"
								render={ ({ field }) => (
									<FormItem>
										<FormLabel>Start Time</FormLabel>
										<FormControl>
											<Input type="time" { ...field } />
										</FormControl>
										<FormMessage />
									</FormItem>
								) }
							/>
							<FormField
								control={ form.control }
								name="endTime"
								render={ ({ field }) => (
									<FormItem>
										<FormLabel>End Time</FormLabel>
										<FormControl>
											<Input type="time" { ...field } />
										</FormControl>
										<FormMessage />
									</FormItem>
								) }
							/>
						</div>

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
							<Button type="submit">{ editing ? "Update" : "Save" }</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
