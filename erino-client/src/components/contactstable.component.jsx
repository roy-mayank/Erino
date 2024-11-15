import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import axios from 'axios';
import mongoose from 'mongoose';

function EditToolbar(props) {
    // eslint-disable-next-line react/prop-types
    const { setRows, setRowModesModel } = props;

    const handleClick = async () => {
        const newRowId = new mongoose.Types.ObjectId().toString();
        const newRow = {
            _id: newRowId,
            firstName: "sample",
            lastName: "name",
            email: "sample@email.com",
            phoneNumber: "123456789",
            company: "Sample",
            role: "SWE",
            isNew: true,
        };

        try {
            const response = await axios.post('http://localhost:3001/contacts', newRow);
            const newContact = response.data;

            setRows((oldRows) => [...oldRows, newContact]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [newContact._id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
            }));
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };


    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export default function FullFeaturedCrudGrid() {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    React.useEffect(() => {
        axios.get('http://localhost:3001/contacts')
            .then((response) => {
                setRows(response.data);
            })
            .catch((error) => {
                console.error("Error fetching contacts:", error);
            });
    }, []);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel((prevModel) => ({
            ...prevModel,
            [id]: { mode: GridRowModes.View },
        }));
    };


    const handleDeleteClick = (id) => async () => {
        try {
            await axios.delete(`http://localhost:3001/contacts/${id}`);
            setRows((prevRows) => prevRows.filter((row) => row._id !== id));
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        try {
            let updatedRow;

            if (newRow.isNew) {
                const response = await axios.post("http://localhost:3001/contacts", newRow);
                updatedRow = response.data;

                setRows((prevRows) =>
                    prevRows.map((row) => (row._id === newRow._id ? { ...updatedRow, isNew: false } : row))
                );
                return { ...updatedRow, isNew: false };
            } else {
                const response = await axios.put(`http://localhost:3001/contacts/${newRow._id}`, newRow);
                updatedRow = response.data;

                setRows((prevRows) =>
                    prevRows.map((row) => (row._id === newRow._id ? { ...updatedRow, isNew: false } : row))
                );
                return updatedRow;
            }
        } catch (error) {
            console.error("Error updating row:", error);
            throw error;
        }
    };


    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
        { field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
        { field: 'email', headerName: 'Email', width: 200, editable: true },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150, editable: true },
        { field: 'company', headerName: 'Company', width: 180, editable: true },
        { field: 'role', headerName: 'Job Title', width: 180, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key="save"
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{ color: 'primary.main' }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key="cancel"
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key="edit"
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': { color: 'text.secondary' },
                '& .textPrimary': { color: 'text.primary' },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                getRowId={(row) => row._id}
                rowModesModel={rowModesModel}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: EditToolbar }}
                slotProps={{ toolbar: { setRows, setRowModesModel } }}
            />
        </Box>
    );
}
