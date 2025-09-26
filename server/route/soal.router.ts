import { Hono } from 'hono'
import { prisma } from "../lib/db/prisma";
import { type AnswerOptionalDefaults, SoalABCOptionalDefaultsSchema, SoalOptionalDefaultsSchema, SoalTextOptionalDefaultsSchema } from "@shared/lib/validate";
import { z } from "zod";
import type { SoalAll, SoalDetail } from "@shared/types/soal-type";
import { validator } from 'hono/validator'

const userRouter = new Hono()
userRouter
.get(
	async (c) => {
		const allSoal: SoalAll[] = await prisma.soal.findMany({
			include: {
				_count: { select: { SoalABC: true }, },
			}
		})
		return c.json(allSoal)
	}
)
.post(
	validator('form', (value, c) => {
		const valid = SoalOptionalDefaultsSchema.safeParse(value)
		if (!valid.success) return c.text('Data Not Valid', 401)
		return valid.data
	}),
	async (c) => {
		const data = c.req.valid('form')
		return c.json(await prisma.soal.create({ data }))
	}
)

userRouter

.get(
	':soalId',
	async (c) => {
		const id = parseInt(c.req.param('soalId'))
		const soal: SoalDetail | null = await prisma.soal.findUnique({
			where: { id },
			include: {
				SoalABC: true,
				SoalText: true
			},
		})
		if (!soal) return c.notFound()
		return c.json(soal)
	})

.put(':soalId',
	async (c) => {
		const id = parseInt(c.req.param('soalId'))
		const body = await c.req.json()

		// Update soal and replace all list items
		const soal = await prisma.soal.update({
			// include: { SoalABC: true },
			where: { id },
			data: {
				name: body.name,
				author: body.author,
				SoalABC: {
					deleteMany: {}, // delete old items
					create: body.list.map((item: any) => ( {
						question: item.question,
						A: item.A,
						B: item.B,
						C: item.C,
						D: item.D,
						E: item.E,
						answer: item.answer,
					} )),
				},
			},
		})
		return c.json(soal)
	})

.delete(':soalId',
	async (c) => {
		const id = parseInt(c.req.param('soalId'))
		await prisma.soal.delete({
			where: { id },
		})
		return c.json({ message: 'Deleted successfully' })
	})
// -------------ABC
.get(':soalId/question-abc',
	async (c) => {
		return c.text('hello this question')
	})

.post(':soalId/question-abc',
	async (c) => {
		console.log('execute')
		const _soalId = c.req.param('soalId')
		const body = await c.req.json()

		const parsed = SoalABCOptionalDefaultsSchema.safeParse(body)
		if (!parsed.success) {
			return c.json({ error: "Data tidak valid", details: z.prettifyError(parsed.error) }, 400)
		}

		const soal = await prisma.soal.findUnique({ where: { id: parsed.data.soalId } })
		if (!soal) {
			return c.json({ error: "SoalItem tidak ditemukan" }, 404)
		}

		await prisma.soalABC.create({ data: parsed.data })

		return c.json({ message: "Pertanyaan berhasil ditambahkan", }, 201)
	})

.put(':soalId/question-abc/:questionItemId',
	async (c) => {
		console.log('execute put')
		const _soalId = c.req.param('soalId')
		const questionItemId = c.req.param('questionItemId')
		const body = await c.req.json()

		const parsed = SoalABCOptionalDefaultsSchema
		.extend({ questionItemId: z.string() })
		.safeParse({ ...body, questionItemId })
		if (!parsed.success) {
			return c.json({ error: "Data tidak valid", details: z.prettifyError(parsed.error) }, 400)
		}

		const soal = await prisma.soal.findUnique({ where: { id: parsed.data.soalId } })
		if (!soal) {
			return c.json({ error: "SoalItem tidak ditemukan" }, 404)
		}
		const { questionItemId: validQuestionItemId, ...validData } = parsed.data
		await prisma.soalABC.update({
			where: { id: Number(validQuestionItemId) },
			data: validData
		})

		return c.json({ message: "Pertanyaan berhasil ditambahkan", }, 201)
	})
