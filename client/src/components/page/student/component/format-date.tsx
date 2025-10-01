export const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString("id-ID", {
		dateStyle: "full"
	})
}
