import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useMessage } from './Header';

const AddsubtaskModal = ({ id, AddModalClose, fetchTasks }) => {
    const [tasks, setTasks] = useState([]);

    const { showSuccess, showError } = useMessage();

    const addTask = () => {
        const newDetail = [...tasks, ''];
        setTasks(newDetail);
    };

    const handleChange = (e, i) => {
        const value = e.target.value;
        tasks[i] = value;
        setTasks([...tasks]);
    };
    console.log(tasks);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:8000/task/${id}`, {
                tasks,
            });
            const { success, message } = res.data;
            if (success) {
                fetchTasks();
                return showSuccess('Add SubTask Successfully');
            }
            showError(message);
        } catch (e) {
            console.log(e);
        }
        AddModalClose();
    };

    return (
        <Card
            sx={{
                overflow: 'auto',
                maxHeight: '80vh',
                padding: '16px',
                '::-webkit-scrollbar': { display: 'none' },
            }}
        >
            <form onSubmit={onSubmit}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    <Grid item>
                        <Typography variant='h5' textAlign='center'>
                            Add Subtask
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={addTask}
                            variant='text'
                            sx={{
                                textTransform: 'capitalize',
                                color: 'grey',
                            }}
                        >
                            Add task
                        </Button>
                    </Grid>
                </Grid>
                {tasks.map((task, i) => (
                    <Card
                        key={i}
                        elevation={5}
                        sx={{
                            my: 2,
                        }}
                    >
                        <TextField
                            variant='outlined'
                            name={task[i]}
                            onChange={(e) => handleChange(e, i)}
                            placeholder='Add SubTask'
                            fullWidth
                        />
                    </Card>
                ))}
                <Button
                    type='submit'
                    variant='contained'
                    sx={{
                        my: 1,
                        textTransform: 'capitalize',
                    }}
                >
                    Add
                </Button>
            </form>
        </Card>
    );
};

export default AddsubtaskModal;
