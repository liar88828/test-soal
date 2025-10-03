import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { TeacherType } from "@/interface/teacher-type.ts";
import { useTeacherStore } from "@/stores/use-teacher-store.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { subjects } from "@/assets/subjects.tsx";
import { teacherFormData, TeacherFormData } from "@/schema/teacher-form-data.tsx";
import { useMapelClassStore } from "@/stores/use-mapel-class-store.ts";


export function TeacherForm(
	{
		open,
		onClose,
		editing,
	}: {
		open: boolean;
		onClose: () => void;
		editing?: TeacherType | null;
	}) {
	const { addTeacher, updateTeacher } = useTeacherStore();

	const form = useForm<TeacherFormData>({
		resolver: zodResolver(teacherFormData),
		defaultValues: editing ?? {
			name: "",
			subject: "",
			phone: "",
			email: "",
			address: "",
			photo: "https://avatar.iran.liara.run/public",
			gender: "Male",
			birthDate: "",
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
				birthDate: "",
			});
		}
	}, [ editing, form ]);

	const onSubmit = (values: TeacherFormData) => {
		if (editing) {
			updateTeacher(editing.id, values);
		} else {
			addTeacher(values as TeacherType);
		}
		onClose();
	};

	console.log(editing);
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
										<Input type="date" { ...field } />
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

export default function TeacherTablePage() {
	const { teachers, deleteTeacher } = useTeacherStore();
	const { getSubjectByIdTeacher } = useMapelClassStore()
	const [ open, setOpen ] = useState(false);
	const [ editing, setEditing ] = useState<TeacherType | null>(null);

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
						{ teachers.map((t) => (
							<TableRow key={ t.id }>
								<TableCell>{ t.name }</TableCell>
								<TableCell>{ t.subject }</TableCell>
								<TableCell>{ t.email }</TableCell>
								<TableCell>{ t.phone }</TableCell>
								<TableCell>{ getSubjectByIdTeacher(t.id).totalJP }</TableCell>
								<TableCell className="space-x-2">
									<Button asChild variant={ "outline" }>
										<Link to={ `/academic/teacher/${ t.id }` }>
											<Eye />
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
