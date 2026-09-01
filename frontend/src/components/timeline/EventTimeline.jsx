import EventCard from "./EventCard";

function EventTimeline({ events, onInspectEvent }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No events recorded for this shipment.
      </div>
    );
  }

  const sortedEvents = [...events].sort((a, b) => a.version - b.version);

  return (
    <div className="w-full">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
        Event Timeline
      </h2>
      <div>
        {sortedEvents.map((event, index) => (
          <EventCard
            key={event.eventId}
            event={event}
            isLast={index === sortedEvents.length - 1}
            onInspect={onInspectEvent}
          />
        ))}
      </div>
    </div>
  );
}

export default EventTimeline;