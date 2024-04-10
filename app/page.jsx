/** @format */

"use client";
import React, { use, useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import PopupMessage from "@/app/Components/PopupMessage";

function Page() {
  const [availableApartments, setAvailableApartments] = useState([]);
  const [availabeleRooms, setAvailabelRooms] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const [mainImages, setMainImages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [minorImages, setMinorImages] = useState([]);
  const [roomName, setRoomName] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add currentImageIndex state

  useEffect(() => {
    fetch("api/getMainImages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch main images");
        }
        return response.json();
      })
      .then((data) => {
        setMainImages(data);
      })
      .catch((error) => {
        setErrors(error.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of success or failure
      });
  }, []);

  // method to  collect  available images
  useEffect(() => {
    fetch("/api/getAvailableApartments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch available apartments");
        }
        return response.json();
      })
      .then((data) => {
        setAvailableApartments(data);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  }, []);

  useEffect(() => {
    fetch("api/getAvailableRooms")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch available rooms");
        }
        return response.json();
      })
      .then((data) => {
        setAvailabelRooms(data);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  }, []);

  const findMainImage = (roomName) => {
    const mainImage = mainImages.find(
      (image) => image.selectedRoomName === roomName
    );
    return mainImage ? mainImage.mainImage : null;
  };

  const handleViewMoreImages = (roomName) => {
    setRoomName(roomName);

    setSelectedRoom(roomName);
  };

  function extractImages(data) {
    // Filter out the image data from each object in the array
    const images = data.map((item) => item.minorImages.map((image) => image));
    // Flatten the array of arrays into a single array
    const flattenedImages = [].concat(...images);
    // return flattenedImages;
    setMinorImages(flattenedImages);
  }
  // method to collect other images

  useEffect(() => {
    const fetchMinorImages = async () => {
      try {
        const response = await fetch("/api/getMinorImages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch minor images");
        }
        const data = await response.json();

        extractImages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrors(error.message);
      }
    };

    if (roomName) {
      fetchMinorImages();
    }
  }, [roomName, setRoomName]);

  const closePopup = () => {
    setShowPopup(false);
    setSelectedRoomImages([]);
  };
  useEffect(() => {}, [minorImages]);
  // method to open up the pop up window to display other images

  return (
    <div className='container mx-auto mt-4 bg-blue-200 rounded-lg shadow-lg p-6'>
      <h1 className='text-3xl font-bold mb-4 text-blue-900'>
        Welcome to SherryHomes
      </h1>
      {loading && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-200 bg-opacity-50 z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-900'></div>
        </div>
      )}
      {availableApartments.map((apartment, index) => (
        <div key={index} className='mb-8'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-3xl font-bold mb-2 text-blue-900'>
              {apartment.apartmentName}
            </h2>
            <p className='text-gray-600 mb-4'>{apartment.location}</p>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {availabeleRooms
                .filter(
                  (room) => room.nameOfApartment === apartment.apartmentName
                )
                .map((room, roomIndex) => (
                  <div
                    key={roomIndex}
                    className='bg-blue-100 rounded-lg shadow'>
                    <div>
                      <h3 className='text-3xl font-semibold mb-2'>
                        <p className='text-blue-900'>{room.roomName}</p>
                      </h3>
                    </div>
                    {findMainImage(room.roomName) && (
                      <div style={{ position: "relative" }}>
                        <img
                          src={findMainImage(room.roomName)}
                          alt={`Main Image for ${room.roomName}`}
                          className='w-full h-60 object-cover rounded-t-lg'
                        />
                        <button
                          className='absolute top-2 right-2 px-2 py-1 bg-blue-500 text-bold text-xl text-white rounded'
                          onClick={() => handleViewMoreImages(room.roomName)}>
                          View more images
                        </button>
                      </div>
                    )}
                    {/* Minor images modal */}
                    {selectedRoom === room.roomName && (
                      <div className='fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-80 flex justify-center items-center'>
                        <div className='absolute inset-0 overflow-hidden flex justify-center items-center'>
                          <div className='relative bg-green-200 p-2 items-center justify-items-center rounded-lg max-w-screen-md w-90% sm:w-full h-1/2 sm:h-full overflow-hidden'>
                            <button
                              className='absolute top-2 right-2 font-bold text-xl px-4 py-2 bg-red-500 text-white rounded transition duration-300 hover:bg-red-600'
                              onClick={() => setSelectedRoom(null)}>
                              {/* Render "X" on small screens, otherwise "Close" */}
                              <span className='hidden sm:inline'>Close</span>
                              <span className='sm:hidden'>
                                <CloseIcon />
                              </span>
                            </button>{" "}
                            <h2 className='text-2xl font-bold mb-4'>
                              Additional Images
                            </h2>
                            <div className='relative'>
                              <img
                                src={minorImages[currentImageIndex]}
                                alt={`Minor Image ${currentImageIndex}`}
                                className='w-full h-3/4 object-cover rounded-lg cursor-pointer mb-4'
                              />

                              <div className='absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center'>
                                <button
                                  className='px-4 py-2 text-white rounded transition duration-300 hover:bg-blue-600'
                                  onClick={() =>
                                    setCurrentImageIndex((prevIndex) =>
                                      prevIndex > 0
                                        ? prevIndex - 1
                                        : minorImages.length - 1
                                    )
                                  }
                                  style={{
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}>
                                  <ArrowBackIosIcon className='sm:text-2xl font-bold lg:text-4xl' />
                                </button>
                                <button
                                  className='px-4 py-2 text-white rounded transition duration-300 hover:bg-blue-600'
                                  onClick={() =>
                                    setCurrentImageIndex((prevIndex) =>
                                      prevIndex < minorImages.length - 1
                                        ? prevIndex + 1
                                        : 0
                                    )
                                  }
                                  style={{
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}>
                                  <ArrowForwardIosIcon className='sm:text-2xl font-bold lg:text-4xl' />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className='p-4 flex flex-col'>
                      <div className='flex flex-col'>
                        <div className='mb-2'>
                          <span className='font-semibold text'>Room type:</span>
                          <p className=' text-2xl text-blue-900'>
                            {room.roomType}
                          </p>
                        </div>
                        <div className=' mb-2'>
                          <span className='font-semibold '>Guests:</span>{" "}
                          <p className='text-2xl text-blue-900'>
                            {room.numberOfGuests}
                          </p>
                        </div>
                        <div className=' mb-2'>
                          <span className='font-semibold '>Beds:</span>{" "}
                          <p className='text-blue-900  text-2xl'>
                            {room.numberOfBeds}
                          </p>
                        </div>
                        <div className=' mb-2'>
                          <span className='font-semibold '>Description:</span>{" "}
                          <p className='text-xl text-blue-900'>
                            {room.roomDescription}
                          </p>
                        </div>
                        <div className=' mb-2'>
                          <span className='font-semibold '>Price:</span>{" "}
                          <p className='text-2xl font-bold text-yellow-600'>
                            ${room.price}
                          </p>
                        </div>
                      </div>

                      {/* Book component */}
                      <div className='flex justify-center'>
                        <BookNowButton
                          roomName={room.roomName}
                          apartmentName={room.nameOfApartment}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
      {errors && (
        <div className='fixed bottom-4 left-4 text-red-500'>{errors}</div>
      )}
    </div>
  );
}

export default Page;

//
//
//
//
const BookNowButton = ({ roomName, apartmentName }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className='flex justify-center'>
      <button
        className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300'
        onClick={handleButtonClick}>
        Check availabilty
      </button>
      <DatePopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        roomName={roomName}
        apartmentName={apartmentName}
      />
    </div>
  );
};

//
//
//
//
//

// Define DatePopup component
const DatePopup = ({ isOpen, onClose, roomName, apartmentName }) => {
  // State variables
  const [selectedDate, setSelectedDate] = useState(new Date());
  // contains all the booked dates from the databsee
  const [bookedDates, setBookedDates] = useState([]);
  // contains all the dates that i want to book
  const [myBookingDates, setMyBookingDates] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(null);
  const [attemptedBooking, setAttemptedBooking] = useState(null);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [currentRoomName, setCurrentRoomName] = useState(null);
  const [currentBookedDates, setCurrentBookedDates] = useState([]);

  const [bookimgInformation, setBookingInformation] = useState([]);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  function compareDateArrays(dates1, dates2) {
    const matchingDates = [];

    // Iterate through each date in the first array
    dates1.forEach((date1) => {
      // Check if the date exists in the second array
      if (dates2.some((date2) => date1.getTime() === date2.getTime())) {
        // Add the matching date to the result array
        matchingDates.push(date1);
      }
    });

    return matchingDates;
  }

  const handleBook = async () => {
    setAttemptedBooking(true);
    // Ensure that check-in date is available
    if (!checkInDate) {
      setShowMessage(true);
      setMessage("Check In Date is missing!!");
      setTimeout(() => setShowMessage(false), 5000);
      return;
    }

    // Ensure that check-out date is available
    if (!checkOutDate) {
      setShowMessage(true);
      setMessage("Check Out Date is missing!!");
      setTimeout(() => setShowMessage(false), 5000);
      return;
    }

    if (!myBookingDates) {
      setShowMessage(true);
      setMessage("You have not set bookig dates yet");
      setTimeout(() => setShowMessage(false), 5000);
      return;
    }

    if (bookedDates) {
      // Check for conflicting dates

      const matchingDates = compareDateArrays(myBookingDates, bookedDates);

      if (matchingDates.length > 0) {
        const formattedDates = matchingDates.map((date) =>
          date.toLocaleDateString()
        ); // Use toLocaleDateString for user-friendly format
        setShowMessage(true);
        setMessage(`Date(s) already booked!! ${formattedDates.join(", ")}`);
        setTimeout(() => setShowMessage(false), 5000);
        return;
      } else {
        try {
          const res = await fetch("/api/bookings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              checkInDate,
              checkOutDate,
              roomName,
              myBookingDates,
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to book date");
          }

          // Update bookedDates state with the newly booked date
          // Set the booking response state
          const data = await res.json();

          setBookingResponse(data);
        } catch (error) {
          console.error("Error booking date:", error);
        }
      }
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkInDate,
          checkOutDate,
          roomName,
          myBookingDates,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to book date");
      }

      // Update bookedDates state with the newly booked date
      // Set the booking response state
      const data = await res.json();

      setBookingResponse(data);
    } catch (error) {
      console.error("Error booking date:", error);
    }
  };
  //Function to get all the booked dates from the database
  useEffect(() => {
    if (isOpen && bookimgInformation) {
      const allBookedDates = bookimgInformation.reduce((dates, booking) => {
        // Convert each date string to a Date object
        const datesAsObjects = booking.bookedDates.map(
          (dateString) => new Date(dateString)
        );

        // Concatenate the array of Date objects
        return dates.concat(datesAsObjects);
      }, []);
      setBookedDates(allBookedDates);
    }
  }, [isOpen, bookimgInformation]);

  //
  function filterBookedDatesByMonth(selectedDate, bookedDates) {
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    const filteredDates = bookedDates.filter((bookedDate) => {
      const bookedMonth = bookedDate.getMonth();
      const bookedYear = bookedDate.getFullYear();
      return bookedMonth === selectedMonth && bookedYear === selectedYear;
    });

    return filteredDates;
  }

  useEffect(() => {
    const filteredDates = filterBookedDatesByMonth(selectedDate, bookedDates);
    setCurrentBookedDates(filteredDates);
  }, [selectedDate, bookedDates]); // Dependency array

  //

  //

  // function to get all the booked dates in the database
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        if (isOpen) {
          const response = await fetch("/api/getBookedDates", {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify({
              roomName,
            }),
          });

          if (!response.ok) {
            throw error("Failed to fetch booked dates");
          }
          const data = await response.json();
          setBookingInformation(data);
        }
      } catch (error) {
        console.error("Error fetching bookings information:", error);
      }
    };

    fetchBookedDates();
  }, [isOpen, roomName]);

  // fuction to manipulate all the dates between that are booked// function to manipulate all the dates between that are booked
  const addBookedDatesBetween = (startDate, endDate) => {
    const datesToAdd = [new Date(startDate)]; // Include checkInDate at the beginning
    const currentDate = new Date(startDate);
    const newEndDate = new Date(endDate); // Create a new Date object from endDate
    newEndDate.setDate(newEndDate.getDate() + 1); // Increment endDate by one day

    // Add all dates between checkInDate and checkOutDate
    while (currentDate < newEndDate) {
      currentDate.setDate(currentDate.getDate() + 1);
      datesToAdd.push(new Date(currentDate));
    }
    setMyBookingDates(datesToAdd);
  };

  useEffect(() => {
    // Call addBookedDatesBetween whenever checkInDate or checkOutDate changes

    addBookedDatesBetween(checkInDate, checkOutDate);
  }, [, isOpen, checkInDate, checkOutDate]);

  // Call addBookedDatesBetween whenever checkInDate or checkOutDate changes
  useEffect(() => {
    if ((checkInDate, checkOutDate)) {
      addBookedDatesBetween(checkInDate, checkOutDate);
    }
  }, [checkInDate, checkOutDate]);
  // function to set the time out fro show message
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  // Function to handle changing of the date
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to get the start and end dates of the current month
  const getCurrentMonthDates = (selectedDate) => {
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );
    return { startDate: firstDayOfMonth, endDate: lastDayOfMonth };
  };

  // Function to move to the previous month
  const previousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  // Function to move to the next month
  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Return JSX
  return (
    <div
      className={`w-screen fixed h-screen inset-0 z-50 p-4 overflow-y-auto pt-8 bg-blue-300 bg-opacity-100 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}>
      {/* Booking response display */}
      {bookingResponse && (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
          <div className='bg-black bg-opacity-50 absolute inset-0'></div>
          <div className='bg-white flex flex-col justify-center items-center border-green-400 p-8 rounded-lg relative'>
            <h2 className='text-xl text-gray-500 font-bold mb-4'>
              Booking Response
            </h2>
            <p className='text-3xl font-serif font-semibold'>
              {bookingResponse.success
                ? "Booking successful"
                : "Booking failed"}
            </p>

            <button
              className='px-4 py-2 mt-4 font-semibold text-xl bg-green-500 hover:bg-green-700 text-white rounded'
              onClick={() => setBookingResponse(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showMessage && (
        <PopupMessage message={message} onClose={handleCloseMessage} />
      )}

      <div className='relative bg-white mt-10 p-8 rounded-lg w-full max-w-screen-md'>
        {/* Close button */}
        <div className='absolute top-0 right-0 m-4'>
          <button
            className='px-2 py-1 bg-red-500 text-white rounded'
            onClick={onClose}>
            Close
          </button>
        </div>
        {/* Title */}
        <div className='flex justify-center'>
          <h1 className='text-4xl font-serif font-bold text-blue-500 leading-tight mb-4 text-center'>
            {apartmentName}
          </h1>
        </div>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-serif font-bold text-blue-500 leading-tight mb-4 text-center'>
            {roomName}
          </h1>
        </div>
        <div>
          <h2 className='text-2xl font-bold mb-4'>
            {selectedDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
        {/* Previous and Next Month buttons */}
        <div className='flex justify-between w-full mt-4'>
          <button
            className='px-4 py-2 bg-blue-300 hover:bg-blue-700 text-white rounded'
            onClick={previousMonth}>
            Previous Month
          </button>
          <button
            className='px-4 py-2 bg-blue-300 hover:bg-blue-700 text-white rounded'
            onClick={nextMonth}>
            Next Month
          </button>
        </div>
        {/* Check-In and Check-Out sections */}
        <div className='flex flex-col lg:flex-row items-center lg:items-start justify-between w-full mt-4 gap-4'>
          {/* Check-In section */}
          <div className='border rounded-md'>
            <h1 className='text-2xl font-semibold'>Check-In</h1>
            <input
              type='date'
              value={checkInDate ? checkInDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setCheckInDate(new Date(e.target.value))}
            />
          </div>
          {/* Check-Out section */}
          <div className='border rounded-md'>
            <h1 className='text-2xl font-semibold'>Check-Out</h1>
            <input
              type='date'
              value={
                checkOutDate ? checkOutDate.toISOString().split("T")[0] : ""
              }
              onChange={(e) => setCheckOutDate(new Date(e.target.value))}
            />
          </div>
        </div>
        {/* Calendar */}
        <div className='flex flex-col items-center mt-4'>
          <div className='grid grid-cols-7 w-full gap-2'>
            {Array.from({
              length: getCurrentMonthDates(selectedDate).endDate.getDate(),
            }).map((_, index) => {
              const currentDate = index + 1;
              const isCurrentMonth =
                selectedDate.getMonth() === new Date().getMonth();
              const isCurrentDate =
                isCurrentMonth && currentDate === new Date().getDate();
              //
              const isBookedDate = currentBookedDates.some((bookedDate) => {
                return (
                  bookedDate.getFullYear() === selectedDate.getFullYear() &&
                  bookedDate.getMonth() === selectedDate.getMonth() &&
                  bookedDate.getDate() === currentDate
                );
              });
              const isPastDate =
                selectedDate.getMonth() === today.getMonth() &&
                selectedDate.getFullYear() === today.getFullYear() &&
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  currentDate
                ) < today;
              //
              const isSelectedDate =
                checkInDate &&
                checkOutDate &&
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  currentDate
                ) >= checkInDate &&
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  currentDate
                ) <= checkOutDate;

              return (
                <div
                  key={index}
                  className={`text-center border border-gray-200 p-2 ${
                    isCurrentDate
                      ? "bg-blue-800 text text-black font-bold text-2xl"
                      : ""
                  } ${isPastDate ? "line-through text-gray-400" : ""} ${
                    isSelectedDate ? "bg-green-200" : ""
                  } ${isBookedDate ? "bg-red-200" : ""}`}
                  onClick={() => {
                    if (!checkInDate) {
                      setCheckInDate(
                        new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth(),
                          currentDate
                        )
                      );
                    } else if (
                      !checkOutDate &&
                      checkInDate <
                        new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth(),
                          currentDate
                        )
                    ) {
                      setCheckOutDate(
                        new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth(),
                          currentDate
                        )
                      );
                    }
                  }}
                  style={{
                    cursor:
                      isBookedDate || isPastDate ? "not-allowed" : "pointer",
                  }}>
                  {currentDate}
                </div>
              );
            })}
          </div>
          {/* Book button */}
          <div className='mt-4'>
            <button
              className='px-4 py-2 mt-4 bg-green-500 hover:bg-green-700 text-white rounded'
              onClick={handleBook}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};