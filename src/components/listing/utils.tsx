/* eslint no-unused-vars: 0 */
import React from 'react';
import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react/interfaces/AnalyticalTableColumnDefinition";
import { DeleteClickEvent, ListingCreateButtonProperties, ListingDeleteButtonProperties, ListingHeader, RowClickEvent } from ".";
import { NamedTuple } from "../../model";
import { Button } from '@ui5/webcomponents-react';

export const undefRowClickFn = (event:RowClickEvent) => {};
export const undefDeleteClickFn = (event:DeleteClickEvent) => {};
export const undefSearchClick = (event:any) => {};


const responsiveTableColumnWidth =( header: ListingHeader): number | undefined => {
    const width = header.width === undefined ? undefined : parseFloat(header.width?.toString());
    
    if(width !== undefined && isNaN(width))
        return undefined;       
}

export const responsiveTableColumn = (header: ListingHeader): AnalyticalTableColumnDefinition => ({
    accessor: header.key,
    width: responsiveTableColumnWidth(header),
    Header: header.title,
    disableSortBy: true
})

export const responsiveTableColumns = (
    headers: ListingHeader[], 
    DeleteButton:  React.FC<NamedTuple<string,any>>,
    CreateButton:  React.FC<NamedTuple<string,any>>,
) => [...headers.map((header: ListingHeader) => responsiveTableColumn(header)),{
    accessor: 'actions-'+(Math.random() *1000).toString(36).replace('.',''),
    Header: CreateButton,
    Cell: DeleteButton,
    disableSortBy: true,
    disableFilters: true,
    disableGlobalFilter: true
}];

export const deleteButtonFactory = (props: ListingDeleteButtonProperties): React.FC<NamedTuple<string,any>> => {
    const onCustomDeleteClick = props.onDeleteClick || undefDeleteClickFn;    
    const onDeleteClickImpl = (event:any) => onCustomDeleteClick({ rowIndex: event.rowIndex, rowData: event.rowData });
    const onDeleteClick = onCustomDeleteClick !== undefDeleteClickFn ? onDeleteClickImpl : undefined ;
    let instance: React.FC<NamedTuple<string,any>>;

    if(!onDeleteClick)
        instance = (props: NamedTuple<string,any>) => (<></>);
    else
        instance = (props: NamedTuple<string,any>) => {
            const rowIndex = props.cell.row.index;
            const rowData = props.cell.row.original;    
            const onClick = (event: any) => onDeleteClick({...event, rowIndex: rowIndex, rowData: rowData});

            return (
                <Button
                    icon="delete"
                    design="Transparent"
                    onClick={onClick}
                />        
            )
        }

    return instance;
}

export const createButtonFactory = (props: ListingCreateButtonProperties): React.FC<NamedTuple<string,any>> => {
    const onCreateClick = props.onCreateClick;
    let instance: React.FC<NamedTuple<string,any>>;

    if(!onCreateClick)
        instance = (props: NamedTuple<string,any>) => (<></>);
    else
        instance = (props: NamedTuple<string,any>) => (
            <Button icon='create' design="Transparent" onClick={onCreateClick} />
        );
    
    return instance;
}   