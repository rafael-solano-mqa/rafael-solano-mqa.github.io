/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
import React, { useRef, useImperativeHandle, forwardRef, useContext } from "react";
import { Button, Title } from "@ui5/webcomponents-react";
import "./FormActions.css";
import "@ui5/webcomponents-icons/dist/save";
import "@ui5/webcomponents-icons/dist/decline";
import { validate } from "../form/Validators";
import { ControlStateProvider, DeclineEvent, FormActionsProperties, onSaveEventHandler, onValidateHandler } from "./types";
import { NamedTuple } from "../../model";
import { SAPInputElement } from "../form";
import { getFormData, setFormData, setResponseMessages, setValueStateMessage } from "./utils";
import { LocaleContext } from "../../context/LocaleContext";
import { LabelEnum } from "../../context/LabelEnum";
import { dataTags } from "./utils";

const nop = (_formData:any) => { };
const noValidate:(element: any) => boolean = (_item:any) => {
  return true;
};

export function FormActionsImpl(props: FormActionsProperties, ref:any) {
  const controlStateProviders = props.controlStateProviders || {};
  const localeContext = useContext(LocaleContext);
  const formActionsRef:any = useRef(null);
  const onValidate:onValidateHandler = props.onValidate || noValidate;
  const onSaveClick = props.onSave || nop;
  const onDeclineClick = props.onDecline || nop;
  const onSaveAndCloseClick = props.onSaveAndClose || nop;
  const title = props.title;
  const onDecline = (event: DeclineEvent) => {
    onDeclineClick(event);
  };

  const onSave = (callback: onSaveEventHandler) => {
    const parentNode = formActionsRef.current.parentNode;
    const data:NamedTuple<string, SAPInputElement> = dataTags
      .reduce((data:Array<SAPInputElement>, dataTag:any) => {
        const list:Array<SAPInputElement> = typeof dataTag === "string" ? parentNode.querySelectorAll(dataTag) : dataTag(parentNode);
        data = data.concat([...list]);
        return data;
      }, [])
      .reduce((object:NamedTuple<string, any>, item:SAPInputElement) => {
        const attribute = item.getAttribute("name") || "";
        const name = item.name || attribute;
        const value = null || item.userInput;
        item.valueState = "None";
        return { ...object, [name]: { value: value, item: item } };
      }, {});

    const names = Object.keys(data);
    const errors = names.reduce((errors: NamedTuple<string,any>, name) => {
      if (!validate(onValidate, data[name], data)) {
        data[name].item.valueState = "Error";
        errors[name] = data[name].item;
      }
      return errors;
    }, {});

    if (Object.keys(errors).length === 0) {
      const evt = {
        data: names.reduce((object: NamedTuple<string,any>, name) => { 
          object[name] = data[name].value;
          return object;
        }, {}),
      };
      
      callback(evt);
    }
  };

  useImperativeHandle(ref, () => ({
    setFormData: (formData: NamedTuple<string,any>) => setFormData(formData, formActionsRef, controlStateProviders),
    getFormData: () => getFormData(formActionsRef),    
    setResponseMessages: (validationMessages: NamedTuple<string,string>, data:any) => setResponseMessages (
      formActionsRef,
      validationMessages,
      localeContext.locale,
      data
    )
  }));
  const saveAndCloseLabel = localeContext.staticLabel(LabelEnum.SAVE) + '&' +  localeContext.staticLabel(LabelEnum.CLOSE);

  return (
    <div className="row form-actions" ref={formActionsRef}>
      <div className="col-12">
        <Title className='form-actions-title'>{title}</Title>
        <Button
          className="sapui-button"
          icon="save"
          onClick={() => onSave(onSaveClick)}
        >
          {localeContext.staticLabel(LabelEnum.SAVE)}
        </Button>
        <Button
          className="sapui-button"
          icon="decline"
          onClick={(event) => onDecline({reason: "unknown"})}
        >
          {localeContext.staticLabel(LabelEnum.CLOSE)}
        </Button>
        <Button
          className="sapui-button"
          onClick={() => onSave(onSaveAndCloseClick)}
        >
          {saveAndCloseLabel}
        </Button>
      </div>
    </div>
  );
}

export const FormActions = forwardRef(FormActionsImpl);