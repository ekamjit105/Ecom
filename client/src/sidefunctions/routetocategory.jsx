//import React from 'react'
//import {useNavigate} from 'react-router-dom'

const routetocategory = ({ cat, subcat, basecat }) => {
    window.location.href = `/category?cat=${cat}&subcat=${subcat}&basecat=${basecat}`;
  };

export default routetocategory