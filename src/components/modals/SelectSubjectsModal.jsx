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
import { useEffect, useState } from "react";
import { subjects } from "../../subjects";


const SelectSubjectsModal = ({ open, subject, onSubjectChange,onClose }) => {
    const [selectedSubject, setSelectedSubject] = useState(subject);
    
    useEffect(() => {
        const foundSubject =  subjects.find(sub => sub.key === subject)
        if (!open) {
          setSelectedSubject(foundSubject); 
        }
      }, [open]);

    const handleSelectedSubject = (subjectKey) => {
        console.log(subjectKey)
        const foundSubject =  subjects.find(subject => subject.key === subjectKey)
        setSelectedSubject(foundSubject)
    }
    return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
            event.preventDefault()
            onSubjectChange(selectedSubject)
            onClose()
        },
      }}
    >
      <DialogTitle>Subjects</DialogTitle>
      <DialogContent>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <Grid container spacing={2}>
            {subjects.map((subject) => {
            //   const [key, label] = Object.entries(range)[0];
                const key = subject.key
                const label = subject.label
              return (
                <Grid key={key} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <FormControlLabel
                    value={key}
                    control={
                      <Radio
                          checked={key == selectedSubject?.key}
                          onChange={(e) => handleSelectedSubject(e.target.value)}
                        color="secondary"
                      />
                    }
                    label={label}
                  />
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
        >
          Apply changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectSubjectsModal;
