import React from 'react';

function NotFound(props) {
    return (
        <div className='flex flex-col items-center min-h-screen text-center bg-slate-50'>
            <img src='404_NotFound.png' alt='not-found' className='max-w-full mb-6 w-96'/>
            <p className='text-2xl font-semibold'>Bạn đang đi vào vùng cấm địa</p>
            <a href='/' className='inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md bg-primary
            rounded-2xl hover:bg-primary-dark'>
                Quay trở về trang chủ
            </a>
        </div>
    );
}

export default NotFound;