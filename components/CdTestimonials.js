import { Avatar } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";

const CdTestimonials = () => {
  return (
    <Carousel variant="dark" className="testimonials" style={{margin:"40px auto"}}>
      <Carousel.Item interval={3000}>
        <div className="test-item">
          <h1>Vivek Raval</h1>
          <p>
            The event changed my perspective on entrepreneurship in a good way.
            It made me believe that I had all that one should know to run a
            successful firm. It also gave me insights into how entrepreneurs
            should tackle their issues through various programmes, and I felt so
            good to be a part of E-Summit.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="test-item">
          <h1>Sukriti Gill</h1>
          <p>
            The programmes in this event are unique and were very useful to me.
            The information and experience from many sessions were beneficial,
            and the event encouraged me to take bold initiatives in my career.
            Thanks to the team and E-Cell, IIT BHU.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="test-item">
          <h1>Abhinav Sachdeva</h1>
          <p>
            The learning curve was great in this event. The guidance and
            mentoring were pretty good; it was way more helpful than I thought.
            The events were made so that all the aspects of entrepreneurship
            were covered. My experience was wholesome, and I appreciate the
            team.
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CdTestimonials;