// -------------TEXT

.post(':soalId/question-text',
	async (c) => {
		console.log('execute text create')
		const _soalId = c.req.param('soalId')
		const body = await c.req.json()

		const parsed = SoalTextOptionalDefaultsSchema.safeParse(body)
		if (!parsed.success) {
			return c.json(
				{ error: "Data tidak valid", details: z.prettifyError(parsed.error) },
				400
			)
		}

		// Check soal exists
		const soal = await prisma.soal.findUnique({ where: { id: parsed.data.soalId } })
		if (!soal) {
			return c.json({ error: "SoalItem tidak ditemukan" }, 404)
		}

		await prisma.soalText.create({ data: parsed.data })

		return c.json({ message: "Pertanyaan Text berhasil ditambahkan" }, 201)
	}
)

.put(':soalId/question-text/:questionItemId',
	async (c) => {
		console.log('execute text update')
		const _soalId = c.req.param('soalId')
		const questionItemId = c.req.param('questionItemId')
		const body = await c.req.json()

		const parsed = SoalTextOptionalDefaultsSchema
		.extend({ questionItemId: z.string() })
		.safeParse({ ...body, questionItemId })

		if (!parsed.success) {
			return c.json(
				{ error: "Data tidak valid", details: z.prettifyError(parsed.error) },
				400
			)
		}

		// Check soal exists
		const soal = await prisma.soal.findUnique({ where: { id: parsed.data.soalId } })
		if (!soal) {
			return c.json({ error: "SoalItem tidak ditemukan" }, 404)
		}

		const { questionItemId: validQuestionItemId, ...validData } = parsed.data

		await prisma.soalText.update({
			where: { id: Number(validQuestionItemId) },
			data: validData,
		})

		return c.json({ message: "Pertanyaan Text berhasil diperbarui" }, 200)
	}
)

.post(':soalId/answer',
	async (c) => {
		console.log('execute awnser')
		const soalId = Number(c.req.param('id'));
		const body = await c.req.json();

		const answerSchema = z.object({
			student: z.object({
				name: z.string(),
				email: z.email(),
			}),
			answers: z.array(
				z.object({
					soalItemId: z.number(),
					selected: z.enum([ 'A', 'B', 'C', 'D', 'E' ]),
				})
			),
		});

		const parsed = answerSchema.safeParse(body);
		if (!parsed.success) {
			return c.json({ error: z.prettifyError(parsed.error) }, 400);
		}

		const { student, answers } = parsed.data;
		// Cari atau buat student
		let dbStudent = await prisma.student.findFirst({
			where: { email: student.email },
		});

		if (!dbStudent) {
			dbStudent = await prisma.student.create({
				data: {
					name: student.name,
					email: student.email,
				},
			});
		}

		const dataAnswers = answers.map((a) => ( {
				soalId,
				studentId: dbStudent?.id ?? 0,
				selected: a.selected,
				soalABCId: a.soalItemId,
			} satisfies AnswerOptionalDefaults
		))

		// Simpan semua jawaban
		await prisma.answer.createMany({
			data: dataAnswers,
		});

		return c.json({ message: 'Jawaban berhasil disimpan' });
	})

.get(':soalId/check',
	async (c) => {
		console.log('execute awnser')
		const soalId = Number(c.req.param('id'));
		// const studentId = Number(c.req.param('studentId'));

		// Cek soal dan relasi item-nya
		const soal = await prisma.soal.findUnique({
			where: { id: soalId },
			include: { SoalABC: true },
		});
		// console.log('soal', soal)
		if (!soal) {
			return c.json({ error: 'SoalItem tidak ditemukan' }, 404);
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
				soalABCId: true,
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
			list: soal.SoalABC,
			answers,
		});
		console.log(data)
		return data
	});

export default userRouter
