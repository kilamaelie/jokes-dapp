import Grid from '@mui/material/Grid2';
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';

export const Jokes = () => {
  return (
    <Paper
      sx={{
        padding: '20px 20px',
        borderRadius: '20px',
        backgroundColor: '#b8b8b8',
      }}
    >
      <Grid container direction='column' gap={2}>
        <Grid item>
          <Typography align='center' variant='subtitle1' color='black'>
            What is the capital of DRC?
          </Typography>
        </Grid>
        <Grid item container justifyContent='center'>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel
                value='female'
                control={<Radio />}
                label={
                  <Typography variant='body2' color='black'>
                    Female
                  </Typography>
                }
              />
              <FormControlLabel
                value='male'
                control={<Radio />}
                label={
                  <Typography variant='body2' color='black'>
                    Male
                  </Typography>
                }
              />
              <FormControlLabel
                value='other'
                control={<Radio />}
                label={
                  <Typography variant='body2' color='black'>
                    Other
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item container justifyContent='flex-end' gap={1}>
          <Button
            disableElevation={true}
            sx={{
              textTransform: 'capitalize',
            }}
          >
            Back
          </Button>
          <Button
            disableElevation={true}
            sx={{
              textTransform: 'capitalize',
              color: '#FFD493',
            }}
          >
            Next
          </Button>
          <Button
            disableElevation={true}
            variant='contained'
            sx={{
              textTransform: 'capitalize',
              ':hover': {
                backgroundColor: 'white',
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
