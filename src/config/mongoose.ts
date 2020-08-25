import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost/restapits";

mongoose.set("useFindAndModify", false);
mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
