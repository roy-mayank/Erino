import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function Crudaccordian() {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ fontWeight: "bold" }}
                >
                    <span className="material-symbols-outlined">
                        person_add
                    </span>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 1000, alignItems: "center", alignContent: "center" }}>
                    <TextField id="standard-basic" label="First Name" variant="standard" />
                    <TextField id="standard-basic" label="Last Name" variant="standard" />
                    <TextField id="standard-basic" label="Email" variant="standard" />
                    <TextField id="standard-basic" label="Phone Number" variant="standard" />
                    <TextField id="standard-basic" label="Company" variant="standard" />
                    <TextField id="standard-basic" label="Job Title" variant="standard" />
                </AccordionDetails>
                <AccordionActions>
                    <Button>ADD Contact</Button>
                </AccordionActions>
            </Accordion>

        </div>)
};