import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineProfile } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { LuDelete } from "react-icons/lu";
import { IoMdMusicalNotes,IoIosAddCircleOutline } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { IoPauseOutline,IoStopOutline } from "react-icons/io5";
import { VscDebugContinueSmall } from "react-icons/vsc";
import Music from './Music';

export default function Challenge() {
    const [home,setHome] = useState(true);
    const [music,setMusic] = useState(false);
    const [profile,setProfile] = useState(false);

    const [formInputs, setFormInputs] = useState([{ name: '', sets: '', reps: '', restTime: '', completedSets: 0 }]);
    const [currentSet, setCurrentSet] = useState(0);
    
    const [formData, setFormData] = useState([]);
    const [sliceFirst, setSliceFirst] = useState(0);
    const [sliceEnd, setSliceEnd] = useState(1);

    const [restTime, setRestTime] = useState(0);
    const [restTimerRunning, setRestTimerRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);

    const handleAddInput = () => {
        setFormInputs([...formInputs, { name: '', sets: '', reps: '', restTime: '', completedSets: 0 }]);
    };

    const handleDeleteInput = (index) => {
        const updatedInputs = [...formInputs];
        updatedInputs.splice(index, 1);
        setFormInputs(updatedInputs);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedInputs = [...formInputs];
        if(name == 'name'){
            updatedInputs[index][name] = value;
        }else{
            updatedInputs[index][name] = parseInt(value);
        }
        setFormInputs(updatedInputs);
    };
    
    const handleSubmit = () => {
        setFormData([...formInputs])
        setShowWorkoutDetails(true);
    }

    useEffect(() => { //Chạy thời gian nghỉ (rest time)
        if (restTimerRunning && restTime > 0) {
            const timer = setInterval(() => {
                setRestTime(prevRestTime => prevRestTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [restTimerRunning, restTime]);

    const handleDone = () => {
        if (currentSet < formInputs.length) {
            const updatedformInputs = [...formInputs];
            updatedformInputs[currentSet].completedSets += 1;
            if (updatedformInputs[currentSet].completedSets === updatedformInputs[currentSet].sets) {
              setCurrentSet(currentSet + 1);
              setSliceFirst(sliceFirst+1);
              setSliceEnd(sliceEnd+1);
            }
            setFormInputs(updatedformInputs);

            // Thêm thời gian
            setRestTime(parseInt(formInputs[sliceFirst].restTime));
            setRestTimerRunning(true);
          }
    }

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

      const handlePause = () => {
        setRestTimerRunning(!restTimerRunning);
        setIsPaused(!isPaused);
    };
    

    const handleStop = () => {
        setFormInputs([{ name: '', sets: '', reps: '', restTime: '', completedSets: 0 }]);
        setCurrentSet(0);
        
        setFormData([]);
        setSliceFirst(0);
        setSliceEnd(1);
    
        setRestTime(0);
        setRestTimerRunning(false);

        setIsPaused(false)
        setShowWorkoutDetails(false)
    
        console.log('Stop');
    };
    

    const handleMenuBar = (id) => {
        if(id === 'idMusic'){
            setHome(false);
            setMusic(true);
            setProfile(false);
        } else if(id === 'idProfile'){
            setHome(false);
            setMusic(false);
            setProfile(true);
        } else {
            setHome(true);
            setMusic(false);
            setProfile(false);
        }
    }
    
  return (
    <div>
        {home && 
        <div>
            <div className='text-center text-2xl border-b'>Chellenge Workout</div>
            <div className='m-[2%]'>
                <table className='w-full'>
                    <tr className='bg-gray-300'>
                        <th className='border'>Name</th>
                        <th className='border'>Sets</th>
                        <th className='border'>Reps</th>
                        <th className='border'>Time Rest</th>
                        <th className='border'></th>
                    </tr>
                    {formInputs.map((input,index)=>(
                        <tr key={index}>
                            <td>
                                <input type="text" value={input.name} onChange={(e) => handleInputChange(index, e)} name="name" placeholder='Name' className='w-full outline-none'/>
                            </td>
                            <td className='text-center'>
                                <input type="tel" value={input.sets} onChange={(e) => handleInputChange(index, e)} name="sets" placeholder='Sets' min="1" max="1000" className='w-full text-center outline-none'/>
                            </td>
                            <td className='text-center'>
                                <input type="tel" value={input.reps} onChange={(e) => handleInputChange(index, e)} name="reps" placeholder='Reps' min="1" max="1000" className='w-full text-center outline-none'/>
                            </td>
                            <td className='text-center'>
                                <input type="tel" value={input.restTime} onChange={(e) => handleInputChange(index, e)} name="restTime" placeholder='Sec' min="1" max="1000" className='w-full text-center outline-none'/>
                            </td>
                            <td className='flex justify-center text-2xl h-16'>
                                <button onClick={() => handleDeleteInput(index)} className='hover:text-gray-500'>
                                    <LuDelete/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
                <div className='my-2 flex justify-end pb-10'>
                    <button onClick={handleAddInput} className='bg-gray-200 py-2 px-5 hover:bg-gray-300'>Add</button>
                    <div className='p-1'></div>
                    <button onClick={handleSubmit} className='bg-gray-200 py-2 px-5 hover:bg-gray-300'>Start</button>
                </div>
            </div>
            {showWorkoutDetails && (
                <div className='mb-16 mx-[2%] border p-2'>
                    {Array.isArray(formData)&&formData.slice(sliceFirst,sliceEnd).map((item,index)=>(
                        <div key={index} className=''>
                            <p className='text-center font-bold text-lg md:hidden'>{item.name} {item.completedSets}/{item.sets} sets</p>
                            <div className='flex justify-between'>
                                <p className='font-bold text-lg max-md:hidden'>{item.name} {item.completedSets}/{item.sets} sets</p>
                                {/* <p>{item.completedSets}/{item.sets} sets</p> */}
                                <p>{item.reps} reps</p>
                                <p>Rest {restTime}s</p>
                            </div>
                        </div>    
                        ))}
                    <div style={{backgroundColor:"black",width: `${calculatePercentage()}%` }}>
                        <p className='mx-1 text-end text-white'>{calculatePercentage()}%</p>
                    </div>
                    <div className='flex my-2'>
                        <button onClick={handleStop} className='w-full flex justify-center p-2 hover:bg-gray-300'><IoStopOutline/></button>
                        <button onClick={handlePause} className='w-full flex justify-center p-2 hover:bg-gray-300'>{isPaused ? <VscDebugContinueSmall /> : <IoPauseOutline />}</button>
                        <button onClick={handleDone} className='w-full flex justify-center p-2 hover:bg-gray-300'><MdDone/></button>
                    </div>
                </div>
            )}
        </div>}
        {music && <Music/>}
        {profile && <div>Profile</div>}
        <div className='fixed bottom-0 flex flex-col justify-between w-full text-2xl bg-white'>
            <div className='flex border-y'>
                <button onClick={() => handleMenuBar('idHome')} className='w-full flex justify-center p-2 hover:bg-gray-300'><FiHome/></button>
                <button onClick={() => handleMenuBar('idMusic')} className='w-full flex justify-center p-2 hover:bg-gray-300'><IoMdMusicalNotes/></button>
                <button onClick={() => handleMenuBar('idProfile')} className='w-full flex justify-center p-2 hover:bg-gray-300'><AiOutlineProfile/></button>
            </div>
        </div>
    </div>
  )
}
