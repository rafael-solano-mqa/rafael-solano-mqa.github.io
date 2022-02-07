import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "@ui5/webcomponents-react";
import { DataDateBoxBoxProperties } from "./types";
import moment from 'moment';

export function DataDateBox(props: DataDateBoxBoxProperties) {
  const inputRef:any = useRef(null);
  const [valueProp, setValueProp] = useState(false);

  useEffect(() => {
    if (valueProp) return;

    Object.defineProperty(inputRef.current, "userInput", {
      get() {
        const value = this.value.toString().trim();
        if(this.isValid(value))
            return value;

        return null;
      },

      set(_value) {
        const typeOf = typeof _value;
        switch(typeOf) {
            case "string":
                this.value = moment(_value, 'YYYY-MM-DD',true).isValid() ? _value : "";
                break;

            case "number":
                this.value = this.formatValue(new Date(+_value));
                break;

            case "object":
                this.value = _value instanceof Date ? this.formatValue(_value) : "";
                break;

            default:
                this.value = "";
        }
        
      },
    });

    if(inputRef && inputRef.current) {
      const self = inputRef.current;
      inputRef.current.reset = () => {
        self.value = "";
      };
    }
    setValueProp(true);

  }, []);
  const enhancedProps = {...props, formatPattern: "yyyy-MM-dd"}
  return <DatePicker ref={inputRef} {...enhancedProps} />;
}

