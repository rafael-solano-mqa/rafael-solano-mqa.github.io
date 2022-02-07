import { Role, Status } from ".";
import { User } from "./User";

export const CLUB_FRONTEND_SESSION="club-frontend-session";

export interface Session {
    user?: User;
    token?: string;    
    timestamp?: string;
    applicationName?: string;
    roles?: Array<Role>;
    status?: Array<Status>;
}

export const hasRole = (session: Session, roleId: string) => {
    if(!(session.roles === undefined || session.user === undefined)) {
        const user = session.user;
        return user.roles.find((role: Role) => role.id === roleId) !== undefined;
    }
        
    return false;
}
