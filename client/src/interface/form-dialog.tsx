export type FormDialog<T> = {
	open: boolean;
	setOpen: (v: boolean) => void;
	editData?: T | null;
	onSubmit: (data: T) => void;
};
