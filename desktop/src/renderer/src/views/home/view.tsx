import useAuth from '@renderer/common/hooks/useAuth'
import ViewLayout from '@renderer/common/layouts/ViewLayout'

export default function HomeView() {
  useAuth()
  return (
    <ViewLayout title="Productos en stock">
      <div>Aqui va la tabla de productos olv</div>
    </ViewLayout>
  )
}
