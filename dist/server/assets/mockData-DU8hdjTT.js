const mockUsers = [
  { id: "1", name: "Maria Santos", email: "maria.santos@email.com", phone: "+63 917 123 4567", unit: "4A", role: "resident", status: "active", joinDate: "2023-01-15", balance: -2500 },
  { id: "2", name: "Jose Reyes", email: "jose.reyes@email.com", phone: "+63 918 234 5678", unit: "7B", role: "resident", status: "active", joinDate: "2022-06-01", balance: 0 },
  { id: "3", name: "Ana Cruz", email: "ana.cruz@email.com", phone: "+63 919 345 6789", unit: "2C", role: "resident", status: "active", joinDate: "2023-03-20", balance: 1200 },
  { id: "4", name: "Carlos Lim", email: "carlos.lim@email.com", phone: "+63 920 456 7890", unit: "9D", role: "resident", status: "inactive", joinDate: "2021-11-08", balance: -8900 },
  { id: "5", name: "Elena Ramos", email: "elena.ramos@email.com", phone: "+63 921 567 8901", unit: "5A", role: "resident", status: "active", joinDate: "2023-07-12", balance: 500 },
  { id: "6", name: "Miguel Torres", email: "miguel.torres@email.com", phone: "+63 922 678 9012", unit: "3B", role: "resident", status: "active", joinDate: "2022-09-30", balance: 0 },
  { id: "7", name: "Sofia Villanueva", email: "sofia.v@email.com", phone: "+63 923 789 0123", unit: "6C", role: "resident", status: "active", joinDate: "2024-01-05", balance: -1500 },
  { id: "8", name: "Bernardo Uy", email: "bern.uy@email.com", phone: "+63 924 000 1111", unit: "1B", role: "resident", status: "active", joinDate: "2024-03-11", balance: 800 },
  { id: "9", name: "Liza Tan", email: "liza.tan@email.com", phone: "+63 925 111 2222", unit: "8A", role: "resident", status: "inactive", joinDate: "2022-02-20", balance: -3200 },
  { id: "10", name: "Ramon Admin", email: "admin@skyview.ph", phone: "+63 926 999 0000", unit: "Admin Office", role: "admin", status: "active", joinDate: "2020-01-01", balance: 0 }
];
const mockUnits = [
  { id: "u1", number: "1A", type: "Studio", floor: 1, area: 24, price: 8500, status: "available", features: ["City View", "Balcony"] },
  { id: "u2", number: "2A", type: "1BR", floor: 2, area: 36, price: 12500, status: "occupied", tenant: "Ana Cruz", features: ["Garden View", "Parking"] },
  { id: "u3", number: "3B", type: "1BR", floor: 3, area: 38, price: 13e3, status: "occupied", tenant: "Miguel Torres", features: ["Pool View", "Balcony", "Parking"] },
  { id: "u4", number: "4A", type: "2BR", floor: 4, area: 55, price: 18500, status: "occupied", tenant: "Maria Santos", features: ["City View", "Balcony", "Parking"] },
  { id: "u5", number: "5A", type: "2BR", floor: 5, area: 58, price: 19500, status: "occupied", tenant: "Elena Ramos", features: ["Sea View", "Balcony", "Parking"] },
  { id: "u6", number: "6B", type: "3BR", floor: 6, area: 82, price: 28e3, status: "available", features: ["Panoramic View", "2 Parking", "Balcony", "Study Room"] },
  { id: "u7", number: "7B", type: "2BR", floor: 7, area: 60, price: 21e3, status: "occupied", tenant: "Jose Reyes", features: ["City View", "Balcony", "Parking"] },
  { id: "u8", number: "8C", type: "1BR", floor: 8, area: 40, price: 14500, status: "maintenance", features: ["Pool View"] },
  { id: "u9", number: "9D", type: "3BR", floor: 9, area: 90, price: 32e3, status: "occupied", tenant: "Carlos Lim", features: ["Penthouse View", "2 Parking", "Private Terrace"] },
  { id: "u10", number: "10A", type: "Studio", floor: 10, area: 26, price: 9500, status: "available", features: ["City View", "High Floor"] },
  { id: "u11", number: "10B", type: "1BR", floor: 10, area: 38, price: 15e3, status: "available", features: ["City View", "High Floor", "Balcony"] },
  { id: "u12", number: "11C", type: "2BR", floor: 11, area: 62, price: 24e3, status: "available", features: ["Panoramic View", "Balcony", "Parking"] }
];
const mockBookings = [
  { id: "b1", resident: "Maria Santos", unit: "4A", facility: "Swimming Pool", date: "2026-05-05", time: "09:00", duration: 2, status: "confirmed" },
  { id: "b2", resident: "Jose Reyes", unit: "7B", facility: "Function Hall", date: "2026-05-07", time: "14:00", duration: 4, status: "pending", notes: "Birthday party for 30 pax" },
  { id: "b3", resident: "Ana Cruz", unit: "2C", facility: "Gym", date: "2026-05-04", time: "06:00", duration: 1, status: "confirmed" },
  { id: "b4", resident: "Elena Ramos", unit: "5A", facility: "BBQ Area", date: "2026-05-10", time: "16:00", duration: 3, status: "pending" },
  { id: "b5", resident: "Miguel Torres", unit: "3B", facility: "Swimming Pool", date: "2026-04-28", time: "15:00", duration: 2, status: "completed" },
  { id: "b6", resident: "Sofia Villanueva", unit: "6C", facility: "Function Hall", date: "2026-04-20", time: "10:00", duration: 6, status: "cancelled", notes: "Cancelled due to personal reasons" },
  { id: "b7", resident: "Carlos Lim", unit: "9D", facility: "Gym", date: "2026-05-03", time: "18:00", duration: 1, status: "confirmed" },
  { id: "b8", resident: "Maria Santos", unit: "4A", facility: "Study Room", date: "2026-05-06", time: "13:00", duration: 2, status: "confirmed" },
  { id: "b9", resident: "Bernardo Uy", unit: "1B", facility: "Swimming Pool", date: "2026-05-08", time: "08:00", duration: 1, status: "pending" },
  { id: "b10", resident: "Liza Tan", unit: "8A", facility: "Function Hall", date: "2026-04-15", time: "12:00", duration: 5, status: "completed" }
];
const mockVisits = [
  { id: "v1", visitorName: "Pedro Santos", unit: "4A", resident: "Maria Santos", purpose: "Family Visit", checkIn: "2026-05-03 09:15", checkOut: "2026-05-03 11:30", status: "departed", vehicle: "ABC 1234" },
  { id: "v2", visitorName: "LazMall Delivery", unit: "7B", resident: "Jose Reyes", purpose: "Package Delivery", checkIn: "2026-05-03 10:42", status: "inside" },
  { id: "v3", visitorName: "Dr. Maria Lim", unit: "9D", resident: "Carlos Lim", purpose: "Medical Visit", checkIn: "2026-05-03 11:00", status: "inside", vehicle: "XYZ 5678" },
  { id: "v4", visitorName: "Roberto Cruz", unit: "2C", resident: "Ana Cruz", purpose: "Spouse", checkIn: "2026-05-03 08:00", checkOut: "2026-05-03 09:00", status: "departed" },
  { id: "v5", visitorName: "Carla Reyes", unit: "5A", resident: "Elena Ramos", purpose: "Friend Visit", checkIn: "2026-05-02 18:30", checkOut: "2026-05-02 21:00", status: "departed" },
  { id: "v6", visitorName: "Meralco Technician", unit: "8C", resident: "N/A", purpose: "Maintenance Work", checkIn: "2026-05-03 09:00", status: "inside", vehicle: "Meralco Van" },
  { id: "v7", visitorName: "Angelica Torres", unit: "3B", resident: "Miguel Torres", purpose: "Family Visit", checkIn: "2026-05-03 12:15", status: "expected" },
  { id: "v8", visitorName: "Joven Villanueva", unit: "6C", resident: "Sofia Villanueva", purpose: "Spouse", checkIn: "2026-05-03 07:30", checkOut: "2026-05-03 08:45", status: "departed" }
];
const mockAnnouncements = [
  { id: "a1", title: "Water Supply Interruption — May 5", content: "There will be a scheduled water supply interruption on May 5, 2026 from 8:00 AM to 5:00 PM for pipeline maintenance. Please store enough water before this date.", date: "2026-04-28", priority: "high", author: "Management" },
  { id: "a2", title: "Pool Area Renovation Complete", content: "We are pleased to announce that the swimming pool renovation is now complete. The pool is now open with new operating hours: 6:00 AM — 9:00 PM daily.", date: "2026-04-30", priority: "normal", author: "Facilities" },
  { id: "a3", title: "May 2026 Association Dues", content: "Monthly association dues for May 2026 are now due. Settle via GCash/Maya to the provided account or at the Admin Office. Late fees apply after May 15.", date: "2026-05-01", priority: "high", author: "Finance" },
  { id: "a4", title: "Community Clean-Up Drive — May 8", content: "Join our quarterly community clean-up drive on May 8, 2026 at 7:00 AM. Meet at the lobby. Refreshments provided for all participants.", date: "2026-05-01", priority: "low", author: "Community Relations" }
];
const mockConversations = [
  {
    id: "c1",
    participantId: "1",
    participantName: "Maria Santos",
    participantUnit: "4A",
    lastMessage: "When will the elevator be fixed?",
    lastTime: "10:23 AM",
    unread: 2,
    messages: [
      { id: "m1", senderId: "1", senderName: "Maria Santos", content: "Good morning! I wanted to follow up on the elevator maintenance.", timestamp: "10:00 AM", read: true },
      { id: "m2", senderId: "admin", senderName: "Admin", content: "Good morning Maria! The technician is scheduled for tomorrow, May 4.", timestamp: "10:10 AM", read: true },
      { id: "m3", senderId: "1", senderName: "Maria Santos", content: "When will the elevator be fixed?", timestamp: "10:23 AM", read: false }
    ]
  },
  {
    id: "c2",
    participantId: "2",
    participantName: "Jose Reyes",
    participantUnit: "7B",
    lastMessage: "Thank you for the quick response!",
    lastTime: "9:45 AM",
    unread: 0,
    messages: [
      { id: "m4", senderId: "2", senderName: "Jose Reyes", content: "Hi, I have a concern about my parking slot.", timestamp: "9:30 AM", read: true },
      { id: "m5", senderId: "admin", senderName: "Admin", content: "Hello Jose, I have noted your concern and will check it right away.", timestamp: "9:40 AM", read: true },
      { id: "m6", senderId: "2", senderName: "Jose Reyes", content: "Thank you for the quick response!", timestamp: "9:45 AM", read: true }
    ]
  },
  {
    id: "c3",
    participantId: "3",
    participantName: "Ana Cruz",
    participantUnit: "2C",
    lastMessage: "I need a visitor pass for this weekend.",
    lastTime: "Yesterday",
    unread: 1,
    messages: [
      { id: "m7", senderId: "3", senderName: "Ana Cruz", content: "I need a visitor pass for this weekend. My parents will be visiting.", timestamp: "4:00 PM", read: false }
    ]
  },
  {
    id: "c4",
    participantId: "5",
    participantName: "Elena Ramos",
    participantUnit: "5A",
    lastMessage: "Is the BBQ area available on the 10th?",
    lastTime: "Yesterday",
    unread: 0,
    messages: [
      { id: "m8", senderId: "5", senderName: "Elena Ramos", content: "Is the BBQ area available on the 10th?", timestamp: "2:30 PM", read: true },
      { id: "m9", senderId: "admin", senderName: "Admin", content: "Yes, it is available! You can book it through the resident portal.", timestamp: "2:45 PM", read: true }
    ]
  },
  {
    id: "c5",
    participantId: "6",
    participantName: "Miguel Torres",
    participantUnit: "3B",
    lastMessage: "Noted, thank you.",
    lastTime: "Mon",
    unread: 0,
    messages: [
      { id: "m10", senderId: "6", senderName: "Miguel Torres", content: "There seems to be a leak from the unit above mine.", timestamp: "3:00 PM", read: true },
      { id: "m11", senderId: "admin", senderName: "Admin", content: "We have dispatched maintenance to check the issue immediately. Thank you for reporting.", timestamp: "3:15 PM", read: true },
      { id: "m12", senderId: "6", senderName: "Miguel Torres", content: "Noted, thank you.", timestamp: "3:20 PM", read: true }
    ]
  }
];
const revenueChartData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  values: [44200, 38500, 42100, 45800, 47300, 51200, 49600, 53100, 50700, 55200, 58300, 61400]
};
const occupancyChartData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  values: [82, 84, 85, 87, 88, 90, 89, 91, 92, 91, 90, 88]
};
const bookingTrendData = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [8, 12, 10, 15, 18, 24, 21]
};
const facilityUsageData = {
  facilities: ["Pool", "Gym", "Function Hall", "BBQ Area", "Study Room", "Court"],
  bookings: [34, 28, 16, 12, 9, 7]
};
export {
  mockBookings as a,
  mockAnnouncements as b,
  mockVisits as c,
  mockUsers as d,
  mockConversations as e,
  bookingTrendData as f,
  facilityUsageData as g,
  mockUnits as m,
  occupancyChartData as o,
  revenueChartData as r
};
