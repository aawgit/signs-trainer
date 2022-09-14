import Image from "../models/Image";
export const deleteImage = () => {
  // TODO: Review this
  //   const publicId = "demo/jt1y0p5ezv2mtcpj79ic";
  //   cloudinary.uploader.destroy(publicId, function (result) {
  //     console.log(result);
  //   });
};

export const createImage = async (req) => {
  return await Image.create({
    expected: req.body.expected,
    current: req.body.current,
    imageLocation: req.file.secure_url
  });
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
