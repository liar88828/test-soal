import { Hono } from "hono"
import { cors } from "hono/cors"
import financeSubjects from "server/route/finance/finance-subjects.router";
import type { ApiResponse } from "shared/dist"
import authRouter from "../route/auth.router";
import classesRouter from "../route/classes.router";
import financeBillStudent from "../route/finance/finance-bill-student.router";
import roomFinanceRouter from "../route/finance/finance-room.router";
import gradeRouter from "../route/grade.router";
import mapelRouter from "../route/mapel.router";
import optionRouter from "../route/option.router";
import seedRouter from "../route/seed.router";
import soalRouter from "../route/soal.router";
import teacherRouter from "../route/teacher.router";


const app = new Hono()
app.use(cors())
app.get("/", (c) => {
	return c.text("Hello Hono!")
})
app.get("/hello", async (c) => {
	const data: ApiResponse = {
		message: "Hello BHVR!",
		success: true
	}
	return c.json(data, { status: 200 })
})

app.route("/api/soal", soalRouter)
app.route("/api/auth", authRouter)
app.route("/api/grade", gradeRouter)
app.route("/api/class", classesRouter)
app.route("/api/option", optionRouter)
app.route("/api/teacher", teacherRouter)
app.route("/api/mapel", mapelRouter)
// finance
app.route("/api/finance-room", roomFinanceRouter)
app.route("/api/finance-bill-student", financeBillStudent)
app.route("/api/finance-subjects", financeSubjects)
// seed
app.route("/api/seed", seedRouter)

export default app
