import { Bar } from '@ui5/webcomponents-react';
import React from 'react';

type onClickHandler = () => void;

interface buttonListProperties{
    buttonName: string,
    onClick: onClickHandler
}

type Props = {
    children?: buttonListProperties[]
}

export function ButtonList(props: Props){
    return(
        <Bar startContent={
            props.children?.map((b, index)=>
                <button key={index+"b".charCodeAt(0)} className='sapui-button sap-ui-small-margin' name={b.buttonName} onClick={b.onClick}>{b.buttonName}</button>
            )
        }
        design="Header"/>
    );
}