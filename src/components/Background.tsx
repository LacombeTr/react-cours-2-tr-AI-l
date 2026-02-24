export const Background = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full -z-10'>
            <img
                src='/src/assets/background.jpg'
                alt='Background'
                className='absolute w-full h-full object-cover'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-linear-to-t from-[#fff6e3] to-[#fff6e37d]' />
        </div>
    );
};
