const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://test1:1r4WTqcHr7thmmUn@cluster0.ez75xfb.mongodb.net/chummapay?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
