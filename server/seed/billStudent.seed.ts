import { prisma } from "../lib/db/prisma";


enum BillStatus {
	LUNAS = "LUNAS",
	BELUM = "BELUM"
}
;


async function main() {
	await prisma.bill.createMany({
		data: [
			{
				name: "Ahmad Fauzi",
				kelas: "X IPA 1",
				bulan: "September",
				nominal: 200000,
				status: BillStatus.BELUM,
			},
			{
				name: "Siti Rahma",
				kelas: "X IPA 2",
				bulan: "September",
				nominal: 200000,
				status: BillStatus.LUNAS,
			},
			{
				name: "Budi Santoso",
				kelas: "XI IPS 1",
				bulan: "September",
				nominal: 200000,
				status: BillStatus.BELUM,
			},
		],
	});

	console.log("✅ Dummy bills inserted successfully!");
}
