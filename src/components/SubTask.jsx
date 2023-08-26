import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Card,
    Checkbox,
    Grid,
    IconButton,
    Modal,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import SubtaskEditModal from './SubtaskEditModal';
import { useMessage } from './Header';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const SubTask = ({ task, fetchTasks, id, taskid, complete }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { showError, showSuccess } = useMessage();

    const deleteTask = useCallback(
        async function (taskid, id) {
            const res = await axios.delete(
                `http://localhost:8000/task/${id}/${taskid}`
            );
            const { message, success } = res.data;
            if (!success) return showError(message);
            showSuccess('Subtask Deleted sucessfully');
            fetchTasks();
        },
        [fetchTasks]
    );

    const handleCheckboxSubtask = () => {};
    return (
        <>
            <Card
                elevation={0}
                sx={{
                    // boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    p: 1.5,
                    mt: 2,
                    ml: 3,
                    // border: '0.5px solid smokewhite',
                }}
            >
                <Grid container display='flex' alignItems='center'>
                    <Grid item>
                        <Checkbox
                            onChange={() =>
                                handleCheckboxSubtask(taskid, complete)
                            }
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography>{task}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <DeleteIcon
                                onClick={() => deleteTask(taskid, id)}
                            />
                        </IconButton>
                        <IconButton>
                            <EditIcon onClick={handleOpen} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <SubtaskEditModal
                    taskid={taskid}
                    todoid={id}
                    handleClose={handleClose}
                    fetchTasks={fetchTasks}
                />
            </Modal>
        </>
    );
};

export default SubTask;
