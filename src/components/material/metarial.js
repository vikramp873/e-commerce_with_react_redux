import React, { useContext } from 'react';
import { getMaterials } from "../../services/api";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { newData } from "../context/ContextProvider";

function Metarial() {

   const [material, setMaterial] = React.useState([]);
   const [materialData, setmaterialData] = React.useState([]);



   const { feature, setFeature } = useContext(newData);

   React.useEffect(() => {
      getMaterialsData()
   }, [])

   const getMaterialsData = async () => {
      let data = await getMaterials();
      setMaterial(data.data.material);


      let object = feature.filter(obj => obj.materialId === parseInt(materialData));

      console.log(object)
      setmaterialData(object);
   }


   // console.log(materialData)







   return (
      <div>
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


                                 <FormControlLabel value={data.id} control={<Radio />} label={data.name} onChange={(e) => { setmaterialData(e.target.value) }} />

                              </div>
                           )
                        })

                     }


                  </RadioGroup>
                  :
                  null

            }


         </FormControl>
      </div>
   )
}

export default Metarial