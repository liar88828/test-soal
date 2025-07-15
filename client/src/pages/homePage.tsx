// LandingPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, BookOpen, Timer } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { LoaderProps } from "shared";
import { sessionLoader } from "@/action/auth.action.ts";

export default function HomePage() {
	const { token } = useLoaderData() as LoaderProps<typeof sessionLoader>
	// console.log(data)
	return (
		<div className="min-h-screen bg-white text-gray-900">
			{/* Hero Section */}
			<section className="px-6 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					Platform Latihan Ujian & Tes Online
				</h1>
				<p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
					Siap hadapi ujian dengan latihan soal yang interaktif, lengkap, dan gratis!
				</p>
				{token ?
					<Button className="text-lg px-6 py-4 rounded-xl">
						<Link to={'/soal'}>
							Masuk Home
						</Link>
					</Button>
					:
					<Button className="text-lg px-6 py-4 rounded-xl">
						<Link to={'/login'}>
							Mulai Sekarang
						</Link>
					</Button>
				}
			</section>

			{/* Fitur */}
			<section className="px-6 py-16 bg-gray-50">
				<h2 className="text-3xl font-semibold text-center mb-10">
					Kenapa memilih kami?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
					<Card className="rounded-2xl shadow-md">
						<CardContent className="p-6">
							<BookOpen className="text-blue-500 w-10 h-10 mb-4" />
							<h3 className="text-xl font-semibold mb-2">Soal Lengkap</h3>
							<p>Latihan dari berbagai mata pelajaran dan tipe ujian, terus diperbarui.</p>
						</CardContent>
					</Card>

					<Card className="rounded-2xl shadow-md">
						<CardContent className="p-6">
							<Timer className="text-blue-500 w-10 h-10 mb-4" />
							<h3 className="text-xl font-semibold mb-2">Simulasi Waktu Nyata</h3>
							<p>Uji kemampuan kamu dengan simulasi seperti ujian sesungguhnya.</p>
						</CardContent>
					</Card>

					<Card className="rounded-2xl shadow-md">
						<CardContent className="p-6">
							<BadgeCheck className="text-blue-500 w-10 h-10 mb-4" />
							<h3 className="text-xl font-semibold mb-2">Nilai Otomatis</h3>
							<p>Lihat hasil langsung dan analisis kesalahanmu secara instan.</p>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Testimoni */}
			<section className="px-6 py-16">
				<h2 className="text-3xl font-semibold text-center mb-10">
					Apa kata mereka?
				</h2>
				<div className="max-w-4xl mx-auto text-center">
					<p className="text-lg italic">
						“Platform ini sangat membantu saya mempersiapkan UTBK. Soalnya mirip dan lengkap. Sangat
						direkomendasikan!”
					</p>
					<p className="mt-4 font-semibold">– Rina, Siswa SMA</p>
				</div>
			</section>

			{/* Footer */}
			<footer className="px-6 py-10 bg-gray-100 text-center text-sm text-gray-500">
				© {new Date().getFullYear()} LatihanUjian.id — Dibuat dengan ❤️ untuk pelajar Indonesia.
			</footer>
		</div>
	);
}
