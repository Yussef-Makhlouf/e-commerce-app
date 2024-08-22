

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../apis/userApi";
import Input from "../components/InputComponent";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullNameError: "",
    emailError: "",
    ageError: "",
    genderError: "",
    addressError: "",
    passwordError: "",
  });

  const navigate = useNavigate();

  // Validation logic for form fields
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexName = /^[a-zA-Z][a-zA-Z\ ]{2,30}$/;
  const regexAddress = /^[a-zA-Z][a-zA-Z0-9\s]{2,30}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\*\@\%\$\#]).{12,30}$/;
  const ageRegex = /^[1-9][0-9]{1,2}$/;

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Validation for each input field
    switch (name) {
      case "fullName":
        setErrors({
          ...errors,
          fullNameError:
            value === ""
              ? "Please, this field is required"
              : !regexName.test(value)
              ? "Enter a valid name"
              : "",
        });
        break;

      case "email":
        setErrors({
          ...errors,
          emailError:
            value === ""
              ? "Please, this field is required"
              : !emailRegex.test(value)
              ? "Enter a valid Email"
              : "",
        });
        break;

      case "age":
        setErrors({
          ...errors,
          ageError:
            value === ""
              ? "Please, this field is required"
              : !ageRegex.test(value) || value < 7
              ? "Enter a valid age"
              : "",
        });
        break;

      case "address":
        setErrors({
          ...errors,
          addressError:
            value === ""
              ? "Please, this field is required"
              : !regexAddress.test(value)
              ? "Enter a valid Address"
              : "",
        });
        break;

      case "gender":
        setErrors({
          ...errors,
          genderError: value === "" ? "Please select gender" : "",
        });
        break;

      case "password":
        setErrors({
          ...errors,
          passwordError:
            value === ""
              ? "Please, this field is required"
              : !passwordRegex.test(value)
              ? "Enter a valid Password"
              : "",
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !errors.emailError &&
      !errors.passwordError &&
      !errors.ageError &&
      !errors.addressError &&
      !errors.fullNameError &&
      !errors.genderError
    ) {
      try {
        const { data: user1 } = await userApi.createUser(user);
        const mytoken = user1?.token;
        localStorage.setItem("token", mytoken);
        localStorage.setItem("currentUser", JSON.stringify(user1));
        navigate("/shop");
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          console.log(error.response.data);
        }
      }
    } else {
      console.log("Something went wrong");
    }
  };

  const bg = {
    // background: "linear-gradient(to right, #1f8f8f, rgb(72, 105, 109))",
    height: "100vh",
  };

  return (
    <div className="container-fluid" style={bg}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-4 bg-white p-4 rounded shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h3>Welcome to E-Commerce</h3>
            </div>

            {/* Full Name */}
            <Input
              id="fullName"
              handleForm={handleForm}
              value={user.fullName}
              label="Full Name"
              inputErrors={errors.fullNameError}
            />

            {/* Age */}
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                className={`form-control ${errors.ageError && "is-invalid"}`}
                value={user.age}
                placeholder="Enter your age"
                onChange={handleForm}
              />
              {errors.ageError && <div className="invalid-feedback">{errors.ageError}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${errors.emailError && "is-invalid"}`}
                value={user.email}
                placeholder="Enter your email"
                onChange={handleForm}
              />
              {errors.emailError && <div className="invalid-feedback">{errors.emailError}</div>}
            </div>

            {/* Address */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className={`form-control ${errors.addressError && "is-invalid"}`}
                value={user.address}
                placeholder="Enter your address"
                onChange={handleForm}
              />
              {errors.addressError && <div className="invalid-feedback">{errors.addressError}</div>}
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleForm}
                  checked={user.gender === "male"}
                />
                <label htmlFor="male" className="ms-2 me-3">Male</label>

                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleForm}
                  checked={user.gender === "female"}
                />
                <label htmlFor="female" className="ms-2">Female</label>
              </div>
              {errors.genderError && <div className="text-danger">{errors.genderError}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${errors.passwordError && "is-invalid"}`}
                value={user.password}
                placeholder="Enter your password"
                onChange={handleForm}
              />
              {errors.passwordError && <div className="invalid-feedback">{errors.passwordError}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={
                errors.emailError ||
                errors.passwordError ||
                errors.addressError ||
                errors.ageError ||
                errors.fullNameError ||
                errors.genderError
              }
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-3">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
