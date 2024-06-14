import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {app} from "../firebase/firebase.config"
import useAxiosPublic from "../Hook/useAxiosPublic";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
     const axiosPublic = useAxiosPublic();



    //create user
    const createUser = (email, password) => {
        setLoading(true);
        return  createUserWithEmailAndPassword(auth, email, password)
       
    }

    //login
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //google signIn
    const googleSignIn = () => {
        setLoading(true);
          return signInWithPopup(auth, googleProvider);
    }
    
   //logOut
   const logOut = () =>{
    setLoading (true);
    return signOut(auth);
   }

   //update user profile
   const updateUserProfile = (name, photoURL) =>{
    if (auth.currentUser) {
     return   updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        })
        .then(() => {
          setUser({
              ...auth.currentUser,
              displayName: name,
              photoURL: photoURL
          });
      });
}
return Promise.reject('No user is signed in');

   }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log('current user', currentUser);

      if (currentUser) {
        // Get token
        const userInfo = { email: currentUser.email };

        try {
          const tokenResponse = await axiosPublic.post('/jwt', userInfo);
          if (tokenResponse.data.token) {
            localStorage.setItem('access-token', tokenResponse.data.token);
          }

           const roleResponse = await axiosPublic.post('/users/role', userInfo);
           
          const role = roleResponse.data.role;
        
          setUser({ ...currentUser, role });
        } catch (error) {
          console.error('Error fetching token or role:', error);
        }
      } else {
        // Remove token
        localStorage.removeItem('access-token');
        setLoading(false)
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);


 



    const authInfo ={
      user,
      setUser,
      loading,
      createUser,
      signIn,
      logOut,
      updateUserProfile,
      googleSignIn,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;