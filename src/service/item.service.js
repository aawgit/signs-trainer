import Meme from "../models/Meme";
export const deleteImage = () => {
  // TODO: Review this
  //   const publicId = "demo/jt1y0p5ezv2mtcpj79ic";
  //   cloudinary.uploader.destroy(publicId, function (result) {
  //     console.log(result);
  //   });
};

export const createItem = async (req) => {
  return await Meme.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.userId,
    imageLocation: req.file.secure_url,
    texts: req.body.texts,
    font:req.body.font
  });
};

export const getItem = async (id = null) => {
  if (id)
    return await Meme.findById(id).exec();
  else
    return await Meme.aggregate(
      [ { $sample: { size: 6 } } ]
   )
};

export const deleteItem = async (id) => {
  await Meme.findByIdAndRemove(id);
};

export const updateItem = async (conditions) => {
  return await Meme.findOneAndUpdate(conditions);
};

export const searchItem = async (searchString) => {
  const searchResult = await Meme.find({$text: {$search: searchString}})
  .limit(5)
  .exec();
  return searchResult
}
