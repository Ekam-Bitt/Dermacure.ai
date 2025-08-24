import React from 'react';

const AppointmentCard = ({ report }: any) => {
  return (
    <div className="shadow-xl w-full rounded-md space-y-4 p-3 border ">
      <h2 className="text-lg flex justify-between items-center">
        <span>Suspected Disease: {report?.suspectedDisease.diseaseName}</span>
        <button className="btn-secondary">View More</button>
      </h2>
      <h2>
        Patient Prompt: small itchiness in the hand with red swollen part.
      </h2>
      <section className="space-y-2">
        <h3>Patient Name: {report?.patientName}</h3>
        <p>Patient Age: {report?.patientAge}</p>
        <p>Patient Gender: {report?.patientSex}</p>
      </section>
    </div>
  );
};

export default AppointmentCard;
