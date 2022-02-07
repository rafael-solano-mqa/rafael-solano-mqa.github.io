import { Locale } from "./Locale";
import { LabelEnum } from "../LabelEnum";
import { ErrorEnum } from "../ErrorEnum";

export const SpanisLocale:Locale = { // is empty or null
    name: "es",
    valueStateMessages : {
        [ErrorEnum.EMPTY_STRING]: "Sin contenido.",
        [ErrorEnum.EMPTY_ARRAY]:  "Sin contenido.",
        [ErrorEnum.MISSING_CHOICE]:  "Seleccione un elemento.",
        [ErrorEnum.UNSAFE_PASSWORD]:  "Contraseña débil.",
        [ErrorEnum.DUPLICATED_NAME]:  "Nombre duplicado."
    },
    staticLabels: {    
        [LabelEnum.USER_NAME]: "Usuario",
        [LabelEnum.LAST_NAME]: "Nombre",
        [LabelEnum.FIRST_NAME]: "Apellido",
        [LabelEnum.STATUS]: "Status",
        [LabelEnum.ROLE]: "Rol",
        [LabelEnum.SEARCH]: "Buscar",
        [LabelEnum.CREATE]: "Crear",
        [LabelEnum.ACCESS_CONTROL]: "Control de Aceso",
        [LabelEnum.USERS]: "Usuarios",
        [LabelEnum.START_MENU]: "Inicio",
        [LabelEnum.CREATE_UPDATE]: "Crear/Actualizar",
        [LabelEnum.SAVE]: "Guardar",
        [LabelEnum.CLOSE]: "Cerrar",
        [LabelEnum.PASSWORD]: "Contraseña",
        [LabelEnum.VALIDATION_NOTICE]: "El formulario contiene campos con datos incorrectos.",
        [LabelEnum.SIGNIN]: "Iniciar Sesión",
        [LabelEnum.AUTHENTICATION]: "Identificación",
        [LabelEnum.PERSONAL_INFO]: "Datos Personales",
        [LabelEnum.SECURITY_PROFILE]: "Permisos",
        [LabelEnum.ACCEPT]: "Aceptar",
        [LabelEnum.ABORT]: "Abortar",
        [LabelEnum.USER_LISTING]: "Listado de Usuarios",
        [LabelEnum.PLEASE_SELECT]: "[ESCOJA]",
        [LabelEnum.UPDATE]: "Actualizar",
        [LabelEnum.MANAGER]: "Supervisor",
        [LabelEnum.SUBORDINATE]: "Colaborador",
        [LabelEnum.GROUPS]: "Grupos",
        [LabelEnum.NAME]: "Nombre",
        [LabelEnum.PHOTO_LISTING]: "Album Personal",
        [LabelEnum.PICTURE]: "Imagen"
    }
}
