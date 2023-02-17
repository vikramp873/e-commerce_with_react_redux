import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';


const Item = styled(Paper)(({ theme }) => ({
   // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   // ...theme.typography.body2,
   padding: theme.spacing(1),

   textAlign: 'left',
   color: theme.palette.text.secondary,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
   '& .MuiBadge-badge': {
      right: -3,
      top: 12,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
   },
}));

function Headers() {

   const getData = useSelector((state) => state.cartreducer.carts);
   console.log(getData)

   if (getData) {
      sessionStorage.setItem("cart", JSON.stringify(getData))
   }
   else {
      return false;
   }

   return (
      <>
         <h1 centered='true'>
            <Grid container spacing={2}>
               <Grid item xs={10}>
                  <Item>
                     MYCOOLSHOP.com
                  </Item>
               </Grid>
               <Grid item xs={2}>

                  <Item>
                     Cart
                     <IconButton aria-label="cart">
                        <StyledBadge badgeContent={getData.length} color="secondary">
                           <ShoppingCartIcon />
                        </StyledBadge>

                     </IconButton>

                  </Item>
               </Grid>
            </Grid>

         </h1>

      </>
   )
}

export default Headers