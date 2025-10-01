import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { AnnouncementType, exampleAnnouncements } from "@/assets/example/announcements.ts";
import { redirect } from "react-router";


export async function announcementCreate({ request }: Pick<ActionFunctionArgs, "request">) {
	const formData = await request.formData()

	// extract fields
	const title = formData.get("title") as string
	const content = formData.get("content") as string
	const date = formData.get("date") as string
	const author = formData.get("author") as string | null

	// category[] comes as multiple entries
	const category = formData.getAll("category") as string[]

	// create new announcement
	const newDate = new Date()
	const newAnnouncement: AnnouncementType = {
		id: newDate.getDate() + newDate.getMilliseconds() + newDate.getDate() + exampleAnnouncements.length,
		title,
		content,
		date,
		category,
		author: author || undefined,
	}

	exampleAnnouncements.push(newAnnouncement)

	return {
		success: true,
		announcement: newAnnouncement,
	}
}

// 🗑 Delete action
export async function announcementDelete(id: number) {
	const index = exampleAnnouncements.findIndex((a) => String(a.id) === String(id));
	if (index !== -1) {
		exampleAnnouncements.splice(index, 1); // remove in place
	}
	console.log("test");
	// return { success: true };
	return redirect("/announcement");
}

// ✏️ Update action
export async function announcementUpdate({ params, request }: Omit<ActionFunctionArgs, "context">) {
	const id = params.id;
	const formData = await request.formData();

	const updatedAnnouncement: AnnouncementType = {
		id: Number(id),
		title: formData.get("title") as string,
		content: formData.get("content") as string,
		date: formData.get("date") as string,
		category: formData.getAll("category") as string[],
		author: ( formData.get("author") as string ) || undefined,
	};

	const index = exampleAnnouncements.findIndex((a) => String(a.id) === String(id));
	if (index !== -1) {
		exampleAnnouncements[index] = updatedAnnouncement;
	}

	return { success: true, announcement: updatedAnnouncement };
}

export async function announcementPageLoader() {
	return { announcements: exampleAnnouncements }
}

export async function announcementDetailLoader(
	{ params }: LoaderFunctionArgs
) {
	const id = params.id
	const announcement = exampleAnnouncements.find(item => item.id === Number(id))
	return { announcement }
}

// Detail action (dispatcher)
export async function announcementPageAction({ params, request }: ActionFunctionArgs) {

	if (request.method === "POST") {
		return announcementCreate({ request })
	}

	if (request.method === "DELETE") {
		const formData = await request.formData();
		const id = formData.get("id")
		return announcementDelete(Number(id));
	}

	if (request.method === "PUT" || request.method === "PATCH") {
		return announcementUpdate({ params, request });
	}

	return { error: "Method Not Allowed" };
}

// Detail action (dispatcher)
export async function announcementDetailAction({ params, request }: ActionFunctionArgs) {
	if (request.method === "DELETE") {
		return announcementDelete(Number(params.id));
	}

	if (request.method === "PUT" || request.method === "PATCH") {
		return announcementUpdate({ params, request });
	}

	return { error: "Method Not Allowed" };
}
