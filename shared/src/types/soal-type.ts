import type { SoalABC, SoalText } from "@shared/lib/validate";

export type SoalAll = (
	{
		_count: {
			SoalABC: number
		}
	} & {
	id: number
	name: string
	author: string
	createdAt: Date
	updatedAt: Date
} )

export type SoalDetail = ( {
	SoalABC: SoalABC[]
	SoalText: SoalText[]
} & {
	id: number
	name: string
	author: string
	createdAt: Date
	updatedAt: Date
} )
