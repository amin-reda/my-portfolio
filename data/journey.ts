export type JourneyStatus = 'completed' | 'in-progress' | 'active';

export interface JourneyItem {
  id: string;
  year: string;
  organization: string;
  organizationAr: string;
  program: string;
  programAr: string;
  details: string;
  detailsAr: string;
  status: JourneyStatus;
  startDate?: string;
  startDateAr?: string;
  endDate?: string;
  endDateAr?: string;
}

const journey: JourneyItem[] = [
  {
    id: 'iti',
    year: '2026',
    organization: 'ITI',
    organizationAr: 'ITI',
    program: '.NET Track',
    programAr: 'مسار .NET',
    details: '144-hour intensive technical training program',
    detailsAr: 'برنامج تدريب تقني مكثف لمدة 144 ساعة',
    status: 'completed',
    startDate: '19 July 2026',
    startDateAr: '19 يوليو 2026',
    endDate: '20 August 2026',
    endDateAr: '20 أغسطس 2026',
  },
  {
    id: 'instant',
    year: '2026',
    organization: 'Instant',
    organizationAr: 'Instant',
    program: 'AI & Data Science Track',
    programAr: 'مسار الذكاء الاصطناعي وعلم البيانات',
    details: 'Comprehensive AI and Data Science training program',
    detailsAr: 'برنامج تدريب شامل في الذكاء الاصطناعي وعلم البيانات',
    status: 'in-progress',
  },
  {
    id: 'depi',
    year: '2026',
    organization: 'DEPI',
    organizationAr: 'DEPI',
    program: 'AI Automation with n8n Professional',
    programAr: 'الأتمتة بالذكاء الاصطناعي مع n8n المحترف',
    details: 'Professional AI automation training focused on n8n workflow systems',
    detailsAr: 'تدريب احترافي في أتمتة الذكاء الاصطناعي يركز على أنظمة سير عمل n8n',
    status: 'in-progress',
    startDate: 'June 2026',
    startDateAr: 'يونيو 2026',
  },
  {
    id: 'projects',
    year: '2026',
    organization: 'Self-Directed',
    organizationAr: 'موجّه ذاتياً',
    program: 'Hands-on AI, Data, Automation & IoT Projects',
    programAr: 'مشاريع تطبيقية في الذكاء الاصطناعي والبيانات والأتمتة وإنترنت الأشياء',
    details: 'Active development of practical AI, data, automation, and computer vision systems',
    detailsAr: 'التطوير النشط لأنظمة عملية في الذكاء الاصطناعي والبيانات والأتمتة ورؤية الكمبيوتر',
    status: 'active',
  },
];

export default journey;

