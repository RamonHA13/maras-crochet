import QuestionMark from '../../../common/components/Icons/QuestionMark'

export default function ProductsNotFound() {
  return (
    <div className='flex flex-col justify-center items-center text-gray-500 h-72'>
      <QuestionMark height={120} width={120} color='#6b7280' />
      <h2 className='text-2xl'>No hay productos disponibles.</h2>
      <p>Por favor, revisa más tarde o sigue explorando en la web.</p>
    </div>
  )
}
