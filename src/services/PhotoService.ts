import DataService from "./DataService";
import { /*schema,*/ domain } from './config';
import { PhotoSubmissionDTO } from "../model/PhotoSubmissionDTO";

const BASE_64_TAG = "data:image/png;base64,";

class PhotoService {

  static removebase64Tag = (rawBytes: string):string  => {
    if(rawBytes && rawBytes.indexOf(BASE_64_TAG) > -1){
      return rawBytes.substring(BASE_64_TAG.length);
    }

    return rawBytes;
  };

  static addBase64Tag = (rawBytes: string):string => {
    if(rawBytes && rawBytes.indexOf(BASE_64_TAG) == -1){
      return BASE_64_TAG + rawBytes;
    }

    return rawBytes;
  };

  static create = async (photo: PhotoSubmissionDTO)  => {
    const body = {...photo, rawBytes: PhotoService.removebase64Tag(photo.rawBytes)};
    return await DataService.post(
      `${domain}/album/photo`,
      body
    );
  };

  static find = async (parameters:string) => {
    const response =  await DataService.get(
      `${domain}/album/photo/${parameters}`
    );      

    return {...response, rawBytes: PhotoService.addBase64Tag(response.rawBytes)}
  };

  static update = async (photo: PhotoSubmissionDTO) => {
    return Promise.resolve({...photo, rawBytes: PhotoService.removebase64Tag(photo.rawBytes)});
  };

  static remove = async (id:number) => {
    return await DataService.remove(
      `${domain}/album/photo/${id}`
    );
  }  
}

export { PhotoService };
