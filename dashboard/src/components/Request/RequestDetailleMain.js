import React, { useEffect } from 'react'
import './DetailleRequest.scss'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestDetails } from '../../Redux/Actions/RequestActions';
import Loading from '../LoadingError/Loading';
import moment from 'moment';
import QRCode from "react-qr-code";


const RequestDetailleMain = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const requestId = location.pathname.split("/")[2];
console.log(requestId)

const requestDetails = useSelector((state) => state.requestDetails);
const { loading, error, request } = requestDetails;
console.log(request)

useEffect(() => {
  dispatch(getRequestDetails(requestId));

}, [dispatch, requestId]);



  return (
    <>
    {loading ? <Loading/> :
   
   <div>
   <div id="pdf">
     <div className="container-fluid a4">
       <div align="center" style={{marginTop: '0cm', marginRight: '0cm', marginBottom: '10.0pt', marginLeft: '0cm', lineHeight: '115%', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}>
         <table style={{width: '4.5e+2pt', borderCollapse: 'collapse', border: 'none'}}>
           <tbody>
             <tr>
               <td colSpan={6} style={{width: '16.0cm', border: 'solid #70AD47 1.0pt', background: '#70AD47', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'white'}}>Partie réservée au
                       demandeur :</span> </strong>
                 </p>
               </td>
             </tr>
             <tr>
               <td colSpan={6} style={{width: '16.0cm', border: 'solid #A8D08D 1.0pt', borderTop: 'none', background: '#E2EFD9', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p className="inline" style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>Date de la demande:&nbsp; </span></strong><span id="created_at" className="h6 text-capitalize">{moment(request.createdAt).format("L")}</span>
                 </p>
               </td>
             </tr>
             <tr>
               <td colSpan={6} style={{width: '16.0cm', border: 'solid #A8D08D 1.0pt', borderTop: 'none', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%'}}>Demandeur :&nbsp;</span></strong><span id="userName" className="h6 text-capitalize">  {request.user.firstname} {request.user.lastname} </span>
                 </p>
               </td>
             </tr>
             <tr>
               <td colSpan={3} style={{width: '227.2pt', border: 'solid #A8D08D 1.0pt', borderTop: 'none', background: '#E2EFD9', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>Site concerné
                       :&nbsp;</span></strong><span id="concernedSite" className="h6 text-capitalize"> {request.site} </span>
                 </p>
               </td>
               <td colSpan={3} style={{width: '226.4pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid #A8D08D 1.0pt', borderRight: 'solid #A8D08D 1.0pt', background: '#E2EFD9', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>Local concerné
                       :&nbsp;</span></strong><span id="concernedLocal" className="h6 text-capitalize">{request.Local} </span>
                 </p>
               </td>
             </tr>
             <tr>
               <td colSpan={6} style={{width: '16.0cm', border: 'solid #A8D08D 1.0pt', borderTop: 'none', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%'}}>Objet de la demande
                       :&nbsp;</span></strong><span id="demandObject" className="h6 text-capitalize" >  {request.object} </span>
                 </p>
               </td>
             </tr>

             <tr>
              
               <td colSpan={6} style={{width: '16.0cm', border: 'solid #A8D08D 1.0pt', borderTop: 'none', background: '#E2EFD9', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p className="inline" style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>Date de l’intervention/visite:&nbsp; </span></strong><span id="created_at" className="h6 text-capitalize">{request.visitdate}</span>
                 </p>
               </td>
             </tr>
             <tr>
        
             <td colSpan={6} style={{width: '16.0cm', border: 'solid #A8D08D 1.0pt', borderTop: 'none', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%'}}>Heure de l’intervention/visite:&nbsp;</span></strong><span id="userName" className="h6 text-capitalize">  {request.visithour} </span>
                 </p>
               </td>
             </tr>
             <tr>
               <td colSpan={6} style={{width: '16.0cm', border: 'solid #A8D08D 1.0pt', borderTop: 'none', background: '#E2EFD9', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>Liste des personnes
                       :&nbsp;</span></strong><strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>(dans
                       le
                       cas
                       où le nombre d’intervenant/visiteur est important, une liste pourrait être
                       rattachée à ce document)&nbsp;</span></strong>
                 </p>
               </td>
             </tr>
             <tr>
               <td colSpan={3} style={{width: '227.2pt', border: 'solid #A8D08D 1.0pt', borderTop: 'none', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%'}}>Prénom et NOM</span></strong>
                 </p>
               </td>
               <td colSpan={3} style={{width: '226.4pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid #A8D08D 1.0pt', borderRight: 'solid #A8D08D 1.0pt', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%'}}>N° de la pièce
                       d'identité
                       (CIN ou PASSEPORT)</span></strong>
                 </p>
               </td>
             </tr>
             {request.personnes.map((r)=>(
              <tr>
               <td colSpan={3} style={{width: '227.2pt', border: 'solid #A8D08D 1.0pt', borderTop: 'none', background: '#E2EFD9', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>{r.fullname}</span></strong>
                 </p>
               </td>
               <td colSpan={3} style={{width: '226.4pt', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid #A8D08D 1.0pt', borderRight: 'solid #A8D08D 1.0pt', background: '#E2EFD9', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}><span id="cin" className="h6 text-capitalize" /></span>
                 </p>
       
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}> {r.cin} </span>
                 </p>
               </td>
             </tr>))}
           </tbody>
         </table>
       </div>
       <p style={{margin: '0cm', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}>&nbsp;</p>
       <div align="center" style={{marginTop: '0cm', marginRight: '0cm', marginBottom: '10.0pt', marginLeft: '0cm', lineHeight: '115%', fontSize: '15px', fontFamily: '"Calibri",sans-serif'}}>
         <table style={{width: '4.5e+2pt', borderCollapse: 'collapse', border: 'none'}}>
           <tbody>
             <tr>
               <td colSpan={2} style={{width: '505.0pt', border: 'solid #70AD47 1.0pt', background: '#70AD47', padding: '0cm 5.4pt 0cm 5.4pt', height: '1.0cm'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'white'}}>Partie réservée
                       à
                       l’équipe Sécurité</span></strong>
                 </p>
               </td>
             </tr>
             <tr>
               <td colSpan={2} style={{width: '505.0pt', borderRight: '1pt solid rgb(168, 208, 141)', borderBottom: '1pt solid rgb(168, 208, 141)', borderLeft: '1pt solid rgb(168, 208, 141)', borderImage: 'initial', borderTop: 'none', background: 'rgb(226, 239, 217)', padding: '0cm 5.4pt', height: '1cm', verticalAlign: 'top'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>Etat de la demande &nbsp;:&nbsp;</span></strong> <span id="accepted" className="h6 text-capitalize">{request.Status}</span>
                 </p>
               </td>
             </tr>
             <tr>
              {request.Status === "Refused" &&
             <td  colSpan={2} style={{width: '505.0pt', borderTop: 'none', borderLeft: '1pt solid rgb(168, 208, 141)', borderBottom: '1pt solid rgb(168, 208, 141)', borderRight: '1pt solid rgb(168, 208, 141)', padding: '0cm 5.4pt', height: '1cm', verticalAlign: 'top'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%'}}>Motif du refus :&nbsp;</span></strong><span id="refusalReason" className="h6 text-capitalize"> {request.RefuseReason} </span>
                 </p>
               </td>}
               </tr>
             <tr>
               <td style={{width: '252.5pt', borderRight: '1pt solid rgb(168, 208, 141)', borderBottom: '1pt solid rgb(168, 208, 141)', borderLeft: '1pt solid rgb(168, 208, 141)', borderImage: 'initial', borderTop: 'none', padding: '0cm 5.4pt', height: '1cm', verticalAlign: 'top'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%'}}>Nom :&nbsp;</span></strong><span id="admin" className="h6 text-capitalize">{request.traitedby?.firstname} {request.traitedby?.lastname}</span>
                 </p>
               </td>
              
             </tr>
             <tr>
               
               <td style={{width: '252.5pt', borderTop: 'none', borderLeft: 'none', borderBottom: '1pt solid rgb(168, 208, 141)', borderRight: '1pt solid rgb(168, 208, 141)', background: 'rgb(226, 239, 217)', padding: '0cm 5.4pt', height: '1cm', verticalAlign: 'top'}}>
                 <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
                   <strong><span style={{fontSize: '15px', lineHeight: '115%', color: 'black'}}>Date :&nbsp;</span></strong><span id="updated_at"> {request.traitedAt} </span>
                 </p>
               </td>
             </tr>
             
             <tr>
              
               <td style={{width: '252.5pt', borderTop: 'none', borderLeft: 'none', borderBottom: '1pt solid rgb(168, 208, 141)', borderRight: '1pt solid rgb(168, 208, 141)', background: 'rgb(226, 239, 217)', padding: '0cm 5.4pt', height: '1cm', verticalAlign: 'top'}}>
                <button  onClick={()=>window.print()} style={{marginLeft:"250px"}} >Imprimer</button>

                <QRCode value={`http://localhost:1000/app/${requestId}.pdf`} style={{widh:"100px", height:"100px"}}/>

               </td>
              
            
             </tr>           </tbody>
         </table>
       </div>
       <p style={{marginTop: '6.0pt', marginRight: '0cm', marginBottom: '0cm', marginLeft: '0cm', lineHeight: '115%', fontSize: '13px', fontFamily: '"Calibri",sans-serif'}}>
         &nbsp;</p>
     </div>
   
   </div>
 </div>}</>
  )
}

export default RequestDetailleMain