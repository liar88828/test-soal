import { mainRouter } from "@/main-router.tsx";
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./main-style.css"
import { RouterProvider, } from "react-router";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={ mainRouter } />
	</StrictMode>,
)
