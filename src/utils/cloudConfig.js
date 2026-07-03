import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) {
//             return null;
//         }
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         console.log("File uploaded successfully", response.url);
//         return response;
//     } catch (error) {
//         fs.unlinkSync(localFilePath);//remove locally saved file
//         return null
//     }
// }

// export { uploadOnCloudinary }


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("file upload response: ", response)

        return response;

    } catch (error) {
        console.log("file upload error: ", error)
        return null;

    } finally {
        if (localFilePath) {
            try {
                await fs.promises.unlink(localFilePath);
                console.log("Deleted");
            } catch (err) {
                console.error(err);
            }
        }
    }
};


export { uploadOnCloudinary }