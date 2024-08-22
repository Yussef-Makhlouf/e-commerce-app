
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import userloginApi from "../apis/userloginApi";
import { useAuth } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function Login({ onLogin }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailError: "", passwordError: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\*\@\%\$\#]).{12,30}$/;

  const validateForm = (name, value) => {
    switch (name) {
      case "email":
        return !value
          ? "Please, this field is required"
          : !emailRegex.test(value)
          ? "Enter a valid Email"
          : "";
      case "password":
        return !value
          ? "Please, this field is required"
          : !passwordRegex.test(value)
          ? "Enter a valid Password (12+ chars, A-Z, a-z, 0-9, @#$%)"
          : "";
      default:
        return "";
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [`${name}Error`]: validateForm(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.emailError && !errors.passwordError) {
      setLoading(true);
      try {
        const { data: userData } = await userloginApi.createUser(user);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        onLogin();
        navigate(from || "/shop");
      } catch (err) {
        setErrors({ ...errors, generalError: "Login failed. Try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Login to E-Commerce</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`form-control ${errors.emailError ? "is-invalid" : ""}`}
                    value={user.email}
                    onChange={handleForm}
                    placeholder="Enter your email"
                  />
                  {errors.emailError && (
                    <div className="invalid-feedback">{errors.emailError}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={`form-control ${errors.passwordError ? "is-invalid" : ""}`}
                    value={user.password}
                    onChange={handleForm}
                    placeholder="Enter your password"
                  />
                  {errors.passwordError && (
                    <div className="invalid-feedback">{errors.passwordError}</div>
                  )}
                </div>

                {errors.generalError && (
                  <div className="alert alert-danger text-center" role="alert">
                    {errors.generalError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading || errors.emailError || errors.passwordError}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="text-center mt-3">
                <span>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
