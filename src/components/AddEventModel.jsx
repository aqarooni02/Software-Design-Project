import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';

const AddEventModel = ({ isOpen, onClose, onAddEvent }) => {
  const [eventData, setEventData] = useState({
    eventType: '',
    title: '',
    date: '',
    time: '',
    description: '',
    color: 'bg-blue-100',
  });

  const eventTypes = [
    { id: 'family_dinner', label: 'Family Dinner' },
    { id: 'movie_night',   label: 'Movie Night'   },
    { id: 'game_night',    label: 'Game Night'    },
    { id: 'shopping',      label: 'Shopping'      },
    { id: 'custom',        label: 'Custom'        },
  ];

  const colorOptions = [
    { name: 'Blue',   value: 'bg-blue-100'   },
    { name: 'Red',    value: 'bg-red-100'    },
    { name: 'Green',  value: 'bg-green-100'  },
    { name: 'Yellow', value: 'bg-yellow-100' },
  ];

  const handleEventTypeSelect = (type) => {
    if (type === 'custom') {
      setEventData({ ...eventData, eventType: 'custom', title: '' });
    } else {
      const label = eventTypes.find(e => e.id === type).label;
      setEventData({ ...eventData, eventType: type, title: label });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      id: Date.now(),
      ...eventData,
      date: new Date(eventData.date),
    });
    onClose();
    setEventData({ eventType: '', title: '', date: '', time: '', description: '', color: 'bg-blue-100' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Event</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick-pick Event Types */}
          <div className="grid grid-cols-3 gap-2">
            {eventTypes.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleEventTypeSelect(type.id)}
                className={`py-2 text-sm rounded ${
                  eventData.eventType === type.id
                    ? 'bg-indigo-200 text-indigo-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Title only for Custom */}
          {eventData.eventType === 'custom' && (
            <input
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Event Title"
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                required
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                required
              />
            </div>
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            rows="3"
            placeholder="More details about the event..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />

          {/* Color Picker */}
          <div>
            <label className="text-sm text-gray-700">Pick a Color</label>
            <div className="flex gap-2 mt-1">
              {colorOptions.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setEventData(prev => ({ ...prev, color: c.value }))}
                  className={`w-7 h-7 rounded-full ${c.value} ${
                    eventData.color === c.value ? 'ring-2 ring-indigo-500 ring-offset-1' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModel;
