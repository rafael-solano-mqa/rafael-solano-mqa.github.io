import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { DeleteClickEvent, ListingHeader, onCellClickHandler } from '../../components/listing';
import { ResponsiveTable } from '../../components/listing/ResponsiveTable';
import { LabelEnum } from '../../context/LabelEnum';
import { LocaleContext } from '../../context/LocaleContext';
import { NamedTuple } from '../../model';
import { domain } from '../../services/config';
import DataService from '../../services/DataService';
import { PhotoService } from '../../services/PhotoService';
import './PhotoListing.css';

export const PhotoListing: React.FC = () => {
  /* Non functional hooks */
  const localeContext = useContext(LocaleContext);
//const sessionContext = useContext(SessionContext);
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const listingRef = useRef(null);
  /* */

  /* Candidates to become properties */
  const editFormURL = "/photo";  
  const retrieveAllURL=`${domain}/album/photos`;
  const [retrieveAll, setRetrieveAll] = useState(retrieveAllURL);
  const dataService = PhotoService;
  const headers: ListingHeader[] = [
    { title: localeContext.staticLabel(LabelEnum.NAME), key: "name", alignment: "left"},
  ];
  /* */

  /* Callbacks */
  const refreshListing = async (url: string) => {
    const response: any = await DataService.all(url);
    setRows(response);         
  }

  
  const onSearchClick: onCellClickHandler = (event: NamedTuple<string, any>) =>{ // eslint-disable-line no-unused-vars
    ( async () => {
      const url = retrieveAllURL; // + DataService.queryString(event)
      setRetrieveAll(url)
      refreshListing(url)   
    })();
  }
  
  const onDeleteClick = (event: DeleteClickEvent) => {
    (async (id) => {
      try {
        await dataService.remove(id)
        refreshListing(retrieveAll);
      } catch (error) {
        console.error(error);
      }
    })(event.rowData.id)
  };

  const onRowClick  = (event: any) => {
    history.push(`${editFormURL}/${event.rowData.id}`)
  };

  const onCreateClick = () =>{ history.push(editFormURL) }
  /* */

  /* Functional hooks */
  useEffect(() => {
    (async () => {
      refreshListing(retrieveAll);
    })();
  }, []);
  /* */

  return (
    <div className="container">
      <ResponsiveTable
        title={localeContext.staticLabel(LabelEnum.USER_LISTING)}
        ref={listingRef}
        headers={headers}
        rows={rows}
        onDeleteClick={onDeleteClick}
        onCreateClick={onCreateClick}
        onRowClick={onRowClick}
        onSearchClick={onSearchClick}        
      />
    </div>
  );
}

