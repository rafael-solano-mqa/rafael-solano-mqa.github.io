import React from "react";
import { NamedTuple } from "../../model";
import { ControlStateProvider, onValidateHandler } from "../formActions";

export type DataTextBoxProperties = NamedTuple<string, any>;
export type DataDateBoxBoxProperties = NamedTuple<string, any>;
export type DataSelectProperties = NamedTuple<string, any>;
export type DataCheckBoxProperties = NamedTuple<string, any>;
export type DataStepInputBoxProperties = NamedTuple<string, any>;
export type DataPictureProperties = NamedTuple<string, any>;

export type TabsProperties = NamedTuple<string, any>;

export type CreateCallback = (data: any) => Promise<any>;
export type UpdateCallback = (data: any) => Promise<any>;
export type FindCallback = (data: any) => Promise<any>;
export type FindParametersFactory = () => string;
export type LayoutFactory = () => React.ReactElement;

export interface DataFormColumnLayout {
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
}

export interface DataFormProperties {
    formId: any;
    listFormUrl: string;
    className?: string;
    createCallback: CreateCallback;
    updateCallback: UpdateCallback;
    findCallback: FindCallback;
    validator?: onValidateHandler;
    parametersFactory: FindParametersFactory;
    layoutFactory: LayoutFactory;
    title?: string;
    icon?: React.ReactElement;
    controlStateProviders?: NamedTuple<string, ControlStateProvider>;
}

export interface SAPInputElementItem extends HTMLInputElement {
    name: string;
    valueState: string;
    valueStateMessage: string;
}

export interface SAPInputElement extends HTMLInputElement {
    item: SAPInputElementItem;
    userInput: any;
    valueState: string; 
    valueStateMessage: Array<HTMLElement>; 
    valueStateMessageText: string  ; 
}

export type ValidationMessageFormatter = (name: string, message: string, data?:any) => string;