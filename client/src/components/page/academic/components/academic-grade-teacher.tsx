import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form.tsx";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { EditIcon, Plus, TrashIcon } from "lucide-react";
import { useMapelClassStore } from "@/stores/use-mapel-class-store.ts";
import { useTeacherStore } from "@/stores/use-teacher-store.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { toast } from "sonner";
import { mapelFormSchema, type MapelFormValues } from "@/schema/mapel-form-schema.tsx";
import { useOptionGradePerClassStore } from "@/stores/use-option-grade-per-class-store.ts";
import { Input } from "@/components/ui/input.tsx";
import { formatToHour } from "@/components/page/academic/components/format-to-hour.tsx";

// type Grouped = {
// 	nameSubject: string;
// 	totalJP: number;
// 	totalCount: number;
// 	totalMaxJP: number;
// };

export default function AcademicGradeTeacher(props: { idGrade: string }) {

	return (
		<div className={ "space-y-6" }>
			<DaftarMataPelajaran idGrade={ props.idGrade } />
			<TotalGuru idGrade={ props.idGrade } />
		</div>
	);
}

function DaftarMataPelajaran(props: { idGrade: string }) {
	const [ editing, setEditing ] = useState<MapelFormValues | null>(null);
	const { removeMapelForTeacher, addMapelForTeacher, updateMapelForTeacher, filterMapelByGrade } = useMapelClassStore();
	const { subjectData, } = filterMapelByGrade(props.idGrade)

	const handleSave = (data: MapelFormValues) => {
		if (editing && editing.id) {
			updateMapelForTeacher(editing.id, data);
			setEditing(null);
		} else {
			addMapelForTeacher(data);
		}
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Daftar Mata Pelajaran</CardTitle>

					<Dialog>
						<DialogTrigger asChild>
							<Button><Plus /></Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Tambah Mapel</DialogTitle>
								<DialogDescription>Isi form untuk menambahkan mata pelajaran baru</DialogDescription>
							</DialogHeader>
							<AcademicScheduleOptionForm
								editing={ null }
								onSave={ handleSave }
								idGrade={ props.idGrade }
							/>
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>

			<CardContent>
				<Table>
					<TableCaption>Daftar Mata Pelajaran & Jumlah JP dfsfvssddf</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className=" text-center">No</TableHead>
							<TableHead>Guru</TableHead>
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead className="text-end">Jumlah JP</TableHead>
							<TableHead className="text-start">Jumlah Jam</TableHead>
							<TableHead className="text-center w-[160px]">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ subjectData.map((m, i) => (
							<TableRow key={ m.id }>
								<TableCell className="text-center">{ i + 1 }</TableCell>
								<TableCell>{ m.nameTeacher }</TableCell>
								<TableCell>{ m.nameSubject }</TableCell>
								<TableCell className="text-end">{ m.jp }</TableCell>
								<TableCell className="text-start">{ formatToHour(m.jp * 45) }</TableCell>
								<TableCell className="text-center space-x-2">
									{/* Edit */ }
									<Dialog
										open={ !!editing && editing.id === m.id }
										onOpenChange={ (isOpen) => {
											if (!isOpen) setEditing(null);
										} }
									>
										<DialogTrigger asChild>
											<Button size="sm" onClick={ () => setEditing(m) }
											>
												<EditIcon />
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Edit Mapel</DialogTitle>
											</DialogHeader>
											<AcademicScheduleOptionForm
												editing={ editing }
												onSave={ handleSave }
												idGrade={ props.idGrade }
												onClose={ () => setEditing(null) }
											/>
										</DialogContent>
									</Dialog>

									{/* Delete */ }
									<Button
										size="sm"
										variant="destructive"
										onClick={ () => removeMapelForTeacher(m.id) }
									>
										<TrashIcon />
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

function TotalGuru(props: { idGrade: string }) {
	const { dataAvailableOnClass } = useOptionGradePerClassStore(state => state.getDataByGrade)(props.idGrade)
	const { count, countTotalTeacher, countTotalJP } = useMapelClassStore(state => state.filterMapelByGrade)(props.idGrade)

	const combinedData = count.map((c) => {
		const found = dataAvailableOnClass.find(
			(d) => d.nameSubject === c.nameSubject
		);

		return {
			nameSubject: c.nameSubject,
			count: c.count,
			totalJP: c.totalJP,
			totalMaxJP: found ? found.totalMaxJP : 0,
		};
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Guru</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableCaption>Total JP per Subject adfad</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>No.</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead className="text-center">Total Teacher</TableHead>
							<TableHead className="text-center">Total JP</TableHead>
							<TableHead className="text-center">Max JP</TableHead>
							<TableHead className="text-center">Need JP</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ combinedData.map((r, i) => (
							<TableRow key={ r.nameSubject }>
								<TableCell>{ i + 1 }</TableCell>
								<TableCell className="font-medium text-start">{ r.nameSubject }</TableCell>
								<TableCell className="text-center">{ r.count }</TableCell>
								<TableCell className="text-center">{ r.totalJP }</TableCell>
								<TableCell className="text-center">{ r.totalMaxJP }</TableCell>
								<TableCell className="text-center text-red-400">{ r.totalMaxJP - r.totalJP }</TableCell>
							</TableRow>
						)) }
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Total</TableCell>
							<TableCell className={ "text-center" }>{ countTotalTeacher }</TableCell>
							<TableCell className={ "text-center" }>{ countTotalJP }</TableCell>
							<TableCell className={ "text-center" }></TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
		</Card>
	);
}

function AcademicScheduleOptionForm(
	{
		editing, onSave, onClose, idGrade
	}: {
		editing: MapelFormValues | null;
		onSave: (data: MapelFormValues) => void;
		onClose?: () => void;
		idGrade: string;
	}) {
	const { dataAvailableOnClass, } = useOptionGradePerClassStore(state => state.getDataByGrade)(idGrade);
	const { subjectData } = useMapelClassStore(state => state.filterMapelByGrade)(idGrade)
	const { teachers } = useTeacherStore();

	const teacherFilter = teachers.filter((teacher) => {
		const availableSubject = dataAvailableOnClass.some((i) => i.nameSubject === teacher.subject);
		const teacherNotAssigned = !subjectData.some((mapel) => mapel.nameTeacher === teacher.name);
		// console.log(teacher.subject)
		return availableSubject && teacherNotAssigned;
	});

	const form = useForm<MapelFormValues>({
		resolver: zodResolver(mapelFormSchema),
		defaultValues: editing ? editing : {
			nameSubject: "Math",
			jp: 0,
			idTeacher: "",
			nameTeacher: "",
			idGrade
		},
	});

	const onSubmit = (values: MapelFormValues) => {
		onSave(values);
		form.reset({
			nameSubject: "Math",
			jp: 0,
			idTeacher: "",
			nameTeacher: "",
			idGrade
		});
		// toast.error(form.formState.errors)
		onClose?.();
	};

	const onError = (errors: typeof form.formState.errors) => {
		// take first error message
		const firstError = Object.values(errors)[0]?.message as string | undefined;
		if (firstError) {
			toast.error(`Error Values: ${ firstError }`);
		} else {
			toast.error("Please fix the errors in the form");
		}
	};

	console.log(form.formState.errors);

	return (
		<Form { ...form }>
			<form onSubmit={ form.handleSubmit(onSubmit, onError) } className="space-y-4">
				{/*Jumlah JP */ }
				<FormField
					control={ form.control }
					name="jp"
					render={ ({ field }) => (
						<FormItem>
							<FormLabel>Jumlah JP</FormLabel>
							<FormControl>
								<Input
									max={ 8 }
									type="number"
									{ ...field }
									onChange={ (e) => field.onChange(e.target.valueAsNumber) }
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					) }
				/>

				{/* Teacher */ }
				<FormField
					control={ form.control }
					name="idTeacher"
					render={ ({ field }) => (
						<FormItem>
							<FormLabel>Teacher</FormLabel>
							<Select
								onValueChange={ (valueIdTeacher) => {
									const teacher = teacherFilter.find((i) => i.id === valueIdTeacher);
									if (!teacher) {
										toast.error("Teacher not found!");
										return
									}
									const option = dataAvailableOnClass.find(i => i.nameSubject === teacher.subject)
									if (!option) {
										toast.error("Subject not found!");
										return;
									}
									form.setValue("nameTeacher", teacher.name);
									form.setValue("nameSubject", teacher.subject);
									form.setValue("jp", 0);
								} }
								defaultValue={ field.value }
							>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select teacher" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ teacherFilter.map((i) => (
										<SelectItem key={ i.id } value={ i.id }>
											{ i.name } - { i.subject }
										</SelectItem>
									)) }
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					) }
				/>

				<Button type="submit" className="w-full">
					{ editing ? "Update Mapel" : "Tambah Mapel" }
				</Button>
			</form>
		</Form>
	);
}
