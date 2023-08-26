import { Box, Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Input } from '../hooks/useForm/inputs';
import { Form, useForm } from '../hooks/useForm/useForm';
import { useMessage } from './Header';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
};

const AddEditModal = ({ Editid, editModalClose, fetchTasks }) => {
    const handlers = useForm(
        useMemo(
            () => ({
                name: '',
            }),
            []
        ),

        { Input: TextField }
    );

    const { showSuccess, showError } = useMessage();
    const submit = (res) => {
        const { success, message } = res.data;
        if (success) {
            fetchTasks();
            editModalClose();
            return showSuccess('Edit Task Successfully');
        }
        showError(message);
    };
    const setValues = handlers.setValues;

    const updateTask = useCallback(
        async function () {
            try {
                const res = await axios.get('http://localhost:8000/todo/');
                const task = res.data.todos;

                const data = task.find((t) => t._id === Editid);

                const { name } = data;
                setValues({ name });
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
                action={'http://localhost:8000/todo/' + Editid}
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
                            name='name'
                            placeholder='update your tasks'
                            fullWidth
                        />
                    </Card>

                    <Button
                        type='submit'
                        disabled={!handlers.values.name}
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

export default AddEditModal;
