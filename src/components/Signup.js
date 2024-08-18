// import cartimage from "../medai/cartimage.png"////cartimage.png";
import { useState,useHistory } from "react";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../apis/userApi";
import Input from "../components/InputComponent";
// import { toast } from "react-toastify";
// dist/ReactToastify.css'
// import '../app.css'
function Signup(){
   
    const [user, setUser] = useState({
        fullName:"",
        email:"",
        age:"",
        gender:"",
        address:"",
        password:"",
    });
    const [errors, setErrors] = useState({
        fullNameError:"",
        emailError: "",
        ageError:"",
        genderError:"",
        addressError:"",
        passwordError: "",
    });
const handleForm = (e) => {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usernameRegex=/([A-Za-z0-9]){3,30}/i;
const regexName=/^[a-zA-Z][a-zA-Z\ ]{2,30}$/
const regexAddress=/^[a-zA-Z][a-zA-Z0-9]{2,30}$/

const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\*\@\%\$\#]).{12,30}$/;
const ageRegex=/^[1-9][0-9]{1,2}$/
if (e.target.name === "fullName") {
        setUser({
        ...user,
        fullName: e.target.value,
});
        setErrors({
        ...errors,
        fullNameError:
        e.target.value === ""
        ? "Please, this field is required"
        : e.target.value.length === 0
        ? "Please, this field is required"
        :!regexName.test( e.target.value)
        ? "Enter valid name"
        : "",
        });}
else if (e.target.name === "age") {
        setUser({
            ...user,
            age: e.target.value,
        });
        setErrors({
        ...errors,
        ageError:
        e.target.value.length === 0
        ? "Please, this field is required"
        : e.target.value<7 
        ? "Enter valid age" 
        : "" , }); } 
else if (e.target.name==="email" ) {
     setUser({ ...user, email:
    e.target.value, }); 
    setErrors({
         ...errors, 
         emailError: e.target.value.length===0 
         ? "Please, this field is required"
         :!emailRegex.test( e.target.value ) 
         ? "Enter valid Email" : "" , });
         }
        else if (e.target.name==="address" )
             {setUser({ 
                ...user,
                address: e.target.value,
                });
        setErrors({ 
            ...errors,
             addressError: e.target.value.length===0
    ? "Please, this field is required"
     :!regexAddress.test(e.target.value)
      ? "Enter valid Address" 
      : "" 
     });
     } 
      else if(e.target.name==="gender" )
     { 
        setUser({ ...user, gender: e.target.value, });
          setErrors({ 
             ...errors,
               genderError:e.target.value.length===0 
               ? "Please, this field is required" 
          // :(e.target.value)!=='male' ||(e.target.value)!=="female" //
           // ? "Enter valid gender" //
            : "" ,}) //
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
// const history=useHistory()
const navigate=useNavigate()
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.emailError && !errors.passwordError && !errors.ageError && !errors.addressError && !errors.fullNameError && !errors.genderError) {
        try {
            const { data: user1 } = await userApi.createUser(user)
            // .then((res)=>{
                // console.log(res.data)
                 console.log(user1);//res
                const mytoken =user1?.token
                localStorage.setItem("token",mytoken)
                localStorage.setItem("currentUser",JSON.stringify(user1))
                console.log(mytoken);//res
            
                navigate('/shop');
            // })
            // .catch((err)=>console.log(err+ "already have account"));//
           
             // Assuming you want to navigate to home after successful signup
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.log  (error.response.data);
            }
        }
    }    else {
        console.log ("something went wrong")}
};

//      try{
//             const res =await myAxios.post("auth/signup", user)
//     localStorage.setItem("currentUser",JSON.stringify(res.data))
//     console.log(res.data)
//     navigate('/home')
// }
// catch(err){
//   setErrors({ ...errors})// formError: 'An error occurred. Please try again.' });
// //   console.log(err)
// }
    //  history.push('/')
    // props.ref.push('/')
    // }
    
    const bg={ background: 'linear-gradient(to right, #1f8f8f, rgb(72, 105, 109))'
    ,height: "100vh"
    };

    return(
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
              <Input
               id="fullName" 
              handleForm={(e)=>handleForm(e)} 
              
               value={user.fullName} 
               label="Full Name"
               inputErrors={errors.fullNameError} 
               />
                    {/* <div id="fullNameDiv" className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input 
                        type="text" 
                        name="fullName"
                         id="fullName"
                          placeholder="enter your name please"
                        className={`form-control ${errors.fullNameError && "border-danger" }`} 
                        value={user.fullName}
                        onChange={(e)=> handleForm(e)}/>
                    </div> */}
                    <div id="ageDiv" className="form-group">
                        <label htmlFor="age" className="text-start">Age</label>
                        <input type="number" name="age" id="age" className={`form-control ${errors.ageError
                            && "border-danger" }`} value={user.age}placeholder="enter your age" onChange={(e)=>
                        handleForm(e)} required/>
                    </div>
                    <div id="emailDiv" className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="myemail" className={`form-control ${errors.emailError
                            && "border-danger" }`} value={user.email} placeholder="Enter your email please"
                            onChange={(e)=> handleForm(e)}
                            required/>
                            
                        {errors.emailError && <p className="text-danger">{errors.emailError}</p>}
                    </div>

                    <div id="addressDiv" className="form-group">

                        <label htmlFor="address">Address</label>

                        <input type="text"
                         name="address"
                          id="address"
                           className={`form-control ${errors.addressError
                            && "border-danger" }`} value={user.address}placeholder="enter your name please"
                            onChange={(e)=> handleForm(e)}
                            required/>
                        {errors.addressError && <p className="text-danger">{errors.addressError}</p>}

                    </div>
                    <div id="genderDiv" className="form-group">

                        <label>Gender </label>
                        <br/>
                        <input type="radio"
                            id="male"
                            name="gender" 
                            value="male"
                            onChange={(e)=> handleForm(e)}
                           />
                        <label htmlFor="male" className="p-1"> Male </label>
                        <input
                         type="radio" 
                         id="female"
                          name="gender" 
                          value="female" 
                          onChange={(e)=> handleForm(e)}
                          required/>
                        <label htmlFor="female"className="p-1">Female</label>
                        {errors.genderError && <p className="text-danger">{errors.genderError}</p>}

                    </div>
                    <div id="passwordDiv" className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password"
                        className={`form-control ${errors.passwordError && "border-danger" }`} value={user.password}
                        placeholder="Enter password please" 
                        onChange={(e)=> handleForm(e)} 
                        required/>

                        {errors.passwordError && <p className="text-danger">{errors.passwordError}</p>}
                    </div>

                    <button id="registerBtn" style={{
                    width: "100%",  
                    backgroundColor:"#1f8f8f" , 
                    border: "none", 
                    borderRadius:"10px" }} disabled={errors.emailError || errors.passwordError|| errors.addressError||errors.ageError||errors.fullNameError||errors.genderError}
                        type="submit" className="btn btn-primary btn-block"> sign up</button>
                </form>
                <span>i have account <Link to="/login" style={{width: "100%", fontSize: "15px"}}>login</Link></span>
            </div>
        </div>
    </div>
    // </div>

    )}
    export default Signup;

    // import { useState } from "react";