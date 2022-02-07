import DataService from "./DataService";
import { /*schema,*/ domain } from './config';
import { PasswordSubmissionDTO, User } from "../model";
import { CLUB_FRONTEND_SESSION, Session } from "../context";
import ServiceError from "./ServiceError";

class ACLService {
  static changePassword = async (passwordSubmissionDTO: PasswordSubmissionDTO) => {   
    const content = localStorage.getItem(CLUB_FRONTEND_SESSION);
    if(content === null)
      throw new ServiceError("No session info exist in localStorage");
    const session:Session = JSON.parse(content);
    passwordSubmissionDTO = {...passwordSubmissionDTO, name: session.user?.name, token: session.token}

    return await DataService.post(
        `${domain}/auth/change-password`,
        passwordSubmissionDTO
    );
}  
  static create = async (user: User)  => {
    return await DataService.post(
      `${domain}/acl/user`,
      user
    );
  };

  static find = async (parameters:string) => {
    return await DataService.get(
      `${domain}/acl/user/${parameters}`
    );      
  };

  static update = async (user: User) => {
    return await DataService.put(
      `${domain}/acl/user/${user.id}`,
      user
    );
  };

  static remove = async (id:number) => {
    return await DataService.remove(
      `${domain}/acl/user/${id}`
    );
  }  
}

export { ACLService };
