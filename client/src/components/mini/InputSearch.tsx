import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";


export function InputSearch({ onChangeAction }: { onChangeAction: (v: string) => void }) {
	return (
		<div className="flex items-center gap-2 rounded-md border px-3  shadow-sm focus-within:ring-1 focus-within:ring-ring">
			<Search className="h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search..."
				onChange={ (e) => onChangeAction(e.target.value) }
				className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
			/>
		</div>
	);
}
