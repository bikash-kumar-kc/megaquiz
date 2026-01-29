import config from "../../config/config";
import { Client, ID, Query, TablesDB } from "appwrite";

class DatabaseServices {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.database = new TablesDB(this.client);
  }

  creatingRecord = async ({
    gamePlayed,
    correctAttempt,
    wrongAttempt,
    unattempt,
    userId,
    questionAttempt,
  }) => {
    try {
      return this.database.createRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteTableid,
        rowId: userId,
        data: {
          gamePlayed,
          correctAttempt,
          wrongAttempt,
          unattempt,
          questionAttempt,
        },
      });
    } catch (error) {
      console.log("we got error in creating record :: " + error);
      throw Error(error);
    }
  };

  updatingrecord = async (
    
    {userId, gamePlayed, correctAttempt, wrongAttempt,questionAttempt, unattempt }
  ) => {

    try {
      return await this.database.updateRow({
        databaseId:config.appwriteDatabaseid,
        tableId:config.appwriteTableid,
        rowId:userId,
        data:{
         gamePlayed: gamePlayed,
         correctAttempt: correctAttempt,
         wrongAttempt: wrongAttempt,
         unattempt: unattempt,
         questionAttempt: questionAttempt
        }
      })
    } catch (error) {
      console.log("we got error in updating record :: " + error);
      throw Error(error);
    }
  };

  gettingaRecord = async (userId) => {
    try {
      return await this.database.getRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteTableid,
        rowId: userId,
      });
    } catch (error) {
      console.log("we got error in getting post :: " + error);
      throw Error(error);
    }
  };
}

const databaseservices = new DatabaseServices();
export default databaseservices;
