import { useLoaderData } from "react-router-dom";
import { LoaderProps } from "shared";
import { soalListLoader } from "@/action/soal";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { SoalABCComponent } from "@/pages/question/SoalABCComponent.tsx";
import { SoalTextComponent } from "@/pages/question/SoalTextComponent.tsx";

export const SoalCreateList = () => {
	const soal = useLoaderData() as LoaderProps<typeof soalListLoader>

	return (
		<div className="p-6  ">
			<div className={ 'flex justify-between items-end mb-2' }>
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
