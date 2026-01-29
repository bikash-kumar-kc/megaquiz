import config from "../../config/config";
import { Client, Storage, ID, Permission, Role } from "appwrite";

class StorageServices {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.bucket = new Storage(this.client);
  }

  creatingFile = async ({ file, userId }) => {
    try {
      return await this.bucket.createFile({
        bucketId: config.appwriteBucketid,
        fileId: userId,
        file: file,
        permissions: [Permission.read(Role.any())],
      });
    } catch (error) {
      console.log("problem in creating file :: " + error);
      throw Error(error);
    }
  };

  getFile =  (fileId) => {
    try {
      const data = this.bucket.getFileView({
        bucketId: config.appwriteBucketid,
        fileId: fileId,
      });
      return data;
    } catch (error) {
      console.log("error in getting file" + error);
      throw Error(error);
    }
  };
}

const storage = new StorageServices();
export default storage;
