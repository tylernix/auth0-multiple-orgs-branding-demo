export default function LinkCard({ title, description, url }) {
  return (
    <a
        href={url}
        className="p-6 mt-6 text-left w-80 bg-gray-300 bg-opacity-80 rounded-xl hover:text-yellow-200 focus:text-yellow-200"
    >
        <h3 className="text-2xl font-bold">{title} &rarr;</h3>
        <p className="mt-4 text-xl">
            {description}
        </p>
    </a>
  )
}