import { useActionData, useFetcher } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";


export function SoalCreate() {
	const fetcher = useFetcher();
	const actionData = useActionData() as { error?: string };
	const busy = fetcher.state !== "idle";
	// console.log(actionData)
	// console.log(fetcher.formAction)
	// console.log(fetcher.data)
	return (
		<div className="p-6 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Buat Soal Baru</h1>

			{ actionData?.error && (
				<p className="text-red-500 mb-4">{ actionData.error }</p>
			) }

			<fetcher.Form method="POST" action="/soal/create" className="space-y-4">
				<div>
					<Label htmlFor="name" className="block mb-1 font-medium">Nama Soal</Label>
					<Input name="name" id="name" required />
				</div>

				<div>
					<Label htmlFor="author" className="block mb-1 font-medium">Penulis</Label>
					<Input name="author" id="author" required />
				</div>

				{/*<div>*/ }
				{/*	<Label htmlFor="description" className="block mb-1 font-medium">Deskripsi (opsional)</Label>*/ }
				{/*	<Textarea name="description" id="description" />*/ }
				{/*</div>*/ }

				<Button type="submit" disabled={ busy }>
					{ busy ? "Menyimpan..." : "Simpan" }
				</Button>
			</fetcher.Form>
		</div>
	);
}
