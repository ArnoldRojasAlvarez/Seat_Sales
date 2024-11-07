import { useEffect, useState } from 'react';

function SeatReservation() {
  interface Seat {
    zone: string;
    number: number;
    status: string;
    type: string;
    vision_percentage: number;
  }

  const [seats, setSeats] = useState<Seat[]>([]);

  const fetchSeats = async () => {
    try {
      const response = await fetch('http://127.0.0.1:7878/seating_structure');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Aplanar la estructura anidada de asientos para facilitar el renderizado
      const allSeats: Seat[] = [];

      data.categories.forEach((category: any) => {
        category.zones.forEach((zone: any) => {
          // Procesar asientos en la sección VIP
          zone.Vip.seats.forEach((seat: any) => {
            allSeats.push({
              zone: zone.name,
              number: seat.number,
              status: seat.status,
              type: "VIP",
              vision_percentage: seat.vision_percentage,
            });
          });
          // Procesar asientos en la sección General
          zone.General.seats.forEach((seat: any) => {
            allSeats.push({
              zone: zone.name,
              number: seat.number,
              status: seat.status,
              type: "General",
              vision_percentage: seat.vision_percentage,
            });
          });
        });
      });

      setSeats(allSeats);
    } catch (error) {
      console.error('Error al obtener asientos:', error);
      setSeats([]); // Establece un array vacío en caso de error
    }
  };

  // Llama a la función fetchSeats cuando el componente se monta
  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div>
      <h1>Reserva de Asientos</h1>
      <div>
        {seats.map((seat, index) => (
          <div key={index}>
            <strong>Zona:</strong> {seat.zone}, 
            <strong> Número:</strong> {seat.number}, 
            <strong> Estado:</strong> {seat.status}, 
            <strong> Tipo:</strong> {seat.type}, 
            <strong> Porcentaje de Visión:</strong> {seat.vision_percentage}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatReservation;
