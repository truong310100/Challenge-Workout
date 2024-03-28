import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineProfile } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { LuDelete } from "react-icons/lu";
import { IoMdMusicalNotes,IoIosAddCircleOutline } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { IoPauseOutline,IoStopOutline } from "react-icons/io5";
import { VscDebugContinueSmall } from "react-icons/vsc";

export default function Challenge() {
    const [home,setHome] = useState(true);
    const [music,setMusic] = useState(false);
    const [profile,setProfile] = useState(false);

    const [formInputs, setFormInputs] = useState([{name: '', sets: '', reps: '', restTime: ''}]);
    const [formData, setFormData] = useState([]);
    const [sliceFirst, setSliceFirst] = useState(0);
    const [sliceEnd, setSliceEnd] = useState(1);
    const [totalSets, setTotalSets] = useState(0);
    const totalSetsRef = useRef(totalSets);
    const [totalSets2, setTotalSets2] = useState();
    const [percentSets, setPercentSets] = useState();
    const [restTime, setRestTime] = useState(0);
    const [restTimerRunning, setRestTimerRunning] = useState(false);

    const handleAddInput = () => {
        setFormInputs([...formInputs, { name: '', sets: '', reps: '', restTime: '' }]);
    };

    const handleDeleteInput = (index) => {
        const updatedInputs = [...formInputs];
        updatedInputs.splice(index, 1);
        setFormInputs(updatedInputs);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedInputs = [...formInputs];
        updatedInputs[index][name] = value;
        setFormInputs(updatedInputs);
    };

    const handleSubmit = () => {
        console.log(formInputs);
        setFormData(formInputs);
        const newTotalSets = formInputs.reduce((total, currentItem) => {
            return total + parseInt(currentItem.sets);
        }, 0);
        setTotalSets(newTotalSets);
        setTotalSets2(parseInt(formInputs[sliceFirst].sets));


    }
    
    useEffect(() => {
        if (restTimerRunning && restTime > 0) {
            const timer = setInterval(() => {
                setRestTime(prevRestTime => prevRestTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [restTimerRunning, restTime]);

    const handleDone = () => {
        if (sliceFirst < formInputs.length) {
            const completedSets = parseInt(formInputs[sliceFirst].sets);
            setTotalSets2(prevCount => prevCount + completedSets); //////Lỗi ở đây

            const newPercent = (totalSets2 / totalSets) * 100;
            setPercentSets(newPercent);

            console.log('Số sets',completedSets)
            console.log('Tổng set 1',totalSets)
            console.log('Tổng set 2',totalSets2)
            console.log('tổng hiện tại',newPercent,"%")
            console.log('_________________________________')


            // Lưu thời gian nghỉ ngơi khi bắt đầu
            setRestTime(parseInt(formInputs[sliceFirst].restTime));
            setRestTimerRunning(true);
        } else {
            const done = "Bạn đã hoàn thành 100"
            setPercentSets(done)
        }

        setSliceFirst(sliceFirst + 1);
        setSliceEnd(sliceEnd + 1);
    };

    const handleStop = () => {
        // setFormInputs([{ name: '', sets: '', reps: '', restTime: '' }]);
        // setFormData([]);
        // setSliceFirst(0);
        // setSliceEnd(1);
        // setTotalSets(0);
        // totalSetsRef.current = 0;
        // setTotalSets2(0);
        // setPercentSets(100);
        // setRestTime(0);
        // setRestTimerRunning(false);
    
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
                    <tr className='bg-gray-400'>
                        <th className='border'>Name</th>
                        <th className='border'>Sets</th>
                        <th className='border'>Reps</th>
                        <th className='border'>Time Rest</th>
                        <th className='border'></th>
                    </tr>
                    {formInputs.map((input,index)=>(
                        <tr key={index}>
                            <td>
                                <input type="text" value={input.name} onChange={(e) => handleInputChange(index, e)} name="name" placeholder='Tên bài tập' className='w-full outline-none'/>
                            </td>
                            <td className='text-center'>
                                <input type="number" value={input.sets} onChange={(e) => handleInputChange(index, e)} name="sets" placeholder='sets' min="1" max="1000" className='w-full text-center outline-none'/>
                            </td>
                            <td className='text-center'>
                                <input type="number" value={input.reps} onChange={(e) => handleInputChange(index, e)} name="reps" placeholder='reps' min="1" max="1000" className='w-full text-center outline-none'/>
                            </td>
                            <td className='text-center'>
                                <input type="number" value={input.restTime} onChange={(e) => handleInputChange(index, e)} name="restTime" placeholder='sec' min="1" max="1000" className='w-full text-center outline-none'/>
                            </td>
                            <td className='flex justify-center text-2xl h-16'>
                                <button onClick={() => handleDeleteInput(index)} className='hover:text-gray-500'>
                                    <LuDelete/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
                <div className='my-2 flex justify-end'>
                    <button onClick={handleAddInput} className='bg-gray-200 py-2 px-5 hover:bg-gray-300'>Thêm</button>
                    <div className='p-1'></div>
                    <button onClick={handleSubmit} className='bg-gray-200 py-2 px-5 hover:bg-gray-300'>Bắt đầu</button>
                </div>
            </div>
            <div className='mb-16 mx-[2%] border p-2'>
                {Array.isArray(formData)&&formData.slice(sliceFirst,sliceEnd).map((item,index)=>(
                    <div key={index} className=''>
                        <p className='text-center font-bold text-lg md:hidden'>{item.name}</p>
                        <div className='flex justify-between'>
                            <p className='font-bold text-lg max-md:hidden'>{item.name}</p>
                            <p>{item.sets} sets</p>
                            <p>{item.reps} reps</p>
                            <p>{restTime}s</p>
                        </div>
                    </div>    
                    ))}
                <div style={{backgroundColor:"black",width: `${percentSets}%` }}>
                    <p className='mx-1 text-end text-white'>{percentSets}%</p>
                </div>
                <div className='flex my-2'>
                    <button onClick={handleStop} className='w-full flex justify-center p-2 hover:bg-gray-300'><IoStopOutline/></button>
                    <button className='w-full flex justify-center p-2 hover:bg-gray-300'><IoPauseOutline/></button>
                    <button onClick={handleDone} className='w-full flex justify-center p-2 hover:bg-gray-300'><MdDone/></button>
                </div>
            </div>

        </div>}
        {music && <div>Music</div>}
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
