export interface ClassSchedule {
  id: string;
  discipline: string;
  code: string;
  time: string;
  room: string;
  studentsCount: number;
  confirmed: boolean;
  location: string;
  dayOfWeek: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex';
}

export interface StudentProfile {
  name: string;
  course: string;
  semester: string;
  cr: number;
  ra: string;
  email: string;
  avatarUrl: string;
}

export interface StudentClassItem {
  id: string;
  discipline: string;
  code: string;
  professor: string;
  time: string;
  room: string;
  block: string;
  status: 'encerrada' | 'agora' | 'proxima' | 'futura';
  rating?: number; // 1 to 5 stars
  timeUntil?: string; // e.g. "15 min"
}

export interface AttendanceMonthly {
  month: string;
  percentage: number;
  attended: number;
  total: number;
}

export interface SpaceOption {
  id: string;
  name: string;
  type: 'Sala de Estudo' | 'Laboratório IA' | 'Cabine Focus' | 'Auditório';
  capacity: number;
  availableSlots: string[];
  equipment: string[];
}

export interface AiChatMessage {
  id: string;
  sender: 'student' | 'tutor';
  text: string;
  timestamp: string;
  citation?: string;
}

export interface TeacherProfile {
  name: string;
  title: string;
  department: string;
  badge: string;
  avatarUrl: string;
  email: string;
  registrationId: string;
}

export interface CheckInLog {
  id: string;
  timestamp: string;
  type: 'check-in' | 'check-out';
  status: 'valid' | 'warning' | 'alert' | 'critical';
  location: string;
  method: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'success' | 'attention' | 'alert' | 'critical';
}

export interface WeeklyAvailability {
  Seg: { morning: boolean; afternoon: boolean; night: boolean };
  Ter: { morning: boolean; afternoon: boolean; night: boolean };
  Qua: { morning: boolean; afternoon: boolean; night: boolean };
  Qui: { morning: boolean; afternoon: boolean; night: boolean };
  Sex: { morning: boolean; afternoon: boolean; night: boolean };
}
