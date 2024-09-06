import useAuth from '@renderer/common/hooks/useAuth'
import useDate from '@renderer/common/hooks/useDate'
import ViewLayout from '@renderer/common/layouts/ViewLayout'

export default function HomePage() {
  useAuth()
  const { time, toHumanReadeable } = useDate()

  return (
    <ViewLayout>
      <div
        style={{
          backgroundColor: '#ddd',
          width: '90%',
          padding: '5% 1% 0 1%',
          borderTopLeftRadius: '10%'
        }}
      >
        <h2>Productos bajo stock</h2>
        Pen <br /> <span style={{ fontWeight: 'bolder', fontSize: '40px' }}>{time}</span> <br />
        <span style={{ fontWeight: 'bolder', fontSize: '40px' }}>{toHumanReadeable()}</span>
      </div>
    </ViewLayout>
  )
}
