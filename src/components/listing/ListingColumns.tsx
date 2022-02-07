/*eslint no-unused-vars: "off"*/
import React from 'react';
import { Button, Label, TableColumn } from '@ui5/webcomponents-react';
import { ListingColumnsProperties, ListingCreateButtonProperties, onCreateClickHandler } from '.';
import "@ui5/webcomponents-icons/dist/create";

const emptyStyle={};

const ListingCreateButton: React.FC<ListingCreateButtonProperties> = (props: ListingCreateButtonProperties) => {
    const onCreateClick = props.onCreateClick;

    if(!onCreateClick)
        return <></>

    return <Button icon='create' design="Transparent" onClick={props.onCreateClick} />  
}

const ListingColumns: React.FC<ListingColumnsProperties> = (props: ListingColumnsProperties) => {    

    return(
        <>
            {
            props.headers.map((header, index) => (
                <TableColumn key={index} className={"listing-table-header"} style={header.width ? ({width: header.width}) : emptyStyle}>
                    <Label className={(header.alignment ? ` listing-table-header-${header.alignment}` : '')}>{header.title}</Label>
                </TableColumn>
            ))
            }
            <TableColumn key={props.headers.length} style={{width:65}}>
                <ListingCreateButton onCreateClick={props.onCreateClick} />
            </TableColumn>,

        </>
    );
}

export { ListingColumns };