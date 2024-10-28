import { Link } from 'wouter'
import Routes from '../../../common/routes'

interface Category {
  id: number
  name: string
  imgUrl: string
}
interface Props {
  categories: Category[]
}
export default function Categories({ categories }: Props) {
  return (
    <section className='my-10 font-bold px-2'>
      <h2 className='text-3xl text-center pb-14'>Nuestras categorias</h2>
      <div className='flex justify-between overflow-x-auto'>
        {categories.map(x => (
          <Card key={`${x.name}-${x.id}`} category={x} />
        ))}
      </div>
    </section>
  )
}

interface CardProps {
  category: Category
}
const Card = ({ category }: CardProps) => {
  return (
    <Link
      href={`${Routes.productByCategory.route}${category.id}`}
      className='relative w-64 h-64 overflow-hidden group rounded-lg'
    >
      <img
        src={category.imgUrl}
        className='w-full h-full object-cover brightness-50 transition-transform duration-300 ease-in-out group-hover:scale-110'
      />
      <div className='absolute inset-0 flex items-center justify-center text-white text-4xl font-bold z-10'>
        {category.name}
      </div>
    </Link>
  )
}
