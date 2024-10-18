'use client';
import Grid from '@mui/material/Grid2';
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Paper,
  FormControl,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import abi from '../../lib/JokeDappABI.json';
import { LoadingButton } from '@mui/lab';
export const Jokes = ({ allJokes, isLoadingAllJokes }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [item, setItem] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(null); // Track selected radio option
  const { address } = useAccount();

  const { data: hasParticipanted, refetch } = useReadContract({
    abi: abi,
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    functionName: 'hasParticipanted',
    args: [address],
  });

  const handleChange = (direction) => {
    if (direction === 'next' && selectedIndex < allJokes.length - 1) {
      setSelectedIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selected option when navigating
    } else if (direction === 'back' && selectedIndex > 0) {
      setSelectedIndex((prevIndex) => prevIndex - 1);
      setSelectedOption(null); // Reset selected option when navigating
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option on radio change
  };

  const { writeContractAsync, isPending } = useWriteContract();

  const handleSubmit = async () => {
    const data = await writeContractAsync({
      abi: abi,
      address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
      functionName: 'participate',
      args: [selectedIndex, selectedOption],
    });
    if (data) {
      refetch();
    }
  };

  useEffect(() => {
    if (allJokes.length > 0) {
      setItem(allJokes[selectedIndex]);
    }
  }, [selectedIndex, allJokes]);

  console.log('====================================');
  console.log(hasParticipanted);
  console.log('====================================');

  return (
    <Paper
      sx={{
        padding: '20px 20px',
        borderRadius: '20px',
        backgroundColor: '#b8b8b8',
      }}
    >
      {isLoadingAllJokes ? (
        <Grid container justifyContent='center'>
          <Grid item>
            <Typography variant='body1' color='black'>
              Loading ...
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction='column' gap={2}>
          {hasParticipanted ? (
            <Grid item>
              <Typography align='center' variant='subtitle1' color='black'>
                You are already participating
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item>
                <Typography align='center' variant='subtitle1' color='black'>
                  {item?.question}
                </Typography>
              </Grid>
              <Grid item container justifyContent='center'>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={selectedOption} // Set selected value
                    onChange={handleRadioChange} // Handle radio option change
                  >
                    {item?.answerOptions?.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={index} // Set the value to the answer option
                        control={<Radio />}
                        label={
                          <Typography variant='body2' color='black'>
                            {option}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
          )}
          {!hasParticipanted && (
            <Grid item container justifyContent='flex-end' gap={1}>
              <Button
                disableElevation
                sx={{ textTransform: 'capitalize' }}
                onClick={() => handleChange('back')}
                disabled={selectedIndex === 0} // Disable back button at first joke
              >
                Back
              </Button>
              <Button
                disableElevation
                sx={{ textTransform: 'capitalize', color: '#FFD493' }}
                onClick={() => handleChange('next')}
                disabled={selectedIndex === allJokes.length - 1} // Disable next button at last joke
              >
                Next
              </Button>
              <LoadingButton
                loading={isPending}
                disableElevation
                variant='contained'
                sx={{
                  textTransform: 'capitalize',
                  ':hover': {
                    backgroundColor: 'white',
                  },
                }}
                onClick={() => handleSubmit()}
              >
                Submit
              </LoadingButton>
            </Grid>
          )}
        </Grid>
      )}
    </Paper>
  );
};
