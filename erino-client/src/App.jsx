import Box from '@mui/material/Box';
import './App.css';
import { Typography } from '@mui/material';
import ContactsTable from './components/contactstable.component';

function App() {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 34, alignItems: "center", justifyContent: "space-evenly" }}>
        <span className="material-symbols-outlined phonebook">
          contacts
        </span>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontSize: 30, fontFamily: "sans-serif" }}> Your Very Own </Typography>
          <Typography sx={{ fontSize: 42, fontFamily: "sans-serif", color: "blueviolet" }}> CONTACT MANAGER </Typography>

        </Box>
      </Box>
      <ContactsTable />
    </Box>
  )
}

export default App
