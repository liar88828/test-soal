import type { TeacherType } from "shared";

export const exampleTeacher: TeacherType = {
	id: "1",
	name: "Mr. Fandy",
	subject: "Math",
	phone: "08123456789",
	email: "fandy@example.com",
	address: "Jl. Merdeka No. 10, Jakarta",
	photo: "https://randomuser.me/api/portraits/men/1.jpg",
	gender: "Male",
	birthDate: "1980-05-12",
};

export const exampleTeachers: Pick<TeacherType,
	"name" |
	"id" |
	"subject" |
	"phone" |
	"email"
>[] = [
	{ id: "1", name: "Mr. Fandy", subject: "Math", phone: "08123456789", email: "fandy@example.com" },
	{ id: "2", name: "Ms. Silvia", subject: "Science", phone: "08198765432", email: "silvia@example.com" },
	{ id: "3", name: "Mr. Azmi", subject: "English", phone: "08122334455", email: "azmi@example.com" },
	{ id: "4", name: "Ms. Anita", subject: "History", phone: "08133445566", email: "anita@example.com" },
	{ id: "5", name: "Mr. Tuhfatul", subject: "Physics", phone: "08144556677", email: "tuhfatul@example.com" },
	{ id: "6", name: "Ms. Sevia", subject: "Biology", phone: "08155667788", email: "sevia@example.com" },
	{ id: "7", name: "Mr. Febrian", subject: "Geography", phone: "08166778899", email: "febrian@example.com" },
	{ id: "8", name: "Ms. Ifah", subject: "Art", phone: "08177889900", email: "ifah@example.com" },
	{ id: "9", name: "Mr. Thifal", subject: "Music", phone: "08188990011", email: "thifal@example.com" },
	{ id: "10", name: "Ms. Devinta", subject: "Physical Education", phone: "08199001122", email: "devinta@example.com" },
	{ id: "11", name: "Mr. Vadila", subject: "Computer Science", phone: "08110111213", email: "vadila@example.com" },
	{ id: "12", name: "Ms. Inayah", subject: "Chemistry", phone: "08121222334", email: "inayah@example.com" },
	{ id: "13", name: "Mr. Septia", subject: "Economics", phone: "08132333445", email: "septia@example.com" },
	{ id: "14", name: "Ms. Ifrokhatul", subject: "Sociology", phone: "08143444556", email: "ifrokhatul@example.com" },
	{ id: "15", name: "Mr. Fikri", subject: "Philosophy", phone: "08154555667", email: "fikri@example.com" },
	{ id: "16", name: "Ms. Anita", subject: "Literature", phone: "08165666778", email: "anita2@example.com" },
	{ id: "17", name: "Mr. Rudi", subject: "Computer Lab", phone: "08176777889", email: "rudi@example.com" },
	{ id: "18", name: "Ms. Nia", subject: "English Conversation", phone: "08187888990", email: "nia@example.com" },
	{ id: "19", name: "Mr. Budi", subject: "Mathematics Advanced", phone: "08198990001", email: "budi@example.com" },
	{ id: "20", name: "Ms. Sari", subject: "Biology Lab", phone: "08109001112", email: "sari@example.com" },
	{ id: "21", name: "Mr. Agung", subject: "History Modern", phone: "08110112223", email: "agung@example.com" },
	{ id: "22", name: "Ms. Rina", subject: "Physics Lab", phone: "08121223334", email: "rina@example.com" },
	{ id: "23", name: "Mr. Yudha", subject: "Geography Advanced", phone: "08132334445", email: "yudha@example.com" },
	{ id: "24", name: "Ms. Lestari", subject: "Music Band", phone: "08143445556", email: "lestari@example.com" },
	{ id: "25", name: "Mr. Dimas", subject: "Physical Training", phone: "08154556667", email: "dimas@example.com" },
	{ id: "26", name: "Ms. Fitri", subject: "Chemistry Lab", phone: "08165667778", email: "fitri@example.com" },
	{ id: "27", name: "Mr. Hendra", subject: "Economics Advanced", phone: "08176778889", email: "hendra@example.com" },
	{ id: "28", name: "Ms. Wulan", subject: "Sociology Advanced", phone: "08187889990", email: "wulan@example.com" },
	{ id: "29", name: "Mr. Adi", subject: "Philosophy Advanced", phone: "08198990011", email: "adi@example.com" },
	{ id: "30", name: "Ms. Maya", subject: "Literature Advanced", phone: "08109001123", email: "maya@example.com" },
];
