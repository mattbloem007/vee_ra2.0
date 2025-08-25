import React from 'react';

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Blend",
      description: "Select from our signature blends: Mood Magick for Energy, Moon Mylk for Relaxation, or Ritual Roots for Grounding."
    },
    {
      number: "02",
      title: "Prepare with Intention",
      description: "Prepare your chosen blend with intention and presence, honoring the ancient wisdom of cacao and medicinal plants."
    },
    {
      number: "03",
      title: "Savor the Moment",
      description: "Find a quiet space, take a deep breath, and slowly sip your blend mindfully, allowing its transformative properties to work its magic."
    }
  ];

  return (
    <section className="process">
      <div className="container">
        <div className="process__header">
          <h2 className="process__title">Your Sacred Ritual</h2>
          <p className="process__subtitle">
            Transform your daily practice with our signature botanical blends through intention and presence
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