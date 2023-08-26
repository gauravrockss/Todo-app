import React, { useCallback, useEffect, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    Grid,
    IconButton,
    Modal,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';

import AddEditModal from './AddEditModal';
import AddsubtaskModal from './AddsubtaskModal';
import SubTask from './SubTask';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMessage } from './Header';

const TaskCard = ({ fetchTasks, tasks }) => {
    const [todoid, setTodoid] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const editModalOpen = () => setEditModal(true);
    const editModalClose = () => setEditModal(false);

    const [subtaskModal, setSubtaskModal] = useState(false);
    const subtaskModalOpen = () => setSubtaskModal(true);
    const subtaskModalClose = () => setSubtaskModal(false);

    const { showError, showSuccess } = useMessage();
    const deleteTask = useCallback(
        async function (id) {
            const res = await axios.delete('http://localhost:8000/todo/' + id);
            const { message, success } = res.data;
            if (!success) return showError(message);
            showSuccess('Delete task sucessfully');
            fetchTasks();
        },
        [fetchTasks]
    );

    const Edit = (id) => {
        editModalOpen();
        setTodoid(id);
    };
    const Addsubtask = (id) => {
        subtaskModalOpen();
        setTodoid(id);
    };
    const handleCheckbox = (id) => {};
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs>
                    {tasks?.map((todo, id) => (
                        <Box key={id}>
                            <Accordion
                                sx={{
                                    my: 3,
                                    position: 'relative',
                                    '&:hover': {
                                        transform: 'scale(1)',

                                        '#options': {
                                            opacity: 1,
                                        },
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                >
                                    <Grid
                                        container
                                        display='flex'
                                        alignItems='center'
                                    >
                                        <Grid item>
                                            <Checkbox
                                                onChange={() =>
                                                    handleCheckbox(todo._id)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <Typography>{todo.name}</Typography>
                                        </Grid>
                                        <Box
                                            id='options'
                                            sx={{
                                                position: 'absolute',
                                                right: '50px',

                                                opacity: 0,
                                            }}
                                        >
                                            <Grid item>
                                                <IconButton>
                                                    <DeleteIcon
                                                        onClick={() =>
                                                            deleteTask(todo._id)
                                                        }
                                                    />
                                                </IconButton>
                                                <IconButton>
                                                    <EditIcon
                                                        onClick={() =>
                                                            Edit(todo._id)
                                                        }
                                                    />
                                                </IconButton>
                                                <Button
                                                    onClick={() =>
                                                        Addsubtask(todo._id)
                                                    }
                                                    variant='text'
                                                    sx={{
                                                        color: 'grey',
                                                        textTransform:
                                                            'capitalize',
                                                        mx: 1,
                                                    }}
                                                >
                                                    Add subtask
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </AccordionSummary>
                                {/* subtask */}
                                <AccordionDetails>
                                    {todo.tasks.map((task, index) => (
                                        <SubTask
                                            task={task.task}
                                            fetchTasks={fetchTasks}
                                            taskid={task._id}
                                            id={todo._id}
                                        />
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    ))}
                </Grid>
            </Grid>
            <Modal
                open={subtaskModal}
                onClose={subtaskModalClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <AddsubtaskModal
                    id={todoid}
                    AddModalClose={subtaskModalClose}
                    fetchTasks={fetchTasks}
                />
            </Modal>
            <Modal open={editModal} onClose={editModalClose}>
                <AddEditModal
                    Editid={todoid}
                    editModalClose={editModalClose}
                    fetchTasks={fetchTasks}
                />
            </Modal>
        </>
    );
};

export default TaskCard;
