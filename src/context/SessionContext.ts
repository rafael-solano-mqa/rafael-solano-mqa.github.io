import { createContext } from 'react'
import { CLUB_FRONTEND_SESSION, Session } from './Session'

export interface SessionContextDef {
  session: Session;
  setSession: (session: Session) => void;
}

export const readSessionFromStorage = () => {
  const sessionContent = localStorage.getItem(CLUB_FRONTEND_SESSION);
  const empty: Session = {};
  try {
    return sessionContent === null ? empty : JSON.parse(sessionContent)
  }catch(error) {
    console.error('Can not retrieve session info from local storage');
    if(sessionContent !== null)
      localStorage.removeItem(CLUB_FRONTEND_SESSION)
    return empty
  }
}

export const SessionContext = createContext<SessionContextDef>({
    session:  readSessionFromStorage(),
    // eslint-disable-next-line no-unused-vars
    setSession: (session: Session):void => {},
});