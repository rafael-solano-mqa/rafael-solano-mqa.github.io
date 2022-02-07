import axios from "axios";
import { AuthService } from "./AuthService";
import ServiceError from "./ServiceError";

const appendToHeaders = (headers, key, value) => {
  const result = headers || {};

  if(value !== null)
    return {...result, [key]: value}
  return result
}

const appendAuthorization = (headers, value) => {
  headers = headers || {};

  if(value !== null)
    return appendToHeaders(headers, 'Authorization', `Bearer ${value}`)
  return headers;
}

class DataService {
  static async all(url, headers) {
    try {
      const sessionToken = await AuthService.getSessionToken();
      const result = await axios.get(url, {headers: appendAuthorization(headers, sessionToken)});
      return result.data.entity;
    } catch (error) {
      return new ServiceError(error, "Can't retrieve collection.");
    }
  }

  static async post(url, data, headers) {
    try {
      const sessionToken = await AuthService.getSessionToken();
      const result = await axios.post(url, data, {headers: appendAuthorization(headers, sessionToken)});
      return result.data;
    } catch (error) {
      return new ServiceError(error, "Can't retrieve collection.");
    }
  }

  static async put(url, data, headers) {
    try {
      const sessionToken = await AuthService.getSessionToken();
      const result = await axios.put(url, data, {headers: appendAuthorization(headers, sessionToken)});
      return result.data.entity;
    } catch (error) {
      return new ServiceError(error, "Can't update element.");
    }
  }

  static async get(url, headers) {
    try {      
      const sessionToken = await AuthService.getSessionToken();
      const result = await axios.get(url, {headers: appendAuthorization(headers, sessionToken)});
      if(typeof result.data === "string")
        return result.data;
      return result.data.entity;
    } catch (error) {
      return new ServiceError(error, "Can't retrieve element.");
    }
  }

  static async remove(url, headers) {
    const sessionToken = await AuthService.getSessionToken();
    try {
      const result = await axios.delete(url, {headers: appendAuthorization(headers, sessionToken)});
      return result.data.entity;
    } catch (error) {
      return new ServiceError(error, "Can't delete element.");
    }    
  }

  static queryString(object) {
    object = object || {};
    const string = Object.keys(object).reduce((array, key) => {
        if(Object.prototype.hasOwnProperty.call(object, key)) {
          const value = object[key];
          const type = typeof value;

          if(type === 'undefined' || value === null || (type === 'string' && value.trim().length == 0)) {
            return array;
          }
        }

        return [...array, `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`]
      },
      []
    ).join('&');
   
    return string.length === 0 ? string: '?' + string;
  }
}

export default DataService;
