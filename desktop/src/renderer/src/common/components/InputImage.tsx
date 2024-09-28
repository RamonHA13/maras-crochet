import { ChangeEvent, forwardRef } from 'react'

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  className: string
}

//TODO: Hacer esto draggable (?
const InputImage = forwardRef<HTMLInputElement, Props>(({ onChange, onClick, className }, ref) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-2/4 h-1/4 border-2 border-dashed border-gray-400 bg-white flex flex-col justify-center items-center p-4 rounded-lg font-bold hover:bg-white/30 ${className}`}
    >
      Click para agregar imagenes
      <input
        ref={ref}
        type="file"
        name="image"
        onChange={onChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </button>
  )
})

export default InputImage
