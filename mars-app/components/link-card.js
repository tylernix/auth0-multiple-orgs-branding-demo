export default function LinkCard({ title, description, url }) {
  return (
    <a
        href={url}
        className="p-6 mt-6 text-left w-80 bg-gray-100 bg-opacity-70 rounded-xl hover:text-blue-600 focus:text-blue-600"
    >
        <h3 className="text-2xl font-bold">{title} &rarr;</h3>
        <p className="mt-4 text-xl">
            {description}
        </p>
    </a>
  )
}