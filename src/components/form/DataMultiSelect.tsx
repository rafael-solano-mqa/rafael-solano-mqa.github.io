import React, { useEffect, useState, useRef } from "react";
import DataService from "../../services/DataService";
import { MultiComboBoxItem } from "@ui5/webcomponents-react";
import { MultiComboBox } from "@ui5/webcomponents-react";
import { DataSelectProperties } from ".";

const defaultPropertyMatcher = (value?: any, item?: any) => value === item;

const DataMultiSelect:React.FC<DataSelectProperties> = (props: DataSelectProperties) => {
  const selectProps = { ...props };
  const text = selectProps.text;
  const value = selectProps.value;
  const [rows, setRows] = useState<any[]>([]);
  const [valueProp, setValueProp] = useState(false);
  const matcher = selectProps.matcher || defaultPropertyMatcher;
  const selectRef = useRef(null);

  const defineValueProperty = (rows: Array<any>) => {
    if (valueProp) return;

    Object.defineProperty(selectRef.current, "name", {
      get() {
        return props.name;
      },
    });

    Object.defineProperty(selectRef.current, "userInput", {
      get() {        
        const items_ = this.items;
        const items:any[] = items_;        
        const indexArray = items
          .reduce(
            (array: number[], item:any, index: number) => {    
              return !(item && item.selected) ?  array: [...array, index]
            },
            []
          );

          debugger;
          return indexArray.map((index:number) =>{
            debugger;
            return rows[index][value];
          });
      },

      set(_value) {
        const _value_:any[] = _value;
        const items: any[] = this.items;
        const indexes = _value_.reduce((array, item) => {
          const index = rows.findIndex((row) => matcher(row[value], item));
          if (index > -1) array.push(index);
          return array;
        }, []);

        items.forEach((option) => {
          option.selected = false;
        });

        indexes.forEach((index:number) => (this.items[index].selected = true));
      },
    });

    const current:any = selectRef?.current;
    const self:any = this;
    
    if(current && self) {      
      const items:any[] = self.items;
      current.reset = () => {
        items.forEach((option) => {
          option.selected = false;
        }
      )};
    }    
    setValueProp(true);
  };

  useEffect(() => {
    const provider = props.provider;
    if (typeof provider === "string") {
      (async (url) => {
        const response = await DataService.all(url);
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
      const provider_: any[] = provider;
      setRows(provider_);
      defineValueProperty(provider_);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  delete selectProps.provider;
  delete selectProps.text;
  delete selectProps.value;
  selectProps.ref = selectRef;

  return (
    <MultiComboBox {...selectProps}>
      {rows.map((row, index) => (
        <MultiComboBoxItem key={index} text={row[text]}>
          {row[text]}
        </MultiComboBoxItem>
      ))}
    </MultiComboBox>
  );
}
export default DataMultiSelect;
