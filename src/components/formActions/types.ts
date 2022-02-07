import { NamedTuple } from "../../model";
import { SAPInputElement } from "../form";

export interface FormSaveEvent {
    data:any
}


export interface DeclineEvent {
    reason?: string;
}

export type onSaveAndCloseEventHandler = (event: FormSaveEvent) => void
export type onSaveEventHandler = (event: FormSaveEvent) => void
export type onDeclineEventHandler = (event: DeclineEvent) => void
export type onValidateHandler = (element: SAPInputElement, data:NamedTuple<string, SAPInputElement>) => boolean;
export type FieldValidator = (elements: NamedTuple<string, SAPInputElement>, value?: any)=>boolean;

export interface FormActionsProperties {
    onDecline: onDeclineEventHandler;
    onSaveAndClose: onSaveAndCloseEventHandler;
    onSave: onSaveEventHandler;
    onValidate: onValidateHandler;
    title: string;
    controlStateProviders?: NamedTuple<string, ControlStateProvider>
}

export interface FormSubmissionError {
    exception?: string;
    validationMessages?: NamedTuple<string,string>;
}

export interface FormState {
    isEditing: boolean;
    key: any | undefined;
    showErrorMessage: boolean;
    submissionError?: FormSubmissionError       
}

export type ControlStateProvider = (item: any, name: string, data: NamedTuple<string, any>) => void;