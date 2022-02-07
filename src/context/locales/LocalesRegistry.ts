import { NamedTuple } from "../../model"
import { EnglishLocale } from "./EnglishLocale"
import { Locale } from "./Locale"
import { SpanisLocale } from "./SpanishLocale"

export const LocalesRegistry: NamedTuple<string, Locale> = {
    'en': EnglishLocale,
    'es': SpanisLocale
}