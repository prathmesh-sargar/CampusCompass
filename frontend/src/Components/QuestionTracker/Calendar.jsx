import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  Calendar as CalendarIcon,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';

/* ================= UTILITIES (UNCHANGED) ================= */
const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = [];
  const lastDay = new Date(year, month + 1, 0);
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }
  return days;
};

const isCurrentDay = (day) => {
  const today = new Date();
  return (
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear()
  );
};

const getEventsForDay = (day, events) =>
  events.filter((event) => {
    const eventDate = new Date(event.startTime);
    return (
      eventDate.getDate() === day.getDate() &&
      eventDate.getMonth() === day.getMonth() &&
      eventDate.getFullYear() === day.getFullYear()
    );
  });

const formatMonthYear = (date) =>
  date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const formatTimeRange = (start, end) =>
  `${start.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })} - ${end.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

const formatDuration = (start, end) => {
  const diff = end - start;
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

/* ================= HEADER ================= */
const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-gray-100">
      {formatMonthYear(currentMonth)}
    </h2>
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={prevMonth}
        className="border-gray-700 bg-gray-900/50 hover:bg-gray-800"
      >
        <ChevronLeft className="h-5 w-5 text-gray-300" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextMonth}
        className="border-gray-700 bg-gray-900/50 hover:bg-gray-800"
      >
        <ChevronRight className="h-5 w-5 text-gray-300" />
      </Button>
    </div>
  </div>
);

/* ================= EVENT ITEM ================= */
const EventItem = ({ event }) => {
  const colors = {
    leetcode: '#FFA116',
    codeforces: '#318CE7',
    codechef: '#5B4638',
    atcoder: '#222222',
    hackerrank: '#00EA64',
    geeksforgeeks: '#2F8D46',
    gfg: '#2F8D46',
  };

  const addToCalendar = () => {
    const start = event.startTime.toISOString().replace(/-|:|\.\d+/g, '');
    const end = event.endTime.toISOString().replace(/-|:|\.\d+/g, '');
    window.open(
      `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        event.title
      )}&dates=${start}/${end}`,
      '_blank'
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="p-2 rounded-md bg-gray-900/60 border-l-4 cursor-pointer hover:bg-gray-800 transition truncate"
            style={{ borderLeftColor: colors[event.platform] || '#6366f1' }}
          >
            <h4 className="text-xs font-medium text-gray-200 truncate">
              {event.title}
            </h4>
            <div className="flex items-center text-xs text-gray-400 mt-0.5">
              <Clock className="h-3 w-3 mr-1" />
              {formatTimeRange(
                new Date(event.startTime),
                new Date(event.endTime)
              )}
            </div>
          </div>
        </TooltipTrigger>

        <TooltipContent className="w-64 p-4 bg-gray-900 border border-gray-700 rounded-xl">
          <h3 className="font-semibold text-gray-100 mb-1">{event.title}</h3>
          <p className="text-xs text-gray-400 mb-2">
            Duration: {formatDuration(new Date(event.startTime), new Date(event.endTime))}
          </p>
          <div className="flex justify-between">
            <button
              onClick={addToCalendar}
              className="text-xs text-blue-400 hover:underline flex items-center"
            >
              <CalendarIcon className="h-3 w-3 mr-1" />
              Add to Calendar
            </button>
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:underline flex items-center"
            >
              Visit <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

/* ================= MAIN ================= */
export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const res = await axios.get(
          `https://node.codolio.com/api/contest-calendar/v1/all/get-contests?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`
        );

        setEvents(
          res.data.data.map((c) => ({
            id: c._id,
            title: c.contestName,
            platform: c.platform,
            startTime: new Date(c.contestStartDate),
            endTime: new Date(c.contestEndDate),
            url: c.contestUrl,
          }))
        );
      } catch {
        setError('Failed to load contests');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [currentMonth]);

  const days = getDaysInMonth(currentMonth);
  const empty = Array(days[0].getDay()).fill(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0d1025] to-[#0a0a1a] p-6">
      <div className="max-w-6xl mx-auto bg-gray-900/60 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <CalendarHeader
          currentMonth={currentMonth}
          prevMonth={() =>
            setCurrentMonth((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1))
          }
          nextMonth={() =>
            setCurrentMonth((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1))
          }
        />

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
            <p className="text-gray-400 mt-3">Loading contests…</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-7 gap-1 bg-gray-800 rounded-lg p-1">
            {daysOfWeek.map((d) => (
              <div key={d} className="text-center text-sm text-gray-400 py-2">
                {d}
              </div>
            ))}

            {empty.map((_, i) => (
              <div key={i} className="min-h-[110px] bg-gray-900 rounded" />
            ))}

            {days.map((day) => {
              const dayEvents = getEventsForDay(day, events);
              const today = isCurrentDay(day);

              return (
                <div
                  key={day}
                  className={`min-h-[110px] p-2 rounded bg-gray-900 border ${
                    today ? 'border-blue-500' : 'border-gray-700'
                  }`}
                >
                  <div
                    className={`text-right text-sm mb-1 ${
                      today ? 'text-blue-400 font-bold' : 'text-gray-400'
                    }`}
                  >
                    {day.getDate()}
                  </div>

                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {dayEvents.slice(0, 3).map((e) => (
                      <EventItem key={e.id} event={e} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
