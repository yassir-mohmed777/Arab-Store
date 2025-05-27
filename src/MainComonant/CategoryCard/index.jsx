export default function CategoryCart({ ounarName }) {
  return (
    <div className="bg-white p-3 shadow-2xl rounded-sm ">
      <img src="" alt={ounarName} className="h-[300px] w-full object-cover" />
      <p className="font-bold">{ounarName}</p>
    </div>
  );
}
