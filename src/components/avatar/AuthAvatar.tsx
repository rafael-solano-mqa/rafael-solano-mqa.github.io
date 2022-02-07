import React from "react";
import { Avatar } from "@ui5/webcomponents-react";
import { AuthAvatarProperties } from ".";
import "@ui5/webcomponents-icons/dist/employee";
import "@ui5/webcomponents-icons/dist/log";

export const AuthAvatar: React.FC<AuthAvatarProperties> = ({session}) => {
    const icon = session.user ? "employee" : "log";
    return <Avatar icon={icon} shape="Circle" />;
}

