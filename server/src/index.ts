import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'
import routeSoal from "../route/soal.router";
import authRouter from "../route/auth.router";

const app = new Hono()
app.use(cors())
app.get('/', (c) => {
	return c.text('Hello Hono!')
})
app.get('/hello', async (c) => {
	const data: ApiResponse = {
		message: "Hello BHVR!",
		success: true
	}
	return c.json(data, { status: 200 })
})

app.route('/soal', routeSoal)
app.route('/auth', authRouter)

export default app
