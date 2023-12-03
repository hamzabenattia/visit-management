const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { authMiddleware } = require("../Middleware/authMiddleware");
const Request = require("../Models/requestModel");
const User = require("../Models/userModel");
const sendEmail = require("../utils/sendEmail");
const requestRouter = express.Router();
const fs = require('fs');
const  pdf = require('html-pdf');
const moment = require("moment");

requestRouter.post(
  "/",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    const { object, visitdate, visithour, personnes } = req.body;

    const request = new Request({
      user: req.user._id,
      object,
      visitdate,
      visithour,
      personnes,
      Status:"Pending",
      createdAt: Date.now(),
    });

    const createRequest = await request.save();
    const user = await User.findById(createRequest.user._id);
    res.status(201).json(createRequest);

    try {
      await sendEmail({
        email: user.email,
        subject: "Request send successfuly ",
        message: `Dear ${
          user.firstname
        } <br> Your request had been succusefuly recived on ${Date.now()}`,
      });
    } catch (error) {
      console.log(error);
    }
  })
);



requestRouter.get(
  "/:id",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {

    const Reques = await Request.findById(req.params.id).populate(
      "user traitedby",
      "email firstname lastname cin"
    );

    if (Reques && (Reques.user.id === req.user.id || req.user.isAdmin )) {



      let options = { format: 'A4' };
      const html=`<div id="pdf">
      <div class="container-fluid a4">
        <div
          align="center"
          style="
            margin: 0cm 0cm 10pt;
            line-height: 115%;
            font-size: 15px;
            font-family: Calibri, sans-serif;
          "
        >
          <table style="width: 450pt; border-collapse: collapse; border: none">
            <tbody>
              <tr>
                <td
                  colspan="6"
                  style="
                    width: 16cm;
                    border: 1pt solid rgb(112, 173, 71);
                    background: rgb(112, 173, 71);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: white"
                        >Partie réservée au demandeur :</span
                      >
                    </strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  style="
                    width: 16cm;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    class="inline"
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: black"
                        >Date de la demande:&nbsp;
                      </span></strong
                    ><span id="created_at" class="h6 text-capitalize"
                      >${moment(Reques.visitdate).format("L")}</span
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  style="
                    width: 16cm;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span style="font-size: 15px; line-height: 115%"
                        >Demandeur :&nbsp;</span
                      ></strong
                    ><span id="userName" class="h6 text-capitalize">
                      ${Reques.user.firstname} ${Reques.user.lastname}
                    </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="3"
                  style="
                    width: 227.2pt;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: black"
                        >Site concerné :&nbsp;</span
                      ></strong
                    ><span id="concernedSite" class="h6 text-capitalize">
                    ${Reques.site}
                    </span>
                  </p>
                </td>
                <td
                  colspan="3"
                  style="
                    width: 226.4pt;
                    border-top: none;
                    border-left: none;
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-right: 1pt solid rgb(168, 208, 141);
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: black"
                        >Local concerné :&nbsp;</span
                      ></strong
                    ><span id="concernedLocal" class="h6 text-capitalize"
                      > ${Reques.Local}
                    </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  style="
                    width: 16cm;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span style="font-size: 15px; line-height: 115%"
                        >Objet de la demande :&nbsp;</span
                      ></strong
                    ><span id="demandObject" class="h6 text-capitalize">
                    ${Reques.object}
                    </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  style="
                    width: 16cm;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    class="inline"
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: black"
                        >Date de l’intervention/visite:&nbsp;
                      </span></strong
                    ><span id="created_at" class="h6 text-capitalize"
                      > ${Reques.visitdate}</span
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  style="
                    width: 16cm;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span style="font-size: 15px; line-height: 115%"
                        >Heure de l’intervention/visite:&nbsp;</span
                      ></strong
                    ><span id="userName" class="h6 text-capitalize">  ${Reques.visithour} </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  style="
                    width: 16cm;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: black"
                        >Liste des personnes :&nbsp;</span
                      ></strong
                    ><strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: black"
                        >(dans le cas où le nombre d’intervenant/visiteur est
                        important, une liste pourrait être rattachée à ce
                        document)&nbsp;</span
                      ></strong
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="3"
                  style="
                    width: 227.2pt;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span style="font-size: 15px; line-height: 115%"
                        >Prénom et NOM</span
                      ></strong
                    >
                  </p>
                </td>
                <td
                  colspan="3"
                  style="
                    width: 226.4pt;
                    border-top: none;
                    border-left: none;
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-right: 1pt solid rgb(168, 208, 141);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span style="font-size: 15px; line-height: 115%"
                        >N° de la pièce d'identité (CIN ou PASSEPORT)</span
                      ></strong
                    >
                  </p>
                </td>
              </tr>
              ${Reques.personnes.map((r)=>(`<tr>
                <td colspan="3" style="
                    width: 227.2pt;
                    border-top: none;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  ">
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    ">
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: black"
                        > ${r.fullname}</span
                      ></strong
                    >
                  </p>
                </td>
                <td
                  colspan="3"
                  style="
                    width: 226.4pt;
                    border-top: none;
                    border-left: none;
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-right: 1pt solid rgb(168, 208, 141);
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  ">
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    ">
                    <span style="font-size: 15px; line-height: 115%; color: black"
                      ><span id="cin" class="h6 text-capitalize"></span
                    ></span>
                  </p>
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    ">
                    <span style="font-size: 15px; line-height: 115%; color: black">
                      ${r.cin}
                    </span>
                  </p>
                </td>
              </tr>`))}
             
             
            </tbody>
          </table>
        </div>
        <p style="margin: 0cm; font-size: 15px; font-family: Calibri, sans-serif">
          &nbsp;
        </p>
        <div
          align="center"
          style="
            margin: 0cm 0cm 10pt;
            line-height: 115%;
            font-size: 15px;
            font-family: Calibri, sans-serif;
          "
        >
          <table style="width: 450pt; border-collapse: collapse; border: none">
            <tbody>
              <tr>
                <td
                  colspan="2"
                  style="
                    width: 505pt;
                    border: 1pt solid rgb(112, 173, 71);
                    background: rgb(112, 173, 71);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: white"
                        >Partie réservée à l’équipe Sécurité</span
                      ></strong
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  style="
                    width: 505pt;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    border-top: none;
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                    vertical-align: top;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="font-size: 15px; line-height: 115%; color: black"
                        >Etat de la demande &nbsp;:&nbsp;</span
                      ></strong
                    >
                    <span id="accepted" class="h6 text-capitalize">${Reques.status} </span>
                  </p>
                </td>
              </tr>
              <tr></tr>
              <tr>
                <td
                  style="
                    width: 252.5pt;
                    border-right: 1pt solid rgb(168, 208, 141);
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-left: 1pt solid rgb(168, 208, 141);
                    border-image: initial;
                    border-top: none;
                    padding: 0cm 5.4pt;
                    height: 1cm;
                    vertical-align: top;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span style="font-size: 15px; line-height: 115%"
                        >Nom :&nbsp;</span
                      ></strong
                    ><span id="admin" class="h6 text-capitalize">${Reques.traitedby?.firstname} ${Reques.traitedby?.lastname} </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    width: 252.5pt;
                    border-top: none;
                    border-left: none;
                    border-bottom: 1pt solid rgb(168, 208, 141);
                    border-right: 1pt solid rgb(168, 208, 141);
                    background: rgb(226, 239, 217);
                    padding: 0cm 5.4pt;
                    height: 1cm;
                    vertical-align: top;
                  "
                >
                  <p
                    style="
                      margin: 6pt 0cm 0cm;
                      line-height: 115%;
                      font-size: 13px;
                      font-family: Calibri, sans-serif;
                    "
                  >
                    <strong
                      ><span
                        style="Nom-size: 15px; line-height: 115%; color: black"
                        >Date :&nbsp;</span
                      ></strong
                    ><span id="updated_at">${moment(Reques.traitedAt).format("DD/MM/YYYY")} </span>
                  </p>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <p
          style="
            margin: 6pt 0cm 0cm;
            line-height: 115%;
            font-size: 13px;
            font-family: Calibri, sans-serif;
          "
        >
          &nbsp;
        </p>
      </div>
    </div>`
      
      const pdfl =  pdf.create(html, options).toFile(`./pdf/${Reques._id}.pdf`,async function(err, resp) {
        if (err) return console.log(err);
        console.log(resp.filename);
 });
 ppdf = `http://localhost:4000/pdf/${Reques._id}`;




      res.json(Reques);

     
    } else {
      res.status(404);
      throw new Error("Request Not Found");
    }
  })
);




// USER LOGIN Request
requestRouter.get(
  "/",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    const Requ = await Request.find({ user: req.user._id }).sort({ _id: -1 })
    .populate("user", "firstname lastname email");
    res.json(Requ);
  })
);



requestRouter.delete(
  "/:id",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      const request = await Request.findById(id);

      if (!request) {
        return res.status(404).json({ message: "Request non trouver" });
      }

      await request.deleteOne();

      res.json({ message: "demande supprimée avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  })
);
    
   

requestRouter.put(
  "/edit/:id",
  expressAsyncHandler(async (req, res) => {
    const { object,visitdate,visithour } = req.body;
    
  const request = await Request.findById(req.params.id);

  if (request && request.Status==="Pending") {
    request.object = object || request.object;
    request.visitdate = visitdate || request.visitdate;
    request.visithour = visithour || request.visithour;


    const updatedrequest = await request.save();
    res.json(updatedrequest);
  }
   
    else {
      res.status(404);
      throw new Error("Demande introuvable ou elle a déjà été traitée");
    }
  })
);






module.exports = requestRouter;
