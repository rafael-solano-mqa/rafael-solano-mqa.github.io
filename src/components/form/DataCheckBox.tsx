import React, { useEffect, useRef, useState } from "react";
import { CheckBox } from "@ui5/webcomponents-react";
import { DataCheckBoxProperties } from "./types";

export function DataCheckBox(props: DataCheckBoxProperties) {
  const ref:any = useRef(null);
  const [valueProp, setValueProp] = useState(false);

  useEffect(() => {
    if (valueProp) return;

    Object.defineProperty(ref.current, "userInput", {
      get() {
        return this.checked;
      },

      set(_value) {
        this.checked = typeof _value === "boolean" ? _value : false;
      },
    });

    if(ref && ref.current) {
      const self = ref.current;
      ref.current.reset = () => {
        self.useInput = false;
      };
    }
    setValueProp(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <CheckBox ref={ref} {...props} />;
}
