import React from 'react';
import '../../App.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import { DLT } from '../../redux/actions/actions'
import { useSelector, useDispatch } from 'react-redux';


const Item = styled(Paper)(({ theme }) => ({
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

   const [cartData, setCartData] = React.useState([]);
   const [price, setPrice] = React.useState(0);
   console.log(price)

   const getData = useSelector((state) => state.cartreducer.carts);

   const dispatch = useDispatch()




   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   // const deleteProduct = (data) => {
   //    dispatch(DLT(data))
   // }

   const total = () => {
      let price = 0;

      getData.map((elem) => {
         price = elem.price + price
      })

      setPrice(price)
   }

   React.useEffect(() => {
      if (getData) {
         sessionStorage.setItem("cart", JSON.stringify(getData));
         setCartData(getData);

      }
      else {
         return false;
      }
      total()
   }, [total])




   return (
      <>
         <h1 centered='true' className='main-header' >
            <Grid container
               direction="row"
               justifyContent="space-around"
               alignItems="center" >
               <Grid item xs={10} md={10}>
                  <Item>
                     MYCOOLSHOP.com
                  </Item>
               </Grid>
               <Grid item xs={2} md={1}>

                  <Item>
                     Cart
                     <IconButton aria-label="cart" id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <StyledBadge badgeContent={getData.length} color="secondary">
                           <ShoppingCartIcon />
                        </StyledBadge>

                     </IconButton>
                     <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                           'aria-labelledby': 'basic-button',
                        }}
                     >
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                           <TableHead>

                              <TableRow>
                                 <TableCell>Photo</TableCell>
                                 <TableCell align="left">Product Name</TableCell>
                                 {/* <TableCell align="left">Delete</TableCell> */}
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {getData && getData.length ?

                                 getData.map((data, index) => {
                                    return (
                                       <TableRow
                                          key={index}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                       >
                                          <TableCell component="th" scope="row">
                                             <img src={data.image} alt="img" style={{ width: '5rem', height: '5rem' }} />
                                          </TableCell>
                                          <TableCell align='left'>
                                             <b> {data.name}</b>
                                             <p>
                                                Material: {data.materialId === 2 ? 'Cotton' : data.materialId === 3 ? 'Leather' : data.materialId === 4 ? 'Lycra' : data.materialId === 5 ? 'Plastic' : data.materialId === 6 ? 'Polyester' : null}
                                             </p>
                                             <p>
                                                Price: ${data.price}
                                             </p>
                                          </TableCell>
                                          {/* <TableCell align='center'>
                                             <DeleteIcon onClick={() => { deleteProduct(data) }} />
                                          </TableCell> */}
                                       </TableRow>
                                    )
                                 })
                                 :
                                 <p style={{ 'padding': '0 15px' }}>Your cart is empty!</p>

                              }

                              <p style={{ 'padding': '0 15px' }} > Price: ${price}</p>
                           </TableBody>




                        </Table>
                     </Menu>

                  </Item>
               </Grid>
            </Grid>

         </h1>

      </>
   )
}

export default Headers