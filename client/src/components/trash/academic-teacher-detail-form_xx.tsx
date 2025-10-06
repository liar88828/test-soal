import { UseFormReturn } from "react-hook-form";
import { SubjectSchema } from "@/schema/subject-schema.ts";
import { useEffect, useState } from "react";
import { useSubjectStore_xxx } from "@/stores/use-subject-store_xxx.ts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { baseClasses } from "@/components/page/teacher/components/base-classes.tsx";


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
