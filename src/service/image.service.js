import { v2 as cloudinary } from 'cloudinary'
import { logger } from "../utils/logger"
import config from "../config";
import Image from "../models/Image";


cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

export const deleteImage = () => {
  // TODO: Review this
  //   const publicId = "demo/jt1y0p5ezv2mtcpj79ic";
  //   cloudinary.uploader.destroy(publicId, function (result) {
  //     console.log(result);
  //   });
};

export const createImage = async (expected, current, file) => {
  const result = await cloudinary.uploader.upload(file, { folder: 'signs' })
  const image = await Image.create({
    expected,
    current,
    imageLocation: result.secure_url
  });
  logger.info(`Successfully uploaded the image. ${image._id}`)
  return image
};

export const getItem = async (id = null) => {
  if (id)
    return await Image.findById(id).exec();
  else
    return await Image.aggregate(
      [{ $sample: { size: 6 } }]
    )
};

export const deleteItem = async (id) => {
  await Image.findByIdAndRemove(id);
};

export const updateItem = async (conditions) => {
  return await Image.findOneAndUpdate(conditions);
};

export const searchImage = async (searchString) => {
  const searchResult = await Image.find({ $text: { $search: searchString } })
    .limit(5)
    .exec();
  return searchResult
}
