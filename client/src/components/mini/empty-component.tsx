import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty.tsx";


export function EmptyComponent(
	{
		code = "404",
		title = "Not Found",
		description = "The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need below."
	}: {
		code?: string,
		title?: string,
		description?: string
	}) {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>{ code } - { title }</EmptyTitle>
				<EmptyDescription>
					{ description }
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				{/*<InputGroup className="sm:w-3/4">*/ }
				{/*	<InputGroupInput placeholder="Try searching for pages..." />*/ }
				{/*	<InputGroupAddon>*/ }
				{/*		<SearchIcon />*/ }
				{/*	</InputGroupAddon>*/ }
				{/*	<InputGroupAddon align="inline-end">*/ }
				{/*		<Kbd>/</Kbd>*/ }
				{/*	</InputGroupAddon>*/ }
				{/*</InputGroup>*/ }
				<EmptyDescription>
					Need help? <a href="#">Contact support</a>
				</EmptyDescription>
			</EmptyContent>
		</Empty>
	)
}
