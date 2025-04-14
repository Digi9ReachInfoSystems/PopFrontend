import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/loginApi";
import * as Styles from "./Login.style";  // Import styled-components
import dribbleImage from "../../assets/dribbleImage.png";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Prevent accessing login page if already logged in
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/admin", { replace: true });
        }
    }, []); // ✅ Runs only once when component mounts

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page

        const data = { username, password };

        try {
            console.log("Data", data);
            const response = await adminLogin(data);
            console.log("Admin logged in:", response);

            // Ensure the response contains a valid token
            if (response && response.token) {
                localStorage.setItem("token", response.token); // Store JWT Token
                navigate("/admin", { replace: true }); // Redirect to dashboard
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (error) {
            console.log("Error logging in:", error);
            setError("Invalid credentials, please try again.");
        }
    };

    return (
        <Styles.Container>
            <Styles.ImageContainer>
                <Styles.Image
                    src={dribbleImage} // Replace with the actual image URL
                    alt="Login Illustration"
                />
            </Styles.ImageContainer>
            <Styles.FormContainer>
                <Styles.Title>Welcome Back Admin!</Styles.Title>
                {error && <Styles.ErrorMessage>{error}</Styles.ErrorMessage>}
                <form onSubmit={handleLogin}>
                    <Styles.InputField
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username" // ✅ Added autocomplete
                    />
                    <Styles.InputField
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password" // ✅ Added autocomplete
                    />
                    <Styles.SubmitButton type="submit">Sign In</Styles.SubmitButton>
                </form>
            </Styles.FormContainer>
        </Styles.Container>
    );
};

export default Login;
