/*eslint no-prototype-builtins: 0*/
import { NamedTuple } from "../../model";
import { ControlStateProvider } from "../formActions";

export const setReadonlyWithId: ControlStateProvider = (item: any, name: string, data: NamedTuple<string, any>) => {
	item.readonly = data.id !== undefined;
	item.userInput = data[name];
}

export const objectToQueryString = (obj: NamedTuple<string, any>) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}