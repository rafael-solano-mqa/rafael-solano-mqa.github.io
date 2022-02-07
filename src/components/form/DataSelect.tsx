import React, { useEffect, useState, useRef } from "react";
import DataService from "../../services/DataService";
import { Option } from "@ui5/webcomponents-react";
import { Select } from "@ui5/webcomponents-react";
import { DataSelectProperties } from "./types";

export function DataSelect(props: DataSelectProperties) {
  const selectProps = { ...props };
  const text = selectProps.text;
  const value = selectProps.value;
  const [rows, setRows] = useState<Array<any>>([]);
  const [valueProp, setValueProp] = useState(false);

  const selectRef: any = useRef(null);

  const defineValueProperty = (rows: Array<any>) => {
    if (valueProp) return;

    Object.defineProperty(selectRef.current, "userInput", {
      get() {
        const _value = rows[this._selectedIndex][value];
        return _value;
      },

      set(_value) {
        const nodeList = this.querySelectorAll("ui5-option");
        [...nodeList].forEach((option) => {
          option.removeAttribute("selected");
        });

        const index = rows.findIndex((row) => row[value].toString() === _value && _value.toString());
        nodeList[index].setAttribute("selected", "true");
      },
    });

    if (selectRef && selectRef.current) {
      const self: any = selectRef.current;
      selectRef.current.reset = () => {
        self.userInput = rows[0][value];
      };
    }
    setValueProp(true);
  };
  useEffect(() => {
    const provider = props.provider;
    if (typeof provider === "string") {
      (async (url) => {
        const response: any = await DataService.all(url);
        setRows(response);
        defineValueProperty(response);
      })(props.provider);
    } else if (typeof provider === "function") {
      (async (fn) => {
        const result = await fn();
        setRows(result);
        defineValueProperty(result);
      })(props.provider);
    } else if (typeof provider === "object" && provider instanceof Array) {
      setRows(provider);
      defineValueProperty(provider);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  delete selectProps.provider;
  delete selectProps.text;
  delete selectProps.value;
  selectProps.ref = selectRef;

  return (
    <Select {...selectProps}>
      {rows.map((row, index) => (
        <Option
          value={row[value]}
          key={index}
          selected={index === 0 ? true : false}
        >
          {row[text]}
        </Option>
      ))}
    </Select>
  );
}

