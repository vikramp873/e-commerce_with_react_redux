import React, { useState, useEffect, useContext } from "react";
import {
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Button,
   Typography,
   Grid,
} from "@mui/material";
import Spinner from "../spinners/Spinner";
import { newData } from "../context/ContextProvider";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../services/api";
import { ADD } from '../../redux/actions/actions'


export default function AllProducts({ materialData, material }) {
   const [productData, setProductData] = useState();
   const [showspin, setShowSpin] = useState(true);

   const { setFeature } = useContext(newData);
   useEffect(() => {
      loadProduct();
      setTimeout(() => {
         setShowSpin(false)
      }, 2000)
   }, []);

   const dispatch = useDispatch()

   async function loadProduct() {
      let data = await getAllProducts();
      setProductData(data.data.products);

   }
   setFeature(productData);

   const send = (e) => {
      dispatch(ADD(e))
   }






   return (
      <>
         {
            showspin ? <Spinner /> :
               <Grid container spacing={12}>
                  <Grid item xs={12}>
                     <Grid container justifyContent="center" spacing={12}>
                        {productData && productData.length ? (
                           productData.map((data, index) => {
                              return (


                                 <Grid key={index} item>
                                    <Card>
                                       <CardMedia
                                          sx={{ height: 330, width: 300 }}
                                          image={data.image}
                                          title={data.name}
                                          alt='img'
                                       />
                                       <CardContent>
                                          <Typography gutterBottom variant="h5" component="div">
                                             {data.name}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                             {data.materialId}
                                          </Typography>
                                       </CardContent>
                                       <CardActions>
                                          <Button size="small">$ {data.price}</Button>
                                          <Button size="small">{data.colorid}</Button>
                                          <Button variant="contained" onClick={() => send(data)} >Add to Cart</Button>
                                       </CardActions>
                                    </Card>

                                 </Grid>

                              );
                           })
                        ) : (
                           <h1>No data</h1>
                        )}
                     </Grid>
                  </Grid>
               </Grid>
         }
      </>
   );
}
