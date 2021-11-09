import { Avatar } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";

const Testimonials = () => {
  return (
    <Carousel variant="dark" className="testimonials">
      <Carousel.Item interval={3000}>
        <div className="test-item">
          <Avatar
            src="https://www.ecelliitbhu.com/images/bvjagadeesh.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <h1>BV Jagadeesh</h1>
          <h2>Founder, KAAJ Ventures</h2>
          <p>
            E-Cell, IIT(BHU), Varanasi, is a very vibrant group of student
            entrepreneurs and mentors who are a very passionate group of alumni
            and friends of IIT(BHU). whatever they do, whether the annual
            E-Summit, Culture E-Cell or ThingQbator, they do with so much
            enthusiasm and energy. As a friend of IIT(BHU), I very much enjoy
            teaching my entrepreneurship class every year to future
            entrepreneurs, organized by the dynamic IIT(BHU) E-Cell volunteers.
            It is also a pleasure to enjoy the hospitality of the place and
            students which is very unique to IIT(BHU).
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="test-item">
          <Avatar
            src="https://www.ecelliitbhu.com/images/manish.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <h1>Manish Gupta</h1>
          <h2>Founder, Alphonso Inc.</h2>
          <p>
            {`It was an honor to participate in the E-Summit 2020. The amount of energy and passion displayed by the budding entrepreneurs was impressive at the very least. It was heartening to see how the E-Cell and the ThingQbator teams are striving to provide a platform to nurture the entrepreneurship mindset among the students. I believe that in the world of startups, there are no "failures", there are "successes" and there are "successful-failures". So, to all involved, I wish you plenty of both in the coming years.`}
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="test-item">
          <Avatar
            src="https://www.ecelliitbhu.com/images/vishiyer.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <h1>Vishwanathan Iyer</h1>
          <h2>VP Architectures-APJ, Cisco</h2>
          <p>
            E-Cell, IIT(BHU), Varanasi, is working to create a culture of
            innovation and entrepreneurship in the student community. So pleased
            to see this community grow with the active participation of the
            student community coupled with an equally passionate group of
            alumni, faculty, and friends of IIT(BHU). Happy to see this
            enthusiasm and energy in the annual E-Summit, Culture E-Cell or
            CiscoThingQbator. Looking forward to being back in person for the
            annual events on the campus in the not-so-distant future.
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  )
}

export default Testimonials;
