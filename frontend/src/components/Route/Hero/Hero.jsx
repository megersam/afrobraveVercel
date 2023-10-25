import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useState } from 'react';
import image1 from "../../../Assests/Images/headerImage.png";
import image2 from "../../../Assests/Images/image2.png";
import image3 from "../../../Assests/Images/image3.png";

const Hero = () => {
  const [backgroundImage, setBackgroundImage] = useState(image1);
  const [activeDivIndex, setActiveDivIndex] = useState(-1);
  const [hoveredDivIndex, setHoveredDivIndex] = useState(-1);

  const handleDivClick = (index) => {
    setBackgroundImage(index === 0 ? image1 : index === 1 ? image2 : image3);
    setActiveDivIndex(index);
  };

  const handleDivHover = (index, isHovered) => {
    if (isHovered) {
      setHoveredDivIndex(index);
    } else {
      setHoveredDivIndex(-1);
    }
  };

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const divClasses = [
    `w-8 h-2 rounded-full mr-2 cursor-pointer ${activeDivIndex === 0 ? 'bg-red-500' : hoveredDivIndex === 0 ? 'bg-orange-800' : 'bg-white'}`,
    `w-8 h-2 rounded-full mr-2 cursor-pointer ${activeDivIndex === 1 ? 'bg-red-500' : hoveredDivIndex === 1 ? 'bg-orange-800' : 'bg-white'}`,
    `w-8 h-2 rounded-full mr-2 cursor-pointer ${activeDivIndex === 2 ? 'bg-red-500' : hoveredDivIndex === 2 ? 'bg-orange-800' : 'bg-white'}`,
  ];

  const divHome = {
    backgroundImage: `url(${Hero})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };



  return (
    // <div
    //   className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
    //   style={{
    //     backgroundImage:
    //       "url()",
    //   }}
    // >
    //   <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
    //     <h1
    //       className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
    //     >
    //      <center>Study In<br /> CANADA</center>
    //     </h1>
    //     <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
    //       Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
    //       assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
    //       quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
    //       <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
    //     </p>
    //     <Link to="/products" className="inline-block">
    //         <div className={`${styles.button} mt-5`}>
    //              <span className="text-[#fff] font-[Poppins] text-[18px]">
    //                 Get Request
    //              </span>
    //         </div>
    //     </Link>
    //   </div>
    // </div>
    <div
      className="h-screen w-full flex items-center justify-center relative "
      style={divStyle}
    >

      <div
        className="mx-auto flex flex-col items-center justify-center  max-w-[75rem] w-full h-[600px]  py-2 px-4  mb-10 "
        style={divHome}
      >
        <center>
          <h1 className="text-[64px] text-center mb-[3rem]">
            <span className="text-white">Study In <br />{" "}</span>

            <span className="text-orange-700">CANADA</span>

          </h1>
        </center>
        {/* <p className="text-center font-light">
          {" "}
          Nous nous engageons à fournir une éducation technologique à la
          prochaine <br /> génération <br />
          de leaders au Bénin, en promouvant l'égalité et l'autonomisation.
        </p> */}
        <div className="mt-5 flex justify-evenly gap-10">
          {/* <button
            className=" bg-transparent rounded-xl border-2 px-4 py-3"
            type="submit"
          >
            Apply Now
          </button> */}
          <Link to="/programs" className="inline-block">
            <button className="bg-orange-700 rounded-xl px-7 py-3 text-white" type="submit">
              Browse Courses
            </button>
          </Link>
        </div>
      </div>

      {/* here its just a sample  */}
      <div className="absolute bottom-0 flex gap-3 mb-10">
        <div className="flex">
          {divClasses.map((className, index) => (
            <div
              key={index}
              className={className}
              onClick={() => handleDivClick(index)}
              onMouseEnter={() => handleDivHover(index, true)}
              onMouseLeave={() => handleDivHover(index, false)}
            ></div>
          ))}
        </div>
      </div>


    </div>

  );

};


export default Hero;
