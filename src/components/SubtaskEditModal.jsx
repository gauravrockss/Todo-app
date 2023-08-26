import { Box, Button, Card, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Input } from '../hooks/useForm/inputs';
import { Form, useForm } from '../hooks/useForm/useForm';
import axios from 'axios';
import { useMessage } from './Header';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
};
const SubtaskEditModal = ({ todoid, taskid, handleClose, fetchTasks }) => {
    const handlers = useForm(
        useMemo(
            () => ({
                task: '',
            }),
            []
        ),

        { Input: TextField }
    );
    const { showError, showSuccess } = useMessage();
    const submit = (res) => {
        console.log('submit subtask');
        const { success, message } = res.data;
        if (success) {
            fetchTasks();
            handleClose();
            return showSuccess('Edit SubTask Successfully');
        }
        showError(message);
    };
    const setValues = handlers.setValues;

    const updateTask = useCallback(
        async function () {
            try {
                const res = await axios.get('http://localhost:8000/todo/');
                const todos = res.data.todos;

                const todo = todos.find((tasks) => tasks._id === todoid);
                const tasks = todo.tasks.find((task) => task._id === taskid);
                const { task } = tasks;
                setValues({ task });
            } catch (e) {
                console.log(e);
            }
        },
        [setValues]
    );

    useEffect(() => {
        updateTask();
    }, [updateTask]);

    return (
        <>
            <Form
                handlers={handlers}
                onSubmit={submit}
                action={`http://localhost:8000/task/${todoid}/${taskid}`}
                method='PATCH'
                onError={console.log}
            >
                <Box sx={style}>
                    <Typography variant='h5' textAlign='center'>
                        UPDATE TASK
                    </Typography>

                    <Card
                        elevation={3}
                        sx={{
                            p: 0.5,
                            my: 2,
                        }}
                    >
                        <Input
                            variant='outlined'
                            name='task'
                            placeholder='update your tasks'
                            fullWidth
                        />
                    </Card>

                    <Button
                        type='submit'
                        variant='contained'
                        sx={{
                            textTransform: 'capitalize',
                        }}
                    >
                        Update
                    </Button>
                </Box>
            </Form>
        </>
    );
};

export default SubtaskEditModal;
