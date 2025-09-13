import LeadershipProfile from '../LeadershipProfile'
import maleDoctor from "@assets/generated_images/Male_doctor_portrait_7aebea1c.png";
import femaleDoctor from "@assets/generated_images/Female_doctor_portrait_2f72cef9.png";
import seniorDoctor from "@assets/generated_images/Senior_doctor_portrait_9fbac1bb.png";

export default function LeadershipProfileExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <LeadershipProfile
        id={1}
        name="Dr. Rajesh Kumar"
        designation="President, HCMSA"
        image={seniorDoctor}
        bio="Distinguished civil medical officer with over 25 years of experience in public health administration and medical services."
        email="president@hcmsa.gov.in"
        phone="+91-172-2864241"
      />
      <LeadershipProfile
        id={2}
        name="Dr. Priya Sharma"
        designation="Vice President"
        image={femaleDoctor}
        bio="Accomplished medical professional specializing in community health and healthcare policy development for rural areas."
        email="vicepresident@hcmsa.gov.in"
        phone="+91-172-2864242"
      />
      <LeadershipProfile
        id={3}
        name="Dr. Amit Singh"
        designation="General Secretary"
        image={maleDoctor}
        bio="Dedicated healthcare administrator focused on improving medical services and professional development opportunities for association members."
        email="secretary@hcmsa.gov.in"
        phone="+91-172-2864243"
      />
    </div>
  )
}