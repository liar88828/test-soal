// helper to parse "HH:mm" into minutes
export function timeToMinutes(time: string) {
	const [ h, m ] = time.split(":").map(Number);
	return h * 60 + m;
}

// get duration in minutes
export function getDuration(start: string, end: string) {
	return timeToMinutes(end) - timeToMinutes(start);
}
