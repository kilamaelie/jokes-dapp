'use client';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Typography,
  Radio,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
} from '@mui/material';

export const AddJoke = ({}) => {
  const [question, setQuestion] = useState(''); // Question input
  const [answerOptions, setAnswerOptions] = useState(['']); // Dynamic array of answer options
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0); // Index of correct answer
  const [isActive, setIsActive] = useState(false); // Boolean for active state
  const maxOptions = 3;

  const handleAddOption = () => {
    if (answerOptions.length < maxOptions) {
      setAnswerOptions([...answerOptions, '']);
    }
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = answerOptions.filter((_, i) => i !== index);
    setAnswerOptions(updatedOptions);
    if (correctAnswerIndex >= updatedOptions.length) {
      setCorrectAnswerIndex(updatedOptions.length - 1); // Adjust correct answer index
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index] = value;
    setAnswerOptions(updatedOptions);
  };

  const handleSubmit = () => {
    const data = {
      question,
      answerOptions,
      correctAnswerIndex,
      isActive,
    };
    console.log(data);
    // Here you can send `data` to an API or handle it as needed
  };
  return (
    <Grid container direction='column' gap={2}>
      {/* Question Input */}
      <Grid item container direction='column' gap={1}>
        <Typography color='black'>Question</Typography>
        <TextField
          fullWidth
          placeholder='Question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Grid>

      {/* Dynamic Answer Options */}
      <Typography color='black'>Answers</Typography>
      {answerOptions.map((option, index) => (
        <Grid item key={index}>
          <TextField
            fullWidth
            placeholder={`Answer option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            InputProps={{
              endAdornment:
                index > 0 ? (
                  <Button
                    onClick={() => handleDeleteOption(index)}
                    sx={{ color: 'red' }}
                  >
                    Delete
                  </Button>
                ) : null,
            }}
          />
        </Grid>
      ))}

      {/* Add Button (Only next to the first text field) */}
      {answerOptions.length < maxOptions && (
        <Grid item>
          <Button
            sx={{
              color: 'black',
            }}
            onClick={handleAddOption}
          >
            Add Option
          </Button>
        </Grid>
      )}

      {/* Correct Answer Selection */}
      <Grid item>
        <RadioGroup
          value={correctAnswerIndex}
          onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}
        >
          {answerOptions.map((_, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={
                <Radio
                  sx={{
                    color: 'black',
                    '&.Mui-checked': {
                      color: 'green', // Green when checked
                    },
                  }}
                />
              }
              label={
                <Typography color='black' variant='body2'>
                  Correct Answer {index + 1}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </Grid>

      {/* Active State Toggle */}
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              sx={{
                color: 'black',
                '&.Mui-checked': {
                  color: 'green', // Green when checked
                },
              }}
            />
          }
          label={
            <Typography color='black' variant='body2'>
              Is Active
            </Typography>
          }
        />
      </Grid>

      {/* Submit Button */}
      <Grid item container justifyContent='flex-end' gap={1}>
        <Button
          sx={{
            color: 'black',
            textTransform: 'capitalize',
          }}
          onClick={handleSubmit}
        >
          Cancel
        </Button>
        <Button
          disableElevation
          sx={{
            ':hover': {
              backgroundColor: '#FFFf',
            },
          }}
          variant='contained'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
