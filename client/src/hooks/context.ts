import { createContext } from "react-router";
import { SessionContext } from "@/action/session.ts";

export const userContext = createContext<SessionContext | null>(null);
