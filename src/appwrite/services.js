import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createProduct({ title, price, image, description, sizes, category,color,stock,subcategory }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { title, price, image, description, sizes, category,color,stock,subcategory }
      );
    } catch (error) {
      console.log("Appwrite Service :: createProduct :: error", error);
      return false;
    }
  }

  async updateProduct(id, { title, description, image, price, category, sizes }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        { title, description, image, price, category, sizes }
      );
    } catch (error) {
      console.log("Appwrite Service :: updateProduct :: error", error);
      return false;
    }
  }

  async deleteProduct(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteProduct :: error", error);
      return false;
    }
  }

  async getProduct(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite Service :: getProduct :: error", error);
      return false;
    }
  }

  async getProductsByCategoryAndSubCategory(category,subcategory) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("category", category),
        Query.equal("subcategory", subcategory)]

      );
    } catch (error) {
      console.log("Appwrite Service :: getProductsByCategory :: error", error);
      return false;
    }
  }

  async getProductsByCategory(category,subcategory) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("category", category)]

      );
    } catch (error) {
      console.log("Appwrite Service :: getProductsByCategory :: error", error);
      return false;
    }
  }

  async getProducts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("Appwrite Service :: getProductsByCategory :: error", error);
      return false;
    }
  }


  async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFileView(fileId) {
  return this.bucket
    .getFileView(conf.appwriteBucketId, fileId)
    .toString(); // ensure string
}

}

const userService = new Service()
export default userService
