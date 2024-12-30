import { Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const subjects = [
  { MATH: "Math" },
  { SCIENCE: "Science" },
  { HISTORY: "History" },
  { LITERATURE: "Literature" },
  { PHYSICS: "Physics" },
  { CHEMISTRY: "Chemistry" },
  { BIOLOGY: "Biology" },
  { ART: "Art" },
  { MUSIC: "Music" },
  { COMPUTER_SCIENCE: "Computer Science" },
];

const numberOfFlashcards = [
  { ALL: "All" },
  { FROM_ZERO_TO_TWO: "0-2" },
  { FROM_THREE_TO_FIVE: "3-5" },
  { GREATER_THAN_FIVE: "> 5" },
];

const FilterDialogComponent = ({ open, onSubjectsChange, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSubjects, setSelectedSubjects] = useState(
    searchParams.get("subject") ?? []
  );
  const [selectedFlashcardsCount, setSelectedFlashcardsCount] = useState(
    searchParams.get("flashcardsCount") ?? "ALL"
  );

  useEffect(() => {
    setSelectedSubjects(searchParams.get("subject")?.split(",") ?? []);
    setSelectedFlashcardsCount(searchParams.get("flashcardsCount") ?? "ALL")
  }, [open]);

  // useEffect(() => {
  //   console.log(selectedFlashcardsCount)
  // })

  const handleCheckboxChange = (key) => {
    setSelectedSubjects((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleRangeChange = (key) => {
    
    setSelectedFlashcardsCount(key)
    // setSelectedFlashcardsCount((prev) =>
    //   prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    // );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          // handleClose();
        },
      }}
    >
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <DialogContentText>Flashcards Range</DialogContentText>
        <Grid container spacing={2}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {numberOfFlashcards.map((range) => {
              const [key, label] = Object.entries(range)[0];
              return (
                <Grid  key={key}>
                  
                  <FormControlLabel
                  value={key}
                  control={
                    <Radio
                      checked={key == selectedFlashcardsCount}
                      onChange={() => handleRangeChange(key)}
                      color="secondary"
                    />
                  }
                  label={label}
                />
                </Grid> 
              );
            })}
          </RadioGroup>
        </Grid>
        <DialogContentText>Subjects</DialogContentText>
        <Grid container spacing={2}>
          {subjects.map((subject) => {
            const [key, label] = Object.entries(subject)[0];
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSubjects.includes(key)}
                      onChange={() => handleCheckboxChange(key)}
                      color="secondary"
                    />
                  }
                  label={label}
                />
              </Grid>
            );
          })}
        </Grid>

        {/* <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        /> */}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            onSubjectsChange(selectedSubjects, selectedFlashcardsCount)
          }
        >
          Apply changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialogComponent;
