import { Button,    ResponsiveGridLayout } from '@ui5/webcomponents-react';
import React from 'react';
import { DataTextBox } from '../form';

type onClickHandler = () => void;
type onChangeHandler = (event: any) => void

interface searchProperties { //extends React.HTMLProps<HTMLButtonElement>{
    buttonName?: string,
    textBoxName?: string,
    value:any,
    disabled?:boolean,
    onChange:onChangeHandler,
    onClick: onClickHandler
}

export function Search(props:searchProperties){
    return(
        <ResponsiveGridLayout columnsXL={2} columnsL={2} columnsM={2} columnsS={3}>
            <DataTextBox id="searchId" onChange={props.onChange} value={props.value} name={props.textBoxName} placeholder={props.textBoxName}/>
            <Button style={{marginRight :20, marginLeft:30}} disabled={props.disabled} icon="search" onClick={props.onClick} className='sapui-button sap-ui-small-margin'>{props.buttonName}</Button>
        </ResponsiveGridLayout>
    )
}