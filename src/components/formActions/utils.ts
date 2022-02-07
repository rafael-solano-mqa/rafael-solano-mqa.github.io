import { ControlStateProvider } from ".";
import { Locale, ValueStateMessageTranslatorCallback } from "../../context/locales/Locale";
import { NamedTuple } from "../../model";
import { SAPInputElement } from "../form";

export const dataTags = [
    "ui5-input",
    "ui5-select",
    "ui5-multi-combobox",
    "ui5-checkbox",
    "ui5-date-picker",
    "ui5-step-input",
    (parentNode:any) => parentNode.querySelectorAll("div[data-control='bing-map']"),
    (parentNode:any) => parentNode.querySelectorAll("div[data-control='data-picture']"),
  ];

  
export const removeAllChildNodes = (parent:HTMLElement) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export const setValueStateMessage = (
    element: SAPInputElement,
    locale: Locale,
    name: string,
    errorCode: string,
    data: any,
    valueState?: string
) => {
    const valueStateMessage:Array<HTMLElement> = element.valueStateMessage
    const span = document.createElement('span');

    if(typeof valueState === "string") {
       element.valueState = valueState;
    } else {
        element.valueState = 'None';
    }

    const deleted = valueStateMessage.splice(0, valueStateMessage.length);
    deleted.forEach(element => {
        const parent = element.parentElement;
        if(parent) {
            parent.removeChild(element);
        }
    })

    const formatter = locale.valueStateMessages[errorCode];
    
    if(!formatter) {
        span.innerText = errorCode;
    } else if(typeof formatter === "string") {
        const text: string = formatter;
        span.innerText = text;
    } else {
        const callback: ValueStateMessageTranslatorCallback = formatter;
        span.innerText = callback(name, data);
    }
    
    valueStateMessage.push(span);
}

const defaultStateProvider:ControlStateProvider = (item: any, name: string, data: NamedTuple<string,any>) => item.userInput = data[name];

export const setFormData = (
    formData: NamedTuple<string,any>,
    formActionsRef:any,
    controlStateProviders: NamedTuple<string, ControlStateProvider>
):void => {
    if (formData) {
      const parentNode = formActionsRef.current.parentNode;
      dataTags
        .reduce((data:Array<any>, dataTag) => {
          const list = typeof dataTag === "string" ? parentNode.querySelectorAll(dataTag) : dataTag(parentNode);
          data = data.concat([...list]);
          return data;
        }, [])
        .forEach((item) => {
          const name = item.name || item.getAttribute("name");
          
          if (name) {
            const stateProvider = controlStateProviders[name] || defaultStateProvider;
            stateProvider(item, name, formData);
          }
        });
    }
  }

  export const getFormData = (formActionsRef: any) => {
    const parentNode = formActionsRef.current.parentNode;    
    return dataTags
      .reduce((data: NamedTuple<string,any>, dataTag:any) => {
        const list = typeof dataTag === "string" ? parentNode.querySelectorAll(dataTag) : dataTag(parentNode);
        list.forEach((item:any) => {
          data[item.name || item.getAttribute("name")] = item.userInput
        })
        return data;
      }, {})
  }
  
  export const setResponseMessages = (
      formActionsRef: any,
      validationMessages: NamedTuple<string,string>,
      locale: Locale,
      data:any
    ) => {
    const parentNode = formActionsRef.current.parentNode;
    const names = Object.keys(validationMessages);

    names.forEach(name => {
      const elements = [...parentNode.querySelectorAll(`[name='${name}']`)];
      elements.forEach((element:SAPInputElement) => { // appendChild, removeChild
        setValueStateMessage(element, locale, name, validationMessages[name], data, 'Error');
      })
    });
}  

export const createHTMLElementArray = (parentElement: HTMLElement, className?:string) => {
  const result: Array<HTMLElement> = [];
  const array: any = result;  
  const pushImpl = Array.prototype.push;

  
  array.push = (...items: any[]) : number => {
    items.forEach((item: any) => {
       parentElement.appendChild(item);
       if(className) {
         item.classList.add(className);
       }
    });
    return pushImpl.apply(this, items);
  }
  return result;
}