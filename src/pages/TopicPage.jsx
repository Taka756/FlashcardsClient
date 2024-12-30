import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { Box, Button, Typography } from "@mui/material";

const TopicPage = () => {
   const navigate = useNavigate()
  const { topicId } = useParams();
  const [topic, setTopic] = useState();
  useEffect(() => {
    fetchTopic();
  }, []);
  useEffect(() => {
    console.log(topic);
  }, [topic]);
  const fetchTopic = async () => {
    const topicData = (await api.get(`/topics/${topicId}`)).data;
    setTopic(topicData);
  };
  return (
    topic && (
      <Box display={"flex"} flexDirection={"column"} gap={3}> 
        <Typography>Topic ID: {topic.id}</Typography>
        <Typography>Title: {topic.title}</Typography>
        <Typography>Author: {topic.authorId}</Typography>
        <Typography>Subject: {topic.subject}</Typography>
        <Typography>Number of questions: {topic.numberOfQuestions}</Typography>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          {topic.flashcards.map((flashcard) => (
            <Box
              key={flashcard.id}
              color={"secondary"}
              backgroundColor="primary.main"
              display={"flex"}
              justifyContent={"space-between"}
              borderRadius={2}
              padding={1}
            >
              <Box>{flashcard.term}</Box>
              <Box>{flashcard.definition}</Box>
            </Box>
          ))}
        </Box>
        <Box display={"flex"} gap={1}>
          <Button onClick={() => navigate("edit")} variant="contained" color="secondary">Edit</Button>
          <Button variant="text" color="danger">Delete</Button>
        </Box>
      </Box>
    )
  );
};

export default TopicPage;
