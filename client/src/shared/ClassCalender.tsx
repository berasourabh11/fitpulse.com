import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { Activity } from './types';
import { getSessionsByDate } from './api/apiCalls';

type Props = {
    activityDetails: Activity;
}


type Session = {
    startTime: string;
    endTime: string;
    slots: number;
}

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const ClassCalender = ({ activityDetails }: Props) => {
    const [selectedDay, setSelectedDay] = useState<number>(getCurrentWeekdayIndexIST());
    const [weekOffset, setWeekOffset] = useState<number>(0);
    const [classDetails, setClassDetails] = useState<Session[] | null>(null);
    const weekDetails = getWeekDates(weekOffset);
    useEffect(() => {
        setClassDetails(null);
        const fetchData = async () => {
            try {
                const response = await getSessionsByDate(activityDetails.activityName, activityDetails.activityId, weekDetails.datesOfWeek[selectedDay]);
                setClassDetails(response.sessions);
                console.log('response', response.sessions);
            } catch (error) {
                console.error('Error fetching session titles:', error);
            }
        }
        fetchData();
    }, [selectedDay])
    return (
        <div>
            {/* //*Calender Component */}
            <div className="flex justify-between items-center text-black">
                <button
                    aria-label="Previous week"
                    onClick={() => {
                        if (weekOffset > 0) setWeekOffset(weekOffset - 1);
                    }}>&lt;
                </button>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold">{weekDetails.startDate} {weekDetails.startMonth} - {weekDetails.endDate} {weekDetails.endMonth}</h3>
                    <div className="grid grid-cols-7 gap-8 mt-2">
                        {daysOfWeek.map((day, index) => (
                            <div key={index} className="flex flex-col text-center text-2xl">
                                <div className="font-bold">{day}</div>
                                <button
                                    className={`mt-2 border-2 border-transparent text-gray-500 transition-all duration-300 hover:border-yellow-500 ${selectedDay === index ? 'border-yellow-500 text-yellow-500' : ''
                                        }`}
                                    onClick={() => {
                                        setSelectedDay(index);
                                    }}
                                >
                                    {weekDetails.datesOfWeek[index].split('-')[2]}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button aria-label="Next week"
                    onClick={() => {
                        if (weekOffset <= 10) setWeekOffset(weekOffset + 1);
                    }}>&gt;</button>
            </div>
            <div className="border-b border-gray-400 my-4"></div>
            {/* //*Class Schedule Component */}
            <div className="flex flex-col">
                {classDetails === null ? (
                    <div className="flex justify-center items-center h-96">
                        <BarLoader color="#FFD700" />
                    </div>
                ) : (classDetails.length === 0) ? (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-xl font-semibold">No classes available</p>
                    </div>
                ) : (
                    <div className="flex flex-col h-96">
                        {classDetails.map((session, index) => (
                            <div key={index} className="flex justify-between items-center border-b border-gray-400 py-4">
                                <div className="flex flex-col">
                                    <div className="text-xl font-semibold">{session.startTime} - {session.endTime}</div>
                                    <div className="text-gray-500">{session.slots} slots available</div>
                                </div>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">Book</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>

    )
}

function getCurrentWeekdayIndexIST(): number {
    const currentDate = new Date();
    // Set the timezone offset for Indian Standard Time (IST)
    const istOffset = 5.5 * 60; // IST is UTC+5.5

    // Calculate the local time in IST
    const istTime = currentDate.getTime() + (istOffset * 60 * 1000);
    const istDate = new Date(istTime);

    const weekdayIndex = istDate.getUTCDay();

    return weekdayIndex;
}


function getWeekDates(offset: number): {
    startDate: number;
    startMonth: string;
    endDate: number;
    endMonth: string;
    datesOfWeek: string[];
} {
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset for Indian Standard Time in milliseconds (5 hours and 30 minutes)
    const todayIST = new Date(Date.now() + istOffset);

    // Calculate the start of the current week in IST
    const currentWeekStart = new Date(todayIST);
    currentWeekStart.setUTCDate(todayIST.getUTCDate() - todayIST.getUTCDay() + offset * 7);

    // Calculate the end of the current week in IST
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setUTCDate(currentWeekStart.getUTCDate() + 6);

    // Format start and end months
    const startMonth = currentWeekStart.toLocaleString('en-US', { month: 'long' });
    const endMonth = currentWeekEnd.toLocaleString('en-US', { month: 'long' });

    // Generate an array of dates in the week in "yyyy-mm-dd" format
    const datesOfWeek: string[] = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(currentWeekStart);
        currentDate.setUTCDate(currentWeekStart.getUTCDate() + i);
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format as "yyyy-mm-dd"
        datesOfWeek.push(formattedDate);
    }

    return {
        startDate: currentWeekStart.getUTCDate(),
        startMonth: startMonth,
        endDate: currentWeekEnd.getUTCDate(),
        endMonth: endMonth,
        datesOfWeek: datesOfWeek,
    };
}

export default ClassCalender