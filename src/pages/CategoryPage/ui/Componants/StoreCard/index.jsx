import { Link } from "react-router-dom";

export default function StoreCard({ store, categoryId }) {
  return (
    <Link
      to={`/store/${store.id}`}
      state={{ categoryId }}
      className="block rounded-xl pb-2 w-full text-center shadow transition-shadow hover:shadow-accent-content mb-5"
    >
      <img
        src={store.store_logo_url || "/default-store.png"}
        alt={store.store_name}
        className="w-full h-[300px] object-cover rounded-xl mb-2 pointer-events-none"
      />
      <h3 className="font-semibold text-black">{store.store_name}</h3>
    </Link>
  );
}
