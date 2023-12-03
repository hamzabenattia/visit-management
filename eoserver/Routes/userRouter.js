const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { authMiddleware } = require('../Middleware/authMiddleware');
const userRouter = express.Router();
const User = require('../Models/userModel');


userRouter.get(
    "/profile",
    authMiddleware,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id).select(`-password`);
      if (user) {
        res.json(
        user
        );
      } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé");
      }
    })
  );


  userRouter.put(
    "/changepassword",
    authMiddleware,
    expressAsyncHandler(async (req, res) => {
      const {oldpassword,newpassword} = req.body;
      const user = await User.findById(req.user._id);
      if (user) {
        const isMatch = await user.matchPassword(oldpassword);
        if (!isMatch) {
          return res.status(400).json({ message: "Mot de passe acctuel est incorrect" });
        }
        else
        {
        user.password = newpassword; 
        const x= await user.save();
        res.json(
        {message:"Mot de passe modifié avec succès",x}
        );
        }
      } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé");
      }
    })
  );




  



module.exports = userRouter;