import { useLoaderData } from "react-router-dom";
import { soalListLoader } from "@/action/soal.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs.tsx"
import { SoalABCComponent } from "@/components/page/question/SoalABCComponent.tsx";
import { SoalTextComponent } from "@/components/page/question/SoalTextComponent.tsx";

export const SoalCreateList = () => {
	const soal = useLoaderData<typeof soalListLoader>()

	return (
		<div className="  ">
			<div className={ "flex justify-between items-end mb-2" }>
				<div className="">
					<h1 className="text-2xl">{ soal.name }</h1>
					<p>Penulis: { soal.author }</p>
				</div>
			</div>

			<Tabs defaultValue="SoalABC">
				<TabsList>
					<TabsTrigger value="SoalABC">Soal ABC</TabsTrigger>
					<TabsTrigger value="SoalText">Soal Text</TabsTrigger>
				</TabsList>
				<TabsContent value="SoalABC"><SoalABCComponent /></TabsContent>
				<TabsContent value="SoalText"><SoalTextComponent /></TabsContent>
			</Tabs>

		</div>
	);
};
