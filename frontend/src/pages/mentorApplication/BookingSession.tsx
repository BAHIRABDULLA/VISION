import { slotBooking } from '@/services/mentorApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

interface BookingProps {
    slots: any,
    mentorId: string
}

const BookingSession: React.FC<BookingProps> = ({ slots, mentorId }) => {

    const [selectedSlot, setSelectedSlot] = useState()
    const [dates, setDates] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        const createInitialDates = () => {
            const today = new Date();
            const days = [];
            for (let i = 0; i < 3; i++) {
                days.push({
                    label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : null,
                    date: new Date(today.getTime() + i * 24 * 60 * 60 * 1000),
                });
            }
            return days;
        };

        const initialDates = createInitialDates();
        setDates(initialDates);
        updateAvailableSlots(initialDates, 0);
    }, [slots]);

    const updateAvailableSlots = (datesList, index) => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const selectedDate = datesList[index].date;
        const dayName = dayNames[selectedDate.getDay()];
        const daySlots = slots[dayName] || [];
        setAvailableSlots(daySlots);
    };

    // Format date for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'numeric',
            day: 'numeric'
        });
    };

    // Add a method to get label for a date
    const getLabelForDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        date.setHours(0, 0, 0, 0);

        if (date.getTime() === today.getTime()) return 'Today';
        if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
        return null;
    };

    // Navigate dates forward
    const navigateNext = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const maxDate = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
        const lastDate = dates[dates.length - 1].date;
        lastDate.setHours(0, 0, 0, 0);

        if (lastDate.getTime() < maxDate.getTime()) {
            const newDates = [...dates];
            newDates.shift();

            const nextDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);
            newDates.push({
                label: getLabelForDate(nextDate),
                date: nextDate,
            });

            setDates(newDates);
            setActiveIndex(0);
            updateAvailableSlots(newDates, 0);
        }
    };

    // Navigate dates backward
    const navigatePrev = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const firstDate = dates[0].date;

        if (firstDate.getTime() > today.getTime()) {
            const newDates = [...dates];
            newDates.pop();

            const prevDate = new Date(firstDate.getTime() - 24 * 60 * 60 * 1000);
            newDates.unshift({
                label: getLabelForDate(prevDate),
                date: prevDate,
            });

            setDates(newDates);
            setActiveIndex(0);
            updateAvailableSlots(newDates, 0);
        }
    };

    const handleDaySelection = (index) => {
        setActiveIndex(index);
        updateAvailableSlots(dates, index);
    };

    const handleSlotBooking = async () => {
        try {
            console.log('its here bab3e');
            if (!selectedSlot) {
                toast.error('Please select a slot')
                return
            }
            let [hours, minutes] = selectedSlot.split(' ')[0].split(':');
            const checkAMOrPM = selectedSlot.split(' ')[1];


            if (checkAMOrPM === 'PM' && hours !== '12') {
                hours = String(Number(hours) + 12);
            } else if (checkAMOrPM === 'AM' && hours === '12') {
                hours = '00';
            }

            const formattedTime = `${hours}:${minutes}`;
            
            // console.log(formattedTime, 'formattedTime - - - - - - ');
            console.log(selectedSlot, 'slelcted slot ', typeof selectedSlot, selectedSlot.split(' '))
            const selectedDate = dates[activeIndex].date

            // console.log(`Selected Date: ${formatDate(selectedDate)},---- ${selectedDate}`, typeof selectedDate);

            const response = await slotBooking(mentorId, formattedTime, selectedDate)
            console.log(response, 'resonse in booking session ');
        } catch (error) {
            console.error('error in handle slot booking', error);
            toast.error('Please sign in your account')
        }
    }


    return (
        <>

            <Toaster />
            <div className="bg-gray-800 
             mt-3 p-6">
                <div className='flex justify-between items-center'>
                    <div
                        onClick={navigatePrev}
                        className='p-3 w-12 bg-gray-700 rounded-full cursor-pointer'
                    >
                        <ChevronLeft color='white' />
                    </div>

                    <div className="flex justify-center space-x-8 border-b border-gray-600 pb-4 mb-4">
                        {dates.map((dateObj, index) => (
                            <div
                                key={index}
                                onClick={() => handleDaySelection(index)}
                                className={`font-medium cursor-pointer ${activeIndex === index ? 'text-blue-500' : 'text-gray-400'
                                    }`}
                            >
                                {dateObj.label || formatDate(dateObj.date)}
                            </div>
                        ))}
                    </div>

                    <div
                        onClick={navigateNext}
                        className='p-3 w-12 bg-gray-700 rounded-full cursor-pointer'
                    >
                        <ChevronRight color='white' />
                    </div>
                </div>

                <div className="space-y-4">
                    {availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {availableSlots.map((slot, i) => (
                                <button
                                    key={i}
                                    className={`py-2 px-4 rounded-lg border transition-all cursor-pointer ${selectedSlot === slot
                                        ? 'border-purple-500 bg-purple-500/10 text-white'
                                        : 'border-gray-700 text-gray-400 hover:border-purple-400'
                                        }`}
                                    onClick={() => setSelectedSlot(slot)}
                                >

                                    {slot}
                                </button>

                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No slots available</p>
                    )}
                </div>

                <div className="flex justify-center mt-5">
                    <button onClick={handleSlotBooking} disabled={!selectedSlot}
                        className={` mt-6 py-2 px-16 rounded-lg transition-colors ${selectedSlot
                            ? 'bg-purple-500 hover:bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}>
                        Book a Session
                    </button>
                </div>
            </div>
        </>
    )
}

export default BookingSession