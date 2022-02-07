import React, { useContext, useMemo, useState } from "react";
import { useRef } from "react";
import { ShellBar, ThemeProvider} from "@ui5/webcomponents-react";
import { Button } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/customer";
import "@ui5/webcomponents-icons/dist/menu";
import "@ui5/webcomponents-icons/dist/calendar";
import "@ui5/webcomponents-icons/dist/locate-me";
import "@ui5/webcomponents-icons/dist/home";
import "@ui5/webcomponents-icons/dist/accounting-document-verification";
import "@ui5/webcomponents-icons/dist/building";
import "@ui5/webcomponents-icons/dist/product";
import "@ui5/webcomponents-icons/dist/credit-card";
import "@ui5/webcomponents-icons/dist/sort";
import "@ui5/webcomponents-icons/dist/my-view";
import "./App.css";
import { SessionContext } from './context'
import { Session } from "./context/Session";
import { NavigatorSwitch, Navigator } from "./components/navigator";
import { Login } from "./views/login/Login";
import { AuthAvatar } from "./components/avatar";
import { AuthService } from "./services/AuthService";
import { SessionInfo } from "./views/login/SessionInfo";
import { readSessionFromStorage } from "./context/SessionContext";
import { LocaleContext } from "./context/LocaleContext";
import { useHistory } from "react-router-dom";

function onStartButtonClick(navigator:any) {
  navigator.current.setCollapsed(!navigator.current.isCollapsed());
}

function startButton(navigator:any, session: Session) {
  if(!session.user)
    return <></>;
  return  <Button onClick={() => onStartButtonClick(navigator)} icon="menu" />;
}

function App() {
  const history = useHistory();
  const navigator = useRef<any>();
  const [session, setSession] = useState<Session>(readSessionFromStorage());
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  const [showSessionInfoDialog, setShowSessionInfoDialog] = useState<boolean>(false);
  const localeContext = useContext(LocaleContext);
  
  const currentSessionContext = useMemo(
    () => ({ session, setSession }), 
    [session]
  );
  
  const onLoggedProfileClick = () => setShowSessionInfoDialog(true);
  const onNotLoggedProfileClick = () => setShowLoginDialog(true);  
  const onLogginDialogOkClick = (user: string, password:string) => {
    (async () => {      
      const response = await AuthService.authenticate(user, password);      
      if(response instanceof Error) {
        alert("can't authenticate")
      } else {
        setSession(await AuthService.parseSessionToken(response.toString(), localeContext))
        setShowLoginDialog(false)
      }
    })()    
  };
  const onLogginAbortClick = () => setShowLoginDialog(false);
  const onSessionContinueClick  = () => setShowSessionInfoDialog(false);
  const onSessionExitClick  = () => {
    (async () => {      
      setSession({});  
      await AuthService.clearSessionInStorage()  ;
      setShowSessionInfoDialog(false)  
      history.push("/");
    })()
  };

  return (
    <SessionContext.Provider value={currentSessionContext}>
      <ThemeProvider>
        <ShellBar
          logo={
            <img
              alt="SAP"
              src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg"
            />
          }
          profile={AuthAvatar({session: currentSessionContext.session})}
          startButton={startButton(navigator, session)}
          searchField={null}
          showNotifications={false}
          showProductSwitch={false}
          onProfileClick={currentSessionContext.session.user ? onLoggedProfileClick : onNotLoggedProfileClick}
        ></ShellBar>
        <div className="app-container">

          <div className="left"> 
            <Navigator session={currentSessionContext.session} ref={navigator}  />
          </div>
          <div className="right">
            <NavigatorSwitch session={currentSessionContext.session}/>
          </div>
        </div>

        <Login show={showLoginDialog} onAbortClick={onLogginAbortClick} onLoginClick={onLogginDialogOkClick} />
        <SessionInfo show={showSessionInfoDialog} onContinueClick={onSessionContinueClick} onExitClick={onSessionExitClick} session={currentSessionContext.session} />
      </ThemeProvider>
    </SessionContext.Provider>
  );
}

export default App;