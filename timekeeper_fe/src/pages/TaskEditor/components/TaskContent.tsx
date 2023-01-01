import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Button,  TextField, useTheme } from '@mui/material';
import EditableFields from './EditableFields';

const TaskContent = () => {
  return (
    <div><EditableFields initialValue='heading' onSave={()=>{}} tag="h4"/></div>
  )
}

export default TaskContent