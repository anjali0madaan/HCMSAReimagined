import NewsCard from '../NewsCard'

export default function NewsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <NewsCard
        id={1}
        title="HCMSA Annual General Meeting 2024 Scheduled"
        excerpt="The annual general meeting will be held on March 15, 2024, at the HCMSA headquarters. All members are cordially invited to participate in the proceedings and contribute to the association's future direction."
        date="March 10, 2024"
        category="Announcements"
        isNew={true}
      />
      <NewsCard
        id={2}
        title="New CME Program Launch for Continuing Medical Education"
        excerpt="HCMSA is proud to announce the launch of a comprehensive Continuing Medical Education program designed to enhance the professional development of our members."
        date="March 8, 2024"
        category="Education"
      />
      <NewsCard
        id={3}
        title="Health Department Policy Updates for Civil Medical Officers"
        excerpt="Important policy updates have been released by the Haryana Health Department affecting promotion criteria and service conditions for all civil medical officers."
        date="March 5, 2024"
        category="Policy Updates"
      />
    </div>
  )
}