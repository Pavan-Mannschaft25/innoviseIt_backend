// // // // const {
// // // //   PutObjectCommand,
// // // //   DeleteObjectCommand,
// // // //   GetObjectCommand,
// // // // } = require("@aws-sdk/client-s3");

// // // // const s3 = require("../config/s3");

// // // // const BUCKET = process.env.AWS_S3_BUCKET;

// // // // /**
// // // //  * Upload file to S3
// // // //  */
// // // // const uploadFile = async ({ buffer, key, contentType }) => {
// // // //   const command = new PutObjectCommand({
// // // //     Bucket: BUCKET,
// // // //     Key: key,
// // // //     Body: buffer,
// // // //     ContentType: contentType,
// // // //   });

// // // //   await s3.send(command);

// // // //   return key;
// // // // };

// // // // /**
// // // //  * Delete file from S3
// // // //  */
// // // // const deleteFile = async (key) => {
// // // //   if (!key) {
// // // //     return;
// // // //   }

// // // //   const command = new DeleteObjectCommand({
// // // //     Bucket: BUCKET,
// // // //     Key: key,
// // // //   });

// // // //   await s3.send(command);
// // // // };

// // // // module.exports = {
// // // //   uploadFile,
// // // //   deleteFile,
// // // // };

// // // const {
// // //   PutObjectCommand,
// // //   DeleteObjectCommand,
// // //   GetObjectCommand,
// // // } = require("@aws-sdk/client-s3");

// // // const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// // // const s3 = require("../config/s3");

// // // const BUCKET = process.env.AWS_S3_BUCKET;

// // // /**
// // //  * Upload file to S3
// // //  */
// // // const uploadFile = async ({ buffer, key, contentType }) => {
// // //   const command = new PutObjectCommand({
// // //     Bucket: BUCKET,
// // //     Key: key,
// // //     Body: buffer,
// // //     ContentType: contentType,
// // //   });

// // //   await s3.send(command);

// // //   return key;
// // // };

// // // /**
// // //  * Generate temporary private URL
// // //  */
// // // const getSignedUrlForFile = async ({ key, expiresIn = 300 }) => {
// // //   if (!key) {
// // //     throw new Error("S3 file key is required");
// // //   }

// // //   const command = new GetObjectCommand({
// // //     Bucket: BUCKET,
// // //     Key: key,
// // //   });

// // //   const url = await getSignedUrl(s3, command, {
// // //     expiresIn,
// // //   });

// // //   return url;
// // // };

// // // /**
// // //  * Delete file from S3
// // //  */
// // // const deleteFile = async (key) => {
// // //   if (!key) {
// // //     return;
// // //   }

// // //   const command = new DeleteObjectCommand({
// // //     Bucket: BUCKET,
// // //     Key: key,
// // //   });

// // //   await s3.send(command);
// // // };

// // // module.exports = {
// // //   uploadFile,
// // //   getSignedUrlForFile,
// // //   deleteFile,
// // // };

// // const {
// //   S3Client,
// //   PutObjectCommand,
// //   DeleteObjectCommand,
// //   GetObjectCommand,
// // } = require("@aws-sdk/client-s3");

// // const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// // const s3Client = new S3Client({
// //   region: process.env.AWS_REGION,

// //   credentials: {
// //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,

// //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   },
// // });

// // const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// // /**
// //  * Upload file
// //  */
// // const uploadFile = async ({ buffer, key, contentType }) => {
// //   const command = new PutObjectCommand({
// //     Bucket: BUCKET_NAME,
// //     Key: key,
// //     Body: buffer,
// //     ContentType: contentType,
// //   });

// //   await s3Client.send(command);
// // };

// // /**
// //  * Generate signed URL
// //  */
// // const getSignedUrlForFile = async ({ key, expiresIn = 300 }) => {
// //   if (!key) {
// //     throw new Error("S3 object key is required");
// //   }

// //   const command = new GetObjectCommand({
// //     Bucket: BUCKET_NAME,
// //     Key: key,
// //   });

// //   const url = await getSignedUrl(s3Client, command, {
// //     expiresIn,
// //   });

// //   return url;
// // };

// // /**
// //  * Delete file
// //  */
// // const deleteFile = async (key) => {
// //   if (!key) return;

// //   const command = new DeleteObjectCommand({
// //     Bucket: BUCKET_NAME,
// //     Key: key,
// //   });

// //   await s3Client.send(command);
// // };

// // module.exports = {
// //   uploadFile,
// //   getSignedUrlForFile,
// //   deleteFile,
// // };

// const {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
//   DeleteObjectCommand,
// } = require("@aws-sdk/client-s3");

// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// const ApiError = require("../utils/ApiError");

// /*
// |--------------------------------------------------------------------------
// | AWS CONFIG
// |--------------------------------------------------------------------------
// */

// const AWS_REGION = process.env.AWS_REGION || "ap-south-1";

// const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";

// const s3Client = new S3Client({
//   region: AWS_REGION,

//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// /*
// |--------------------------------------------------------------------------
// | VALIDATE S3 CONFIG
// |--------------------------------------------------------------------------
// */

// const validateS3Config = () => {
//   if (!AWS_REGION) {
//     throw new ApiError(500, "AWS_REGION is not configured");
//   }

//   if (!AWS_S3_BUCKET_NAME) {
//     throw new ApiError(500, "AWS_S3_BUCKET_NAME is not configured");
//   }

//   if (!process.env.AWS_ACCESS_KEY_ID) {
//     throw new ApiError(500, "AWS_ACCESS_KEY_ID is not configured");
//   }

