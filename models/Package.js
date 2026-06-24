const { default: mongoose } = require("mongoose");

const IconsDetailsSchema = new mongoose.Schema({
  iconName: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
  },
});

const PackageSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    maxLength: 300,
    trim: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },

  icons: {
    type: [IconsDetailsSchema],
    default: [],
  },
  theme: {
    required: true,
    type: String,
  },
});

export default mongoose.models.Package ||
  mongoose.model("Package", PackageSchema);
