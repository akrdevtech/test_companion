import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  IconButton,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  initialValue: string;
  onSave: (newValue: string) => void;
  tag: "h2" | "h3" | "h4";
}

const getComponentSyleClasses = (theme: Theme, tag: string) => {
  let fontTag = theme.typography.body1.fontSize;
  switch (tag) {
    case "h1":
      fontTag = theme.typography.h1.fontSize;
      break;
    case "h2":
      fontTag = theme.typography.h2.fontSize;
      break;
    case "h3":
      fontTag = theme.typography.h3.fontSize;
      break;
    case "h4":
      fontTag = theme.typography.h4.fontSize;
      break;
    case "h5":
      fontTag = theme.typography.h5.fontSize;
      break;
    case "h6":
      fontTag = theme.typography.h6.fontSize;
      break;
    default:
      break;
  }
  return {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    textComponent: {
      margin: 0,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    textFieldInput: {
      fontSize: fontTag
    },
    iconButton: {
      margin: theme.spacing(1),
    },
  };
};

const EditableFields: React.FC<Props> = ({ initialValue, onSave, tag }) => {
  const theme = useTheme();
  const classes = getComponentSyleClasses(theme, tag);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (textFieldRef.current && !textFieldRef.current.contains(event.target as Node)) {
      // Call your function here
      handleSaveClick()
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [textFieldRef]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(value);
  };

  return (
    <Grid sx={classes.container}>
      {isEditing ? (
        <TextField
          sx={classes.textField}
          value={value}
          variant="standard"
          onChange={(event) => setValue(event.target.value)}
          InputProps={{ disableUnderline: true, sx : classes.textFieldInput }}
          inputRef={textFieldRef}
        />
      ) : (
        <Typography
          variant={tag}
          sx={classes.textComponent}
          onClick={handleEditClick}
        >
          {value}
        </Typography>
      )}
      {isEditing && (
        <IconButton
          color="primary"
          sx={classes.iconButton}
          onClick={handleSaveClick}
          size="small"
        >
          <CheckIcon />
        </IconButton>
      )}
      {!isEditing && (
        <IconButton
          color="primary"
          sx={classes.iconButton}
          onClick={handleEditClick}
          size="small"
        >
          <EditIcon />
        </IconButton>
      )}
    </Grid>
  );
};

export default EditableFields;
