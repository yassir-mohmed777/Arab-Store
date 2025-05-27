export default function ProductCard({ name, price, image }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-3 text-center">
      <h4 className="font-bold text-lg">{name}</h4>
      <img
        src={image}
        // alt={name}
        className="w-full h-[200px] object-cover rounded-md mb-2"
      />
      <p className="text-red-500 font-semibold">{price}CAD</p>
    </div>
  );
}