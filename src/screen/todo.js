import {
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import * as React from "react";
import Modal from "@mui/material/Modal";
import { Signout, database, signUpUser } from "../config/firebasemethod";
import { onValue, ref, set, push } from "firebase/database";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

import AddIcon from "@mui/icons-material/Add";
function Todo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let [todo, setTodo] = useState("");
  let [listOfTodos, setList] = useState([]);
  let add = () => {
    const reference = ref(database, `todoapp/${location.state.username}`);
    const newRef = push(reference);
    set(newRef, {
      todo,
      time: `${12 + new Date().getHours()}:${new Date().getMinutes()}`,
    });
  };

  const handleGetDatabase = () => {
    let reference = ref(database, "todoapp/");
    onValue(reference, (snapshot) => {
      console.log(snapshot.val()[location.state.username]);
      setList([...Object.values(snapshot.val()[location.state.username])]);
      console.log(listOfTodos);
      // console.log(location.state);
    });
  };
  let handelsignout = () => {
    Signout()
      .then((s) => {
        console.log(s);
        navigate("/login");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  React.useEffect(() => {
    handleGetDatabase();
  }, []);
  let date = new Date();
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="secondary"
            >
              <Typography
                variant="subtitle"
                sx={{ marginRight: "10px" }}
                color="primary"
              >
                {location?.state?.username}
              </Typography>
              <AccountCircle color="success" fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handelsignout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Box>
      <Typography
        variant="caption"
        fontWeight="bold"
        gutterBottom
        color="primary"
      >
        {date.toString()}
      </Typography>
      <Typography variant="h4" mb="6px">
        Firebase Database Todo
      </Typography>
      <Container component="main" maxWidth="xs">
        <Grid>
          <Box sx={{ mt: 3, display: "flex" }}>
            <TextField
              margin="normal"
              fullWidth
              label="Enter the todo"
              autoFocus
              onChange={(e) => {
                setTodo(e.target.value);
                // clearElem(e.target);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={() => {
                add();
              }}
            >
              Add
            </Button>
          </Box>

          <Grid>
            {/* {list.map((e, i) => { */}
            {/* return ( */}
            <Box sx={{ mt: 3, display: "flex" }}>
              <Box>
                {/* <Typography variant="h5" key={i}>
                      {e?.text}
                    </Typography> */}
                <Box>
                  {listOfTodos.map((e, i) => (
                    <Box
                      sx={{
                        padding: "20px",
                        margin: "20px 0px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                      key={i}
                    >
                      {e.todo}
                    </Box>
                  ))}
                </Box>
                <br />
                {/* <Typography variant="body1 ">time: {e?.time}</Typography> */}
              </Box>
              {/* <Button variant="contained" sx={{ ml: 2 }} onClick={deltodo}>
                    Delete
                  </Button> */}
              {/* <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={handleOpen}
                  >
                    Edit
                  </Button> */}
              {/* <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description" */}
              {/* > */}
              {/* <Box sx={style}>
                      <TextField onChange={(e) => setText(e.target.value)} />
                      <Button onClick={() => updated(i, text)}>update</Button>
                    </Box> */}
              {/* </Modal> */}
            </Box>
            {/* );
            })} */}
          </Grid>
          <Box></Box>
        </Grid>
      </Container>
    </Box>
  );
}
export default Todo;

// import { Button, Container, Divider, TextField, Typography } from '@mui/material'
// import { Box } from '@mui/system'
// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Signout, database, signUpUser } from "../config/firebasemethod";
// import { onValue, ref, set, push } from "firebase/database";
// import IconButton from "@mui/material/IconButton";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import AddIcon from "@mui/icons-material/Add";
// import '../App.css'

// function ToDoApp() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null)

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   let [todo, setTodo] = useState("");
//   let [listOfTodos, setList] = useState([]);
//   let add = () => {

//     const reference = ref(database, `todoapp/${location.state.username}`);
//     const newRef = push(reference);
//     set(newRef, {
//       todo,
//       time: `${12 + new Date().getHours()}:${new Date().getMinutes()}`,
//     });
//   };

//   const handleGetDatabase = () => {
//     let reference = ref(database, "todoapp/");
//     onValue(reference, (snapshot) => {
//       console.log(snapshot.val()[location.state.username]);
//       setList([...Object.values(snapshot.val()[location.state.username])]);
//       console.log(listOfTodos);
//       // console.log(location.state);
//     });
//   };
//   let handelsignout = () => {
//     Signout().then((s) => {
//       console.log(s)
//       navigate('/login')
//     }).catch((er) => {
//       console.log(er)
//     })
//   }

//   useEffect(() => {
//     handleGetDatabase();
//   }, []);
//   let date = new Date();
//   return (
//     <div className='bg'>
//       <Box>
//         <Container
//           className="main"
//           maxWidth="md"

//         >
//           <Box marginBottom="20px">
//             <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//               {auth && (
//                 <div>
//                   <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="menu-appbar"
//                     aria-haspopup="true"
//                     onClick={handleMenu}
//                     color="secondary"
//                   >
//                     <Typography
//                       variant="subtitle"
//                       sx={{ marginRight: "10px" }}
//                       color="primary"
//                     >
//                       {location.state.username}
//                     </Typography>
//                     <AccountCircle color="success" fontSize="large" />
//                   </IconButton>
//                   <Menu
//                     id="menu-appbar"
//                     anchorEl={anchorEl}
//                     anchorOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                   >
//                     <MenuItem onClick={handelsignout}>Logout</MenuItem>
//                   </Menu>
//                 </div>
//               )}
//             </Box>

//             <Typography
//               variant="caption"
//               fontWeight="bold"
//               gutterBottom
//               color="primary"
//             >
//               {date.toString()}
//             </Typography>

//             <Typography
//               sx={{ color: "white" }}
//               variant="h4"
//               fontWeight="bolder"
//             >
//               TodoList
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               backgroundColor: "white",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <TextField
//               variant="outlined"
//               multiline={true}
//               sx={{
//                 backgroundColor: "white",
//                 margin: "5px",
//                 width: "90%",
//               }}
//               color="primary"
//               label="Enter todo"
//               onChange={(e) => {
//                 setTodo(e.target.value);
//                 // clearElem(e.target);
//               }}
//             />
//             <Button
//               variant="contained"
//               color="warning"
//               sx={{
//                 fontSize: "18px",
//                 padding: "10px 30px",
//                 fontweight: "bolder",
//               }}
//               onClick={() => {
//                 add();
//               }}
//               startIcon={<AddIcon />}
//               fontSize="larger"
//             >
//               Add
//             </Button>
//           </Box>

//           <Box marginTop="30px" marginBottom="60px">
//             <Divider color="error" />
//           </Box>

//           <Box>
//             {listOfTodos.map((e, i) => (
//               <Box
//                 sx={{
//                   padding: "20px",
//                   margin: "20px 0px",
//                   backgroundColor: "white",
//                   borderRadius: "10px",
//                 }}
//                 key={i}
//               >
//                 {e.todo}
//               </Box>
//             ))}
//           </Box>
//         </Container>
//       </Box>
//     </div>

//   )
// }

// export default ToDoApp
