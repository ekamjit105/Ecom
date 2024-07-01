import React, { useEffect }  from 'react'
import { useSearchParams } from 'react-router-dom'
import InnerCat1 from './InnerCat1'
import InnerCat2 from './InnerCat2'
import { useDispatch, useSelector} from 'react-redux'
import { getAllCategories, getOneCategory, getOneSubcategory } from '../actions/categoryAction'
import { getProductsByCategory } from '../actions/productAction'

const CategoryScreen = () => {
  
  const [queryParameters] = useSearchParams()
  const cat = queryParameters.get("cat")
  const subcat = queryParameters.get("subcat")
  const basecat = queryParameters.get("basecat")
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllCategories())//dispatch action
    dispatch(getOneCategory(cat))//dispatch action
    dispatch(getOneSubcategory({cat:cat, subcat:subcat}))
    dispatch(getProductsByCategory({cat:cat, subcat:subcat}))
}, [dispatch, cat,subcat])



  const {thisc, loading}=useSelector((state)=>state.getOneCategoryReducer)


  
  var title;
  if(subcat==="NA")
  title="All "+cat
  else
  title=cat+ " "+subcat


  const randomNumber = Math.floor(Math.random() * 10) + 1;

  // Convert the random number to a string and append ".jpg"
  const cimg = `${randomNumber}.jpg`;
  
  
  
  return (
    <>
     {!loading?<>
      <div style={{ position: "relative", padding: "5%" }}>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url('images/${thisc.catimg}')`,
      backgroundSize: "cover", // Ensure the image covers the entire container
      opacity: "0.4",
      zIndex: -1,
    }}
  ></div>
  <h1 style={{backgroundColor: "white", padding:"2%",display: 'inline-block'}}><b>{title}</b></h1>
</div>
     </>:<></>} 
 


{subcat==="NA"?
    (
        <>
            <InnerCat1 cat={cat}></InnerCat1>

        </>
    )
    :
    (<>
            <InnerCat2 cat={cat} subcat={subcat} basecat={basecat}></InnerCat2>
    </>)
}


















    </>
  )



}

export default CategoryScreen