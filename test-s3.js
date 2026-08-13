require("dotenv").config();

const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = require("./config/s3");

const testS3 = async () => {
  const bucket = process.env.AWS_S3_BUCKET;

  const key = "applications/test/s3-connection-test.txt";

  try {
    // Upload
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: "Innovise Careers S3 connection test",
        ContentType: "text/plain",
      }),
    );

    console.log("✅ S3 upload successful");
    console.log("Object:", key);

    // Read
    await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    console.log("✅ S3 read permission successful");

    // Delete
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    console.log("✅ S3 delete permission successful");

    console.log("🎉 S3 configuration is working correctly");
  } catch (error) {
    console.error("❌ S3 test failed");
    console.error("Error:", error.message);
    console.error("Error Name:", error.name);
  }
};

testS3();
