import useAuth from '@renderer/common/hooks/useAuth'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import Routes from '@renderer/common/utils/routes'
import { Redirect } from 'wouter'

export default function HomeView() {
  useAuth()
  return (
    <ViewLayout title="Productos en stock">
      <Redirect href={Routes.Products} />
    </ViewLayout>
  )
}
