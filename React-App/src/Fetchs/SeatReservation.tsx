import { useEffect, useState } from 'react';
import './SeatReservation.css';

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

      const allSeats: Seat[] = [];
      data.categories.forEach((category: any) => {
        category.zones.forEach((zone: any) => {
          zone.Vip.seats.forEach((seat: any) => {
            allSeats.push({
              zone: zone.name,
              number: seat.number,
              status: seat.status,
              type: "VIP",
              vision_percentage: seat.vision_percentage,
            });
          });
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
      setSeats([]);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div className="stadium">
      <h1>Reserva de Asientos</h1>
      <div className="seating-map">
        {seats.map((seat, index) => (
          <div
            key={index}
            className={`seat ${seat.type.toLowerCase()} ${seat.status.toLowerCase()}`}
            title={`Zona: ${seat.zone} | Número: ${seat.number} | Estado: ${seat.status} | Tipo: ${seat.type} | Visión: ${seat.vision_percentage}%`}
          >
            {seat.number}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatReservation;
