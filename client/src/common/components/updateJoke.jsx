'use client';
import Grid from '@mui/material/Grid2';
import { Typography, Button, TextField } from '@mui/material';
import { useWriteContract } from 'wagmi';
import abi from '../../lib/JokeDappABI.json';
import { useForm } from 'react-hook-form';

export const UpdateJoke = ({ close, formattedTime, refreshJokeEndTime }) => {
  const { handleSubmit, reset, register } = useForm();
  const { writeContractAsync } = useWriteContract();

  const handleUpdateTime = async (time) => {
    await writeContractAsync({
      abi: abi,
      address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
      functionName: 'updateJokeEndTime',
      args: [BigInt(time)],
    });

    refreshJokeEndTime();
    reset();
    close();
  };
  const onSubmit = (data, e) => {
    e.preventDefault();

    const { time } = data;

    if (time) {
      handleUpdateTime(time);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' gap={2}>
        <Grid item>
          <Typography variant='body1' color='black'>
            Current joke end time is {formattedTime}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            {...register('time')}
            fullWidth
            placeholder='Enter time'
            type='number'
          />
        </Grid>
        <Grid item container justifyContent='flex-end' gap={1}>
          <Button
            sx={{
              color: 'red',
              textTransform: 'capitalize',
            }}
            onClick={() => close()}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            disableElevation
            sx={{
              color: 'green',
              textTransform: 'capitalize',
              ':hover': {
                backgroundColor: '#fff',
              },
            }}
            type='submit'
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
