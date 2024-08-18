import {  useState } from "react";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import myAxios from "../apis/userApi";
// import { toast } from "react-toastify";
import userloginApi from "../apis/userloginApi";
import { useAuth } from "../context/AuthProvider";
// import Input from "./InputComponent";

function Login({onLogin}) {
    
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const navigate=useNavigate()

  const location=useLocation()
const from =location.state?.from?.pathname ||"/"

  const handleForm = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
   
    const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\*\@\%\$\#]).{12,30}$/;
        if (e.target.name==="email" ) {
            setUser({ ...user, email:
            e.target.value, }); 
            setErrors({
            ...errors, 
            emailError: e.target.value.length===0 
            ? "Please, this field is required"
            :!emailRegex.test( e.target.value ) 
            ? "Enter valid Email" : "" , });
            } 
        else if (e.target.name==="password" ) {
                setUser({ ...user, password: e.target.value, });
                setErrors({ ...errors, passwordError: e.target.value.length===0
                ? "Please, this field is required" : 
                !passwordRegex.test( e.target.value ) 
                ? "Enter Valid Password" : 
                "" , }); 
            } 
  };




const handleSubmit= async(e)=>{
    e.preventDefault();
   
    if (!errors.emailError && !errors.passwordError ) {
   
    try{
    const { data: user2 } = await userloginApi.createUser(user)
        console.log(user2);
        // login(user2)
        onLogin()
        // if(user2.data.user.role==="admin"){
        //     console.log(user2.data.user.role==="admin")

        //     navigate("/admin")
        // }
        // localStorage.setItem("currentUser",JSON.stringify(user2))
       
         navigate('/shop')

        // if (user2.data.user.role === "admin") {
        //     navigate("/admin");
        // } else {
        //     navigate('/shop');
        // }
}
    catch(err){
        setErrors({...errors})
    }
    }
    else {
      console.log ("something went wrong")}}
  /*const handleSubmit= async(e)=>{
    e.preventDefault();
    if (!errors.emailError && !errors.passwordError ) {
        try{
        const { data: user2 } = await userloginApi.createUser(user)
            .then((res)=>{console.log(res.data.msg)})
            .catch((err)=>console.log("password or email unvalid"));//
            console.log(user2);//res
            // const mytoken =user1.token
            // localStorage.setItem("token",mytoken)
            // console.log(mytoken);//res
            navigate('/shop'); // Assuming you want to navigate to home after successful signup
        }
        catch (error) {
            setErrors(error)
             if (error.response && error.response.status >= 400 && error.response.status < 500) {
            toast.error(error.response.data);
         }
        }
    }
     else {
        alert("Please correct the errors in the form.");
        // setErrors(error)
    }
}*/
//     try{
//   const res=await myAxios.post("auth/login",user)
//   localStorage.setItem("currentUser",JSON.stringify(res.data.user))
//   console.log(res.data.user)
//   navigate.apply('/home')
//     }
//     catch (error) {
//         if (error.response && error.response.status >= 400 && error.response.status < 500) {
//             toast.error(error.response.data);
//         }}
//     }
//     else {
//         setErrors({...errors})
//     }

    const bg={ background: 'linear-gradient(to right, #1f8f8f, rgb(72, 105, 109))'
    ,height: "100vh"
    };
  return (
    <div className="container-fluid bg" style={bg}>
        <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-4 bg-white divform" style={{ borderRadius: "10px"}}>
                <form onSubmit={(e)=>handleSubmit(e)} >
                    <div id="div-welcome">
                        <div id="icon">
                            {/* <img src={cartimage} alt="camera"
                                style={{width:"25%", display: "block",margin:"0 auto"}} /> */}
                            <p className="text-center">
                                Welcome to
                                <span className="appname"
                                    style={{fontSize:"25px", fontWeight:"700", color:"rgb(54, 52, 52)"}}>
                                    E-Commerce
                                </span>
                            </p>
                        </div>
                    </div>
                  
                  
                    <div id="emailDiv" className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="myemail" className={`form-control ${errors.emailError
                            && "border-danger" }`} value={user.email} placeholder="Enter your email please"
                            onChange={(e)=> handleForm(e)}/>
                        {errors.emailError && <p className="text-danger">{errors.emailError}</p>}
                    </div>

                   

                    <div id="passwordDiv" className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id="password" name="password" className={`form-control
                            ${errors.passwordError && "border-danger" }`} value={user.password}
                            placeholder="Enter password please" onChange={(e)=> handleForm(e)} />

                        {errors.passwordError && <p className="text-danger">{errors.passwordError}</p>}
                    </div>

                    <button id="registerBtn" style={{
                    width: "100%",  
                    backgroundColor:"#1f8f8f" , 
                    border: "none", 
                    borderRadius:"10px" }}  disabled={errors.emailError || errors.passwordError}
                        type="submit" className="btn btn-primary btn-block"> login</button>
                </form>
                <span>i have account <Link to="/signup" style={{width: "100%", fontSize: "15px"}}>signup</Link></span>
            </div>
        </div>
    </div>
  )}
export default Login;