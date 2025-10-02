import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Clock, Plus, Trash2 } from "lucide-react";

type ScheduleItem = {
	day: string;
	start: string; // jam mulai
	duration: string;
	subject: string;
	teacher: string;
};

const availableSubjects = [
	{ subject: "Matematika", teacher: "Pak Fandy" },
	{ subject: "Bahasa Inggris", teacher: "Bu Silvia" },
	{ subject: "IPA", teacher: "Pak Azmi" },
	{ subject: "IPS", teacher: "Bu Septia" },
	{ subject: "Istirahat", teacher: "-" }, // ✅ Istirahat khusus
];

const days = [ "Senin", "Selasa", "Rabu", "Kamis", "Jumat" ];

export function StudentScheduleTable(props: { idClass: string }) {
	const [ schedule, setSchedule ] = useState<ScheduleItem[]>([
		{
			day: "Senin",
			start: "07:00",
			duration: "01:00",
			subject: "Matematika",
			teacher: "Pak Fandy",
		},
		{
			day: "Selasa",
			start: "08:30",
			duration: "01:30",
			subject: "IPA",
			teacher: "Pak Azmi",
		},
	]);
	const [ dayStartTimes, setDayStartTimes ] = useState<Record<string, string>>(
		{}
	);

	// modal add per day
	const [ openAddSubject, setOpenAddSubject ] = useState<{ day: string | null }>({
		day: null,
	});

	// modal set start time per day
	const [ openTime, setOpenTime ] = useState(false);

	// form states
	const [ selectedDay, setSelectedDay ] = useState("");
	const [ selectedStart, setSelectedStart ] = useState("");
	const [ selectedDuration, setSelectedDuration ] = useState("");
	const [ selectedSubject, setSelectedSubject ] = useState("");
	const [ selectedTeacher, setSelectedTeacher ] = useState("");

	// for set time modal
	const [ editingDay, setEditingDay ] = useState("");
	const [ newStartTime, setNewStartTime ] = useState("");

	// add schedule (per-day modal)
	const handleSaveAddSubject = () => {
		if (
			!selectedDay ||
			!selectedStart ||
			!selectedDuration ||
			!selectedSubject ||
			!selectedTeacher
		)
			return;

		setSchedule([
			...schedule,
			{
				day: selectedDay,
				start: selectedStart,
				duration: selectedDuration,
				subject: selectedSubject,
				teacher: selectedTeacher,
			},
		]);

		resetForm();
		setOpenAddSubject({ day: null });
	};

	const handleDelete = (day: string, idx: number) => {
		setSchedule(
			schedule.filter(
				(s) =>
					!(
						s.day === day &&
						schedule.filter((d) => d.day === day).indexOf(s) === idx
					)
			)
		);
	};

	// open modal set time
	const handleOpenSetTime = (day: string) => {
		setEditingDay(day);
		setNewStartTime(dayStartTimes[day] ?? "");
		setOpenTime(true);
	};

	// save start time
	const handleSaveTime = () => {
		if (!editingDay || !newStartTime) return;
		setDayStartTimes((prev) => ( { ...prev, [editingDay]: newStartTime } ));
		setOpenTime(false);
	};

	// open modal add subject per day

	// reset form helper
	const resetForm = () => {
		setSelectedDay("");
		setSelectedStart("");
		setSelectedDuration("");
		setSelectedSubject("");
		setSelectedTeacher("");
	};

	function calculateEndTime(start: string, duration: string): string {
		const [ sh, sm ] = start.split(":").map(Number);
		const [ dh, dm ] = duration.split(":").map(Number);
		let endHour = sh + dh;
		let endMinute = sm + dm;
		if (endMinute >= 60) {
			endHour += Math.floor(endMinute / 60);
			endMinute = endMinute % 60;
		}
		return `${ String(endHour).padStart(2, "0") }:${ String(endMinute).padStart(2, "0") }`;
	}

	// when opening Add Subject modal (per-day)
	const handleOpenAddSubject = (day: string) => {
		const schedulesForDay = schedule.filter((s) => s.day === day);

		if (schedulesForDay.length > 0) {
			const last = schedulesForDay[schedulesForDay.length - 1];
			const nextStart = calculateEndTime(last.start, last.duration);
			setSelectedStart(nextStart);
		} else {
			setSelectedStart("07:00");
		}

		setSelectedDay(day);
		setOpenAddSubject({ day });   // ✅ open the right modal
	};

	return (
		<Card>
			{/* Per-Day Add Subject Modal */ }
			<Dialog
				open={ !!openAddSubject.day }
				onOpenChange={ (open) =>
					!open ? setOpenAddSubject({ day: null }) : null
				}
			>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Tambah Mapel - { openAddSubject.day }</DialogTitle>
					</DialogHeader>
					<div className="space-y-3">
						{/* Jam Mulai */ }
						<input
							type="time"
							className="w-full border rounded p-2 text-sm"
							value={ selectedStart }
							onChange={ (e) => setSelectedStart(e.target.value) }
						/>

						{/* Durasi */ }
						<Select value={ selectedDuration } onValueChange={ setSelectedDuration }>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Pilih Durasi" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="01:00">1 jam</SelectItem>
								<SelectItem value="01:30">1:30 jam</SelectItem>
								<SelectItem value="02:00">2 jam</SelectItem>
							</SelectContent>
						</Select>

						{/* Subject & Teacher */ }
						<div className="flex gap-2">
							<Select
								onValueChange={ setSelectedSubject }
								value={ selectedSubject }
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Pilih Mata Pelajaran" />
								</SelectTrigger>
								<SelectContent>
									{ [ ...new Set(availableSubjects.map((s) => s.subject)) ].map(
										(subject) => (
											<SelectItem key={ subject } value={ subject }>
												{ subject }
											</SelectItem>
										)
									) }
								</SelectContent>
							</Select>

							<Select
								onValueChange={ setSelectedTeacher }
								value={ selectedTeacher }
								disabled={ !selectedSubject }
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Pilih Guru" />
								</SelectTrigger>
								<SelectContent>
									{ availableSubjects
									.filter((s) => s.subject === selectedSubject)
									.map((s) => (
										<SelectItem key={ s.teacher } value={ s.teacher }>
											{ s.teacher }
										</SelectItem>
									)) }
								</SelectContent>
							</Select>
						</div>

						<Button className="w-full mt-2" onClick={ handleSaveAddSubject }>
							Simpan
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<CardContent className="space-y-6">
				{/* Global Add Button */ }

				{/* Render Schedule per Day */ }
				{ days.map((day) => (
					<div key={ day } className="space-y-2 border rounded-lg p-3">
						<div className="flex justify-between items-center">
							<h3 className="font-semibold">
								{ day } { dayStartTimes[day] ? `(${ dayStartTimes[day] })` : "" }
							</h3>
							<div className="flex gap-2">
								<Button
									size="sm"
									variant="outline"
									className="flex items-center gap-1"
									onClick={ () => handleOpenSetTime(day) }
								>
									<Clock size={ 14 } /> Atur Jam Mulai
								</Button>
								<Button
									size="sm"
									className="flex items-center gap-1"
									onClick={ () => handleOpenAddSubject(day) }
								>
									<Plus size={ 14 } /> Tambah Mapel
								</Button>
							</div>
						</div>

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Mulai</TableHead>
									<TableHead>Durasi</TableHead>
									<TableHead>Mata Pelajaran</TableHead>
									<TableHead>Guru</TableHead>
									<TableHead>Aksi</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{ schedule
								.filter((s) => s.day === day)
								.map((item, idx) => (
									<TableRow key={ idx }>
										<TableCell>
											{ item.start } – { calculateEndTime(item.start, item.duration) }
										</TableCell>
										<TableCell>{ item.duration }</TableCell>
										<TableCell>{ item.subject }</TableCell>
										<TableCell>{ item.teacher }</TableCell>
										<TableCell>
											<Button
												size="icon"
												variant="destructive"
												onClick={ () => handleDelete(day, idx) }
											>
												<Trash2 size={ 16 } />
											</Button>
										</TableCell>
									</TableRow>
								)) }
								{ schedule.filter((s) => s.day === day).length === 0 && (
									<TableRow>
										<TableCell
											colSpan={ 5 }
											className="text-center text-muted-foreground"
										>
											Belum ada mapel
										</TableCell>
									</TableRow>
								) }
							</TableBody>
						</Table>
					</div>
				)) }

				{/* Set Start Time Modal */ }
				<Dialog open={ openTime } onOpenChange={ setOpenTime }>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Atur Jam Mulai ({ editingDay })</DialogTitle>
						</DialogHeader>
						<input
							type="time"
							className="w-full border rounded p-2 text-sm mb-3"
							value={ newStartTime }
							onChange={ (e) => setNewStartTime(e.target.value) }
						/>
						<Button className="w-full" onClick={ handleSaveTime }>
							Simpan
						</Button>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
}
