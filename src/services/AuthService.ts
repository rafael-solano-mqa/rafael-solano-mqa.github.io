import { CLUB_FRONTEND_SESSION, Session, User } from "../context";
import { LabelEnum } from "../context/LabelEnum";
import { LocaleContextDef } from "../context/LocaleContext";
import { domain } from "./config";
import DataService from "./DataService";


function utf8_to_b64( str:string ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}


class AuthService {

    static authenticate = async (user: string, password: string) => {
        const hash = utf8_to_b64(user + ':' + password);
        const headers = {
            "Authorization": `Basic ${hash}`
        };
        
        const response = await DataService.get(
            `${domain}/auth/login`,
            headers
        );        

        return response;
    }


    static parseSessionToken = async (sessionToken: string, localeContext: LocaleContextDef) => {
        const systemRoles = await DataService.get(
            `${domain}/acl/roles`
        ); 
        const allRoles = [...systemRoles, {id: "", name: localeContext.staticLabel(LabelEnum.PLEASE_SELECT)}]

        const systemStatus = await DataService.get(
            `${domain}/acl/status`
        );
        const allStatus = [...systemStatus, {id: "", name: localeContext.staticLabel(LabelEnum.PLEASE_SELECT)}]

        const responseElements = sessionToken.split('|');
        const user:User =  { 
            id: responseElements[0],
            name: responseElements[0],
            roles: responseElements.slice(2, responseElements.length-1).map(roleId => ({id: roleId, name: roleId}))            
        };
        const timestamp:string = responseElements[1];
        const token: string = responseElements[responseElements.length-1];
        const session: Session = {
            user: user,
            timestamp: timestamp,
            token: token,
            applicationName: "current-station",
            roles: allRoles.reverse(),
            status: allStatus.reverse()
        }

        localStorage.setItem(CLUB_FRONTEND_SESSION, JSON.stringify(session));
        return session;
    }

    static clearSessionInStorage = async  () => {
        localStorage.removeItem(CLUB_FRONTEND_SESSION);
    }

    static getSessionToken = async () => {
        const content = localStorage.getItem (CLUB_FRONTEND_SESSION)        
        if(content !== null) {
            const session = JSON.parse(content);
            return session.token;
        }

        return null;
    }
}

export { AuthService };