import { SideNavigationItem } from '@ui5/webcomponents-react';
import React from 'react';
import { MANAGER_ROLES } from '../../services/config';
import { NavigatorSectionProperties } from './types';

const NavigatorSection: React.FC<NavigatorSectionProperties> = (props: NavigatorSectionProperties) => {
    const roles = props.sessionContext.session.user?.roles || [];
    const isAllowed = roles.filter(item => MANAGER_ROLES.includes(item.id)).length > 0;
    const text = props.text;
    const icon = props.icon;
    if(!isAllowed) return (<></>)
  
    console.log(roles);
    console.log(MANAGER_ROLES);
  
    return (
      <SideNavigationItem
      expanded
      icon={icon}
      text={text}
    >
      {props.children}
    </SideNavigationItem>        
    )
  }