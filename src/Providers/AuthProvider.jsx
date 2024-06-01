import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {app} from "../firebase/firebase.config"
//  import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    // const axiosPublic = useAxiosPublic();



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
   const updateUserProfile = (name, photo) =>{
     return   updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
   }

//observer
     useEffect( () => {
     const unSubscribe =   onAuthStateChanged(auth, currentUser =>{
          setUser(currentUser);
          console.log('current user', currentUser);
          if(currentUser){
          //get token
          const userInfo = {email: currentUser.email}
          axiosPublic.post('/jwt', userInfo)
           .then(res => {
            if(res.data.token){
                 localStorage.setItem('access-token', res.data.token);
                 setLoading(false);

             }
           })
          }
          else{
            //remove token
             localStorage.removeItem('remove access-token');
            setLoading(false)
          }
        });
        return () => {
            return unSubscribe();
        }

     },[])



    const authInfo ={
      user,
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