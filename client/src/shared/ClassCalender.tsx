import { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { Activity} from './types';
import { booksession, getSessionsByDate } from './api/apiCalls';
import ButtonEnableDisable from './ButtonEnableDisable';
import { useAuthModal } from './contexts/AuthModalContext';
import Swal from 'sweetalert2'
type Props = {
    activityDetails: Activity;
}

type WeekDetails = {
    startDate: number;
    startMonth: string;
    endDate: number;
    endMonth: string;
    datesOfWeek: string[];
}

type bookedUser = {
    firstname: string;
    lastname: string;
    userName: string;
}

type Session = {
    startTime: string;
    endTime: string;
    slots: number;
    users?: bookedUser[];
}

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const ClassCalender = ({ activityDetails }: Props) => {
    const [selectedDay, setSelectedDay] = useState<number>(getCurrentWeekdayIndexIST());  // selected day index 
    const [weekOffset, setWeekOffset] = useState<number>(0); // week offset from current week
    const [classDetails, setClassDetails] = useState<Session[] | null>(null); // class details for the selected day
    const weekDetails:WeekDetails = getWeekDetails(weekOffset); // week details for the selected week 
    const {openAuthModal,userDetails,unset_user_details} = useAuthModal();
    async function handleBookSession(startTime:string) {
        try {
            
            const {statusCode,data} = await booksession(activityDetails.activityName,activityDetails.activityId, weekDetails.datesOfWeek[selectedDay],startTime,userDetails,unset_user_details);
            if(statusCode=== 200){
                Swal.fire({
                    title: 'Success!',
                    text: 'Session Booked Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        // Code to re-render the component or perform an action
                        // For example, you can fetch the updated class details
                        fetchData();
                    }
                });
            }else if(statusCode === 401){
                openAuthModal();
            }else{
                Swal.fire({
                    title: 'ERROR!',
                    text: data,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
            }

        } catch (error) {
            console.error('Error Booking Session : ', error);
        }
    }
    
    const fetchData = async () => {
        try {
            const response = await getSessionsByDate(activityDetails.activityName, activityDetails.activityId, weekDetails.datesOfWeek[selectedDay]);
            setClassDetails(response.sessions);
        } catch (error) {
            console.error('Error fetching session titles:', error);
        }
    }
    useEffect(() => {
        setClassDetails(null);

        fetchData();
    }, [selectedDay])


    function checkSessionAlreadyBooked(session: Session, username: string|undefined): boolean {
        if(!username)return false;
        if (session.users === undefined) return false;
        for (let i = 0; i < session.users.length; i++) {
            if (session.users[i].userName === username) {
                return true;
            }
        }
        return false;
    }
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
                            <div key={index} className={`flex justify-between items-center border-b border-gray-400 py-4 ${isSessionPassed(session.startTime,weekDetails.datesOfWeek[selectedDay]) ? 'opacity-50' : ''}`}>
                                <div className="flex flex-col">
                                    <div className="text-xl font-semibold">
                                        {formatTime(session.startTime)} - {formatTime(session.endTime)}
                                    </div>
                                    <div className="text-gray-500">{session.slots} slots available</div>
                                </div>
                                <ButtonEnableDisable onClick={()=>handleBookSession(formatTime(session.startTime))} isEnabled={
                                    session.slots > 0 
                                    && 
                                    !isSessionPassed(session.startTime,weekDetails.datesOfWeek[selectedDay]) 
                                    &&
                                    !checkSessionAlreadyBooked(session,userDetails?.username)
                                }>{checkSessionAlreadyBooked(session,userDetails?.username)?"Already Booked":"Book Now"}</ButtonEnableDisable>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}



function isSessionPassed(startTime: string, sessionDate: string): boolean {
    // Parse the input time string in "HH:mm:ss" format
    const [hour, minute, second] = startTime.split(':').map(Number);

    // Parse the session date in "yyyy-MM-dd" format
    const [year, month, day] = sessionDate.split('-').map(Number);

    // Create Date objects with the current date and time
    const currentDate = new Date();
    const sessionTime = new Date();
    
    sessionTime.setFullYear(year);
    sessionTime.setMonth(month - 1); // Months are 0-based in JavaScript, so subtract 1
    sessionTime.setDate(day);
    sessionTime.setHours(hour);
    sessionTime.setMinutes(minute);
    sessionTime.setSeconds(second);

    // Set the timezone for both Date objects
    currentDate.setTime(currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000);
    sessionTime.setTime(sessionTime.getTime() + sessionTime.getTimezoneOffset() * 60 * 1000);

    // Compare the current date and time with the session date and time
    return currentDate > sessionTime;
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


function getWeekDetails(offset: number): WeekDetails {
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

function formatTime(timeString: string): string {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default ClassCalender