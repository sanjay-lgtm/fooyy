import React from 'react'
import { useState, useEffect } from 'react'
import Card from '../Components/Card'
import Crouseal from '../Components/Crouseal'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'


export default function Home() {

    const [foodCat, setFoodCat] = useState([]);
    const [fooditem, setFooditem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:9918/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });
        response = await response.json();
        setFooditem(response[0]);
        setFoodCat(response[1]);
        // console.log(response[0],response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])


    return (
        <div>
            <div><Navbar /></div>
            <div><Crouseal /></div>
            <div className='container'>
               
{
    foodCat !== []
        ? foodCat.map((data) => {
            return (<div className='row mb-3'>
            <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
                </div>
                <hr/>
                {fooditem !== [] 
                ?
                fooditem.filter((item)=>item.CategoryName === data.CategoryName)
                .map(filterItems => {
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card/>
                    </div>
                })
                :<div>No such  Data Found</div>}
                 </div>
            )
        })
       :""
          
    } 
           <Card/>

            </div>
            <div><Footer /> </div>

        </div>
    )
}


// {
//     foodCat !== []
//         ? foodCat.map((data) => {
//             return (<div>
//                 <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
//                 <hr />
//                 {fooditem !== []
//                  ? fooditem.filter((item) => item.CategoryName == data.CategoryName).map(filteritems => {
//                     return (
//                         <div key={filteritems._id}>
//                             <Card ></Card>
//                         </div>
//                     )
//                 })
//                 )
//             }:<div>No such  Data Found</div>}
//             </div>
//             )
//         }
//         )   : <div>********************</div>
        
//     }
