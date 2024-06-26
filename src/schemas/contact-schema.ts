import joi from "joi";

const contactSchema = joi.object({
  fullname: joi.string().required(),
  email: joi.string().optional(),
  picture: joi.string().optional(),
  phones: joi.array().items().min(1).max(3).required()
});

export default contactSchema;