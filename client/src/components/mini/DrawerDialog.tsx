import * as React from "react";
import { useMediaQuery } from "client/src/hook/useMediaQuery.ts";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "client/src/components/ui/dialog.tsx";
import { Button } from "client/src/components/ui/button.tsx";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "client/src/components/ui/drawer.tsx";

type DrawerDialogProps = {
	title: string;
	description?: string;
	triggerLabel: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
};

export function DrawerDialog(
	{
		title,
		description,
		triggerLabel,
		children,
		footer,
	}: DrawerDialogProps) {
	const [ open, setOpen ] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={ open } onOpenChange={ setOpen }>
				<DialogTrigger asChild>
					<Button variant="outline">{ triggerLabel }</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
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
		<Drawer open={ open } onOpenChange={ setOpen }>
			<DrawerTrigger asChild>
				<Button variant="outline">{ triggerLabel }</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{ title }</DrawerTitle>
					{ description && <DrawerDescription>{ description }</DrawerDescription> }
				</DrawerHeader>
				<div className="px-4">{ children }</div>
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
