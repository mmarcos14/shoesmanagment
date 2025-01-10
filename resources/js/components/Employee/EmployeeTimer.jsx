import React, { useState, useEffect } from "react";


const EmployeeTimer = ({ startTime }) => {
  const [timeElapsed, setTimeElapsed] = useState(0); // Temps écoulé en secondes

  useEffect(() => {
    const startTimestamp = new Date(startTime).getTime(); // Convertir le temps de début en millisecondes

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const elapsedSeconds = Math.floor(((now+43200000) - startTimestamp) / 1000); // Calculer le temps écoulé en secondes
      setTimeElapsed(elapsedSeconds);
    }, 1000); // Met à jour toutes les secondes

    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage
  }, [startTime]);

  // Convertir le temps écoulé en heures, minutes et secondes
  const hours = Math.floor(timeElapsed / 3600);
  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = timeElapsed % 60;


  return (
    <div className="display">
      <h6>Elapsed working time :
      <label className="text-primary">
        {String(hours-7).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </label>
      </h6>
    
    </div>
  );
};



export default EmployeeTimer;
