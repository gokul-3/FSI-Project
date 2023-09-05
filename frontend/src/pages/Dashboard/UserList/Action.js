import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import Dialog from './Dialog'

const Action = ({ data,actionType,setActionType,setActionMessage, setActionDone }) => {

    const [display, setDisplay] = useState(false);

    const handleEdit = () => {
        setActionType('edit')
        setDisplay(true)
    }
    const handleDelete = () => {
        setActionType('delete')
        setDisplay(true)
    }

    return (
        display ? <><Dialog open={display} setOpen={setDisplay} data={data} actionType={actionType}  setActionType={setActionType} setActionMessage={setActionMessage} setActionDone={setActionDone} Dialog></Dialog> </>:
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="Edit" onClick={handleEdit}>
                    <EditIcon sx={{ marginRight: 1 }}
                    ></EditIcon>
                </IconButton>
                <IconButton aria-label="Delete" onClick={handleDelete}>
                    <DeleteIcon sx={{ marginRight: 1 }}
                    ></DeleteIcon>
                </IconButton>
            </div>
    )
}

export default Action;