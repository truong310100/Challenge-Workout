import React from 'react'
// import logoVHUDetail from '../images/logoVHUDetail.png'
// import Line37 from '../assets/images/line37.png'

export default function NotFound404() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='bg-white w-full flex flex-col justify-between items-center h-[50vh]'>
            <a className='' href="https://vhu.edu.vn/"><img className='' src="" alt=""/></a>
            <p className='text-blue-900 text-9xl font-bold flex justify-between'>404</p>
        </div>
        <div className='bg-blue-900 w-full flex justify-center -mt-[11px] h-[50vh]'>
            <p className='text-white font-bold text-2xl'>Sorry, Page Not Found</p>
        </div>
    </div>
  )
}