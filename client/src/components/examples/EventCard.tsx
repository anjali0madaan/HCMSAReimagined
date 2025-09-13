import EventCard from '../EventCard'

export default function EventCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <EventCard
        id={1}
        title="Annual Medical Conference 2024"
        description="Join us for our flagship annual conference featuring keynote speakers, workshops, and networking opportunities for medical professionals."
        date="April 15-16, 2024"
        time="9:00 AM - 5:00 PM"
        venue="HCMSA Convention Center, Panchkula"
        category="Conference"
        registrationOpen={true}
        attendees={245}
      />
      <EventCard
        id={2}
        title="CPR & Emergency Response Training"
        description="Hands-on training session for CPR certification and emergency medical response techniques for healthcare professionals."
        date="March 25, 2024"
        time="10:00 AM - 4:00 PM"
        venue="Civil Hospital, Sector 6"
        category="Training"
        registrationOpen={true}
        attendees={58}
      />
      <EventCard
        id={3}
        title="Health Policy Discussion Forum"
        description="Interactive discussion on recent health policy changes and their impact on civil medical services in Haryana."
        date="March 20, 2024"
        time="2:00 PM - 5:00 PM"
        venue="HCMSA Auditorium"
        category="Forum"
        registrationOpen={false}
        attendees={89}
      />
    </div>
  )
}