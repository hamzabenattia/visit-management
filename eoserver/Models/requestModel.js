const  mongoose = require("mongoose") ;

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    site: {
      type: String,
      required: true,
      default: "Enfidha",
    },
    Local: {
      type: String,
      required: true,
      default: "Enfidha",
    },
    object: {
      type: String,
      required: true,
    },
    visitdate: {
      type: String,
      required: true,
    },
    visithour: {
      type: String,
      required: true,
    },
    personnes: [{
      fullname: { type: String, required: true },
      cin: { type: String, required: true },
    }],
    createdAt: {
      type: Date,
    },
    Status: {
      type: String,
    },
   
    traitedAt: {
      type: Date,
    },
    RefuseReason: {
      type: String,
    },
    traitedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
