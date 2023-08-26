import {
    Box,
    Card,
    Container,
    Grid,
    TextField,
    IconButton,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SortIcon from '@mui/icons-material/Sort';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Form, useForm } from '../hooks/useForm/useForm';
import { Input } from '../hooks/useForm/inputs';
import TaskCard from '../components/TaskCard';
import axios from 'axios';
import { useMessage } from '../components/Header';

const Main = () => {
    const [tasks, setTasks] = useState(null);
    const { showError, showSuccess } = useMessage();

    const handlers = useForm(
        {
            name: '',
        },
        { Input: TextField }
    );

    const fetchTasks = useCallback(
        async function () {
            setTasks(null);
            try {
                const res = await axios.get('http://localhost:8000/todo/');
                setTasks(res.data.todos);
            } catch (e) {
                console.log(e);
            }
        },
        [setTasks]
    );

    const submit = (res) => {
        const { success, message } = res.data;
        if (success) {
            fetchTasks();
            return showSuccess('Add Task Successfully');
        }
        showError(message);
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <>
            <Box mt={10}>
                <Container maxWidth='false'>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Box display='flex' alignItems='center'>
                                <IconButton>
                                    <WbSunnyIcon />
                                </IconButton>
                                <Typography variant='h5' sx={{ ml: 1 }}>
                                    My Day....
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item display='flex' alignItems='center'>
                            <IconButton>
                                <SortIcon />
                            </IconButton>
                            <Typography>Sort</Typography>
                        </Grid>
                        <Grid item display='flex' alignItems='center'>
                            <IconButton>
                                <LibraryBooksOutlinedIcon />
                            </IconButton>
                            <Typography>Group</Typography>
                        </Grid>
                        <Grid item display='flex' alignItems='center'>
                            <IconButton>
                                <LightbulbOutlinedIcon />
                            </IconButton>
                            <Typography>Suggstions</Typography>
                        </Grid>
                    </Grid>
                    <Form
                        handlers={handlers}
                        onSubmit={submit}
                        action={`http://localhost:8000/todo`}
                        method='post'
                        onError={console.log}
                    >
                        <Grid container mt={5} mb={3} spacing={2}>
                            <Grid item xs>
                                <Card
                                    elevation={0}
                                    sx={{
                                        p: 0.5,
                                        boxShadow:
                                            'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                    }}
                                >
                                    <Input
                                        variant='outlined'
                                        name='name'
                                        placeholder='Add a task'
                                        fullWidth
                                    />
                                </Card>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    type='submit'
                                    disabled={!handlers.values.name}
                                    sx={{
                                        mt: 1,
                                        boxShadow:
                                            'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                    }}
                                >
                                    <AddIcon fontSize='large' />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Form>
                    <TaskCard
                        fetchTasks={fetchTasks}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </Container>
            </Box>
        </>
    );
};

export default Main;
