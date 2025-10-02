import { TableCell, TableRow } from "@/components/ui/table.tsx";


export function TableLoading(props: { spanCol: number }) {
	return (
		<TableRow><TableCell colSpan={ props.spanCol }>Loading</TableCell></TableRow>
	);
}

export function TableError(props: { spanCol: number }) {
	return (
		<TableRow><TableCell colSpan={ props.spanCol }>Error</TableCell></TableRow>
	);
}
