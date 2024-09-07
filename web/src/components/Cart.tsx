export default function Cart() {
  return (
    <>
      <div className='flex justify-between my-10 p-4'>
        <div className='relative w-64 h-64'>
          <img
            src='./../amigurumi.jpg'
            className=' w-full h-full object-cover rounded-lg p-1 brightness-50'
          ></img>
          <div className='absolute inset-0 flex items-center justify-center text-white text-4xl font-bold'>
            Amigurumi
          </div>
        </div>

        <div className='relative w-64 h-64 '>
          <img
            src='./../llaveros.jpg'
            className='w-full h-full object-cover rounded-lg p-1 brightness-50'
          ></img>
          <div className='absolute inset-0 flex items-center justify-center text-white text-4xl font-bold'>
            Llaveros
          </div>
        </div>

        <div className='relative w-64 h-64 '>
          <img
            src='./../ramos.jpg'
            className='w-full h-full object-cover rounded-lg p-1 brightness-50'
          ></img>
          <div className='absolute inset-0 flex items-center justify-center text-white text-4xl font-bold'>
            Ramos
          </div>
        </div>

        <div className='relative w-64 h-64'>
          <img
            src='./../flor.jpg'
            className='w-full h-full object-cover rounded-lg p-1 brightness-50'
          ></img>
          <div className='absolute inset-0 flex items-center justify-center text-white text-4xl font-bold'>
            Flores
          </div>
        </div>
      </div>
    </>
  )
}
