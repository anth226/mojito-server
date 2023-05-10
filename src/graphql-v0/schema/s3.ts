import aws from "aws-sdk";
import path from "path";
import { FILE_KEYS } from "../../constants";
import dotenv from "dotenv";

dotenv.config();

const s3 = new aws.S3({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ID,
});

const singleFileUpload = async (
  file:
    | PromiseLike<{ filename: any; mimetype: any; createReadStream: any }>
    | { filename: any; mimetype: any; createReadStream: any },
  key_name: string,
  id: string
) => {
  const { filename, mimetype, createReadStream } = await file;
  const fileStream = createReadStream();
  let Key;

  // * NAME OF THE FILE IN YOUR S3 BUCKET WILL BE THE DATE IN MS PLUS THE EXTENSION NAME
  if (mimetype === "image/svg+xml") {
    if (id) {
      Key = `svg/${key_name}/${id}/${
        new Date().getTime().toString() + path.extname(filename)
      }`;
    } else {
      Key = `svg/${key_name}/${
        new Date().getTime().toString() + path.extname(filename)
      }`;
    }
  } else {
    if (key_name === FILE_KEYS.PROFILE_PICS) {
      Key = `user/${key_name}/${id}/${
        new Date().getTime().toString() + path.extname(filename)
      }`;
    }
  }

  const uploadParams: any = {
    Bucket: process.env.S3_BUCKET,
    Key,
    Body: fileStream,
  };
  const result = await s3.upload(uploadParams).promise();
  // * SAVE THE NAME OF THE FILE IN YOUR BICKET AS THE KEY IN YOUR DATABASE TO RETRIEVE FOR LATER
  return result.Key;
};

// const deleteSingleImage = async (key: string) => {
//   const params = {
//     Bucket: process.env.S3_BUCKET,
//     Key: key,
//   };

//   s3.deleteObject(params, (error: any, data: any) => {
//     if (error) {
//       throw new ApolloError("Something went wrong");
//     }
//     return "deleted Successfully";
//   });
// };

export { s3, singleFileUpload };
