import AppLayout from '../../common/components/AppLayout'
import useCategoryStore from '../../common/stores/useCategoryStore'
import useProductStore from '../../common/stores/useProductStore'
import Categories from './components/Categories'
import News from './components/New'

export default function HomePage() {
  const categories = useCategoryStore(state => state.categories)
  const products = useProductStore(state => state.products)

  const categoriesParsed = categories.map(x => ({
    name: x.name,
    imgUrl: x.imgUrls[0],
    id: x.id
  }))

  const productsParsed = products
    .slice() // Crear una copia de la matriz original
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) // Ordenar
    .slice(0, 3)
    .map(x => ({ name: x.name, id: x.id, imgUrl: x.imgUrls[0] })) // Obtener los tres más recientes

  return (
    <AppLayout>
      <section className='relative flex items-center justify-center p-28'>
        <img
          src='/banner.jpg'
          alt='home-banner'
          className='absolute top-0 left-0 w-full h-full object-cover -z-10'
        />
        <div className='text-center text-white'>
          <h1 className='text-6xl font-bold'>Mara's Crochet</h1>
          <h2 className='text-xl mt-2'>
            Creaciones únicas hechas a mano, tejiendo calidez y estilo en cada
            puntada.
          </h2>
        </div>
      </section>
      <Categories categories={categoriesParsed} />
      {/**TODO: Add novedades section */}
      <News products={productsParsed} />
    </AppLayout>
  )
}
