export default function CategoryCart({ ounarName, storeImage, sales }) {
  return (
    <div
      className="bg-white p-4 rounded-md shadow flex flex-col items-center 
                 transition-transform hover:shadow-accent-content cursor-pointer"
      title={ounarName}
    >
      <div className="w-full h-64 overflow-hidden rounded-md mb-4 bg-gray-100 flex justify-center items-center">
        {storeImage ? (
          <img
            src={storeImage}
            alt={ounarName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-sm">لا توجد صورة</div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
        {ounarName}
      </h3>
      {typeof sales === "number" && (
        <p className="text-sm text-gray-600">
          المبيعات الإجمالية: <span className="font-bold">{sales}CAD</span>
        </p>
      )}
    </div>
  );
}
