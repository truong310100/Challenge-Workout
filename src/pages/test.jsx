import React, { useState } from 'react';

export default function Test() {
  const [formInputs, setFormInputs] = useState([]);
  const [formInputs2, setFormInputs2] = useState();
  const [currentSet, setCurrentSet] = useState(0);

  const handleAddFormInputs = () => {
    setFormInputs([...formInputs, {sets: formInputs2,completedSets: 0}]);
  };
  
  const handleInputChange = (e) => {
    const sets = parseInt(e.target.value);
    setFormInputs2(sets);
};

  const handleDone = () => {
    if (currentSet < formInputs.length) {
      const updatedFormInputs = [...formInputs];
      updatedFormInputs[currentSet].completedSets += 1;

      if (updatedFormInputs[currentSet].completedSets === updatedFormInputs[currentSet].sets) {
        setCurrentSet(currentSet + 1);
      }
      setFormInputs(updatedFormInputs);
    }
  };

  const calculatePercentage = () => {
    let totalSets = 0;
    let completedSets = 0;

    formInputs.forEach(exercise => {
      totalSets += exercise.sets;
      completedSets += exercise.completedSets;
    });

    const percentage = totalSets === 0 ? 0 : (completedSets / totalSets) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  return (
    <div>
      <button onClick={handleAddFormInputs} className='bg-blue-500'>Add</button>
      <button onClick={handleDone} className='bg-green-500'>Done</button>
      <p>Total Sets: {calculatePercentage()}%</p>
      <div>
        <input type="number" onChange={handleInputChange} placeholder='sets' className='w-full text-center outline-none'/>
      </div>
      {formInputs.map((item, index) => (
        <p key={index}> Exercise {index + 1}: {item.completedSets} / {item.sets}</p>

      ))}
    </div>
  );
}
