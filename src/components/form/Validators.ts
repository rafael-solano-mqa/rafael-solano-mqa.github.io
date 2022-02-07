import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { SAPInputElement } from ".";
import { NamedTuple } from "../../model";
import { FieldValidator, onValidateHandler } from "../formActions";

export function nonEmptyString(value?:string) {
  return typeof value === "string" && /\S/.test(value);
}

export function nonEmptyNumber(value?: number) {
  const typeOf = typeof value
  if(typeOf !== "number")
    return false;

  const coerced = value || NaN ;
  return !(isNaN(coerced) || isFinite(coerced) == false);
}

export function asNumber(value?: any) {
  const coerced = +value;
  if(nonEmptyNumber(coerced)) {
    return coerced
  }

  return NaN;
}

export function notEmpty(value?:any) {
  const typeOf = typeof value;

  switch(typeOf) {
    case "string":
      return nonEmptyString(value.toString());

    case "number":
      return nonEmptyNumber(+value);

    case "undefined":      
    default:
      return false;
  }
}

export const isEmpty = (value?: any) => !notEmpty(value);

export function validate(onValidate:onValidateHandler, element:SAPInputElement, data:NamedTuple<string, SAPInputElement>) {
  const typeOf = typeof element.value;

  if (typeOf === "boolean") return true;
  if (element.item.getAttribute("required") && isEmpty(element.value)) {
    return false;
  }

  return onValidate(element, data);
}

export function nonEmptyArray(array:any) {
  if (
    array === null ||
    typeof array === "undefined" ||
    !(array instanceof Array) ||
    array.length === 0
  )
    return false;

  return true;
}

export function customFormValidator (element:SAPInputElement, elements:NamedTuple<string, SAPInputElement>, validators:NamedTuple<string, FieldValidator>): boolean {
	const fn = validators[element.item.name];
	return !fn ? true : fn(elements, element.value);  
}

const taxRegExp = /^(-|\+)?\d{2}(\.\d+)?$/

export const onRateChange = (event: Ui5CustomEvent<SAPInputElement>) => {
	const value = event.target.value.trim()

	if(taxRegExp.test(value)) {
    let coerced = Math.abs(parseFloat(value));
    coerced = coerced < 1 || coerced > 100 ? (coerced | 0) : coerced;
		event.target.value = Math.abs(coerced).toFixed(2);

	} else {
		event.target.value = "0.00"
	}
}