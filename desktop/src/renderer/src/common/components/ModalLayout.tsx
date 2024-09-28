interface Props {
  children: React.ReactNode
  onClose: () => void
}

export default function ModalLayout({ children, onClose }: Props) {
  const handleClick = () => {
    onClose()
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/75">
      <div className="relative h-full w-full">
        <button className="text-white absolute right-9 top-9" onClick={handleClick}>
          X
        </button>
        <div className="h-full w-full flex justify-center items-center">{children}</div>
      </div>
    </div>
  )
}
