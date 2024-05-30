import React,{useEffect,useState} from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Card from '../component/Card'
import Carousal from '../component/Carousal'

export default function Home() {
  const [search,setSearch]=useState("");
   const [foodCat,setFoodCat]=useState([]);
   const [foodItem,setFoodItem]=useState([]);


   const loadData=async ()=>{
    let response =await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    });
    response=await response.json();
    console.log(response.fooddata2, response.foodcategory);
    setFoodCat(response.foodcategory);
    setFoodItem(response.fooddata2);
   }
   

    useEffect(()=>{
      loadData()
    },[])



    return (
      <>
        <div><Navbar/></div>
        <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption" style={{zIndex:"10"}}>
    <div className="d-flex" role="search justify-content-center" >
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
      {/* <button className="btn btn-outline-success text-black bg-success" type="submit">Search</button> */}
    </div>
  </div>
    <div class="carousel-item active">
      <img src="https://source.unsplash.com/random/900x400/?burger" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="https://source.unsplash.com/random/900x400/?pastry" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="https://source.unsplash.com/random/900x400/?barbeque" class="d-block w-100" alt="..." />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> </div>
        <div className='container'>
          {foodCat.length > 0 ? foodCat.map((foodCategoryData) => {
            return (
              <div key={foodCategoryData.id} className='row mb-3'>
                <div className='fs-3 m-3'>{foodCategoryData.CategoryName}</div>
                <hr/>
                {foodItem.length > 0 ?
                  foodItem.filter((item) => (item.CategoryName === foodCategoryData.CategoryName) &&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map(filterItems => (
                    <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                      <Card  foodItem={filterItems}
                      // foodName={filterItems.name}
                      options={filterItems.options[0]}
                      // imgSrc={filterItems.img}
                      
                      ></Card>
                    </div>
                  ))
                  : <div>No items found for this category</div>
                }
              </div>
            );
          }) : <div>No categories found</div>}
          {/* <Card/> */}
        </div>
        <div><Footer/></div>
      </>
    );
    
}
