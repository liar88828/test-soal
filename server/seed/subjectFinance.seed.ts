import { prisma } from "../lib/db/prisma";


export async function subjectFinanceSeed() {
	const costList = [
		{ name: "Peralatan Laboratorium", amount: 80000, description: "Mikroskop, tabung reaksi" },
		{ name: "Bahan Praktikum", amount: 50000, description: "Reagen, bahan biologis" },
		{ name: "Pemeliharaan Alat", amount: 20000, description: "Perawatan & kalibrasi" },
	];

	// compute sum to keep `cost` consistent with costList
	const total = costList.reduce((s, c) => s + c.amount, 0);

	const subject = await prisma.subjectFinance.create({
		data: {
			name: "Biologi",
			code: "BIO101",
			category: "Science",
			cost: total, // ensure this matches the sum of costList
			description: "Biaya praktikum laboratorium",
			semester: 1,
			isActive: true,
			// nested create of cost items
			costList: {
				create: costList,
			},
		},
		include: { costList: true },
	});

	console.log("Created subject:", subject);
}
