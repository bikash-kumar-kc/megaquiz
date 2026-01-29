import config from "../../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthenServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setProject(config.appwriteProjectid)
      .setEndpoint(config.appwriteUrl);
    this.account = new Account(this.client);
  }

  createUser = async ({ email, password, name }) => {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      return user;
    } catch (error) {
      console.log("we got error in creating user" + error);
      throw Error(error);
    }
  };

  loginUser = async ({ email, password }) => {
    try {
      const data = await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      return data;
    } catch (error) {
      console.log("we got error in logging an user " + error);
      throw Error(error);
    }
  };

  getCurrentUser = async () => {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("we got error in getting user ::  " + error);
      throw Error(error);
    }
  };

  logoutUser = async () => {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("we got error in loggin out user ::  " + error);
      throw Error(error);
    }
  };

  deleteCurrentSession = async () => {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("error in deleting session" + error);
    }
  };
}

const authenservice = new AuthenServices();

export default authenservice;
