import React, { useEffect, useRef, useState } from "react";
import { StepInput } from "@ui5/webcomponents-react";
import { DataStepInputBoxProperties } from "./types";

export function DataStepInput(props: DataStepInputBoxProperties) {
  const inputRef:any = useRef(null);
  const [valueProp, setValueProp] = useState(false);

  useEffect(() => {
    if (valueProp) return;

    Object.defineProperty(inputRef.current, "userInput", {
      get() {          
        return this.value;
      },

      set(_value) {
        this.value = _value;
      },
    });

    if(inputRef && inputRef.current) {
      const self = inputRef.current;
      inputRef.current.reset = () => {
        self.value = 0;
      };
    }
    setValueProp(true);

  }, []);
  return <StepInput ref={inputRef} {...props} />;
}

