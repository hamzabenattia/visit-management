const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const {
  adminMiddleware,
  authMiddleware,
} = require("../Middleware/authMiddleware");
const adminRouter = express.Router();
const User = require("../Models/userModel");
const generator = require("generate-password");
const sendEmail = require("../utils/sendEmail");
const Request = require("../Models/requestModel");
const moment = require("moment")




// Add new user
adminRouter.post(
  "/users/add",
  authMiddleware,
  adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    const { firstname, lastname, cin, email, phonenum, socite, sociteAdress,isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const user = await User.create({
      firstname,
      cin,
      socite,
      lastname,
      phonenum,
      email,
      password,
      sociteAdress,
      isAdmin
    });

    if (user) {
      try {
        await sendEmail({
          email: email,
          subject: "Information sur le compte:",
          message: `Les informations de votre compte sont: <br> Email : ${email} <br> Mot de Passe : ${password}`,
        });
      } catch (error) {
        console.log(error);
      }

      res.status(201).json({
        message: "Client ajouté avec succès",
      });
    } else {
      res.status(400).json({ message: "Erreur lors de l'ajout d'un utilisateur" });
    }
  })
);


// Get User by ID


adminRouter.get(
  "/users/:id",authMiddleware,adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Utilisateur non trouvé");
    }
  })
);




// Delete User

adminRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      user.isActive=!user.isActive;

       user.save();

      res.json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  })
);



// Edit user by admin

adminRouter.put(
  "/users/:id",authMiddleware,adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    const { firstname,lastname,cin, email,phonenum,socite,sociteAdress,isAdmin } = req.body;
    
  
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.cin = cin || user.cin;
    user.email = email || user.email;
    user.phonenum = phonenum || user.phonenum;
    user.socite = socite || user.socite;
    user.isAdmin = isAdmin || user.isAdmin;
    user.sociteAdress = sociteAdress || user.sociteAdress;



    const updateduser = await user.save();
    res.json(updateduser);
  }
   
    else {
      res.status(404);
      throw new Error("Utilisateur non trouvé");
    }
  })
);



// GET ALL USER ADMIN
adminRouter.get(
  "/users/",
  authMiddleware,
  adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

///////////////////////////////////////////

adminRouter.get(
  "/request/",
  authMiddleware,
  adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    const request = await Request.find({})
    .sort({ _id: -1 })
    .populate("user", "id firstname lastname email cin");
    res.json(request);
  })
);


adminRouter.get(
  "/request/:id",authMiddleware,adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id).populate("user", "id firstname lastname email cin");;
    if (request) {
      res.json(request);
    } else {
      res.status(404);
      throw new Error("Demande introuvable");
    }
  })
);


adminRouter.put(
  "/request/:id/accept",
  authMiddleware,
  adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    const Reques = await Request.findById(req.params.id).populate(
      "user",
      "email firstname lastname"
    );

    if (Reques) {
      Reques.traitedAt = Date.now();
      Reques.Status="Accepted";
      Reques.traitedby = req.user._id;
      const updatedRequest = await Reques.save();
      try {
        await sendEmail({
          email: Reques.user.email,
          subject: "Requête acceptée",
          message: `Chez ${
            Reques.user.firstname
          } <br> Votre demande a été acceptée le ${moment(Reques.traitedAt).format("DD/MM/YYYY")} <br>
          vous pouvez vérifier votre demande à partir d'<a href="http://localhost:4000/demande/${Reques._id}>Ici</a>
          `,
          
        });
      } catch (error) {
        console.log(error);
      }


      res.json(updatedRequest);
    } else {
      res.status(404);
      throw new Error("Request Not Found");
    }

  })
);

adminRouter.put(
  "/request/:id/refuse",
  authMiddleware,
  adminMiddleware,
  expressAsyncHandler(async (req, res) => {
    const Reques = await Request.findById(req.params.id).populate(
      "user",
      "email firstname lastname"
    );;

    if (Reques) {
      Reques.traitedAt = Date.now();
      Reques.traitedby = req.user._id;
      Reques.Status="Refused";
      Reques.RefuseReason = req.body.RefuseReason;
 
      const updatedRequest = await Reques.save();
      var currentdate = new Date(); 

      try {
        await sendEmail({
          email: Reques.user.email,
          subject: "Demande refusée",
          message: `Chez ${
            Reques.user.firstname
          } <br> Votre demande a été refusée le ${moment(Reques.traitedAt).format("DD/MM/YYYY")} <br>
          Raison du refus ${Reques.RefuseReason}`,
        });
      } catch (error) {
        console.log(error);
      }

      res.json(updatedRequest);
    } else {
      res.status(404);
      throw new Error("Demande introuvable");
    }
  })
);







module.exports = adminRouter;
