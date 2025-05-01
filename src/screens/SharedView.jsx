import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import AddEventModel from '../components/AddEventModel';
import { NavBar } from '../components/NavBar';
import { localStorageManager } from '../utils/localStorageManager';

const SharedView = () => {
  const location = useLocation();
  const isParent = location.state?.isParent || false; // Get user type from location state
  const childId = location.state?.childId || null; // Get childId from location state
  const [currentMonth, setCurrentMonth] = useState(new Date());  // what month we show
  const [isAddEventOpen, setIsAddEventOpen] = useState(false); // control add event dialog
  const [events, setEvents] = useState([]); // where all evnts are stashed
  const [selectedEvent, setSelectedEvent] = useState(null); // for details card

  // load evnts from localStorage on first render
  useEffect(() => {
    // const stored = localStorage.getItem('householdCalendarEvents');
    const stored = localStorageManager.retrieveEncodedObject('householdCalendarEvents')
    if (stored) {
      try {
        const parsed = stored.map(evt => ({ ...evt, date: new Date(evt.date) }));
        setEvents(parsed);
      } catch (err) {
        console.error('Failed to parse events', err);
      }
    }
  }, []);

  // save to localStorage after first load, to keep evnts persisting
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      return;
    }
    localStorageManager.storeEncodedObject('householdCalendarEvents', events)
    // localStorage.setItem('householdCalendarEvents', JSON.stringify(events));
  }, [events]);

  // simple helpers for calendar math
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  // build a 6-week grid of dates
  const generateCalendarCells = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const offset = getFirstDayOfMonth(year, month);
    const cells = [];

    // days before this month
    const prevDays = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);
    for (let i = offset - 1; i >= 0; i--) {
      cells.push({ date: new Date(year, month - 1, prevDays - i), inMonth: false });
    }
    // days of current month
    for (let d = 1; d <= totalDays; d++) {
      cells.push({ date: new Date(year, month, d), inMonth: true });
    }
    // fill rest with next month days
    while (cells.length < 42) {
      const extra = cells.length - offset + 1;
      cells.push({ date: new Date(year, month + 1, extra), inMonth: false });
    }
    return cells;
  };

  const calendarCells = generateCalendarCells();
  const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const todayStr = new Date().toDateString();
  const eventsFor = date => events.filter(e => e.date.toDateString() === date.toDateString());

  // add an event into our state list
  const handleAddEvent = evt => {
    setEvents(prev => [...prev, evt]);
  };

  // remove selected event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  // month nav
  const prevMonth = () => setCurrentMonth(c => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(c => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const monthLabel = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  // pick icon by event type
  const eventIcon = type => {
    switch (type) {
      case 'family_dinner': return '🍽️';
      case 'movie_night':   return '🎬';
      case 'game_night':    return '🎮';
      case 'shopping':      return '🛒';
      default:              return '📅';
    }
  };

  // darken pastel color classes so text is clear
  const darken = cls => cls.replace(/-(100|200)$/, '-500');

  return (
    <div className="min-h-screen bg-white">
      <NavBar parent={isParent} childType={!isParent ? 'child' : null} childId={childId} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with calendar title and add button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Household Calendar</h1>
          </div>
          <button onClick={() => setIsAddEventOpen(true)} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Plus className="w-5 h-5 mr-1" /> Add Event
          </button>
        </div>

        {/* Month Navigation */}
        <div className="bg-white shadow rounded-lg mt-8 mb-8">
          <div className="flex justify-between items-center border-b px-4 py-2">
            <button onClick={goToToday} className="text-gray-700 hover:underline">Today</button>
            <div className="flex items-center space-x-2">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded">…</button>
              <span className="font-semibold text-gray-800">{monthLabel}</span>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded">…</button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 bg-indigo-50 text-indigo-800 uppercase text-sm">
            {weekdays.map(d => (
              <div key={d} className="p-2 text-center font-medium">{d}</div>
            ))}
          </div>

          {/* Date Cells */}
          <div className="grid grid-cols-7 divide-x divide-y">
            {calendarCells.map((cell, idx) => {
              const isToday = cell.date.toDateString() === todayStr;
              const dayEvents = eventsFor(cell.date);
              return (
                <div
                  key={idx}
                  className={`min-h-[100px] p-2 ${cell.inMonth ? 'bg-white' : 'bg-gray-50'} ${isToday ? 'ring-2 ring-indigo-200' : ''}`}
                >
                  {/* date number and today's highlight */}
                  <div className="flex justify-between items-start">
                    <span className={`inline-block w-6 h-6 text-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : cell.inMonth ? 'text-gray-800' : 'text-gray-400'} hover:scale-110 transition-transform duration-150`}>{cell.date.getDate()}</span>
                    {dayEvents.length > 0 && <span className="w-2 h-2 bg-indigo-600 rounded-full mt-1 animate-pulse" />}
                  </div>

                  {/* event badges with inline popover */}
                  {dayEvents.map(evt => (
                    <div key={evt.id} className="relative mb-1">
                      {/* badge itself */}  
                      <div
                        onClick={() => setSelectedEvent(evt)}
                        className={`cursor-pointer text-xs text-white px-2 py-1 rounded ${darken(evt.color)} truncate hover:opacity-80 transition-opacity duration-200`}
                        title="Click for details"
                      >
                        <span className="mr-1">{eventIcon(evt.eventType)}</span>{evt.title}
                      </div>

                      {/* small popover card above badge */}
                      {selectedEvent?.id === evt.id && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-56 bg-white rounded-lg shadow-lg p-4 text-gray-800 z-10">
                          <h4 className="font-semibold mb-2">{evt.title}</h4>
                          <p className="text-sm mb-1"><strong>Date:</strong> {evt.date.toLocaleDateString('en-US', {weekday:'short',month:'short',day:'numeric',year:'numeric'})}</p>
                          <p className="text-sm mb-1"><strong>Time:</strong> {evt.time || '—'}</p>
                          {evt.description && <p className="text-sm mb-2"><strong>Description:</strong> {evt.description}</p>}
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => setSelectedEvent(null)} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Close</button>
                            <button onClick={handleDeleteEvent} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Event Modal component */}
      <AddEventModel
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default SharedView;