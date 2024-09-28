interface Props {
  urls: string[]
  onRemove: (url: string) => void
}

export default function MultipleImages({ urls, onRemove }: Props) {
  const handleRemove = (url: string) => () => {
    onRemove(url)
  }

  return (
    <>
      {urls.map((url) => (
        <button
          key={url}
          onClick={handleRemove(url)}
          className="relative w-0 flex-grow group transition-all duration-500 ease-in-out hover:w-32"
        >
          <img
            src={url}
            alt="Product"
            className="object-scale-down w-full h-full opacity-80 transition-all duration-500 ease-in-out hover:opacity-100 hover:filter hover:contrast-120 "
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <span className="text-white text-lg">Click para eliminar</span>
          </div>
        </button>
      ))}
    </>
  )
}
