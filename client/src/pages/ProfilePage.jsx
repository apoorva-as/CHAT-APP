import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const {authUser,updateProfile} = useContext(AuthContext); 

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");


  const handlesunbmit = async (e) => {
    e.preventDefault();
    
    if(!selectedImg){
      console.log("Updating without image:", { fullName: name, bio });
      const success = await updateProfile({fullName: name, bio});
      if(success) {
        setTimeout(() => navigate('/'), 500);
      }
      return;
    }
   
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      console.log("Updating with image, base64 length:", base64Image?.length);
      const success = await updateProfile({profilePic: base64Image, fullName: name, bio});
      if(success) {
        setTimeout(() => navigate('/'), 500);
      }
    }
  }






  return (
   <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
  <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>

    <form 
    onSubmit={handlesunbmit}
    className="flex flex-col gap-5 p-10 flex-1">

      <h3 className="text-lg">Profile details</h3>

      <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
        <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file"
        id='avatar' accept='.png, .jpg, .jpeg' hidden />
        <img src={selectedImg ? URL.createObjectURL(selectedImg) : (authUser?.profilePic || assets.avatar_icon)} alt="" className={`w-12 h-12 rounded-full`} />
        upload profile picture
      </label>
     <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='name' className='w-full bg-transparent border-2 border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500' />
     <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} placeholder='bio' className='w-full bg-transparent border-2 border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500'></textarea>
     <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-full text-lg cursor-pointer'>save</button>


    </form>

    <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' src={selectedImg ? URL.createObjectURL(selectedImg) : (authUser?.profilePic || assets.avatar_icon)} alt="" />

  </div>
</div>
  )
}

export default ProfilePage