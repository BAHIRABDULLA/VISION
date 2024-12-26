import IUser from "../../interfaces/IUser";
import { IUserRepository } from "../interface/IUser.repository";
import BaseRepository from "./base.repository";

export class UserRepository  extends BaseRepository<IUser> implements IUserRepository {
 
}