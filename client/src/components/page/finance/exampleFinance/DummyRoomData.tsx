export  type Room = {
	id: number;
	room: string;     // nama ruangan
	cost: number;     // biaya perawatan atau penggunaan
	note?: string;    // catatan tambahan
	createdAt: Date;
	updatedAt: Date;
};
export const dummyRoomData = [
	{
		id: 1, room: "Lab Komputer",
		cost: 300000,
		note: "Perawatan dan listrik"
	},
	{
		id: 2,
		room: "Ruang Kelas X-IPA-1",
		cost: 150000,
		note: "AC dan kebersihan",
	},
	{ id: 3, room: "Aula", cost: 500000, note: "Acara dan pemeliharaan" },
	{
		id: 4,
		room: "Perpustakaan",
		cost: 120000,
		note: "Penerangan dan internet",
	},
]
