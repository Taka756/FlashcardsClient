import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useMemo, useState } from "react";
import TopicComponent from "../components/TopicComponent";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Settings } from "@mui/icons-material";
import FilterModalComponent from "../components/modals/FilterDialogComponent";
import { api } from "../api/api";
import { useLocation, useSearchParams } from "react-router-dom";

const BootstrapInput = styled(OutlinedInput)(({ theme }) => ({
  "&": {
    borderRadius: "16px",
    // padding: "1px 1px",
    backgroundColor: theme.palette.primary.main
  },
  "& fieldset": {
    border: "none",
  },
  "&:hover fieldset": {
    border: "none",
  },
  "&.Mui-focused fieldset": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    borderRadius: "0 16px 16px 0",
    // backgroundColor: "yellow",
    paddingBlock: "8px",
  },
}));

const ExplorePage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [topics, setTopics] = useState([]);
  // const [titleQuery, setTitleQuery] = useState(searchParams.get("title") ?? "")
  // const [subjectsQuery, setSubjectsQuery] = useState(searchParams.get("subject") ?? "");
  // const [flashcardsCountQuery, setFlashcardsCountQuery] = useState(searchParams.get("flashcardsCount") ?? "")
  
  const titleQuery = searchParams.get("title") ?? ""
  const subjectsQuery = searchParams.get("subject") ?? "";
  const flashcardsCountQuery = searchParams.get("flashcardsCount") ?? "";
  useEffect(() => {
  //   setTitleQuery(searchParams.get("title") ?? "");
  // setSubjectsQuery(searchParams.get("subject") ?? "");
  // setFlashcardsCountQuery(searchParams.get("flashcardsCount") ?? "");
    fetchTopics();
    console.log(searchParams.get("subject"))
    console.log(subjectsQuery)
    
  }, [ location]);

  const fetchTopics = async () => {
    const content = (await api.get(`/topics/all?title=${titleQuery}&subject=${subjectsQuery}&flashcardsCount=${flashcardsCountQuery}`)).data
      .content;
    setTopics(content);
  };
  
  const SettingsIconButton = styled(IconButton)(({ theme }) => ({
    // backgroundColor: theme.palette.background.primary,
    // "&:hover": {
    //   backgroundColor: theme.palette.background.secondary,
    // },
  }));

  const handleSubjectsChange = (selectedSubjects, selectedFlashcardsCount) => {
    // setSubjectsQuery(selectedSubjects);
    
    // selectedFlashcardsCount === "ALL"? setFlashcardsCountQuery("") : setFlashcardsCountQuery(selectedFlashcardsCount)
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (selectedFlashcardsCount && selectedFlashcardsCount !== "ALL"){
        newParams.set('flashcardsCount', selectedFlashcardsCount)
      } else {
        newParams.delete('flashcardsCount');
      }

      if (selectedSubjects.length > 0) {
        newParams.set('subject', selectedSubjects.join(','));
      } else {
        newParams.delete('subject');
      }

      
      return newParams;
    });
  };

  // const handleFlashcardsCountChange = (selectedFlashcardsCount) => {
  //   setFlashcardsCountQuery(selectedFlashcardsCount)
  //   setSearchParams((prevParams) => {
  //     const newParams = new URLSearchParams(prevParams);
  //     if (selectedFlashcardsCount){
  //       newParams.set('flashcardsCount', selectedFlashcardsCount)
  //     } else {
  //       newParams.delete('flashcardsCount');
  //     }
  //     return newParams
  //   })
  // }

  const handleSearchChange = (event) => {
    const queryValue = event.target.value;
    // setTitleQuery(queryValue);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (queryValue) {
        newParams.set('title', queryValue);
      } else {
        newParams.delete('title');
      }
      return newParams;
    });
  };

  return (
    <>
      <FilterModalComponent open={open} flashcardsCount={flashcardsCountQuery} subjects={subjectsQuery}  onSubjectsChange={handleSubjectsChange} onClose={handleClose} />
      <Box display="flex" flexDirection={"column"} gap={3}>
        <Box display={"flex"} gap={2}>
          <FormControl fullWidth>
            <BootstrapInput
              value={titleQuery}
              onChange={handleSearchChange}
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <SettingsIconButton onClick={handleOpen}>
            <Settings />
          </SettingsIconButton>
        </Box>

        <Grid container spacing={2}>
          {topics.map((e) => (
            <TopicComponent key={e.id} item={e}  />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ExplorePage;
