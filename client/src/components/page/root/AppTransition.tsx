import type { Transition } from "motion-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"

const pageVariants = {
	initial: {
		opacity: 0,
		x: -80,       // stronger slide in
		scale: 0.95,  // slight zoom out on start
	},
	in: {
		opacity: 1,
		x: 0,
		scale: 1,     // zoom to normal
	},
	out: {
		opacity: 0,
		x: 80,        // slide out to the right
		scale: 0.95,  // shrink a little while fading
	},
}

const pageTransition: Transition = {
	type: "spring",
	stiffness: 120,   // adds bounce feel
	damping: 20,      // smooth finish
	duration: 0.5,    // slightly longer for elegance
}

export default function AppTransition({ children }: { children: React.ReactNode }) {
	const { pathname } = useLocation();

	return (
		<motion.div
			key={ pathname }
			initial="initial"
			animate="in"
			variants={ pageVariants }
			transition={ pageTransition }
		>
			{ children }
		</motion.div>
	);
}
