import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

export const onError = (errors: FieldErrors) => {
	const firstError = Object.values(errors)[0]?.message as string | undefined;
	if (firstError) {
		toast.error(`Error Values: ${ firstError }`);
	} else {
		toast.error("Please fix the errors in the form");
	}
};
