/* eslint no-unused-vars: 0 */
import { Button, Dialog } from '@ui5/webcomponents-react';
import React, { useEffect, useRef, useState } from 'react';
import { DataPictureProperties } from '.';
import './DataPicture.css';
import "@ui5/webcomponents-icons/dist/camera";
import "@ui5/webcomponents-icons/dist/picture";
import 'react-html5-camera-photo/build/css/index.css';
import Camera from 'react-html5-camera-photo';
import { createHTMLElementArray } from '../formActions/utils';

const HIDDEN_INPUT_SELECTOR="input[type='hidden']";
const EMPTY_IMAGE = "";
const VALUE_STATE_ATTR = "data-value-state";
const HIDDEN_NAME_ATTR = "data-hidden-name";

export function DataPicture (props: DataPictureProperties) {
    const className = props.className || "data-picture container";        
    const required = typeof props.required === "boolean" ? props.required : false;
    const name = props.name || "";
    const inputRef:any = useRef(null);
    const dialogRef:any = useRef(null);
    const [valueProp, setValueProp] = useState(false);
    const [dataUri, setDataUri] = useState('' /*'https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg'*/);

    const handleTakePhoto = (dataUri: string) => {
      inputRef.current.userInput = dataUri;
      dialogRef.current.close();
    }
    useEffect(() => {
        if (valueProp) return;
        inputRef.current.__valueStateMessage__ = createHTMLElementArray(inputRef.current);
        
        Object.defineProperty(inputRef.current, "valueStateMessage", {
          get() {
            return this.__valueStateMessage__ ;
          },

          set(_value) {

          }
        });

        Object.defineProperty(inputRef.current, "required", {
          get() {
            return required;
          },

          set(_value) {}
        });

        Object.defineProperty(inputRef.current, "name", {
          get() {
            return name;
          },

          set(_value) {
          }
        });

        Object.defineProperty(inputRef.current, "valueState", {
          get() {
            const hiddenInput: HTMLInputElement = this.querySelector(HIDDEN_INPUT_SELECTOR);
            return hiddenInput.getAttribute(VALUE_STATE_ATTR);
          },

          set(_value) {
              const hiddenInput: HTMLInputElement = this.querySelector(HIDDEN_INPUT_SELECTOR);
              hiddenInput.setAttribute(VALUE_STATE_ATTR, _value);
          }
        });

        Object.defineProperty(inputRef.current, "userInput", {
          get() {
            const hiddenInput: HTMLInputElement = this.querySelector(HIDDEN_INPUT_SELECTOR);
            const content = hiddenInput.value.trim();
            
            return content.length == 0 ? null : content
          },
    
          set(_value) {
            const hiddenInput: HTMLInputElement = this.querySelector(HIDDEN_INPUT_SELECTOR);
            const content = _value === undefined ? EMPTY_IMAGE : _value.toString().trim();
            setDataUri(content)
            hiddenInput.value = content;
          },
        });
    
        if(inputRef && inputRef.current) {
          const self = inputRef.current;
          inputRef.current.reset = () => {
            const hiddenInput: HTMLInputElement = self.querySelector(HIDDEN_INPUT_SELECTOR);
            hiddenInput.value = EMPTY_IMAGE;
          };
        }
        setValueProp(true);
    
      }, []);
          
      const onButtonClick = () => {
        dialogRef.current.show();
      };
    
      const handleClose = () => {
        dialogRef.current.close();
      };

    return (
        <>
            <div className={className} ref={inputRef} data-control='data-picture'>     
            {(dataUri) ? 
                <div className="row no-gap">
                    <div className='col-12 left no-gap'>
                        <img src={dataUri} className="snapshot"/>
                    </div>
                </div> :
                <></>        
            }
                <div className="row no-gap">                
                    <div className='col-12 left no-gap'>
                        <Button className='data-picture-button' icon='camera' onClick={onButtonClick}/>
                    </div>
                </div>      
                <input data-value-state="None" type="hidden" />     
            </div>
            <Dialog ref={dialogRef} footer={
                <>                    
                    <Button className="data-picture-action" onClick={handleClose}>Ok</Button>
                    <Button className="data-picture-action" onClick={handleClose}>Cancel</Button>
                </>
            }>
                <Camera onTakePhoto = { (dataUri:string) => { handleTakePhoto(dataUri); } }/>                
            </Dialog>
        </>
    )
}