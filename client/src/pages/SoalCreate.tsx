import { useFetcher } from "react-router-dom";
import { Button } from "client/src/components/ui/button.tsx";
import { Input } from "client/src/components/ui/input.tsx";
import { Label } from "client/src/components/ui/label.tsx";
import { LoaderProps } from "shared";
import { createSoalAction } from "@/action/soal.action";
import { GetUserLoader } from "@/action/auth.action";


export function SoalCreate({ user }: Readonly<{ user?: GetUserLoader }>) {
	const fetcher = useFetcher<LoaderProps<typeof createSoalAction>>();
	const actionData = fetcher.data
	const busy = fetcher.state !== "idle";
	console.log(user, 'session')
	return (
		<div
		//  className="p-6 max-w-xl mx-auto"
		>
			<h1 className="text-2xl font-bold mb-4">Buat Soal Baru</h1>

			{actionData?.error && (
				<p className="text-red-500 mb-4">{actionData?.error.toString()}</p>
			)}

			<fetcher.Form method="POST" action="/soal/create" className="space-y-4">
				<div>
					<Label htmlFor="name" className="block mb-1 font-medium">Nama Soal</Label>
					<Input name="name" id="name" required />
				</div>

				<div>
					<Label htmlFor="author" className="block mb-1 font-medium">Penulis</Label>
					<Input name="author" id="author" required
						defaultValue={user?.name ?? ''}
					/>
				</div>

				{/*<div>*/}
				{/*	<Label htmlFor="description" className="block mb-1 font-medium">Deskripsi (opsional)</Label>*/}
				{/*	<Textarea name="description" id="description" />*/}
				{/*</div>*/}

				<Button type="submit" disabled={busy}>
					{busy ? "Menyimpan..." : "Simpan"}
				</Button>
			</fetcher.Form>
		</div>
	);
}
