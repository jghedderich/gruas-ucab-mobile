interface Orders {
  orderId: string;
  driverName: string;
  carModel: string;
  origin: string;
  destination: string;
  distance_arrival: string;
  duration_arrival: string;
  distance_back: string;
  duration_back: string;
  userId: string;
}

interface AdditionalCost {
  costId: string;
  name: string;
  description: string;
}

const orders: Orders[] = [
  {
    orderId: "1",
    driverName: "Carlos Sousa",
    carModel: "BMW X5",
    origin: "Chacao, La Castellana",
    destination: "Baruta, La Trinidad",
    distance_arrival: "10 ",
    duration_arrival: "1 hr 30",
    distance_back: "8 ",
    duration_back: "0 hr 45",
    userId: "1",
  },
  {
    orderId: "3",
    driverName: "Enrique Gonzalez",
    carModel: "Chevrolet Grand Vitara",
    origin: "Chacao, La Castellana",
    destination: "Baruta, La Trinidad",
    distance_arrival: "10 ",
    duration_arrival: "1 hr 30 ",
    distance_back: "8 ",
    duration_back: "0 hr 45 ",
    userId: "1",
  },
  {
    orderId: "4",
    driverName: "Andrea Cedeño",
    carModel: "BMW X5",
    origin: "Chacao, La Castellana",
    destination: "Baruta, La Trinidad",
    distance_arrival: "10 ",
    duration_arrival: "1 hr 30 ",
    distance_back: "8 ",
    duration_back: "0 hr 45 ",
    userId: "3",
  },
  {
    orderId: "5",
    driverName: "Juan Hedderich",
    carModel: "BMW X5",
    origin: "Chacao, La Castellana",
    destination: "Baruta, La Trinidad",
    distance_arrival: "10 ",
    duration_arrival: "1 hr 30 ",
    distance_back: "8 ",
    duration_back: "0 hr 45 ",
    userId: "3",
  },
  {
    orderId: "6",
    driverName: "Pedro Rodríguez",
    carModel: "BMW X5",
    origin: "Chacao, La Castellana",
    destination: "Baruta, La Trinidad",
    distance_arrival: "10 ",
    duration_arrival: "1 hr 30 ",
    distance_back: "8 ",
    duration_back: "0 hr 45 ",
    userId: "3",
  },
];

const additionalCosts: AdditionalCost[] = [
  {
    costId: "101",
    name: "Material",
    description: "Costo por materiales adicionales",
  },
  {
    costId: "102",
    name: "Herramienta",
    description: "Costo por herramientas adicionales",
  },
  {
    costId: "103",
    name: "Tiempo",
    description: "Costo por tiempo adicional",
  },
  {
    costId: "104",
    name: "Zona Roja",
    description: "Costo por tiempo adicional",
  },
  {
    costId: "105",
    name: "Maniobras",
    description: "Costo por tiempo adicional",
  },
  
];

export { orders, additionalCosts };
export default { orders, additionalCosts };
