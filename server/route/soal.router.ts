// index.ts
import { Hono } from 'hono'
import { prisma } from "../lib/db/prisma";
import { type AnswerOptionalDefaults, SoalItemOptionalDefaultsSchema, SoalOptionalDefaultsSchema, type SoalWithRelations } from '@shared/lib/validate/gen';
import { answerSchema } from '@shared/lib/validate/user.schema';
import { z } from "zod";

const userRouter = new Hono()

userRouter
	.get(
		async (c) => {
			// console.log('execute')
			const allSoal = await prisma.soal.findMany({
				include: {
					_count: { select: { list: true } },
				},
			})
			return c.json(allSoal)
		}
	)
	.post(
		async (c) => {
			const body = await c.req.json()
			const result = SoalOptionalDefaultsSchema.safeParse(body)
			if (!result.success) {

				return c.json({
					error: "Data tidak valid",
					details: z.prettifyError(result.error)
				}, 400)
			}
			const soal = await prisma.soal.create({ data: result.data })
			return c.json(soal)
		}
	)

userRouter
	.get(
		':id', async (c) => {
			const id = parseInt(c.req.param('id'))
			const soal = await prisma.soal.findUnique({
				where: { id },
				include: { list: true },
			})
			if (!soal) return c.notFound()
			return c.json(soal as Omit<SoalWithRelations, 'StudentSubjects'>)
		})
	.put(
		async (c) => {
			const id = parseInt(c.req.param('id'))
			const body = await c.req.json()

			// Update soal and replace all list items
			const soal = await prisma.soal.update({
				where: { id },
				data: {
					name: body.name,
					author: body.author,
					list: {
						deleteMany: {}, // delete old items
						create: body.list.map((item: any) => ({
							question: item.question,
							A: item.A,
							B: item.B,
							C: item.C,
							D: item.D,
							E: item.E,
							answer: item.answer,
						})),
					},
				},
				include: { list: true },
			})

			return c.json(soal)
		})
	.delete(
		async (c) => {
			const id = parseInt(c.req.param('id'))
			await prisma.soal.delete({ where: { id } })
			return c.json({ message: 'Deleted successfully' })
		}
	)
	.get(':id/question', async (c) => {
		return c.text('hello this question')
	}
	)

	.post(async (c) => {
		console.log('execute')
		// const id = c.req.param('id')
		const body = await c.req.json()

		const parsed = SoalItemOptionalDefaultsSchema.safeParse(body)
		if (!parsed.success) {
			return c.json({ error: "Data tidak valid", details: z.prettifyError(parsed.error) }, 400)
		}

		const soal = await prisma.soal.findUnique({ where: { id: parsed.data.soalId } })
		if (!soal) {
			return c.json({ error: "Soal tidak ditemukan" }, 404)
		}

		await prisma.soalItem.create({ data: parsed.data })

		return c.json({ message: "Pertanyaan berhasil ditambahkan", }, 201)
	})

	.post(':id/answer', async (c) => {
		console.log('execute awnser')
		const soalId = Number(c.req.param('id'));
		const body = await c.req.json();


		const parsed = answerSchema.safeParse(body);
		if (!parsed.success) {
			return c.json({ error: z.prettifyError(parsed.error) }, 400);
		}

		const { student, answers } = parsed.data;
		// Cari atau buat student
		let dbStudent = await prisma.student.findFirst({
			where: { email: student.email },
		});

		dbStudent ??= await prisma.student.create({
			data: {
				name: student.name,
				email: student.email,
			},
		});

		const dataAnswers = answers.map((a) => ({
			soalId,
			studentId: dbStudent?.id ?? 0,
			selected: a.selected,
			soalItemId: a.soalItemId,
		} satisfies AnswerOptionalDefaults
		))

		// Simpan semua jawaban
		await prisma.answer.createMany({
			data: dataAnswers,
		});

		return c.json({ message: 'Jawaban berhasil disimpan' });
	})

	.get(':id/check', async (c) => {
		console.log('execute awnser')
		const soalId = Number(c.req.param('id'));
		// const studentId = Number(c.req.param('studentId'));

		// Cek soal dan relasi item-nya
		const soal = await prisma.soal.findUnique({
			where: { id: soalId },
			include: {
				list: true,
			},
		});
		console.log('soal', soal)
		if (!soal) {
			return c.json({ error: 'Soal tidak ditemukan' }, 404);
		}

		// Cek jawaban siswa untuk soal ini
		const studentDB = await prisma.student.findFirst()
		console.log('studentDB', studentDB)

		const answers = await prisma.answer.findMany({
			where: {
				soalId,
				studentId: studentDB?.id ?? 0,
			},
			select: {
				soalItemId: true,
				selected: true,
			},
		});
		console.log('answers', answers)

		if (answers.length === 0) {
			return c.json({
				data: [],
				error: 'Jawaban siswa tidak ditemukan'
			}, 404);
		}
		const data = c.json({
			list: soal.list,
			answers,
		});
		console.log(data)
		return data
	});

export default userRouter
