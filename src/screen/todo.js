import { Button, Grid, TextField, Typography } from "@mui/material"
import { Box, Container, } from "@mui/system"
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useState } from "react"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Todo() {
    let [text, setText] = useState("")
    let [list, setList] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function add(e) {
        e.preventDefault()
        if (!text) {
            alert("Please fill the Todo")
        }
        else {
            let arr = list
            arr.push(text)
            setList(arr)
            // console.log(list)
        }
        setText("")
    }
    function deltodo(i) {
        let data = [...list]
        data.splice(i, 1)
        setList(data)
    };
    function updated(index, newList) {


        let arr = list
        // console.log(arr,"hjhj")
        console.log(arr.splice(1,[...newList]))
        // console.log(arr)
        // setList(arr)
        // setText("")
    }
    return (
        < Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }} >
            <Typography variant="h4" mb="6px">Firebase Database Todo</Typography>
            <Container component="main" maxWidth="xs">

                <Grid >
                    <Box sx={{ mt: 3, display: "flex", }}>
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
                                <Box sx={{ mt: 3, display: "flex", }}>
                                    <Typography variant="h5" key={i}>
                                        {
                                            e
                                        }
                                    </Typography>
                                    <Button variant="contained" sx={{ ml: 2 }} onClick={deltodo}>Delete</Button>
                                    <Button variant="contained" sx={{ ml: 2 }} onClick={handleOpen}>Edit</Button>
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
                            )
                        })}

                    </Grid>
                    <Box>

                    </Box>

                </Grid>
            </Container>
        </Box >
    )
}
export default Todo