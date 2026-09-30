export interface SkillItem {
  name: string;
  nameAr: string;
}

export interface SkillCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  icon: string;
  skills: SkillItem[];
}

const skills: SkillCategory[] = [
  {
    id: 'ai-ml',
    titleEn: 'AI & Machine Learning',
    titleAr: 'الذكاء الاصطناعي والتعلم الآلي',
    icon: '🧠',
    skills: [
      { name: 'Artificial Intelligence', nameAr: 'الذكاء الاصطناعي' },
      { name: 'Machine Learning', nameAr: 'التعلم الآلي' },
      { name: 'Generative AI', nameAr: 'الذكاء الاصطناعي التوليدي' },
      { name: 'Large Language Models', nameAr: 'نماذج اللغة الكبيرة' },
      { name: 'RAG', nameAr: 'RAG' },
      { name: 'AI Agents', nameAr: 'وكلاء الذكاء الاصطناعي' },
      { name: 'Prompt Engineering', nameAr: 'هندسة الأوامر' },
      { name: 'LangChain', nameAr: 'LangChain' },
      { name: 'Google Gemini', nameAr: 'جوجل جيميني' },
    ],
  },
  {
    id: 'data',
    titleEn: 'Data Analysis',
    titleAr: 'تحليل البيانات',
    icon: '📊',
    skills: [
      { name: 'Python', nameAr: 'Python' },
      { name: 'Pandas', nameAr: 'Pandas' },
      { name: 'NumPy', nameAr: 'NumPy' },
      { name: 'Matplotlib', nameAr: 'Matplotlib' },
      { name: 'SQL', nameAr: 'SQL' },
      { name: 'Power BI', nameAr: 'Power BI' },
      { name: 'Excel', nameAr: 'Excel' },
      { name: 'Exploratory Data Analysis', nameAr: 'التحليل الاستكشافي للبيانات' },
      { name: 'Data Cleaning', nameAr: 'تنظيف البيانات' },
      { name: 'Data Visualization', nameAr: 'تصوير البيانات' },
      { name: 'Business Insights', nameAr: 'رؤى الأعمال' },
    ],
  },
  {
    id: 'automation',
    titleEn: 'AI Automation',
    titleAr: 'أتمتة الذكاء الاصطناعي',
    icon: '⚡',
    skills: [
      { name: 'n8n', nameAr: 'n8n' },
      { name: 'Workflow Automation', nameAr: 'أتمتة سير العمل' },
      { name: 'REST APIs', nameAr: 'REST APIs' },
      { name: 'Webhooks', nameAr: 'Webhooks' },
      { name: 'Google Gemini', nameAr: 'جوجل جيميني' },
      { name: 'LangChain', nameAr: 'LangChain' },
      { name: 'Telegram Bot API', nameAr: 'Telegram Bot API' },
      { name: 'Google Sheets API', nameAr: 'Google Sheets API' },
      { name: 'Gmail API', nameAr: 'Gmail API' },
      { name: 'JSON', nameAr: 'JSON' },
    ],
  },
  {
    id: 'cv-iot',
    titleEn: 'Computer Vision & IoT',
    titleAr: 'رؤية الكمبيوتر وإنترنت الأشياء',
    icon: '👁️',
    skills: [
      { name: 'OpenCV', nameAr: 'OpenCV' },
      { name: 'MediaPipe', nameAr: 'MediaPipe' },
      { name: 'Computer Vision', nameAr: 'رؤية الكمبيوتر' },
      { name: 'Object Tracking', nameAr: 'تتبع الأجسام' },
      { name: 'NumPy', nameAr: 'NumPy' },
      { name: 'PySerial', nameAr: 'PySerial' },
      { name: 'Arduino', nameAr: 'Arduino' },
      { name: 'C++', nameAr: 'C++' },
      { name: 'Embedded Systems', nameAr: 'الأنظمة المدمجة' },
    ],
  },
];

export default skills;

