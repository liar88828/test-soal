import { useState, useEffect } from "react";



export function useSidebarState() {
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("sidebar_state");
        setDefaultOpen(stored === "true");
        setIsReady(true);
    }, []);

    return { defaultOpen, isReady };
}
