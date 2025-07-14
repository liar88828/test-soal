import { Alert, AlertDescription, AlertTitle } from "client/src/components/ui/alert.tsx";
import { Info } from "lucide-react";


export function ListEmpty({ title, description }: { title: string; description: string }) {
	return (
		<Alert variant="default" className="border-dashed">
			<Info className="h-4 w-4" />
			<AlertTitle>{ title }</AlertTitle>
			<AlertDescription>{ description }</AlertDescription>
		</Alert>
	);
}
