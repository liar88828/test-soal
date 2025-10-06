export const formatDate = (date: string | Date | number) => {
	return new Date(date).toLocaleDateString("id-ID", {
		dateStyle: "full"
	})
}
