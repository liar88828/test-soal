import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery.ts";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "client/src/components/ui/dialog.tsx";
import { Button } from "client/src/components/ui/button.tsx";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "client/src/components/ui/drawer.tsx";

type DrawerDialogProps = {
	title: string;
	description?: string;
	triggerLabel: React.ReactNode
	children: React.ReactNode;
	footer?: React.ReactNode;
	onOpen?: (open: boolean) => void;
	isOpen?: boolean;
};

export function DrawerDialog(
	{
		title,
		description,
		triggerLabel,
		children,
		footer,
		onOpen: onOpenAction,
		isOpen = false
	}: DrawerDialogProps) {
	const [ open, setOpen ] = React.useState(isOpen);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	React.useEffect(() => {
		setOpen(isOpen);
	}, [ isOpen ]);

	// console.log(isOpen);
	const onOpen = (value: boolean) => {
		// console.log('test')
		if (onOpenAction) {
			onOpenAction(value)
		}
		setOpen(value)
	}

	if (isDesktop) {
		return (
			<Dialog open={ open } onOpenChange={ onOpen }>
				<DialogTrigger asChild>
					<Button variant="default">{ triggerLabel }</Button>
				</DialogTrigger>

				<DialogContent className=" p-6">
					<DialogHeader>
						<DialogTitle>{ title }</DialogTitle>
						{ description && <DialogDescription>{ description }</DialogDescription> }
					</DialogHeader>
					{ children }
					{ footer && <div className="pt-4">{ footer }</div> }
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={ open } onOpenChange={ onOpen }>
			<DrawerTrigger asChild>
				<Button variant="default">{ triggerLabel }</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{ title }</DrawerTitle>
					{ description && <DrawerDescription>{ description }</DrawerDescription> }
				</DrawerHeader>
				<div className="px-6">{ children }</div>
				<DrawerFooter className="pt-2">
					{ footer }
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
