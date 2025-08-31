// // scripts/uploadProducts.js
// import { Client, Databases, Storage, ID } from "appwrite";
// import products from "../src/appwrite/products.js";

// class Service {
//   client = new Client();
//   databases;
//   bucket;

//   constructor() {
//     this.client
//       .setEndpoint("https://fra.cloud.appwrite.io/v1") // ✅ your endpoint
//       .setProject("68a7612f00040ce82ae3");              // ✅ your projectId
//     this.databases = new Databases(this.client);
//     this.bucket = new Storage(this.client);
//   }

//   create = async ({ title, price, image, description, sizes, category, color, stock, subcategory }) => {
//     try {
//       return await this.databases.createDocument(
//         "68a76193000c3d756e1e", // databaseId
//         "68a76283001ace3ce12a", // collectionId
//         ID.unique(),
//         { title, price, image, description, sizes, category, color, stock, subcategory ,id:ID.unique()}
//       );
//     } catch (error) {
//       console.log("❌ Appwrite Service :: createProduct :: error", error.message);
//       return false;
//     }
//   };
// }

// // ✅ Make an instance of the Service
// const service = new Service();

// const uploadProducts = async () => {
//   for (let product of products) {
//     try {
//       const res = await service.create(product); // ✅ call from instance
//       console.log("✅ Uploaded:", res.$id);
//     } catch (error) {
//       console.error("❌ Error uploading:", error.message);
//     }
//   }
// };

// uploadProducts();
