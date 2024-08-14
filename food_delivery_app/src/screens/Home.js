
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';



export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');


  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //response[0]==fooditem
    //response[1]=foodcategory
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0],response[1]);

  }
  useEffect(() => {
    loadData()

  }, []);


  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "cover !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: "10", position: "absolute", top: "100px" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => (setSearch(e.target.value))} />
            </div>
          </div>
          <div className="carousel-item active">
            <img src="/images/burger.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="Dosa" />

          </div>
          <div className="carousel-item">
            <img src="/images/dosa.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="Dosa" />
          </div>
          <div className="carousel-item">
            <img src="/images/momos.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="Dosa" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container'>
        {
          //categorising data based on category name
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>


                  <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                  <hr />
                  {foodItem.length > 0
                    ? foodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map(filteritems => {
                        return (
                          <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodItem={filteritems} options={filteritems.options[0]}



                            />
                          </div>
                        );

                      })

                    : <div>No such Data Found</div>
                  }
                </div>
              )
            })
            : ""

        }

      </div>


      <div><Footer /></div>
    </div>
  );
}

