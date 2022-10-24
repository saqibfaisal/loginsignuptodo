import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signUpUser, SignupUser } from "../config/firebasemethod";
import { Link, Router, useNavigate } from "react-router-dom";
import PopupAlert from "../PopupAlert";
function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [Popupsuccess, setPopupsuccess] = React.useState(false);
  const [popupmessage, setpopupmessage] = React.useState("");
  let navigate = useNavigate();
  let signup = () => {
    signUpUser({ email, password, username })
      .then((success) => {
        setpopupmessage(success);
        setPopupsuccess(true);
        console.log(success);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    setPopupsuccess(false);
  };
//   let locate = () => {
//     navigate("/login");
//   };
let handleSubmit = (e) => {
    e.preventDefault()
}
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signup}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {Popupsuccess ? <PopupAlert message={popupmessage} /> : ""}
    </div>
  );
}
export default Signup;

// import {
//   Alert,
//   AlertTitle,
//   Box,
//   Button,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PopupAlert from "../PopupAlert";
// import { signUpUser } from "../config/firebasemethod";
// import "../App.css";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [Popupsuccess, setPopupsuccess] = useState(false);
//   const [popupmessage, setpopupmessage] = useState("");
//   let navigate = useNavigate();
//   let signup = () => {
//     signUpUser({ email, password, username })
//       .then((success) => {
//         setpopupmessage(success);
//         setPopupsuccess(true);
//         console.log(success);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     setPopupsuccess(false);
//   };
//   let locate = () => {
//     navigate("/login");
//   };
//   return (
//     <div className="bg">
//       <Box
//         sx={{
//           backgroundColor: "#222",
//           width: "45%",
//           border: "2px solid white",
//           m: "auto",
//           borderRadius: "15px",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{ pt: 2, fontWeight: "bold" }}
//           align="center"
//           color="white"
//         >
//           Sign Up
//         </Typography>
//         <Box sx={{ px: "80px", py: 3, width: "100%" }}>
//           <Box>
//             <TextField
//               id="outlined-basic"
//               label="Username"
//               variant="standard"
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </Box>
//           <Box>
//             <TextField
//               id="outlined-basic"
//               color="warning"
//               label="Email"
//               variant="standard"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Box>
//           <Box>
//             <TextField
//               id="outlined-basic"
//               label="Password"
//               variant="standard"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Box>
//           <Box>
//             <Button onClick={signup}>Signin</Button>
//           </Box>
//           <Typography variant="p" component="span" sx={{ pt: 1 }} color="white">
//             Already have an account?
//           </Typography>
//           <Typography
//             variant="p"
//             component="span"
//             sx={{ pt: 1 }}
//             onClick={locate}
//             color="blue"
//           >
//             <Button> Login</Button>
//           </Typography>
//         </Box>
//       </Box>

//       {Popupsuccess ? <PopupAlert message={popupmessage} /> : ""}
//     </div>
//   );
// }

// export default Signup;
