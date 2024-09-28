import ModalLayout from '@renderer/common/components/ModalLayout'

interface Props {
  url: string
  onClose: () => void
}

export default function ImageModal({ url, onClose }: Props) {
  return (
    <ModalLayout onClose={onClose}>
      <div className="w-[600px] h-[400px]">
        <img src={url} alt="Product image" className="w-full h-full object-scale-down" />
      </div>
    </ModalLayout>
  )
}
