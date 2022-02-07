import React, { useEffect, useRef, useState } from "react";
import { Input } from "@ui5/webcomponents-react";
import { DataTextBoxProperties } from "./types";

export function DataTextBox(props: DataTextBoxProperties) {
  const inputRef:any = useRef(null);
  const [valueProp, setValueProp] = useState(false);

  useEffect(() => {
    if (valueProp) return;

    Object.defineProperty(inputRef.current, "userInput", {
      get() {
        if (this.getAttribute("type") === "Number")
          return parseFloat(this.value);
        return this.value;
      },

      set(_value) {
        this.value = _value;
      },
    });

    if(inputRef && inputRef.current) {
      const self = inputRef.current;
      inputRef.current.reset = () => {
        if (self.getAttribute("type") === "Number") self.value = 0;
        else self.value = "";
      };
    }
    setValueProp(true);

  }, []);
  return <Input ref={inputRef} {...props} />;
}

