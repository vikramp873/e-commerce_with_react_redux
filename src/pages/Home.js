import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { getMaterials } from "../services/api";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AllProducts from '../components/allproducts/AllProducts';
import FeatureProduct from '../components/featuredProduct/FeatureProduct';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { newData } from '../components/context/ContextProvider';
import { useDispatch } from 'react-redux';
import { ID } from '../redux/actions/actions';
import './Home.css';



const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'left',
   color: theme.palette.text.secondary,
}));



function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

export default function Home() {
   const [value, setValue] = React.useState(0);
   const [material, setMaterial] = React.useState([]);
   const [materialId, setmaterialId] = React.useState('');
   const [materialData, setmaterialData] = React.useState([])




   const { feature } = useContext(newData);
   const dispatch = useDispatch();
   const id = (e) => {

   }



   React.useEffect(() => {
      getMatData()

   }, [])


   const getMatData = async () => {
      let data = await getMaterials();
      setMaterial(data.data.material);
   }



   const submitMaterialData = (e) => {

      if (e === 'all') {
         setmaterialData([])
      }
      else {

         let object = feature.filter((obj) => obj.materialId === parseInt(materialId));
         dispatch(ID(object))
         setmaterialData(object)
      }
   }

   // const clearMaterialData = () => {
   //    setmaterialData([])
   // }



   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <div >
         <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="All Products" {...a11yProps(0)} />
                  <Tab label="Features Products" {...a11yProps(1)} />

               </Tabs>
            </Box>
            <Grid container spacing={2}>
               <Grid item xs={2}>
                  <Item>
                     <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Material</FormLabel>
                        {
                           material && material.length ?


                              <RadioGroup
                                 aria-labelledby="demo-radio-buttons-group-label"
                                 name="radio-buttons-group"
                              >
                                 {
                                    material.map((data, index) => {
                                       return (
                                          <div key={index}>


                                             <FormControlLabel value={data.id} control={<Radio />} label={data.name} onChange={(e) => setmaterialId(data.id)} />

                                          </div>
                                       )
                                    })

                                 }

                                 <FormControlLabel value={'all'} control={<Radio />} label={'all'} onChange={(e) => setmaterialId(e.target.value)} />

                                 <Button variant="contained" onClick={submitMaterialData}>Apply</Button>
                                 <br />
                                 <br />
                                 {/* <Button variant="contained" onClick={clearMaterialData}>Clear</Button> */}


                              </RadioGroup>
                              :
                              null

                        }


                     </FormControl>

                  </Item>
               </Grid>
               <Grid item xs={10}>
                  <Item><TabPanel value={value} index={0}>
                     <AllProducts materialDataProp={materialData} />
                  </TabPanel>
                     <TabPanel value={value} index={1}>
                        <FeatureProduct materialDataProp={materialData} />

                     </TabPanel>

                  </Item>
               </Grid>
            </Grid>


         </Box>


      </div>
   );
}