export const Background = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full -z-10 overflow-hidden'>
            <div className='absolute bottom-[15%] w-full h-[10%] bg-linear-to-t from-white/10 to-transparent' />
            <img src='src/assets/background.jpg' alt='Background' className='w-full h-full object-cover opacity-30' />
        </div>
    );
};