// import { useEffect, useState } from 'react';
// import { getAvatarData, updateAvatar } from '../../api/users.api';
import { LogoutButton } from '../../components/LogoutButtonComponent';

export function ProfilePage() {
//   const [avatarData, setAvatarData] = useState(null);

//   useEffect(() => {
//       async function loadAvatar() {
//           try {
//               const data = await getAvatarData();
//               setAvatarData(data);
//           } catch (error) {
//               console.error('Error al obtener el avatar:', error);
//           }
//       }
//       loadAvatar();
//   }, []);

//   const handleAvatarUpload = async (event) => {
//       const file = event.target.files[0];
//       try {
//           const data = await updateAvatar(file);
//           setAvatarData(data);
//       } catch (error) {
//           console.error('Error al subir el avatar:', error);
//       }
//   };

  return (
    <>
      <div>
            {/* <h1>Avatar</h1>
            {avatarData && (
                <img
                    src={URL.createObjectURL(new Blob([avatarData], { type: 'image/jpeg' }))}
                    alt="Avatar"
                />
            )}
            <input type="file" accept="image/*" onChange={handleAvatarUpload} /> */}
      </div>
      <LogoutButton />
    </>
  );
}
