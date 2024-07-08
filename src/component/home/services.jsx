import React from "react";
import "../../CSS/service.css";

const serviceslist = [
  {
    id: "Essential",
    serviceTittle: "Essential Business Services",
    description:
      "Merchant's business infrastructure and risk management solutions remove administrative burdens and optimize industrial architecture. We can help establish new, complement existing, or replace resources and services that require change.",
    cards: [
      {
        description: "Regulatory and compliance services",
        img: "checklisticon-white.png",
      },
      { description: "CFO services", img: "cfoicon-white.png" },
      {
        description: "Business and asset transition services",
        img: "transfericon-white.png",
      },
      {
        description: "Operations and technology support",
        img: "supporticon-white.png",
      },
    ],
  },
  {
    id: "Alternative",
    serviceTittle: "Alternative Investment Solutions",
    description:
      "We apply our capabilities to design and access both traditional and alternative investment solutions. Our approach is proactive with respect to opportunistic views and reactive based upon client needs.",
    cards: [
      {
        description: "Co-sourced CIO and model portfolio services",
        img: "cio.png",
      },
      {
        description: "Tactical fixed income and cash management",
        img: "fixed_Income.png",
      },
      {
        description:
          "Alternative investments with a focus on lending and yield enhancement",
        img: "alternate_invesment.png",
      },
      {
        description: "Private and bespoke investment opportunities",
        img: "privateinvestment.png",
      },
    ],
  },
];
const Services = () => {
  return (
    <article id="services">
      {serviceslist.map((service, index) => (
        <div key={index} id={service.id}>
          <section className="services-header">
            <h2>{service.serviceTittle}</h2>
            <p>{service.description}</p>
          </section>
          <section className="services-cards">
            {service.cards.map((card, index) => (
              <div key={index} className="services-card">
                <img src={card.img} alt={card.description} />
                <p>{card.description}</p>
              </div>
            ))}
          </section>
        </div>
      ))}
    </article>
  );
};

export default Services;
