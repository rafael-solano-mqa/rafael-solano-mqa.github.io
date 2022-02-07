import { Button, Label, TableCell } from '@ui5/webcomponents-react';
import React from 'react';
import { ListingCellsProperties, ListingDeleteButtonProperties } from '.';
const defaultFormatter = (value:any) => <Label>{value}</Label>;


const ListingDeleteButton: React.FC<ListingDeleteButtonProperties> = (props: ListingDeleteButtonProperties) => {
    const onDeleteClick = props.onDeleteClick;

    if(!onDeleteClick)
        return <></>
    
    return (
        <Button
            icon="delete"
            design="Transparent"
            // onClick={props.onDeleteClick}
            data-index={props.rowIndex}
        />        
    )
}

const ListingCells: React.FC<ListingCellsProperties> = (props: ListingCellsProperties) => {
    const row = props.row;
    const rowIndex = props.rowIndex;

    return (
        <>
        {
            props.headers.map((header, index) => {
                const value = row[header.key];
                return (
                <TableCell
                    className={"listing-table-cell" + (header.alignment ? ` listing-table-cell-${header.alignment}` : '') }
                    key={index}
                    onClick={props.onCellClick}
                >
                    {header.formatter
                    ? header.formatter(value)
                    : defaultFormatter(value)}
                </TableCell>
                );
            })            
        }               
            <TableCell key={props.headers.length}>
                <ListingDeleteButton onDeleteClick={props.onDeleteClick} rowIndex={rowIndex} />
            </TableCell>

        </>
    )
} 

export { ListingCells };