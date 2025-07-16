export default function FormInput({ label, type = "text", className = "", ...props }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-x-light">
        {label}
      </label>
      <input
        type={type}
        className={`block w-full px-3 py-2 bg-transparent border border-x-gray rounded-md focus:outline-none focus:ring-1 focus:ring-x-blue focus:border-x-blue text-x-light ${className}`}
        {...props}
      />
    </div>
  )
}