import { AnalyticalTable, Title } from '@ui5/webcomponents-react';
import React, { forwardRef, useImperativeHandle } from 'react';
import { ResponsiveTableProperties, undefRowClickFn,  } from '.';
import './ResponsiveTable.css';
import { createButtonFactory, deleteButtonFactory, responsiveTableColumns } from './utils';

function ResponsiveTableImpl (props: ResponsiveTableProperties, ref: any) {
    const rows: any[] = props.rows || [];
    const columns = responsiveTableColumns(
        props.headers,
        deleteButtonFactory({onDeleteClick: props.onDeleteClick, rowIndex:-1}),
        createButtonFactory({onCreateClick: props.onCreateClick})
    );
    const filterable = true;
    const onCustomRowClick = props.onRowClick || undefRowClickFn;
    const onCustomRowClickAdapter = (event: CustomEvent<{row?: any}> | undefined) => {
        const rowData:any = event?.detail.row.original;
        const rowIndex:number = event?.detail.row.index;
        onCustomRowClick({rowIndex: rowIndex, rowData:rowData})
    };

    
    useImperativeHandle(ref, () => ({
        size: () => {
          return rows.length;
        },
    }));
          
    return (
        <>
            <Title className='analytical-table-title'>{props.title}</Title>
            <div className="analytical-table-container">
                <AnalyticalTable                
                    data={rows}
                    columns={columns}
                    onRowClick={onCustomRowClickAdapter}
                    filterable={filterable}
                />
            </div>            
        </>        
    );
}

const ResponsiveTable = forwardRef(ResponsiveTableImpl);
export { ResponsiveTable };
