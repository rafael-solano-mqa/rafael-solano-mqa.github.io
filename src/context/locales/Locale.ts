import { NamedTuple } from "../../model";

// eslint-disable-next-line no-unused-vars
export type ValueStateMessageTranslatorCallback = (name: string,  data?: any) => string
export type ValueStateMessageTranslator = ValueStateMessageTranslatorCallback | string;

export interface Locale {
    name: string;
    valueStateMessages: NamedTuple<string,ValueStateMessageTranslator>;
    staticLabels: NamedTuple<number,string>
}

