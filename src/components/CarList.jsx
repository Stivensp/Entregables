const CarList = ({ cars, deleteCar, handleClickUpdate }) => {
  return (
    <section className="grid justify-center gap-6 py-10">
      {cars.map((car) => (
        <article key={car.id}>
          <h4 className="text-center capitalize">
            {car.brand} {car.model}
          </h4>
          <ul>
            <li>Color: {car.color}</li>
            <li>Año: {car.year}</li>
            <li>Precio: {car.price}</li>
          </ul>
          <div className="flex gap-2">
            <button
              onClick={() => handleClickUpdate(car)}
              className="bg-yellow-500 p-2 rounded-md"
            >
              Actualizar
            </button>
            <button
              onClick={() => deleteCar(car.id)}
              className="bg-red-500 p-2 rounded-md"
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};
export default CarList;
