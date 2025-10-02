import { useState } from "react";
import { BookOpen, Clock, Download, Edit2, Plus, RefreshCw, Save, Settings, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch.tsx";

type InitialSubject = {
	id: string
	name: string
	jp: number
	color: string
}[]
const initialSubjects = [
	{ id: "1", name: "Matematika", jp: 5, color: "bg-blue-100 text-blue-800 border-blue-300" },
	{ id: "2", name: "Bahasa Indonesia", jp: 4, color: "bg-purple-100 text-purple-800 border-purple-300" },
	{ id: "3", name: "Bahasa Inggris", jp: 3, color: "bg-pink-100 text-pink-800 border-pink-300" },
	{ id: "4", name: "Ilmu Pengetahuan Alam", jp: 5, color: "bg-green-100 text-green-800 border-green-300" },
	{ id: "5", name: "Ilmu Pengetahuan Sosial", jp: 4, color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
	{ id: "6", name: "Pendidikan Agama", jp: 2, color: "bg-indigo-100 text-indigo-800 border-indigo-300" },
	{ id: "7", name: "Seni Budaya", jp: 2, color: "bg-rose-100 text-rose-800 border-rose-300" },
	{ id: "8", name: "Pendidikan Jasmani", jp: 2, color: "bg-orange-100 text-orange-800 border-orange-300" },
	{ id: "9", name: "Prakarya", jp: 2, color: "bg-teal-100 text-teal-800 border-teal-300" },
	{ id: "10", name: "TIK", jp: 2, color: "bg-cyan-100 text-cyan-800 border-cyan-300" },
];

const initialTimeSlots = [
	{ time: "07:00 - 07:45", period: 1, isBreak: false },
	{ time: "07:45 - 08:30", period: 2, isBreak: false },
	{ time: "08:30 - 09:15", period: 3, isBreak: false },
	{ time: "09:15 - 10:00", period: 4, isBreak: false },
	{ time: "10:00 - 10:15", period: "break", isBreak: true, label: "Istirahat" },
	{ time: "10:15 - 11:00", period: 5, isBreak: false },
	{ time: "11:00 - 11:45", period: 6, isBreak: false },
	{ time: "11:45 - 12:30", period: 7, isBreak: false },
];

const colorOptions = [
	{ value: "bg-blue-100 text-blue-800 border-blue-300", label: "Biru" },
	{ value: "bg-purple-100 text-purple-800 border-purple-300", label: "Ungu" },
	{ value: "bg-pink-100 text-pink-800 border-pink-300", label: "Pink" },
	{ value: "bg-green-100 text-green-800 border-green-300", label: "Hijau" },
	{ value: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Kuning" },
	{ value: "bg-indigo-100 text-indigo-800 border-indigo-300", label: "Indigo" },
	{ value: "bg-rose-100 text-rose-800 border-rose-300", label: "Merah Muda" },
	{ value: "bg-orange-100 text-orange-800 border-orange-300", label: "Oranye" },
	{ value: "bg-teal-100 text-teal-800 border-teal-300", label: "Teal" },
	{ value: "bg-cyan-100 text-cyan-800 border-cyan-300", label: "Cyan" },
	{ value: "bg-red-100 text-red-800 border-red-300", label: "Merah" },
	{ value: "bg-lime-100 text-lime-800 border-lime-300", label: "Lime" },
];

const days = [ "Senin", "Selasa", "Rabu", "Kamis", "Jumat" ];

export default function ScheduleGenerator() {
	const [ subjects, setSubjects ] = useState(initialSubjects);
	const [ timeSlots, setTimeSlots ] = useState(initialTimeSlots);
	const [ schedule, setSchedule ] = useState(null);
	const [ editingId, setEditingId ] = useState(null);
	const [ editForm, setEditForm ] = useState({ name: "", jp: 0, color: "" });
	const [ isAddDialogOpen, setIsAddDialogOpen ] = useState(false);
	const [ isTimeDialogOpen, setIsTimeDialogOpen ] = useState(false);
	const [ newSubject, setNewSubject ] = useState({ name: "", jp: 1, color: colorOptions[0].value });
	const [ editingTimeSlots, setEditingTimeSlots ] = useState([ ...initialTimeSlots ]);

	function generateSchedule(subjectList, slots) {
		const grid = Array(days.length).fill(null).map(() =>
			Array(slots.length).fill(null)
		);

		// Mark break times
		for (let d = 0; d < days.length; d++) {
			slots.forEach((slot, idx) => {
				if (slot.isBreak) {
					grid[d][idx] = { name: slot.label || "Istirahat", isBreak: true, color: "bg-gray-100 text-gray-600 border-gray-300" };
				}
			});
		}

		// Create subject blocks based on jp rules
		const subjectBlocks = [];

		subjectList.forEach(subject => {
			if (subject.jp === 1) {
				subjectBlocks.push({ subject, hours: 1 });
			} else if (subject.jp === 2) {
				subjectBlocks.push({ subject, hours: 2 });
			} else if (subject.jp === 3) {
				subjectBlocks.push({ subject, hours: 3 });
			} else {
				let remaining = subject.jp;
				while (remaining > 0) {
					if (remaining >= 3) {
						subjectBlocks.push({ subject, hours: 3 });
						remaining -= 3;
					} else if (remaining === 2) {
						subjectBlocks.push({ subject, hours: 2 });
						remaining = 0;
					} else {
						subjectBlocks.push({ subject, hours: 1 });
						remaining = 0;
					}
				}
			}
		});

		const shuffledBlocks = [ ...subjectBlocks ].sort(() => Math.random() - 0.5);

		let blockIndex = 0;

		for (let d = 0; d < days.length && blockIndex < shuffledBlocks.length; d++) {
			const availableSlots = [];

			for (let t = 0; t < slots.length; t++) {
				if (!slots[t].isBreak) {
					availableSlots.push(t);
				}
			}

			let slotIndex = 0;
			const usedSubjectsToday = new Set();

			while (slotIndex < availableSlots.length && blockIndex < shuffledBlocks.length) {
				const block = shuffledBlocks[blockIndex];

				if (slotIndex + block.hours <= availableSlots.length) {
					if (!usedSubjectsToday.has(block.subject.id) || block.hours >= 3) {
						for (let h = 0; h < block.hours; h++) {
							const timeSlot = availableSlots[slotIndex];
							grid[d][timeSlot] = { ...block.subject };
							slotIndex++;
						}
						usedSubjectsToday.add(block.subject.id);
						blockIndex++;
					} else {
						blockIndex++;
					}
				} else {
					break;
				}
			}
		}

		return grid;
	}

	const handleRegenerate = () => {
		setSchedule(generateSchedule(subjects, timeSlots));
	};

	const handleDownload = () => {
		if (!schedule) return;

		let text = "═══════════════════════════════════════════════════════\n";
		text += "              JADWAL PELAJARAN SEKOLAH\n";
		text += "═══════════════════════════════════════════════════════\n\n";

		text += "Waktu".padEnd(20) + days.map(d => d.padEnd(18)).join("") + "\n";
		text += "─".repeat(110) + "\n";

		timeSlots.forEach((slot, timeIdx) => {
			text += slot.time.padEnd(20);
			days.forEach((_, dayIdx) => {
				const subject = schedule[dayIdx][timeIdx];
				const name = subject ? subject.name : "-";
				text += name.padEnd(18);
			});
			text += "\n";
		});

		text += "\n\n═══════════════════════════════════════════════════════\n";
		text += "RINGKASAN MATA PELAJARAN\n";
		text += "═══════════════════════════════════════════════════════\n\n";
		subjects.forEach(s => {
			text += `${ s.name.padEnd(30) } : ${ s.jp } jam/minggu\n`;
		});

		const blob = new Blob([ text ], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "jadwal-pelajaran.txt";
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleEdit = (subject) => {
		setEditingId(subject.id);
		setEditForm({ name: subject.name, jp: subject.jp, color: subject.color });
	};

	const handleSaveEdit = (id) => {
		setSubjects(subjects.map(s =>
			s.id === id ? { ...s, ...editForm } : s
		));
		setEditingId(null);
		if (schedule) {
			setSchedule(generateSchedule(subjects.map(s =>
				s.id === id ? { ...s, ...editForm } : s
			), timeSlots));
		}
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setEditForm({ name: "", jp: 0, color: "" });
	};

	const handleDelete = (id) => {
		const updatedSubjects = subjects.filter(s => s.id !== id);
		setSubjects(updatedSubjects);
		if (schedule) {
			setSchedule(generateSchedule(updatedSubjects, timeSlots));
		}
	};

	const handleAddSubject = () => {
		if (!newSubject.name.trim() || newSubject.jp < 1) return;

		const newId = String(Math.max(...subjects.map(s => parseInt(s.id)), 0) + 1);
		const updatedSubjects = [ ...subjects, { ...newSubject, id: newId } ];
		setSubjects(updatedSubjects);
		setNewSubject({ name: "", jp: 1, color: colorOptions[0].value });
		setIsAddDialogOpen(false);

		if (schedule) {
			setSchedule(generateSchedule(updatedSubjects, timeSlots));
		}
	};

	const handleTimeSlotChange = (index, field, value) => {
		const updated = [ ...editingTimeSlots ];
		updated[index] = { ...updated[index], [field]: value };

		// Update combined time string when start or end time changes
		if (field === "startTime" || field === "endTime") {
			const startTime = field === "startTime" ? value : updated[index].startTime;
			const endTime = field === "endTime" ? value : updated[index].endTime;
			updated[index].time = `${ startTime } - ${ endTime }`;
		}

		setEditingTimeSlots(updated);
	};

	const handleAddTimeSlot = () => {
		const lastSlot = editingTimeSlots[editingTimeSlots.length - 1];
		let startTime = "12:30";
		let endTime = "13:15";

		if (lastSlot) {
			// Get the end time from last slot
			const lastEndTime = lastSlot.endTime || lastSlot.time.split(" - ")[1];
			startTime = lastEndTime;

			// Calculate end time (45 minutes later)
			const [ hours, minutes ] = startTime.split(":").map(Number);
			const totalMinutes = hours * 60 + minutes + 45;
			const newHours = Math.floor(totalMinutes / 60) % 24;
			const newMinutes = totalMinutes % 60;
			endTime = `${ String(newHours).padStart(2, "0") }:${ String(newMinutes).padStart(2, "0") }`;
		}

		const newSlot = {
			startTime,
			endTime,
			time: `${ startTime } - ${ endTime }`,
			period: editingTimeSlots.filter(s => !s.isBreak).length + 1,
			isBreak: false
		};
		setEditingTimeSlots([ ...editingTimeSlots, newSlot ]);
	};

	const handleDeleteTimeSlot = (index) => {
		const updated = editingTimeSlots.filter((_, i) => i !== index);
		setEditingTimeSlots(updated);
	};

	const handleSaveTimeSlots = () => {
		setTimeSlots(editingTimeSlots);
		setIsTimeDialogOpen(false);
		if (schedule) {
			setSchedule(generateSchedule(subjects, editingTimeSlots));
		}
	};

	const handleOpenTimeDialog = () => {
		// Parse existing time slots to add startTime and endTime
		const parsed = timeSlots.map(slot => {
			if (slot.time) {
				const [ start, end ] = slot.time.split(" - ");
				return { ...slot, startTime: start, endTime: end };
			}
			return slot;
		});
		setEditingTimeSlots(parsed);
		setIsTimeDialogOpen(true);
	};

	const totalHours = subjects.reduce((sum, s) => sum + s.jp, 0);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
			<div className="max-w-7xl mx-auto space-y-6">
				<Card className="border-2 shadow-lg">
					<CardHeader>
						<CardTitle className="text-3xl font-bold flex items-center gap-3">
							<BookOpen className="w-8 h-8 text-indigo-600" />
							Jadwal Pelajaran Sekolah
						</CardTitle>
						<CardDescription className="text-base">
							Jadwal otomatis dengan distribusi { totalHours } jam pelajaran per minggu
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-3">
							<Button onClick={ handleRegenerate } className="gap-2">
								<RefreshCw className="w-4 h-4" />
								Generate Jadwal
							</Button>
							{ schedule && (
								<Button onClick={ handleDownload } variant="outline" className="gap-2">
									<Download className="w-4 h-4" />
									Download Jadwal
								</Button>
							) }
							<Button onClick={ handleOpenTimeDialog } variant="outline" className="gap-2">
								<Settings className="w-4 h-4" />
								Atur Waktu
							</Button>
						</div>
					</CardContent>
				</Card>

				{ schedule && (
					<Card className="border-2 shadow-lg overflow-hidden">
						<CardContent className="p-0">
							<div className="overflow-x-auto">
								<table className="w-full border-collapse">
									<thead>
									<tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
										<th className="border border-indigo-400 p-4 text-left font-bold min-w-40">
											<div className="flex items-center gap-2">
												<Clock className="w-5 h-5" />
												Waktu
											</div>
										</th>
										{ days.map(day => (
											<th key={ day } className="border border-indigo-400 p-4 text-center font-bold min-w-44">
												{ day }
											</th>
										)) }
									</tr>
									</thead>
									<tbody>
									{ timeSlots.map((slot, timeIdx) => (
										<tr key={ timeIdx } className="hover:bg-slate-50 transition-colors">
											<td className="border border-slate-200 p-3 font-semibold text-sm bg-slate-50">
												<div>{ slot.time }</div>
												{ slot.isBreak && (
													<Badge variant="outline" className="mt-1 text-xs">
														{ slot.label || "Istirahat" }
													</Badge>
												) }
											</td>
											{ days.map((_, dayIdx) => {
												const subject = schedule[dayIdx][timeIdx];
												return (
													<td key={ dayIdx } className="border border-slate-200 p-2">
														{ subject ? (
															<div
																className={ `${ subject.color } border-2 rounded-lg p-3 text-center font-semibold text-sm transition-all hover:scale-105 hover:shadow-md cursor-default h-full min-h-16 flex items-center justify-center` }
															>
																{ subject.name }
															</div>
														) : (
															<div className="text-center text-slate-300 text-lg font-bold">—</div>
														) }
													</td>
												);
											}) }
										</tr>
									)) }
									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>
				) }

				<Card className="border-2 shadow-lg">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl">Daftar Mata Pelajaran</CardTitle>
								<CardDescription>
									Total { totalHours } jam pelajaran per minggu - Klik untuk edit atau hapus
								</CardDescription>
							</div>
							<Dialog open={ isAddDialogOpen } onOpenChange={ setIsAddDialogOpen }>
								<DialogTrigger asChild>
									<Button className="gap-2">
										<Plus className="w-4 h-4" />
										Tambah Mapel
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Tambah Mata Pelajaran Baru</DialogTitle>
										<DialogDescription>
											Masukkan nama dan jumlah jam pelajaran
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4 pt-4">
										<div>
											<label className="text-sm font-medium mb-2 block">Nama Mata Pelajaran</label>
											<Input
												value={ newSubject.name }
												onChange={ (e) => setNewSubject({ ...newSubject, name: e.target.value }) }
												placeholder="Contoh: Fisika"
											/>
										</div>
										<div>
											<label className="text-sm font-medium mb-2 block">Jam Pelajaran/Minggu</label>
											<Input
												type="number"
												min="1"
												max="10"
												value={ newSubject.jp }
												onChange={ (e) => setNewSubject({ ...newSubject, jp: parseInt(e.target.value) || 1 }) }
											/>
										</div>
										<div>
											<label className="text-sm font-medium mb-2 block">Warna</label>
											<div className="grid grid-cols-4 gap-2">
												{ colorOptions.map(color => (
													<button
														key={ color.value }
														onClick={ () => setNewSubject({ ...newSubject, color: color.value }) }
														className={ `${ color.value } border-2 rounded-lg p-3 text-xs font-semibold transition-all hover:scale-105 ${ newSubject.color === color.value ? "ring-2 ring-indigo-600 ring-offset-2" : "" }` }
													>
														{ color.label }
													</button>
												)) }
											</div>
										</div>
										<Button onClick={ handleAddSubject } className="w-full">
											Tambah
										</Button>
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							{ subjects.map(subject => (
								<div key={ subject.id }>
									{ editingId === subject.id ? (
										<div className="border-2 border-indigo-400 rounded-lg p-3 space-y-2 bg-white">
											<Input
												value={ editForm.name }
												onChange={ (e) => setEditForm({ ...editForm, name: e.target.value }) }
												placeholder="Nama"
												className="text-sm"
											/>
											<Input
												type="number"
												min="1"
												max="10"
												value={ editForm.jp }
												onChange={ (e) => setEditForm({ ...editForm, jp: parseInt(e.target.value) || 1 }) }
												className="text-sm"
											/>
											<div className="grid grid-cols-3 gap-1">
												{ colorOptions.slice(0, 6).map(color => (
													<button
														key={ color.value }
														onClick={ () => setEditForm({ ...editForm, color: color.value }) }
														className={ `${ color.value } border rounded p-1 text-xs ${ editForm.color === color.value ? "ring-2 ring-indigo-600" : "" }` }
													>
														•
													</button>
												)) }
											</div>
											<div className="flex gap-2">
												<Button size="sm" onClick={ () => handleSaveEdit(subject.id) } className="flex-1 gap-1">
													<Save className="w-3 h-3" />
													Simpan
												</Button>
												<Button size="sm" variant="outline" onClick={ handleCancelEdit } className="gap-1">
													<X className="w-3 h-3" />
												</Button>
											</div>
										</div>
									) : (
										<div className={ `${ subject.color } border-2 rounded-lg p-4 transition-all hover:scale-105 hover:shadow-md group relative` }>
											<div className="font-bold text-sm">{ subject.name }</div>
											<div className="text-xs mt-2 opacity-80">
												{ subject.jp } jam/minggu
											</div>
											<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
												<Button
													size="sm"
													variant="secondary"
													onClick={ () => handleEdit(subject) }
													className="h-6 w-6 p-0"
												>
													<Edit2 className="w-3 h-3" />
												</Button>
												<Button
													size="sm"
													variant="destructive"
													onClick={ () => handleDelete(subject.id) }
													className="h-6 w-6 p-0"
												>
													<Trash2 className="w-3 h-3" />
												</Button>
											</div>
										</div>
									) }
								</div>
							)) }
						</div>
					</CardContent>
				</Card>

				<Dialog open={ isTimeDialogOpen } onOpenChange={ setIsTimeDialogOpen }>
					<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>Atur Jam Pelajaran</DialogTitle>
							<DialogDescription>
								Customize waktu dan periode belajar
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-3 pt-4">
							{ editingTimeSlots.map((slot, index) => (
								<div key={ index } className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
									<div className="flex gap-2 flex-1">
										<div className="flex-1">
											<label className="text-xs text-slate-600 mb-1 block">Mulai</label>
											<Input
												type="time"
												value={ slot.startTime || "" }
												onChange={ (e) => handleTimeSlotChange(index, "startTime", e.target.value) }
												className="text-sm"
											/>
										</div>
										<div className="flex items-end pb-2 text-slate-400">-</div>
										<div className="flex-1">
											<label className="text-xs text-slate-600 mb-1 block">Selesai</label>
											<Input
												type="time"
												value={ slot.endTime || "" }
												onChange={ (e) => handleTimeSlotChange(index, "endTime", e.target.value) }
												className="text-sm"
											/>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Switch
											checked={ slot.isBreak }
											onCheckedChange={ (checked) => {
												handleTimeSlotChange(index, "isBreak", checked);
												if (checked && !slot.label) {
													handleTimeSlotChange(index, "label", "Istirahat");
												}
											} }
										/>
										<span className="text-sm font-medium whitespace-nowrap">Istirahat</span>
									</div>
									{ slot.isBreak && (
										<Input
											value={ slot.label || "" }
											onChange={ (e) => handleTimeSlotChange(index, "label", e.target.value) }
											placeholder="Label"
											className="text-sm w-32"
										/>
									) }
									<Button
										size="sm"
										variant="destructive"
										onClick={ () => handleDeleteTimeSlot(index) }
										className="h-8 w-8 p-0"
									>
										<Trash2 className="w-3 h-3" />
									</Button>
								</div>
							)) }
							<div className="flex gap-2 pt-2">
								<Button onClick={ handleAddTimeSlot } variant="outline" className="gap-2 flex-1">
									<Plus className="w-4 h-4" />
									Tambah Periode
								</Button>
								<Button onClick={ handleSaveTimeSlots } className="gap-2">
									<Save className="w-4 h-4" />
									Simpan
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
