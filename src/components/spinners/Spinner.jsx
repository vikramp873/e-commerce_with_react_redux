import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
   return (
      <div style={{ width: "100%", height: "50vh" }}><CircularProgress color="inherit" />&nbsp; Loading...</div>
   )
}
