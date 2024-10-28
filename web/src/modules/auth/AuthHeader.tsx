import AppLogo from '../../common/components/AppLogo'
import HeaderLayout from '../../common/components/HeaderLayout'

export default function AuthHeader() {
  return (
    <HeaderLayout className={'border-b-2 border-solid pb-0'}>
      <AppLogo />
    </HeaderLayout>
  )
}
