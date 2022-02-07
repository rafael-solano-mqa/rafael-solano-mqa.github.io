import { Locale } from "./Locale";
import { LabelEnum } from "../LabelEnum";
import { ErrorEnum } from "../ErrorEnum";

export const EnglishLocale:Locale = {
    name: "default",
    valueStateMessages : {
        [ErrorEnum.EMPTY_STRING]:  "Empty text.",
        [ErrorEnum.EMPTY_ARRAY]: "Empty text.",
        [ErrorEnum.MISSING_CHOICE]: "Select one item.",
        [ErrorEnum.UNSAFE_PASSWORD]: "Weak password.",
        [ErrorEnum.DUPLICATED_NAME]:  "Duplicated name."
    },
    staticLabels: {    
        [LabelEnum.USER_NAME]: "User",
        [LabelEnum.LAST_NAME]: "Last Name",
        [LabelEnum.FIRST_NAME]: "First Name",
        [LabelEnum.STATUS]: "Status",
        [LabelEnum.ROLE]: "Role",
        [LabelEnum.SEARCH]: "Search",
        [LabelEnum.CREATE]: "Create",
        [LabelEnum.ACCESS_CONTROL]: "Access Control",
        [LabelEnum.USERS]: "Users",
        [LabelEnum.START_MENU]: "Home",
        [LabelEnum.CREATE_UPDATE]: "Create/Update",
        [LabelEnum.SAVE]: "Save",
        [LabelEnum.CLOSE]: "Close",
        [LabelEnum.PASSWORD]: "Password",
        [LabelEnum.VALIDATION_NOTICE]: "The submitted form contains invalid fields.",
        [LabelEnum.SIGNIN]: "Sign in",
        [LabelEnum.AUTHENTICATION]: "Sign in",
        [LabelEnum.PERSONAL_INFO]: "Personal Information",
        [LabelEnum.SECURITY_PROFILE]: "Security Profile",
        [LabelEnum.ACCEPT]: "Accept",
        [LabelEnum.ABORT]: "Abort" ,
        [LabelEnum.USER_LISTING]: "User Listing",
        [LabelEnum.PLEASE_SELECT]: "[SELECT]",
        [LabelEnum.UPDATE]: "Update",
        [LabelEnum.MANAGER]: "Manager",
        [LabelEnum.SUBORDINATE]: "Assistant",
        [LabelEnum.GROUPS]: "Groups",
        [LabelEnum.NAME]: "Name",
        [LabelEnum.PHOTO_LISTING]: "Picture Listing",
        [LabelEnum.PICTURE]: "Picture"
    }
}