import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/daygrid/index.css";
import "@fullcalendar/timegrid/index.css";
import "@fullcalendar/list/index.css";

/**
 * SharedView.jsx
 * A family-wide shared calendar for parents and children.
 * Requires FullCalendar dependencies:
 * npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list @fullcalendar/interaction
 */
export const SharedView2 = ({
  currentUserRole,    // 'Parent' or 'Child'
  currentUserId,      // ID of the logged-in user
  initialEvents = [], // Array of Event Objects
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  onRSVP
}) => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState(initialEvents);
  const [modalEvent, setModalEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Map categories to colors
  const categoryColorMap = {
    Movie: "#FFCCCB",
    BBQ: "#FFDAB9",
    Outing: "#E0FFFF",
    Travel: "#E6E6FA",
    Party: "#FFFACD",
    Other: "#D3D3D3"
  };

  // Parent selects a date/time range to create an event
  const handleDateSelect = (selectInfo) => {
    if (currentUserRole !== "Parent") return;
    const newEvent = {
      id: `${Date.now()}`,
      title: "",
      description: "",
      start_datetime: selectInfo.startStr,
      end_datetime: selectInfo.endStr,
      location: "",
      category: "Other",
      recurrence: null,
      invitees: [],
      reminders: [],
      attendance: {}
    };
    setModalEvent(newEvent);
    setIsCreating(true);
  };

  // User clicks on an existing event for details/edit
  const handleEventClick = (clickInfo) => {
    const ev = events.find((e) => e.id === clickInfo.event.id);
    setModalEvent(ev);
    setIsCreating(false);
  };

  // Drag-and-drop to reschedule (parents only)
  const handleEventDrop = (dropInfo) => {
    if (currentUserRole !== "Parent") {
      dropInfo.revert();
      return;
    }
    const updated = {
      ...events.find((e) => e.id === dropInfo.event.id),
      start_datetime: dropInfo.event.startStr,
      end_datetime: dropInfo.event.endStr
    };
    setEvents(events.map((e) => (e.id === updated.id ? updated : e)));
    onEventUpdate && onEventUpdate(updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Family Shared Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
        selectable={currentUserRole === "Parent"}
        editable={currentUserRole === "Parent"}
        select={handleDateSelect}
        events={events.map((evt) => ({
          id: evt.id,
          title: evt.title,
          start: evt.start_datetime,
          end: evt.end_datetime,
          backgroundColor: categoryColorMap[evt.category],
          borderColor: categoryColorMap[evt.category]
        }))}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        ref={calendarRef}
      />

      {/* Event Detail / Edit Modal */}
      {modalEvent && (
        <EventModal
          event={modalEvent}
          isCreating={isCreating}
          currentUserRole={currentUserRole}
          currentUserId={currentUserId}
          onClose={() => setModalEvent(null)}
          onSave={(evt) => {
            if (isCreating) {
              setEvents([...events, evt]);
              onEventCreate && onEventCreate(evt);
            } else {
              setEvents(events.map((e) => (e.id === evt.id ? evt : e)));
              onEventUpdate && onEventUpdate(evt);
            }
            setModalEvent(null);
          }}
          onDelete={(evt) => {
            setEvents(events.filter((e) => e.id !== evt.id));
            onEventDelete && onEventDelete(evt);
            setModalEvent(null);
          }}
          onRSVP={(userId, status) => {
            const updated = {
              ...modalEvent,
              attendance: { ...modalEvent.attendance, [userId]: status }
            };
            setModalEvent(updated);
            setEvents(events.map((e) => (e.id === updated.id ? updated : e)));
            onRSVP && onRSVP(updated);
          }}
        />
      )}
    </div>
  );
};

// Simple modal component for event details and creation
const EventModal = ({
  event,
  isCreating,
  currentUserRole,
  currentUserId,
  onClose,
  onSave,
  onDelete,
  onRSVP
}) => {
  const [formState, setFormState] = useState({ ...event });

  // Handlers for input changes (title, description, date/time, etc.) go here
  // TODO: implement full form according to spec (recurrence picker, location map preview, invitees checkbox list, reminders picker)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded p-6 w-full max-w-md">
        <h2 className="text-2xl mb-4">
          {isCreating ? "Create Event" : "Event Details"}
        </h2>
        {/* Render form fields here... */}
        <div className="mt-4 flex justify-end space-x-2">
          {currentUserRole === "Parent" && !isCreating && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => onDelete(formState)}
            >
              Delete
            </button>
          )}
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onSave(formState)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