//   if (!process.env.AWS_SECRET_ACCESS_KEY) {
//     throw new ApiError(500, "AWS_SECRET_ACCESS_KEY is not configured");
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | UPLOAD FILE
// |--------------------------------------------------------------------------
// */

// const uploadFile = async ({ key, body, contentType }) => {
//   try {
//     validateS3Config();

//     const command = new PutObjectCommand({
//       Bucket: AWS_S3_BUCKET_NAME,
//       Key: key,
//       Body: body,
//       ContentType: contentType,
//     });

//     await s3Client.send(command);

//     return {
//       bucket: AWS_S3_BUCKET_NAME,
//       key,
//     };
//   } catch (error) {
//     console.error("S3 Upload Error:", error);

//     throw new ApiError(500, error.message || "Failed to upload file");
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | GENERATE SIGNED URL
// |--------------------------------------------------------------------------
// */

// const getSignedUrlForFile = async (key, expiresIn = 3600) => {
//   try {
//     validateS3Config();

//     if (!key) {
//       throw new ApiError(400, "S3 file key is required");
//     }

//     const command = new GetObjectCommand({
//       Bucket: AWS_S3_BUCKET_NAME,
//       Key: key,
//     });

//     const url = await getSignedUrl(s3Client, command, {
//       expiresIn,
//     });

//     return url;
//   } catch (error) {
//     console.error("Generate S3 Signed URL Error:", error);

//     if (error instanceof ApiError) {
//       throw error;
//     }

//     throw new ApiError(500, error.message || "Failed to generate signed URL");
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | DELETE FILE
// |--------------------------------------------------------------------------
// */

// const deleteFile = async (key) => {
//   try {
//     validateS3Config();

//     if (!key) {
//       throw new ApiError(400, "S3 file key is required");
//     }

//     const command = new DeleteObjectCommand({
//       Bucket: AWS_S3_BUCKET_NAME,
//       Key: key,
//     });

//     await s3Client.send(command);

//     return true;
//   } catch (error) {
//     console.error("S3 Delete Error:", error);

//     throw new ApiError(500, error.message || "Failed to delete file");
//   }
// };

// module.exports = {
//   uploadFile,
//   getSignedUrlForFile,
//   deleteFile,
// };

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const ApiError = require("../utils/ApiError");

/*
|--------------------------------------------------------------------------
| AWS CONFIG
|--------------------------------------------------------------------------
*/

const AWS_REGION = process.env.AWS_REGION || "ap-south-1";

// Support both names, but prefer AWS_S3_BUCKET_NAME
const AWS_S3_BUCKET_NAME =
  process.env.AWS_S3_BUCKET_NAME || process.env.AWS_S3_BUCKET || "";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";

/*
|--------------------------------------------------------------------------
| S3 CLIENT
|--------------------------------------------------------------------------
*/

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

/*
|--------------------------------------------------------------------------
| VALIDATE S3 CONFIG
|--------------------------------------------------------------------------
*/

const validateS3Config = () => {
  if (!AWS_REGION) {
    throw new ApiError(500, "AWS_REGION is not configured");
  }

  if (!AWS_S3_BUCKET_NAME) {
    throw new ApiError(500, "AWS_S3_BUCKET_NAME is not configured");
  }

  if (!AWS_ACCESS_KEY_ID) {
    throw new ApiError(500, "AWS_ACCESS_KEY_ID is not configured");
  }

  if (!AWS_SECRET_ACCESS_KEY) {
    throw new ApiError(500, "AWS_SECRET_ACCESS_KEY is not configured");
  }
};

/*
|--------------------------------------------------------------------------
| UPLOAD FILE
|--------------------------------------------------------------------------
*/

const uploadFile = async ({ key, body, buffer, contentType }) => {
  try {
    validateS3Config();

    if (!key) {
      throw new ApiError(400, "S3 file key is required");
    }

    // Support both body and buffer
    const fileBody = body || buffer;

    if (!fileBody) {
      throw new ApiError(400, "File body is required");
    }

    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
      Body: fileBody,
      ContentType: contentType || "application/octet-stream",
    });

    await s3Client.send(command);

    console.log("✅ File uploaded to S3");
    console.log("Bucket:", AWS_S3_BUCKET_NAME);
    console.log("Key:", key);

    return {
      bucket: AWS_S3_BUCKET_NAME,
      key,
    };
  } catch (error) {
    console.error("❌ S3 Upload Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message || "Failed to upload file");
  }
};

/*
|--------------------------------------------------------------------------
| GENERATE SIGNED URL
|--------------------------------------------------------------------------
*/

const getSignedUrlForFile = async (key, expiresIn = 3600) => {
  try {
    validateS3Config();

    if (!key) {
      throw new ApiError(400, "S3 file key is required");
    }

    const command = new GetObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn,
    });

    console.log("✅ S3 Signed URL generated");
    console.log("Bucket:", AWS_S3_BUCKET_NAME);
    console.log("Key:", key);

    return url;
  } catch (error) {
    console.error("❌ Generate S3 Signed URL Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message || "Failed to generate signed URL");
  }
};

/*
|--------------------------------------------------------------------------
| DELETE FILE
|--------------------------------------------------------------------------
*/

const deleteFile = async (key) => {
  try {
    validateS3Config();

    if (!key) {
      throw new ApiError(400, "S3 file key is required");
    }

    const command = new DeleteObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);

    console.log("✅ File deleted from S3");
    console.log("Bucket:", AWS_S3_BUCKET_NAME);
    console.log("Key:", key);

    return true;
  } catch (error) {
    console.error("❌ S3 Delete Error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message || "Failed to delete file");
  }
};

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

module.exports = {
  uploadFile,
  getSignedUrlForFile,
  deleteFile,
};
