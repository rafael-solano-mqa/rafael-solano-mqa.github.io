import React, { useContext, useLayoutEffect, useRef } from "react";
import { Bar, Button, Dialog, Form, FormItem, Icon, Input, Title } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/decline";
import "@ui5/webcomponents-icons/dist/accept";
import "@ui5/webcomponents-icons/dist/account";

import './Login.css';
import { LoginProperties } from "./types";
import { LocaleContext, LocaleContextDef } from "../../context/LocaleContext";
import { LabelEnum } from "../../context/LabelEnum";

const footer = (
    onLoginClick: () => void,
    onAbortClick: () => void,
    localeContext: LocaleContextDef
) => (
    <Bar className="login-dialog-bar">
        <Button icon="accept" onClick={onLoginClick}>{localeContext.staticLabel(LabelEnum.ACCEPT)}</Button>
        <Button icon="decline" onClick={onAbortClick}>{localeContext.staticLabel(LabelEnum.ABORT)}</Button>
    </Bar>
)

const header = (title: string) => (
    <Bar className="login-dialog-bar" endContent={<Icon name="account" />}>
        <Title>{title}</Title>
    </Bar>
)
export function Login (properties: LoginProperties) {
    const localeContext = useContext(LocaleContext);
    const dialogRef = useRef<any>();
    const userIdRef = useRef<any>();
    const passwordRef = useRef<any>();

    const onCustomLoginClick = properties.onLoginClick;
    const onCustomAbortClick = properties.onAbortClick;    
    const onLoginClick = () => {
        const user = userIdRef.current.value;
        const password = passwordRef.current.value;
        onCustomLoginClick(user, password)
    }
    const onAbortClick = () => onCustomAbortClick();

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
            footer={footer(onLoginClick, onAbortClick, localeContext)}
            header={header(localeContext.staticLabel(LabelEnum.SIGNIN))}
        >
            <Form className="login-dialog-form">
                <FormItem label={localeContext.staticLabel(LabelEnum.USER_NAME)} >
                    <Input ref={userIdRef} name="userId" className="login-input"/>
                </FormItem>

                <FormItem label={localeContext.staticLabel(LabelEnum.PASSWORD)}>
                    <Input ref={passwordRef} type="Password"  name="password" className="login-input" />
                </FormItem>                
            </Form>
        </Dialog>    
    );
}