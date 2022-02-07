import { ReactElement } from "react";
import { NamedTuple } from "../../model";

export interface ListingRowEvent  {
    rowIndex: number;
    rowData: any;
}
  
export interface RowClickEvent extends ListingRowEvent {    
}
  
export interface DeleteClickEvent extends ListingRowEvent{    
}

export type onRowClickHandler = (event: RowClickEvent) => void;
export type onDeleteClickHandler = (event: RowClickEvent) => void; 
export type ListingCellFormatter = (value: any) => ReactElement;
export type onCellClickHandler = (event: NamedTuple<string,any>) => any;


export interface ListingFilterArraySelector {    
    text: string;
    value: string;
    options: Array<any>;
}

export interface ListingFilterText {
    maxLength: number;
}

export type ListingFilterType = ListingFilterArraySelector | ListingFilterText;
export type ListingItemAlignment = "left" | "right";

export interface ListingHeader {
    title: string;
    key: string;
    formatter?: ListingCellFormatter;
    alignment?: ListingItemAlignment;
    width?: number | string;
}

export type onCreateClickHandler = () => void;

export interface ListingColumnsProperties{
    headers: Array<ListingHeader>;    
    onCreateClick?: onCreateClickHandler; 
}

export interface ListingDataProperties extends ListingColumnsProperties{
    rows: Array<any>;
}

export interface ListingProperties extends ListingDataProperties {
    onRowClick?: onRowClickHandler;
    onDeleteClick?: onDeleteClickHandler;
    onSearchClick?: onCellClickHandler; 
    title: string
}

export interface ResponsiveTableProperties extends ListingProperties{
}

export interface ListingRowsProperties extends  ListingDataProperties {
    onCellClick: onCellClickHandler;
    onDeleteClick?: onCellClickHandler;    
}

export interface ToolBarProperties {
    onCreateClick: onCreateClickHandler;
}

export interface ListingCellsProperties {
    row: any;
    headers: Array<ListingHeader>;
    onCellClick: onCellClickHandler;
    onDeleteClick?: onCellClickHandler;     
    rowIndex: number;     
}

export interface ListingDeleteButtonProperties {
    onDeleteClick?: onDeleteClickHandler;
    rowIndex: number;
}

export interface ListingCreateButtonProperties {
    onCreateClick?: onCreateClickHandler;
}
