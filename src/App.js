import React, { useState, useEffect} from "react";
const BookingData = [
  {
    "id": 1,
    "roomId": "A101",
    "startTime": "2019-09-28 13:00:00",
    "endTime": "2019-09-28 14:00:00",
    "title": "Lunch with Petr",
  },
  {
    "id": 2,
    "roomId": "A101",
    "startTime": "2019-09-28 14:00:00",
    "endTime": "2019-09-28 15:00:00",
    "title": "Sales Weekly Meeting"
  },
  {
    "id": 3,
    "roomId": "A101",
    "startTime": "2019-09-28 16:00:00",
    "endTime": "2019-09-28 18:00:00",
    "title": "Anastasia Website Warroom"
  },
  {
    "id": 4,
    "roomId": "A101",
    "startTime": "2019-09-29 13:00:00",
    "endTime": "2019-09-29 14:00:00",
    "title": "One-on-One Session"
  },
  {
    "id": 5,
    "roomId": "A101",
    "startTime": "2019-09-29 16:00:00",
    "endTime": "2019-09-29 18:00:00",
    "title": "UGC Sprint Planning"
  },
  {
    "id": 6,
    "roomId": "A102",
    "startTime": "2019-09-30 09:00:00",
    "endTime": "2019-10-04 18:00:00",
    "title": "5-Day Design Sprint Workshop"
  },
  {
    "id": 7,
    "roomId": "Auditorium",
    "startTime": "2019-09-19 09:00:00",
    "endTime": "2019-09-23 19:00:00",
    "title": "Thai Tech Innovation 2019"
  },
  {
    "id": 8,
    "roomId": "A101",
    "startTime": "2019-09-28 10:00:00",
    "endTime": "2019-09-28 13:00:00",
    "title": "Raimonland project"
  },
  {
    "id": 9,
    "roomId": "A102",
    "startTime": "2019-09-30 18:00:00",
    "endTime": "2019-09-30 20:00:00",
    "title": "Management Meetinng"
  },
  {
    "id": 10,
    "roomId": "A101",
    "startTime": "2019-10-04 14:00:00",
    "endTime": "2019-10-06 11:00:00",
    "title": "3-day workshop Corgi costume"
  }
]

function App(room, bookings) {
  const [currentBookings, setCurrentBookings] = useState({
      today: [],
      thisWeek: [],
      nextWeek: []
  });

  useEffect(() => {
      const today = new Date().toDateString();
      const thisWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toDateString();
      const nextWeek = new Date(new Date().setDate(new Date().getDate() + 14)).toDateString();

      const filteredBookings = bookings.filter(booking => {
          if (booking.room !== room) return false;

          const startDate = new Date(booking.start_time).toDateString();
          const endDate = new Date(booking.end_time).toDateString();
          if (startDate <= today && today <= endDate) return true;
          if (startDate <= thisWeek && thisWeek <= endDate) return true;
          if (startDate <= nextWeek && nextWeek <= endDate) return true;

          return false;
      });

      const todayBookings = filteredBookings.filter(booking => {
          const startDate = new Date(booking.start_time).toDateString();
          const endDate = new Date(booking.end_time).toDateString();
          return startDate <= today && today <= endDate;
      });
      const thisWeekBookings = filteredBookings.filter(booking => {
          const startDate = new Date(booking.start_time).toDateString();
          const endDate = new Date(booking.end_time).toDateString();
          return startDate <= thisWeek && thisWeek <= endDate;
      });
      const nextWeekBookings = filteredBookings.filter(booking => {
          const startDate = new Date(booking.start_time).toDateString();
          const endDate = new Date(booking.end_time).toDateString();
          return startDate <= nextWeek && nextWeek <= endDate;
      });

      setCurrentBookings({
          today: todayBookings,
          thisWeek: thisWeekBookings,
          nextWeek: nextWeekBookings
      });
  }, [room, bookings]);

  return currentBookings;
}

function isRoomAvailable(room, startTime, endTime, bookings) {
  for (const booking of bookings) {
      if (booking.room !== room) continue;

      const bookingStartTime = new Date(booking.start_time);
      const bookingEndTime = new Date(booking.end_time);
      if (startTime >= bookingStartTime && startTime < bookingEndTime) return false;
      if (endTime > bookingStartTime && endTime <= bookingEndTime) return false;
      if (startTime <= bookingStartTime && endTime >= bookingEndTime) return false;
  }

  return true;
}

export default App;
