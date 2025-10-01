import { AnnouncementType } from "@/assets/example/announcements.ts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Eye, Trash } from "lucide-react";


export function AnnouncementsCard({ announcements }: { announcements: AnnouncementType[] }) {
	return (
		<div className="space-y-6">
			{ announcements.map((item, idx) => (
				<Card key={ idx }>
					<CardHeader>
						<CardTitle>{ item.title }</CardTitle>
						<CardDescription>{ item.content }</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="my-2 text-sm ">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi hic laborum laudantium quod temporibus veniam. Error facere illo laudantium.
						</div>
					</CardContent>
					<CardFooter className={ "flex-col items-start mt-2" }>
						<div className="flex flex-wrap gap-2">
							{ item.category.map(i => (
								<Badge key={ i }>{ i }</Badge>
							)) }
						</div>
						<div className="w-full justify-between flex items-end">
							<p className="text-sm text-muted-foreground">{ item.date }</p>
							<div className="flex gap-2">
								<Button variant="outline" size="sm" asChild>
									<Link to={ `/announcement/${ item.id }` }>
										<Eye />Detail
									</Link>
								</Button>
								<Button variant="destructive" size="sm"><Trash />Hapus</Button>
							</div>
						</div>
					</CardFooter>
				</Card>
			)) }
		</div>

	);
}
