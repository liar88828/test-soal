import type { Soal, SoalABC, SoalText } from "@shared/lib/validate";

export type SoalAll = (
	{
		_count: { SoalABC: number }
	} & Soal )

export type SoalDetail = ( {
	SoalABC: SoalABC[]
	SoalText: SoalText[]
} & Soal )
