// import { useContext } from 'react';

// import { AuthContext } from '../../Providers/AuthProvider';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../../Hook/useAuth';
// // import Swal from 'sweetalert2';
// // import Social from '../Social/Social';


// const Login = () => {

//     const {signIn} = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const from = location.state?.from?.pathname || "/"

//     // useEffect( () =>{
//     //     loadCaptchaEnginge(6); 

//     // },[])

//   const handleLogin = e =>{
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     console.log(email,password);

//     signIn(email, password)
//     .then(result => {
//       const user = result.user;
//       console.log(user);
//       Swal.fire("LogIn successful");

//       navigate(from, {replace: true})

//     });
    
//   }

// //   const handleValidatedCaptcha = (e) =>{
// //     const user_captcha_value = e.target.value;
// //      console.log(user_captcha_value)
// //     if(validateCaptcha(user_captcha_value)){
// //               setDisable(false)
// //     }

// //   }

//   return (
//     <div>
//       <div className="hero min-h-screen bg-base-200">
//         <div className="hero-content flex-col">
//           <div className="text-center md:w-1/2 lg:text-left">
//             <h1 className="text-5xl font-bold">Login now!</h1>
//             <p className="py-6">
//               Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//               excepturi exercitationem quasi. In deleniti eaque aut repudiandae
//               et a id nisi.
//             </p>
//           </div>
//           <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
//             <form onSubmit={handleLogin} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="email"
//                   className="input input-bordered"
//                   name="email"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="password"
//                   className="input input-bordered"
//                   name="password"
//                   required
//                 />
//                 <label className="label">
//                   <a href="#" className="label-text-alt link link-hover">
//                     Forgot password?
//                   </a>
//                 </label>
//               </div>

//               {/* <div className="form-control">
//                 <label className="label">
//                 <LoadCanvasTemplate />
//                 </label>
//                 <input  onBlur={handleValidatedCaptcha} 
//                   type="text"
//                   placeholder="type the captcha"
//                   className="input input-bordered"
//                   name="captcha"
//                   // required
//                 />
//                */}
//               {/* </div> */}
//               <div className="form-control mt-6">
//                 {/* apply disabled for re captcha */}
//                 <input
//                  className="btn btn-primary"
//                   type="submit"
//                    value="Login" />
//               </div>
//             </form>
//             <p className='text-center'><small>New here? Create an account<Link to='/signUp'> <br /> <span className='text-blue-500 font-bold text-sm'>Sign Up</span> </Link></small></p>
//             <p className='text-center'>or,</p>
//             <div className=' text-center'>
//               <Social></Social>
           
//             </div>
            
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Login;
