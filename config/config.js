const config={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectid:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteTableid:String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwriteBucketid:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteDatabaseid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID)
};  


export default config;