import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import CarList from "./components/CarList";

const BASE_URL = "https://cars-crud.academlo.tech";

function App() {
  const [cars, setCars] = useState([]);
  const [carToUpdate, setCarToUpdate] = useState(null);

  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentCar = Object.fromEntries(formData);
    if (carToUpdate) {
      //? Aqui estamos en modo actualizar
      currentCar.id = carToUpdate.id;
      updateCar(currentCar);
    } else {
      //? Aqui estamos en modo crear
      createCar(currentCar, e.target);
    }
  };

  const createCar = (newCar, form) => {
    axios
      .post(BASE_URL + "/cars/", newCar)
      .then(({ data: newCar }) => {
        form.reset();
        alert("Auto creado correctamente");
        setCars([...cars, newCar]);
      })
      .catch((err) => console.log(err));
  };

  const deleteCar = (idCar) => {
    axios
      .delete(BASE_URL + `/cars/${idCar}/`)
      .then(() => {
        const newCars = cars.filter((car) => car.id !== idCar);
        setCars(newCars);
        alert("Auto eliminado correctamente");
      })
      .catch((err) => console.log(err));
  };

  const updateCar = (carInfo) => {
    axios
      .put(BASE_URL + `/cars/${carToUpdate.id}/`, carInfo)
      .then(() => {
        //? Necesitamos una lógica para modificar en el estado el auto que cambió y sobreescribir sus datos
        const newCars = cars.map((car) =>
          car.id === carToUpdate.id ? carInfo : car
        );
        setCars(newCars);
        formRef.current.reset();
        setCarToUpdate(null);
        alert("Auto actualizado correctamente");
      })
      .catch((err) => console.log(err));
  };

  const handleClickUpdate = (car) => {
    setCarToUpdate(car);
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/cars/")
      .then(({ data }) => setCars(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (carToUpdate !== null) {
      //? Tengo la certeza de que en el estado hay informacion de un auto
      //TODO Montar la informacion en el formulario
      formRef.current.brand.value = carToUpdate.brand;
      formRef.current.model.value = carToUpdate.model;
      formRef.current.color.value = carToUpdate.color;
      formRef.current.year.value = carToUpdate.year;
      formRef.current.price.value = carToUpdate.price;
    }
  }, [carToUpdate]);
  return (
    <main className="bg-black text-white min-h-screen font-semibold text-lg p-4">
      <h2 className="text-center">CRUD Autos</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-[300px] mx-auto grid gap-2"
      >
        <label className="grid gap-1">
          <span>
            Marca <span className="text-red-500">*</span>
          </span>
          <input name="brand" type="text" className="text-black" required />
        </label>
        <label className="grid gap-1">
          <span>
            Modelo <span className="text-red-500">*</span>
          </span>
          <input name="model" type="text" className="text-black" required />
        </label>
        <label className="grid gap-1">
          <span>
            Color <span className="text-red-500">*</span>
          </span>
          <input name="color" type="text" className="text-black" required />
        </label>
        <label className="grid gap-1">
          <span>
            Año <span className="text-red-500">*</span>
          </span>
          <input name="year" type="number" className="text-black" required />
        </label>
        <label className="grid gap-1">
          <span>
            Precio <span className="text-red-500">*</span>
          </span>
          <input name="price" type="number" className="text-black" required />
        </label>
        <button className="bg-blue-500 rounded-md mt-2 p-1 hover:bg-blue-600 transition-colors">
          {carToUpdate ? "Guardar cambios auto" : "Crear auto"}
        </button>
      </form>
      <CarList
        cars={cars}
        deleteCar={deleteCar}
        handleClickUpdate={handleClickUpdate}
      />
    </main>
  );
}

export default App;

/* <div className="grid">
  <label htmlFor="brand">Marca</label>
  <input id="brand" type="text" className="text-black" />
</div> */

// const newCar = {
//   brand: e.target.brand.value,
//   model: e.target.model.value,
//   color: e.target.color.value,
//   year: e.target.year.value,
//   price: e.target.price.value,
// };
