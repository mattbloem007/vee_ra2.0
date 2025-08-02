import React from 'react';

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Blend",
      description: "Select the blend that resonates with your current needs - energy, calm, or connection."
    },
    {
      number: "02",
      title: "Prepare with Intention",
      description: "Heat water to 160°F and whisk your blend with intention and presence."
    },
    {
      number: "03",
      title: "Savor the Moment",
      description: "Find a quiet space, take deep breaths, and slowly sip your ceremonial cacao."
    }
  ];

  return (
    <section className="process">
      <div className="container">
        <div className="process__header">
          <h2 className="process__title">Your Daily Ritual</h2>
          <p className="process__subtitle">
            Transform your morning or evening with our simple three-step process
          </p>
        </div>
        <div className="process__steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="process-step__number">{step.number}</div>
              <div className="process-step__content">
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process; 