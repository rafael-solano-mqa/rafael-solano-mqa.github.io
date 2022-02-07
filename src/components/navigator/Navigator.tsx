/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */

import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useImperativeHandle } from "react";
import { SideNavigation } from "@ui5/webcomponents-react";
import { SideNavigationItem } from "@ui5/webcomponents-react";
import { SideNavigationSubItem } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/customer";
import "@ui5/webcomponents-icons/dist/shield";
import "@ui5/webcomponents-icons/dist/key";
import "@ui5/webcomponents-icons/dist/camera";
import { Session /*, SessionContext*/ } from "../../context";
import { NavigatorProperties } from "./types";
import { LocaleContext } from "../../context/LocaleContext";
import { LabelEnum } from "../../context/LabelEnum";

export const Navigator = React.forwardRef((props:NavigatorProperties, ref:any) => {
  const localeContext = useContext(LocaleContext);  
  /* *
  const sessionContext = useContext(SessionContext);
  /* */
  const sideNavigation = useRef<any>();
  const history = useHistory();
  const session: Session = props.session;  

  const onSelectionChange = (event:any) => {
    const selectedItem = event.detail.item;
    const route = selectedItem.getAttribute("data-route");
    if (route) history.push(route);
  };

  useImperativeHandle(ref, () => ({
    setCollapsed: (collapsed:boolean) => {
      sideNavigation.current.collapsed = collapsed;
    },

    isCollapsed: ():boolean => {
      return sideNavigation.current.collapsed;
    },
  }));
    
  console.log(session)
  if(!session.user) {
    return <></>
  }
  const userId = session.user?.id;

  // Rest of the component's code
  return (
    <SideNavigation
      ref={sideNavigation}
      onSelectionChange={onSelectionChange}
      collapsed={true}
    >
      <SideNavigationItem icon="home" text={localeContext.staticLabel(LabelEnum.START_MENU)} />
      <SideNavigationItem data-route={`/photos/`} icon="camera" text={localeContext.staticLabel(LabelEnum.PHOTO_LISTING)}/>
      <SideNavigationItem
        expanded
        icon="shield"
        text={localeContext.staticLabel(LabelEnum.ACCESS_CONTROL)}
      >
        <SideNavigationSubItem
          data-route={`/change-password/${userId}`}
          icon="key"
          text={localeContext.staticLabel(LabelEnum.UPDATE)+' '+localeContext.staticLabel(LabelEnum.PASSWORD)}
        />               
      </SideNavigationItem>

         

    </SideNavigation>
  );
});
