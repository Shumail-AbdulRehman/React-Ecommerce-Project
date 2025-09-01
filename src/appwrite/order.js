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

  
//   async updateProduct(id, { title, description, image, price, category, sizes }) {
//     try {
//       return await this.databases.updateDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         id,
//         { title, description, image, price, category, sizes }
//       );
//     } catch (error) {
//       console.log("Appwrite Service :: updateProduct :: error", error);
//       return false;
//     }
//   }

//   async deleteProduct(id) {
//     try {
//       await this.databases.deleteDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         id
//       );
//       return true;
//     } catch (error) {
//       console.log("Appwrite Service :: deleteProduct :: error", error);
//       return false;
//     }
//   }

  

//   async getProductsByCategoryAndSubCategory(category,subcategory) {
//     try {
//       return await this.databases.listDocuments(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         [Query.equal("category", category),
//         Query.equal("subcategory", subcategory)]

//       );
//     } catch (error) {
//       console.log("Appwrite Service :: getProductsByCategory :: error", error);
//       return false;
//     }
//   }


  async createOrder({ userid, total,ordertype,status,paymentstatus,orderitems=[] }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdOrders,
        ID.unique(),
        { total,ordertype,status,paymentstatus,userid,orderitems }
      );
    } catch (error) {
      console.log("Appwrite Service :: createProduct :: error", error);
      return false;
    }
  }



  async getOrdersByOrderType(ordertype) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdOrders,
        [Query.equal("ordertype", ordertype)]

      );
    } catch (error) {
      console.log("Appwrite Service :: ordertype :: error", error);
      return false;
    }
  }


  async getOrdersByStatus(status) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdOrders,
        [Query.equal("status", status)]

      );
    } catch (error) {
      console.log("Appwrite Service :: status :: error", error);
      return false;
    }
  }

  


  async getOrdersByPaymentStatus(paymentstatus) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdOrders,
        [Query.equal("paymentstatus", paymentstatus)]

      );
    } catch (error) {
      console.log("Appwrite Service :: paymentstatus :: error", error);
      return false;
    }
  }

  

  async getOrders() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdOrders
      );
    } catch (error) {
      console.log("Appwrite Service :: getOrders :: error", error);
      return false;
    }
  }

  async getOrder(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdOrders,
        id
      );
    } catch (error) {
      console.log("Appwrite Service :: getOrder :: error", error);
      return false;
    }
  }


  

   

    

}

const orderService = new Service()
export default orderService
