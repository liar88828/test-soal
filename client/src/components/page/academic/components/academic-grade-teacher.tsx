import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { EditIcon, Plus, TrashIcon } from "lucide-react";
import { useMapelClassStore } from "@/stores/use-mapel-class-store.ts";
import { useTeacherStore } from "@/stores/use-teacher-store.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { toast } from "sonner";
import { formatToHour } from "@/components/page/academic/components/academic-grade-option.tsx";
import { mapelFormSchema, MapelFormValues } from "@/schema/mapel-form-schema.tsx";
import { useOptionGradePerClassStore } from "@/stores/use-option-grade-per-class-store.ts";

type Grouped = {
	name: string;
	totalJP: number;
	totalCount: number;
};

export function AcademicGradeTeacher(props: { idGrade: string }) {
	const [ editing, setEditing ] = useState<MapelFormValues | null>(null);
	// const { removeOption, addOption, updateOption, getDataByGrade } = useOptionGradePerClassStore();
	// const { dataAvailableOnClass, totalJP, totalTime } = getDataByGrade(props.idGrade)
	const { removeMapelForTeacher, addMapelForTeacher, updateMapelForTeacher, filterMapelByGrade } = useMapelClassStore();
	const mapels = filterMapelByGrade(props.idGrade)

	const result: Grouped[] = Object.values(
		mapels.reduce<Record<string, Grouped>>((acc, item) => {
			if (!acc[item.nameSubject]) {
				acc[item.nameSubject] = { name: item.nameSubject, totalJP: 0, totalCount: 0 };
			}
			acc[item.nameSubject].totalJP += item.jp;
			acc[item.nameSubject].totalCount += 1;
			return acc;
		}, {})
	);

	const handleSave = (data: MapelFormValues) => {
		// console.log(dataAvailableOnClass);
		if (editing && editing.id) {
			updateMapelForTeacher(editing.id, data);
			setEditing(null);
		} else {
			addMapelForTeacher(data);
		}
	};

	return (
		<div className={ "space-y-6" }>
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
								<TableHead className="text-end">Guru</TableHead>
								<TableHead>Mata Pelajaran</TableHead>
								<TableHead className="text-end">Jumlah JP</TableHead>
								<TableHead className="text-start">Jumlah Jam</TableHead>
								<TableHead className="text-center w-[160px]">Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ mapels.map((m, i) => (
								<TableRow key={ m.id }>
									<TableCell className="text-center">{ i + 1 }</TableCell>
									<TableCell className="text-end">{ m.nameTeacher }</TableCell>
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

			<Card>
				<CardContent>
					<Table>
						<TableCaption>Total JP per Subject</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Subject</TableHead>
								<TableHead className="text-end">Total Count</TableHead>
								<TableHead className="text-start">Total JP</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ result.map((r) => (
								<TableRow key={ r.name }>
									<TableCell className="font-medium text-start">{ r.name }</TableCell>
									<TableCell className="text-end">{ r.totalCount }</TableCell>
									<TableCell className="text-start">{ r.totalJP }</TableCell>
								</TableRow>
							)) }
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>

	);
}

function AcademicScheduleOptionForm(
	{
		editing,
		onSave,
		onClose,
		idGrade
	}: {
		editing: MapelFormValues | null;
		onSave: (data: MapelFormValues) => void;
		onClose?: () => void;
		idGrade: string;
	}) {
	const { getDataByGrade } = useOptionGradePerClassStore();
	const { dataAvailableOnClass } = getDataByGrade(idGrade)
	console.log("option", dataAvailableOnClass)
	const mapels = useMapelClassStore().filterMapelByGrade(idGrade);
	const { teachers } = useTeacherStore();
	console.log()
	const teacherFilter = teachers.filter((teacher) => {
		const availableSubject = dataAvailableOnClass.some((i) => i.nameSubject === teacher.subject);
		console.log(availableSubject);
		// console.log("availableSubject",availableSubject);
		const teacherNotAssigned = !mapels.some((mapel) => mapel.idTeacher === teacher.id);
		// console.log("teacherNotAssigned",teacherNotAssigned);
		return availableSubject && teacherNotAssigned;
	});

	const form = useForm<MapelFormValues>({
		resolver: zodResolver(mapelFormSchema),
		defaultValues: editing ? editing : {
			nameSubject: "Math",
			jp: 1,
			idTeacher: "",
			nameTeacher: "",
			idGrade
		},
	});

	// useEffect(() => {4+m ]);

	const onSubmit = (values: MapelFormValues) => {
		onSave(values);
		form.reset({
			nameSubject: "Math",
			jp: 1,
			idTeacher: "",
			nameTeacher: "",
			idGrade
		});
		// toast.error(form.formState.errors)
		onClose?.();
	};

	console.log(form.formState.errors);
	// if (!editing) {
	// 	return null
	// }
	// ✅ show validation errors when submitting
	const onError = (errors: typeof form.formState.errors) => {
		// take first error message
		const firstError = Object.values(errors)[0]?.message as string | undefined;
		if (firstError) {
			toast.error(`Error Values: ${ firstError }`);
		} else {
			toast.error("Please fix the errors in the form");
		}
	};

	return (
		<Form { ...form }>
			<form onSubmit={ form.handleSubmit(onSubmit, onError) } className="space-y-4">

				{/* Jumlah JP */ }
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
								onValueChange={ (value) => {
									field.onChange(value);
									const teacher = teacherFilter.find((i) => i.id === value);
									form.setValue("nameTeacher", teacher?.name ?? "");
									form.setValue("nameSubject", teacher?.subject ?? "");
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
