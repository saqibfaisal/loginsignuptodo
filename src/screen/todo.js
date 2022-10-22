import {
  Button,
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Todo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  let [text, setText] = useState("");
  let [list, setList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handle = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function add(e) {
    const reference = ref(database, `todo/${location.state.username}`);
    const newRef = push(reference);
    set(newRef, {
      text,
      time: `${12 + new Date().getHours()}:${new Date().getMinutes()}`,
    });
  }
  function deltodo(i) {
    let data = [...list];
    data.splice(i, 1);
    setList(data);
  }
  let updated = (index, value) => {
    let editedTask = prompt("", value);
    list[index] = editedTask;
    setList([...list]);
  };
  const handleGetDatabase = () => {
    let reference = ref(database, `todo/${location.state.username}`);
    onValue(reference, (snapshot) => {
      console.log(Object.values(snapshot.val()));
      setList(Object.values(snapshot.val()));
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
                {location?.state?.username}-
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
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
              onClick={add}
            >
              Add
            </Button>
          </Box>

          <Grid>
            {list.map((e, i) => {
              return (
                <Box sx={{ mt: 3, display: "flex" }}>
                  <Box>

                    <Typography variant="h5" key={i}>
                      {e?.text}
                    </Typography>
                    <br />
                    <Typography variant="body1 " >time: {e?.time}</Typography>
                  </Box>
                  <Button variant="contained" sx={{ ml: 2 }} onClick={deltodo}>
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={handleOpen}
                  >
                    Edit
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <TextField onChange={(e) => setText(e.target.value)} />
                      <Button onClick={() => updated(i, text)}>update</Button>
                    </Box>
                  </Modal>
                </Box>
              );
            })}
          </Grid>
          <Box></Box>
        </Grid>
      </Container>
    </Box>
  );
}
export default Todo;
