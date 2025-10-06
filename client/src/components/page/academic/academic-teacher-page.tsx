import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { subjects } from "@/assets/subjects.tsx";
import { type Teacher, TeacherOptionalDefaultsSchema } from "shared/dist/lib/validate";
import { type TeacherOptionalDefaults } from "shared/src/lib/validate/modelSchema/TeacherSchema.ts";
import { teacherCreate, teacherGet, teacherUpdate } from "@/lib/swr/teacher.ts";
import { useTeacherStore } from "@/stores/use-teacher-store.ts";
import { useMapelClassStore } from "@/stores/use-mapel-class-store.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Link } from "react-router-dom";
import { EyeIcon } from "lucide-react";


export function TeacherForm(
	{
		open,
		onClose,
		editing,
	}: {
		open: boolean;
		onClose: () => void;
		editing?: TeacherOptionalDefaults | null;
	}) {
	// const { addTeacher, updateTeacher } = useTeacherStore();
	const teachers = teacherGet()

	const form = useForm<TeacherOptionalDefaults>({
		resolver: zodResolver(TeacherOptionalDefaultsSchema),
		defaultValues: editing ?? {
			name: "",
			subject: "",
			phone: "",
			email: "",
			address: "",
			photo: "https://avatar.iran.liara.run/public",
			gender: "Male",
			birthDate: new Date(),

		},
	});

// 🔄 Update form when editing changes
	useEffect(() => {
		if (editing) {
			form.reset(editing);
		} else {
			form.reset({
				name: "",
				subject: "",
				phone: "",
				email: "",
				address: "",
				photo: "https://avatar.iran.liara.run/public",
				gender: "Male",
				birthDate: new Date(),
			});
		}
	}, [ editing, form ]);

	const onSubmit = async (values: TeacherOptionalDefaults) => {
		if (editing && editing.id) {
			const response = await teacherUpdate(editing.id, values)
			console.log(response);
		} else {
			const response = await teacherCreate(values)
			console.log(response);
		}
		await teachers.mutate()
		onClose();
	}

	console.log(form.formState.errors);
	return (
		<Dialog open={ open } onOpenChange={ onClose }>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>
						{ editing ? "Edit Teacher" : "Add Teacher" }
					</DialogTitle>
				</DialogHeader>

				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">
						<FormField
							control={ form.control }
							name="name"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input placeholder="contoh: Mr. Fandy" { ...field } />
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="subject"
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
							name="phone"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Telepon</FormLabel>
									<FormControl>
										<Input placeholder="08123456789" { ...field } />
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="email"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="email@example.com" { ...field } />
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="address"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Alamat</FormLabel>
									<FormControl>
										<Input placeholder="Jl. Merdeka No. 10, Jakarta" { ...field } />
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="photo"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Foto URL</FormLabel>
									<FormControl>
										<Input placeholder="https://randomuser.me/..." { ...field } />
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="gender"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<Select
											onValueChange={ field.onChange }
											defaultValue={ field.value }
										>
											<SelectTrigger className={ "w-full" }>
												<SelectValue placeholder="Pilih Gender" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Male">Male</SelectItem>
												<SelectItem value="Female">Female</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<FormField
							control={ form.control }
							name="birthDate"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Tanggal Lahir</FormLabel>
									<FormControl>
										{/*<Input type="date" { ...field } />*/ }
										<Input
											type="date"
											value={
												field.value
													? new Date(field.value).toISOString().split("T")[0]
													: ""
											}
											onChange={ (e) => field.onChange(new Date(e.target.value)) }
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						<Button type="submit" className="w-full">
							{ editing ? "Update" : "Add" }
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export function TeacherTable() {
	const teachers = teacherGet()
	const [ open, setOpen ] = useState(false);
	const { deleteTeacher } = useTeacherStore();
	const { getSubjectByIdTeacher } = useMapelClassStore()
	const [ editing, setEditing ] = useState<Teacher | null>(null);

	if (teachers.isLoading) {
		return <Spinner />;
	}
	if (!teachers.data) {
		return <EmptyComponent />
	}

	return (
		<Card>
			<CardHeader className={ "flex justify-between" }>
				<CardTitle>Teacher List</CardTitle>
				<Button onClick={ () => {
					setEditing(null);
					setOpen(true);
				} }
				>
					Add Teacher
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Total JP</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ teachers.data.map((t) => (
							<TableRow key={ t.id }>
								<TableCell>{ t.name }</TableCell>
								<TableCell>{ t.subject }</TableCell>
								<TableCell>{ t.email }</TableCell>
								<TableCell>{ t.phone }</TableCell>
								<TableCell>{ getSubjectByIdTeacher(t.id).totalJP }</TableCell>
								<TableCell className="space-x-2">
									<Button asChild variant={ "outline" }>
										<Link to={ `/academic/teacher/${ t.id }` }>
											<EyeIcon />
										</Link>
									</Button>

									<Button size="sm"
									        onClick={ () => {
										        setEditing(t);
										        setOpen(true);
									        } }
									>Edit</Button>

									<Button size="sm" variant="destructive" onClick={ () => deleteTeacher(t.id) }>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
			<TeacherForm open={ open }
			             editing={ editing }
			             onClose={ () => setOpen(false) }
			/>
		</Card>
	);
}

export default function AcademicTeacherPage() {
	return (
		<div className="space-y-6">
			{/*<AcademicTeacher teachers={ exampleTeachers } />*/ }
			<TeacherTable />
		</div>
	);
}
