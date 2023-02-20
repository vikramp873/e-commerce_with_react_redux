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
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../services/api";
import { ADD } from '../../redux/actions/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AllProducts({ materialDataProp }) {
   const [productData, setProductData] = useState();
   const [showspin, setShowSpin] = useState(true);
   const [materialData, setMaterialData] = useState([]);

   const { setFeature } = useContext(newData);
   useEffect(() => {
      loadProduct();

      setTimeout(() => {
         setShowSpin(false)
      }, 2000)
   }, []);

   const dispatch = useDispatch();



   async function loadProduct(getData) {
      let data = await getAllProducts();
      setProductData(data.data.products);

      // const getData = useSelector((state) => state.cartreducer.materialId);

      // setProductData(getData)


      // setProductData(getData);

   }
   setFeature(productData);


   // if (getData !== "") {


   //    let object = productData.filter((obj) => obj.materialId === parseInt(getData));
   //    setProductData(object);
   // }
   // else {
   //    loadProduct();
   // }





   // let object = productData.filter((obj) => obj.materialId === parseInt(getData));
   // alert(JSON.stringify(object));


   const send = (e) => {
      toast.success('Item added to cart');
      dispatch(ADD(e))
   }





   console.log(materialDataProp)
   return (
      <>
         {
            showspin ? <Spinner /> :
               <>
                  <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                  <Grid container spacing={12}>
                     <Grid item xs={12}>
                        {/* <Material /> */}
                        <Grid container justifyContent="center" spacing={12}>
                           {!materialDataProp.length ? productData && productData.length ? (
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
   );
}
