import React, { useLayoutEffect, useRef } from "react";
import { SessionInfoProperties } from "./types";
import "@ui5/webcomponents-icons/dist/account";
import "@ui5/webcomponents-icons/dist/visits";

import { Bar, Button, Dialog, Icon, Title } from "@ui5/webcomponents-react";
import { Role } from "../../context";

const header = (userName?: string) => <Bar className="login-dialog-bar" endContent={<Icon name="account" />}><Title>Perfil de {userName}</Title></Bar>

const footer = (
    onContinueClick: () => void,
    onExitClick: () => void
) => (
    <Bar className="login-dialog-bar">
        <Button icon="accept" onClick={onContinueClick}>Continuar</Button>
        <Button icon="visits" onClick={onExitClick}>Cerrar Sesión</Button>
    </Bar>
)

export function SessionInfo (properties: SessionInfoProperties) {
    const dialogRef = useRef<any>();
    const onContinueClick = () => properties.onContinueClick();
    const onExitClick = () => properties.onExitClick();
    const user = properties.session.user;
    useLayoutEffect(()=> {
        if(dialogRef && dialogRef.current) {
            if(properties.show && dialogRef.current.show)
                dialogRef.current.show();
            else if(!properties.show && dialogRef.current.close)
                dialogRef.current.close();
        }            
    })
        
    return (
        <Dialog     
            className="login-dialog"       
            ref={dialogRef}
            footer={footer(onContinueClick, onExitClick)}
            header={header(user?.name)}            
        >
            <ul>
                {user?.roles.map((item:Role, index:number) => (<li style={{listStyle:"none"}} key={index}>{item.id}</li>))}
            </ul>
            
        </Dialog>    
    );    
}