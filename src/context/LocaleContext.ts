import { createContext } from 'react'
import { LabelEnum } from './LabelEnum';
import { Locale } from "./locales/Locale";
import { LocalesRegistry } from './locales/LocalesRegistry';

const currentLanguage = () => {
    let language: string;
    const navigator: any = window.navigator;

    if (navigator.languages) {
        language = window.navigator.languages[0];
    } else {
        language = navigator.userLanguage || navigator.language;
    }

    return language.substring(0, language.indexOf('-'));
}

const initialLocale = () => {
    const language = currentLanguage();
    const locale = LocalesRegistry[language];
    if(locale)
        return locale;

    return LocalesRegistry['en']
}

export class LocaleContextDef {
    locale: Locale;

    constructor(locale: Locale ) {
        this.locale = locale;
    }

    staticLabel(id: LabelEnum): string {
        return this.locale.staticLabels[id];
    }
}


export const LocaleContext = createContext<LocaleContextDef>(new LocaleContextDef(initialLocale()));