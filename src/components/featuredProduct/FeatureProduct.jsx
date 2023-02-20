import React, { useState, useContext, useEffect } from 'react';
import { getFeaturedProducts } from "../../services/api";
import {
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Button,
   Typography,
   Grid
} from "@mui/material";
import Spinner from "../spinners/Spinner";
import { newData } from "../context/ContextProvider";
import { useDispatch } from "react-redux";
import { ADD } from '../../redux/actions/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FeatureProduct({ materialDataProp }) {

   const [productId, setProductId] = useState([]);
   const [showspin, setShowSpin] = useState(true);
   const { feature } = useContext(newData);
   const dispatch = useDispatch()

   useEffect(() => {
      featuredProducts();

      setTimeout(() => {
         setShowSpin(false)
      }, 2000)
   }, []);

   async function featuredProducts() {
      let data = await getFeaturedProducts();
      setProductId(data.data.featured);
   }

   const send = (e) => {

      toast.success('Item added to cart');
      dispatch(ADD(e))
   }


   let newArray = feature.filter(function (el) {
      return this.has(el.id);
   }, new Set(productId.map(el => el.id)));


   return (
      <>
         {
            showspin ? <Spinner /> :
               <>
                  <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                  <Grid container spacing={12}>
                     <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={12}>
                           {!materialDataProp.length ? newArray && newArray.length ? (
                              newArray.map((data, index) => {
                                 return (


                                    <Grid key={index} item>
                                       <Card>
                                          <CardMedia
                                             sx={{ height: 330, width: 300 }}
                                             image={data.image}
                                             title="green iguana"
                                          />
                                          <CardContent>
                                             <Typography gutterBottom variant="h5" component="div">
                                                {data.name}
                                             </Typography>
                                             <Typography variant="body2" color="text.secondary">
                                                {data.materialId === 2 ? 'Cotton' : data.materialId === 3 ? 'Leather' : data.materialId === 4 ? 'Lycra' : data.materialId === 5 ? 'Plastic' : data.materialId === 6 ? 'Polyester' : null}
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
                           ) :
                              materialDataProp.map((data, index) => {
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
                                                {data.materialId === 2 ? 'Cotton' : data.materialId === 3 ? 'Leather' : data.materialId === 4 ? 'Lycra' : data.materialId === 5 ? 'Plastic' : data.materialId === 6 ? 'Polyester' : null}
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
                              })}

                        </Grid>
                     </Grid>
                  </Grid>
               </>
         }
      </>
   )
}

export default FeatureProduct