import { useState } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form.tsx";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { EditIcon, Plus, TrashIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { toast } from "sonner";
import { useOptionGradePerClassStore } from "@/stores/use-option-grade-per-class-store.ts";
import { subjects } from "@/assets/subjects.tsx";
import { optionFormSchema, type OptionFormValues } from "@/schema/option-form-schema.tsx";
import { formatToHour } from "@/components/page/academic/components/format-to-hour.tsx";


export function AcademicGradeOptionTable(props: { idGrade: string }) {
	const [ editing, setEditing ] = useState<OptionFormValues | null>(null);
	const { removeOption, addOption, updateOption, getDataByGrade } = useOptionGradePerClassStore();//table
	const { dataAvailableOnClass, totalJP, totalTime, totalJPPerClass } = getDataByGrade(props.idGrade)
	// const { data: classes } = useAcademicClassesDetailTabel(props.idGrade)

	const handleSave = (data: OptionFormValues) => {
		if (editing && editing.id) {
			updateOption(editing.id, data);
			setEditing(null);
		} else {
			addOption({ ...data, id: nanoid() });
		}
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Option Mata Pelajaran { props.idGrade }</CardTitle>

					{/* Tombol Add */ }
					<Dialog>
						<DialogTrigger asChild>
							<Button><Plus /></Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Tambah Mapel</DialogTitle>
								<DialogDescription>
									Isi form untuk menambahkan option mata pelajaran baru
								</DialogDescription>
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
				<Table className={ "text-center" }>
					<TableCaption>Daftar Mata Pelajaran & Jumlah JP dds dasdad</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px] text-center">No</TableHead>
							<TableHead>Mata Pelajaran</TableHead>
							{/*<TableHead className="text-end">Jumlah JP</TableHead>*/ }
							<TableHead className="text-end">Jumlah JP/Class</TableHead>
							<TableHead className="text-start">Jumlah Jam</TableHead>
							<TableHead className="text-center ">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ dataAvailableOnClass.map((m, i) => (
							<TableRow key={ m.id }>
								<TableCell className="text-center">{ i + 1 }</TableCell>
								<TableCell>{ m.nameSubject }</TableCell>
								<TableCell className="text-end">{ m.jp }/{ m.totalMaxJP }</TableCell>
								{/*<TableCell className="text-end">{ m.jp * classes?.length }</TableCell>*/ }
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
										onClick={ () => removeOption(m.id) }
									>
										<TrashIcon />
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell className={ "text-end" }>{ totalJP }/{ totalJPPerClass }</TableCell>
							<TableCell className={ "text-start" }>{ totalTime }</TableCell>
						</TableRow>
					</TableFooter>

				</Table>
			</CardContent>
		</Card>
	);
}

function AcademicScheduleOptionForm(
	{
		editing,
		onSave,
		onClose,
		idGrade
	}: {
		editing: OptionFormValues | null;
		onSave: (data: OptionFormValues) => void;
		onClose?: () => void;
		idGrade: string;
	}) {

	const { dataOptions } = useOptionGradePerClassStore();//form

	const newSubject = subjects.filter((i) =>
		!dataOptions.some((j) => {
			if (editing && editing.nameSubject === i) return false;
			const name = j.nameSubject === i;
			const grande = j.idGrade === idGrade
			return name && grande;
		})
	);

	const form = useForm<OptionFormValues>({
		resolver: zodResolver(optionFormSchema),
		defaultValues: editing ? editing : {
			nameSubject: "Math",
			jp: 1,
			idGrade
		},
	});

	const onSubmit = (values: OptionFormValues) => {
		onSave(values);
		form.reset({
			nameSubject: "Math",
			jp: 1,
			idGrade
		});
		onClose?.();

	};

	const onError = (errors: typeof form.formState.errors) => {
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
				{/* Subject */ }

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
									{ newSubject.map((subject) => (
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

				<Button type="submit" className="w-full">
					{ editing ? "Update Option" : "Tambah Option" }
				</Button>
			</form>
		</Form>
	);
}
