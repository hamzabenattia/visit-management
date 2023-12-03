import React, { useState } from 'react'
import Loading from '../LoadingError/Loading';
import Logo from "../../images/user.png"
import axios from 'axios';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';

const ProfileUserMain = ({user,loading}) => {

  const [changingPassword, setchangingPassword] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setnNwPassword] = useState("");


  const toggleIsLoading = (e) => {
    e.preventDefault();
    setchangingPassword(current => !current);
  };

  const u = { oldpassword: oldpassword,
              newpassword:newpassword}
              const ToastObjects = {
                pauseOnFocusLoss: false,
                draggable: false,
                pauseOnHover: false,
                autoClose: 2000,
              };

  const handelpassword = async (e)=>{
    e.preventDefault();
 
   await axios.put('/api/user/changepassword/', u)
        .then(response => {toast.success(response.data.message, ToastObjects);       setchangingPassword(false)
        }).catch(error => {
          toast.error(error.response.data.message, ToastObjects)
      });

  }


  return (
    <>
    <Toast />
    {loading ? <Loading /> :  <section className="content-main" style={{ maxWidth: "1200px" }}>

<div className="content-header">
  <h2 className="content-title">Paramètre d'utilisateur
</h2>
</div>

<div className="card mb-4 shadow-sm">
  <div className="card-body">
    <div className="row">
     
      <div className="col">
        
        <section className="content-body">
          <form>
            <div className="row">
              <div className="col-lg-8">
                <div className="row gx-3">
                  <div className="col-6  mb-3">
                    <label className="form-label">Prénom</label>
                    <input className="form-control" type="text" value={user.firstname} disabled/>
                  </div> 
                  <div className="col-6  mb-3">
                    <label className="form-label">Nom</label>
                    <input className="form-control" type="text" value={user.lastname} disabled/>
                  </div> 
                  <div className="col-lg-6  mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" value={user.email} disabled/>
                  </div> 
                  <div className="col-lg-6  mb-3">
                    <label className="form-label">Numéro de téléphone</label>
                    <input className="form-control" type="tel" value={user.phonenum} disabled/>
                  </div> 
                  
                  <div className="col-lg-6  mb-3">
                    <label className="form-label">Socité</label>
                    <input className="form-control" type="text" value={user.socite} disabled/>
                  </div> 
                  <div className="col-lg-6  mb-3">
                    <label className="form-label">CIN</label>
                    <input className="form-control" type="text" value={user.cin} disabled/>
                  </div> 
                  {changingPassword  && <>
                
                  <div className="col-6  mb-3">
                    <label className="form-label">Mot de passe acctuel</label>
                    <input className="form-control" type="password" onChange={(e) => setOldPassword(e.target.value)} />
                  </div> 
                  <div className="col-6  mb-3">
                    <label className="form-label">Nouveau Mot de passe</label>
                    <input className="form-control" type="password" onChange={(e) => setnNwPassword(e.target.value)}  />
                  </div> </> }
                </div> 

              </div>
              <aside className="col-lg-4">
                <figure className="text-lg-center">
                  <img className="img-lg mb-3 img-avatar" src={user.avatar || Logo} alt="User"/>

                </figure>
              </aside>
            </div> 
            <br/>
            <button className="btn btn-primary" onClick={!changingPassword ? toggleIsLoading : handelpassword } >Changer le Mote de passe</button>
          </form>




        </section> 
      </div>
    </div> 
              
  </div>
</div> 
</section>}
    </>
  
    
  )
}

export default ProfileUserMain