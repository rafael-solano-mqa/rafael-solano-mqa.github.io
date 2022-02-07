import { Session } from "../../context";

export interface LoginProperties {
    show: boolean;
    onLoginClick: (user: string, password: string) => void;
    onAbortClick: () => void;
}

export interface SessionInfoProperties {
    session: Session;
    show: boolean;
    onContinueClick: () => void;
    onExitClick: () => void;    
}

