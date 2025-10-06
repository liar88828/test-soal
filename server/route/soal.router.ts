import { Hono } from "hono"
import { prisma } from "../lib/db/prisma";
import { SoalABCOptionalDefaultsSchema, SoalOptionalDefaultsSchema, SoalTextOptionalDefaultsSchema } from "@shared/lib/validate";
import { z } from "zod";
import type { SoalAll, SoalDetail } from "@shared/types/soal-type";
import { zValidator } from "@hono/zod-validator"
import { SoalSchemaABC } from "@shared/schema/soal-schema-shared";

const soalList = SoalOptionalDefaultsSchema.extend({
	list: z.array(SoalABCOptionalDefaultsSchema)
})

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
	zValidator("form", SoalOptionalDefaultsSchema),
	async (c) => {
		const data = c.req.valid("form")
		return c.json(await prisma.soal.create({ data }))
	}
)

userRouter

.get(
	":soalId",
	async (c) => {
		const id = parseInt(c.req.param("soalId"))
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

.put(":soalId",
	zValidator("form", soalList),
	async (c) => {
		const id = parseInt(c.req.param("soalId"))
		const body = c.req.valid("form")
		const soal = await prisma.soal.update({
			// include: { SoalABC: true },
			where: { id },
			data: {
				nameSubject: body.nameSubject,
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

.delete(":soalId",
	async (c) => {
		const id = parseInt(c.req.param("soalId"))
		await prisma.soal.delete({
			where: { id },
		})
		return c.json({ message: "Deleted successfully" })
	})
// -------------ABC
.get(":soalId/question-abc",
	async (c) => {
		return c.text("hello this question")
	})

.post(":soalId/question-abc",
	async (c) => {
		console.log("execute")
		const _soalId = c.req.param("soalId")
		const body = await c.req.json()

		const parsed = SoalABCOptionalDefaultsSchema.safeParse(body)
		if (!parsed.success) {
			return c.json({ error: "Data tidak valid", details: z.prettifyError(parsed.error) }, 400)
		}

		const soal = await prisma.soal.findUnique({ where: { id: parsed.data.idSoal } })
		if (!soal) {
			return c.json({ error: "SoalItem tidak ditemukan" }, 404)
		}

		await prisma.soalABC.create({ data: parsed.data })

		return c.json({ message: "Pertanyaan berhasil ditambahkan", }, 201)
	})

.put(":soalId/question-abc/:questionItemId",
	async (c) => {
		console.log("execute put")
		const _soalId = c.req.param("soalId")
		const questionItemId = c.req.param("questionItemId")
		const body = await c.req.json()

		const parsed = SoalABCOptionalDefaultsSchema
		.extend({ questionItemId: z.string() })
		.safeParse({ ...body, questionItemId })
		if (!parsed.success) {
			return c.json({ error: "Data tidak valid", details: z.prettifyError(parsed.error) }, 400)
		}

		const soal = await prisma.soal.findUnique({ where: { id: parsed.data.idSoal } })
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

.post(":soalId/question-text",
	async (c) => {
		console.log("execute text create")
		const _soalId = c.req.param("soalId")
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

.put(":soalId/question-text/:questionItemId",
	async (c) => {
		console.log("execute text update")
		const _soalId = c.req.param("soalId")
		const questionItemId = c.req.param("questionItemId")
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

.post(":soalId/answer",
	zValidator("json", SoalSchemaABC),
	async (c) => {
		// console.log("execute awnser")
		const soalId = Number(c.req.param("id"));
		const { studentAnswer, answers } = c.req.valid("json");

		// Cari atau buat student
		let dbStudent = await prisma.studentAnswer.findFirst({
			where: { email: studentAnswer.email },
		});

		if (!dbStudent) {
			dbStudent = await prisma.studentAnswer.create({
				data: {
					name: studentAnswer.name,
					email: studentAnswer.email,
				},
			});
		}

		// const dataAnswers = answers.map((a) => ( {
		// 		soalId,
		// 		studentId: dbStudent?.id ?? 0,
		// 		selected: a.selected,
		// 		soalABCId: a.idSoal,
		// 	} satisfies AnswerOptionalDefaults
		// ))

		// Simpan semua jawaban
		// await prisma.answer.createMany({
		// 	data: dataAnswers,
		// });

		return c.json({ message: "Jawaban berhasil disimpan" });
	})

.get(":soalId/check",
	async (c) => {
		console.log("execute awnser")
		const soalId = Number(c.req.param("id"));
		// const studentId = Number(c.req.param('studentId'));

		// Cek soal dan relasi item-nya
		const soal = await prisma.soal.findUnique({
			where: { id: soalId },
			include: { SoalABC: true },
		});
		// console.log('soal', soal)
		if (!soal) {
			return c.json({ error: "SoalItem tidak ditemukan" }, 404);
		}

		// Cek jawaban siswa untuk soal ini
		const studentDB = await prisma.studentAnswer.findFirst()
		// console.log("studentDB", studentDB)
		if (!studentDB) {
			return c.json({ error: "Student Is not Found " }, 404)
		}
		const answers = await prisma.answer.findMany({
			where: {
				soalId,
				studentId: studentDB.id,
			},
			select: {
				soalABCId: true,
				selected: true,
			},
		});
		console.log("answers", answers)

		if (answers.length === 0) {
			return c.json({
				data: [],
				error: "Jawaban siswa tidak ditemukan"
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
