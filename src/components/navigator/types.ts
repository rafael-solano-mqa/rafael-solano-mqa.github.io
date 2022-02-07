import { Session } from "../../context/Session";
import { SessionContextDef } from "../../context/SessionContext";

export interface NavigatorSwitchProperties {
    session: Session;
}

export interface NavigatorProperties {
    session: Session;
}

export interface NavigatorSectionProperties {
    sessionContext:SessionContextDef;
    authorizedRoles?: string[];
    icon: string;
    text: string;
    children: React.ReactElement;
}