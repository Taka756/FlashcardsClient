import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import SelectSubjectsModal from "../components/modals/SelectSubjectsModal";
import CloseIcon from "@mui/icons-material/Close";
import { subjects } from "../subjects";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const EditTopicPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { topicId } = useParams();
  const [topic, setTopic] = useState();
  const [newSubject, setNewSubject] = useState(null);
  const [updatedTopic, setUpdatedTopic] = useState(null)
  useEffect(() => {
    fetchTopic();
  }, []);
  useEffect(() => {
    console.log(newSubject);
  }, [newSubject]);
  useEffect(() => {
    console.log(topic);
  }, [topic]);
  const fetchTopic = async () => {
    const topicData = (await api.get(`/topics/${topicId}`)).data;
    setUpdatedTopic(topicData)
    setTopic(topicData);
  };

  const handleChangeSubject = (selectedSubject) => {
    setNewSubject(selectedSubject);
    
  };
  const handleChangeTitle = (value) => {
    setUpdatedTopic((prev) => ({
      ...prev,
      title: value
    }))
  }
  const handleFlashcardChange = (id, field, value) => {
    console.log(id)
    setUpdatedTopic((prevTopic) => ({
      ...prevTopic,
      flashcards: prevTopic.flashcards.map((flashcard) =>
        flashcard.id === id
          ? { ...flashcard, [field]: value }
          : flashcard
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = (await api.put(`/topics/edit/${topicId}`, updatedTopic)).data
    setUpdatedTopic(data)
  }
   
  return (
    topic && (
      <>
        <SelectSubjectsModal
          open={open}
          subject={topic.subject}
          onSubjectChange={handleChangeSubject}
          onClose={handleClose}
        />
        <Box component={"form"} onSubmit={(e) => handleSubmit(e)} display={"flex"} flexDirection={"column"} gap={3}>
          <Typography>Topic ID: {topic.id}</Typography>
          <TextField required error={!updatedTopic?.title} value={updatedTopic?.title} label={"Title"} color="secondary" helperText={!updatedTopic?.title ? "Title can't be empty" : ""} onChange={(e) => handleChangeTitle(e.target.value)} />
          <Typography>Author: {topic.authorId}</Typography>
          <Typography>Subject: {topic.subject}</Typography>
          <Box display={"flex"} gap={1}>
            <Button onClick={handleOpen} variant="contained" color="secondary">
              Select subject
            </Button>
            {newSubject && (
              <Box
                paddingLeft={1}
                borderRadius={1}
                backgroundColor={"secondary.main"}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <Typography color="primary">{newSubject.label}</Typography>
                </Box>
                <IconButton>
                  <CloseIcon
                    color="primary"
                    onClick={() => setNewSubject(null)}
                  />
                </IconButton>
              </Box>
            )}
          </Box>

          <Typography>
            Number of questions: {topic.numberOfQuestions}
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            {updatedTopic.flashcards.map((flashcard) => (
              
              <Box
                key={flashcard.id}
                color={"secondary"}
                backgroundColor="primary.main"
                display={"flex"}
                borderRadius={2}
                padding={1}
                gap={1}
              >
                <Box flex={1}>
                  <TextField
                    required
                    error={!flashcard.term}
                    id="outlined-multiline-flexible"
                    fullWidth
                    label="Term"
                    multiline
                    maxRows={4}
                    color="secondary"
                    value={flashcard.term}
                    onChange={(e) => handleFlashcardChange(flashcard.id, "term", e.target.value)}
                    helperText={!flashcard.term ? "Term can't be empty" : ""}
                  />
                </Box>
                <Box flex={1}>
                  <TextField
                    required
                    error={!flashcard.definition}
                    id="outlined-multiline-flexible"
                    fullWidth
                    label="Definition"
                    multiline
                    maxRows={4}
                    color="secondary"
                    value={flashcard.definition}
                    onChange={(e) => handleFlashcardChange(flashcard.id, "definition", e.target.value)}
                    helperText={!flashcard.definition? "Definition can't be empty" : ""}
                  />
                </Box>
              </Box>
            ))}
          </Box>
          <Box display={"flex"} gap={1}>
            <Button variant="contained" color="secondary" type="submit">
              Confirm changes
            </Button>
            <Button variant="text" color="danger">
              Delete
            </Button>
          </Box>
        </Box>
      </>
    )
  );
};

export default EditTopicPage;
