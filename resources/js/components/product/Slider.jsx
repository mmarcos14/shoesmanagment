import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
const Slider = () => {
  const [Image, setImage] = useState([]);
  useEffect(() => {
    getImages();
  }, [])

  const getImages = async () => {
    await axios.get('product/image/all').then((response) => {
      setImage(response.data)
    })
  }
  return (
    <Carousel data-bs-theme="light" className="container">
      {
        Image?.map((item,index)=>
          <Carousel.Item>
        <img
          className="d-block w-100"
          src={`images/${item.name}`}
          alt="First slide"
          height={'300px'}
          style={{padding:'-50px'}}
        />
        <Carousel.Caption>
          <h2 className="text-danger">{item.title}</h2>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
        )
      }
    </Carousel>
  );


}
export default Slider