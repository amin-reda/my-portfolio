export type ProjectCategory = 'AI' | 'GenAI' | 'Data' | 'Automation' | 'IoT';
export type ProjectStatus = 'completed' | 'coming-soon' | 'in-progress';

export interface ProjectContribution {
  label: string;
  labelAr: string;
  items: string[];
  itemsAr: string[];
}

export interface ArchitectureStep {
  label: string;
  labelAr: string;
  icon?: string;
}

export interface Project {
  id: string;
  titleEn: string;
  titleAr: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  isTeamProject: boolean;
  descriptionEn: string;
  descriptionAr: string;
  problemEn: string;
  problemAr: string;
  solutionEn: string;
  solutionAr: string;
  technologies: string[];
  features: string[];
  featuresAr: string[];
  architecture: ArchitectureStep[][];
  contribution?: ProjectContribution;
  keyLearnings: string[];
  keyLearningsAr: string[];
  github: string;
  liveDemo?: string;
  systemLabel: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    id: 'restaurant-ai-automation',
    titleEn: 'Restaurant AI Automation',
    titleAr: 'أتمتة المطعم بالذكاء الاصطناعي',
    categories: ['AI', 'Automation'],
    status: 'completed',
    isTeamProject: false,
    descriptionEn:
      'An end-to-end AI-powered restaurant ordering and management automation system built with n8n, integrating conversational AI, real-time inventory management, and automated reporting.',
    descriptionAr:
      'نظام أتمتة شامل لإدارة وطلبات المطاعم مبني على الذكاء الاصطناعي باستخدام n8n، يدمج الذكاء الاصطناعي الحواري وإدارة المخزون الفوري والتقارير الآلية.',
    problemEn:
      'Restaurants face operational inefficiencies with manual order taking, inventory tracking, and reporting. Human errors, delayed communications, and lack of data visibility create friction in day-to-day operations.',
    problemAr:
      'تواجه المطاعم مشاكل في الكفاءة التشغيلية بسبب أخذ الطلبات اليدوي وتتبع المخزون وإعداد التقارير يدوياً. تُسبب الأخطاء البشرية والتأخيرات في التواصل وانعدام الرؤية حول البيانات احتكاكاً في العمليات اليومية.',
    solutionEn:
      'A fully automated pipeline powered by Google Gemini AI and n8n: customers interact via Telegram, the AI processes orders with structured JSON extraction, and n8n orchestrates inventory updates, confirmations, and daily sales reports automatically.',
    solutionAr:
      'خط أنابيب مؤتمت بالكامل يعمل بواسطة Google Gemini ون8n: يتفاعل العملاء عبر Telegram، ويعالج الذكاء الاصطناعي الطلبات باستخراج JSON منظم، بينما يُنسق n8n تحديثات المخزون والتأكيدات والتقارير اليومية تلقائياً.',
    technologies: [
      'n8n', 'Telegram Bot API', 'Google Gemini', 'LangChain',
      'Google Sheets', 'Gmail API', 'JSON', 'REST APIs',
      'Prompt Engineering', 'Workflow Automation',
    ],
    features: [
      'Conversational AI ordering via Telegram',
      'Structured JSON data extraction from natural language',
      'Real-time inventory tracking & management',
      'Recipe management system',
      'Low-stock alerts via notifications',
      'Automated order confirmations',
      'Daily sales report generation',
      'Dedicated error handling workflows',
    ],
    featuresAr: [
      'طلبات ذكاء اصطناعي حواري عبر Telegram',
      'استخراج بيانات JSON منظم من اللغة الطبيعية',
      'تتبع وإدارة المخزون في الوقت الفعلي',
      'نظام إدارة الوصفات',
      'تنبيهات المخزون المنخفض عبر الإشعارات',
      'تأكيدات الطلب الآلية',
      'إنشاء التقارير اليومية للمبيعات',
      'سير عمل معالجة الأخطاء المخصص',
    ],
    architecture: [
      [{ label: 'Customer', labelAr: 'العميل' }],
      [{ label: 'Telegram Bot', labelAr: 'بوت Telegram' }],
      [{ label: 'Google Gemini AI', labelAr: 'جوجل جيميني AI' }],
      [{ label: 'Structured JSON', labelAr: 'JSON منظم' }],
      [{ label: 'n8n Workflow', labelAr: 'سير عمل n8n' }],
      [{ label: 'Inventory / Orders', labelAr: 'المخزون / الطلبات' }],
      [{ label: 'Google Sheets', labelAr: 'جداول بيانات Google' }],
      [{ label: 'Notifications / Reports', labelAr: 'الإشعارات / التقارير' }],
    ],
    keyLearnings: [
      'Orchestrating multi-step AI workflows with n8n',
      'Prompt engineering for reliable structured output',
      'Integrating multiple APIs in a single automated pipeline',
      'Building fault-tolerant automation with dedicated error handling',
    ],
    keyLearningsAr: [
      'تنسيق سير عمل الذكاء الاصطناعي متعدد الخطوات باستخدام n8n',
      'هندسة الأوامر للحصول على مخرجات منظمة وموثوقة',
      'دمج واجهات برمجية متعددة في خط أنابيب أتمتة واحد',
      'بناء أتمتة متحملة للأخطاء مع معالجة مخصصة للأخطاء',
    ],
    github: 'https://github.com/amin-reda/Restaurant-AI-Automation',
    systemLabel: 'AUTOMATION ACTIVE',
    accentColor: '#6366f1',
  },
  {
    id: 'rag-system',
    titleEn: 'RAG System',
    titleAr: 'نظام RAG',
    categories: ['GenAI', 'AI'],
    status: 'completed',
    isTeamProject: true,
    descriptionEn:
      'A team-based Retrieval-Augmented Generation system for document retrieval and question answering using embeddings, vector stores, and LLMs.',
    descriptionAr:
      'نظام RAG جماعي لاسترداد المستندات والإجابة على الأسئلة باستخدام التضمينات ومخازن المتجهات ونماذج اللغة الكبيرة.',
    problemEn:
      'Large language models hallucinate when asked about domain-specific or private knowledge. Document-grounded question answering requires reliable retrieval of relevant context before generation.',
    problemAr:
      'تُنتج نماذج اللغة الكبيرة معلومات مختلقة عند الاستفسار عن معرفة خاصة بمجال معين. تتطلب الإجابة على الأسئلة المستندة إلى الوثائق استرداداً موثوقاً للسياق ذي الصلة قبل التوليد.',
    solutionEn:
      'A modular RAG pipeline with dedicated components for parsing, chunking, embedding, vector storage, retrieval, and LLM generation — enabling accurate, grounded answers from document collections.',
    solutionAr:
      'خط أنابيب RAG معياري بمكونات مخصصة للتحليل والتقطيع والتضمين وتخزين المتجهات والاسترداد وتوليد LLM — مما يتيح إجابات دقيقة ومستندة من مجموعات الوثائق.',
    technologies: ['Python', 'LLMs', 'Embeddings', 'Vector Stores', 'RAG', 'LangChain'],
    features: [
      'Modular document parsing pipeline',
      'Configurable chunking strategies',
      'Semantic embedding generation',
      'Vector store integration',
      'Retrieval-based context injection',
      'LLM-powered answer generation',
      'Evaluation and testing suite',
      'Comprehensive documentation',
    ],
    featuresAr: [
      'خط أنابيب تحليل مستندات معياري',
      'استراتيجيات تقطيع قابلة للتكوين',
      'توليد تضمين دلالي',
      'تكامل مخزن المتجهات',
      'حقن سياق مبني على الاسترداد',
      'توليد إجابات مدعوم بـ LLM',
      'مجموعة تقييم واختبار',
      'توثيق شامل',
    ],
    architecture: [
      [{ label: 'Documents', labelAr: 'المستندات' }],
      [{ label: 'Parsing', labelAr: 'التحليل' }],
      [{ label: 'Chunking', labelAr: 'التقطيع' }],
      [{ label: 'Embeddings', labelAr: 'التضمينات' }],
      [{ label: 'Vector Store', labelAr: 'مخزن المتجهات' }],
      [{ label: 'Retrieval', labelAr: 'الاسترداد' }],
      [{ label: 'LLM', labelAr: 'نموذج اللغة الكبير' }],
      [{ label: 'Answer', labelAr: 'الإجابة' }],
    ],
    contribution: {
      label: "Amin's Contribution",
      labelAr: 'مساهمة أمين',
      items: ['Python Computer Vision and system integration components'],
      itemsAr: ['مكونات رؤية الكمبيوتر بـ Python وتكامل النظام'],
    },
    keyLearnings: [
      'Designing modular retrieval pipelines',
      'Working with embeddings and vector similarity search',
      'LLM prompt design for grounded generation',
      'Evaluation methodology for RAG quality',
    ],
    keyLearningsAr: [
      'تصميم خطوط أنابيب استرداد معيارية',
      'العمل مع التضمينات والبحث عن التشابه بالمتجهات',
      'تصميم أوامر LLM للتوليد المستند إلى الوثائق',
      'منهجية تقييم جودة RAG',
    ],
    github: 'https://github.com/amin-reda/RAG-System',
    systemLabel: 'PIPELINE READY',
    accentColor: '#8b5cf6',
  },
  {
    id: 'iot-smart-radar-tracker',
    titleEn: 'IoT Smart Radar Tracker',
    titleAr: 'متتبع الرادار الذكي للإنترنت',
    categories: ['IoT', 'AI'],
    status: 'completed',
    isTeamProject: true,
    descriptionEn:
      'A team project combining IoT, Computer Vision, and Embedded Systems to create a smart radar-style real-time object tracking system with pan-tilt servo control.',
    descriptionAr:
      'مشروع جماعي يجمع بين إنترنت الأشياء ورؤية الكمبيوتر والأنظمة المدمجة لإنشاء نظام تتبع أجسام ذكي بأسلوب الرادار في الوقت الفعلي مع التحكم في محرك السيرفو.',
    problemEn:
      'Traditional radar systems lack visual object identification. Combining ultrasonic sensing with computer vision creates a richer, more intelligent tracking solution for real-time detection and targeting.',
    problemAr:
      'تفتقر أنظمة الرادار التقليدية إلى تحديد الأجسام بصرياً. يخلق الجمع بين الاستشعار بالموجات فوق الصوتية ورؤية الكمبيوتر حلاً أكثر ذكاءً لاكتشاف التتبع في الوقت الفعلي والاستهداف.',
    solutionEn:
      'An integrated hardware-software system: Arduino handles ultrasonic scanning and servo control while Python processes camera feed in real-time using MediaPipe and OpenCV, communicating via serial to drive the pan-tilt tracking mechanism.',
    solutionAr:
      'نظام متكامل للأجهزة والبرمجيات: يتولى Arduino المسح بالموجات فوق الصوتية والتحكم في السيرفو بينما تعالج Python تدفق الكاميرا في الوقت الفعلي باستخدام MediaPipe وOpenCV، والتواصل عبر المنفذ التسلسلي لتشغيل آلية التتبع.',
    technologies: [
      'Python', 'OpenCV', 'MediaPipe', 'NumPy', 'PySerial',
      'C++', 'Arduino', 'HC-SR04', 'Servo Motors',
    ],
    features: [
      '180° ultrasonic scanning',
      'Real-time object detection with MediaPipe',
      'Object tracking and distance measurement',
      'Pan-tilt servo tracking mechanism',
      'Arduino-Python serial communication',
      'Laser diode targeting',
      'Buzzer alert system',
      'Camera-based visual tracking',
    ],
    featuresAr: [
      'مسح بالموجات فوق الصوتية بزاوية 180°',
      'كشف الأجسام في الوقت الفعلي باستخدام MediaPipe',
      'تتبع الأجسام وقياس المسافة',
      'آلية تتبع محرك السيرفو',
      'التواصل التسلسلي بين Arduino وPython',
      'استهداف بالليزر',
      'نظام تنبيه بالبازر',
      'تتبع بصري عبر الكاميرا',
    ],
    architecture: [
      [{ label: 'Camera', labelAr: 'الكاميرا' }, { label: 'HC-SR04 Sensor', labelAr: 'حساس HC-SR04' }],
      [{ label: 'Python / OpenCV / MediaPipe', labelAr: 'Python / OpenCV / MediaPipe' }, { label: 'Distance Measurement', labelAr: 'قياس المسافة' }],
      [{ label: 'Object Detection & Tracking', labelAr: 'كشف الأجسام والتتبع' }],
      [{ label: 'Serial Communication (PySerial)', labelAr: 'الاتصال التسلسلي (PySerial)' }],
      [{ label: 'Arduino UNO R4', labelAr: 'Arduino UNO R4' }],
      [{ label: 'Pan-Tilt System', labelAr: 'نظام الإمالة الأفقية والرأسية' }, { label: 'Buzzer / Laser Alerts', labelAr: 'تنبيهات البازر / الليزر' }],
    ],
    contribution: {
      label: "Amin's Contribution",
      labelAr: 'مساهمة أمين',
      items: [
        'Python camera processing pipeline',
        'MediaPipe object detection integration',
        'OpenCV real-time visual tracking',
        'NumPy data processing',
        'PySerial Arduino communication',
        'Integration with pan-tilt tracking system',
      ],
      itemsAr: [
        'خط أنابيب معالجة الكاميرا بـ Python',
        'تكامل كشف الأجسام بـ MediaPipe',
        'تتبع بصري فوري باستخدام OpenCV',
        'معالجة بيانات NumPy',
        'تواصل Arduino بـ PySerial',
        'التكامل مع نظام تتبع الإمالة',
      ],
    },
    keyLearnings: [
      'Bridging embedded systems and Python via serial communication',
      'Real-time computer vision with MediaPipe and OpenCV',
      'Hardware-software integration challenges',
      'Pan-tilt servo calibration and control',
    ],
    keyLearningsAr: [
      'ربط الأنظمة المدمجة بـ Python عبر الاتصال التسلسلي',
      'رؤية الكمبيوتر الفورية باستخدام MediaPipe وOpenCV',
      'تحديات تكامل الأجهزة والبرمجيات',
      'معايرة والتحكم في محرك سيرفو الإمالة',
    ],
    github: 'https://github.com/amin-reda/IoT-Smart-Radar-Tracker',
    systemLabel: 'SYSTEM ONLINE',
    accentColor: '#10b981',
  },
  {
    id: 'netflix-data-analysis',
    titleEn: 'Netflix Data Analysis',
    titleAr: 'تحليل بيانات نتفليكس',
    categories: ['Data'],
    status: 'completed',
    isTeamProject: false,
    descriptionEn:
      'An end-to-end exploratory data analysis project on Netflix\'s 8,807-title dataset, uncovering content trends, distribution patterns, and business insights through data wrangling and visualization.',
    descriptionAr:
      'مشروع تحليل بيانات استكشافي شامل على مجموعة بيانات نتفليكس المكونة من 8807 عنواناً، يكشف عن اتجاهات المحتوى وأنماط التوزيع ورؤى الأعمال من خلال معالجة وتصوير البيانات.',
    problemEn:
      'Netflix\'s content library contains thousands of titles with complex metadata. Extracting meaningful trends around content type, geography, ratings, and growth requires structured data cleaning and analytical exploration.',
    problemAr:
      'تحتوي مكتبة محتوى نتفليكس على آلاف العناوين ذات البيانات الوصفية المعقدة. يتطلب استخلاص الاتجاهات المعنوية حول نوع المحتوى والجغرافيا والتقييمات والنمو تنظيف البيانات بشكل منظم والاستكشاف التحليلي.',
    solutionEn:
      'A Jupyter Notebook-based EDA pipeline covering data understanding, missing value handling, feature engineering, and multi-dimensional visualization — delivering concrete, evidence-based content insights.',
    solutionAr:
      'خط أنابيب EDA مبني على Jupyter Notebook يغطي فهم البيانات ومعالجة القيم المفقودة وهندسة الميزات والتصوير متعدد الأبعاد — مقدماً رؤى محتوى ملموسة قائمة على الأدلة.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebook'],
    features: [
      '8,807 Netflix titles analyzed',
      'Missing value handling & date processing',
      'Duration & country data processing',
      'Feature engineering pipeline',
      'Multi-dimensional EDA',
      'Content type distribution analysis',
      'Geographic distribution insights',
      'Content growth timeline analysis',
      'Rating & genre breakdown',
    ],
    featuresAr: [
      'تحليل 8807 عناوين نتفليكس',
      'معالجة القيم المفقودة ومعالجة التاريخ',
      'معالجة بيانات المدة والبلد',
      'خط أنابيب هندسة الميزات',
      'EDA متعدد الأبعاد',
      'تحليل توزيع نوع المحتوى',
      'رؤى التوزيع الجغرافي',
      'تحليل الجدول الزمني لنمو المحتوى',
      'تفصيل التقييمات والأجناس',
    ],
    architecture: [
      [{ label: 'Netflix Dataset (CSV)', labelAr: 'مجموعة بيانات نتفليكس (CSV)' }],
      [{ label: 'Data Loading & Inspection', labelAr: 'تحميل البيانات وفحصها' }],
      [{ label: 'Missing Value Handling', labelAr: 'معالجة القيم المفقودة' }],
      [{ label: 'Feature Engineering', labelAr: 'هندسة الميزات' }],
      [{ label: 'Exploratory Analysis', labelAr: 'التحليل الاستكشافي' }],
      [{ label: 'Visualization & Insights', labelAr: 'التصوير والرؤى' }],
    ],
    keyLearnings: [
      'Systematic EDA methodology with Pandas',
      'Data cleaning strategies for real-world datasets',
      'Effective storytelling through data visualization',
      'Feature engineering for temporal and categorical data',
    ],
    keyLearningsAr: [
      'منهجية EDA المنهجية مع Pandas',
      'استراتيجيات تنظيف البيانات لمجموعات البيانات الواقعية',
      'رواية قصص فعالة من خلال تصوير البيانات',
      'هندسة الميزات للبيانات الزمنية والفئوية',
    ],
    github: 'https://github.com/amin-reda/Netflix-Data-Analysis',
    systemLabel: 'DATA ANALYSIS',
    accentColor: '#f59e0b',
  },
];

export const comingSoonProjects = [
  {
    id: 'sales-data-analysis',
    titleEn: 'Sales Data Analysis',
    titleAr: 'تحليل بيانات المبيعات',
    status: 'coming-soon' as ProjectStatus,
    categories: ['Data'] as ProjectCategory[],
    descriptionEn: 'End-to-end sales data analysis project — exploring patterns, trends, and business insights.',
    descriptionAr: 'مشروع تحليل بيانات مبيعات شامل — استكشاف الأنماط والاتجاهات ورؤى الأعمال.',
    accentColor: '#0ea5e9',
  },
  {
    id: 'ai-automation-projects',
    titleEn: 'Additional AI Automation Projects',
    titleAr: 'مشاريع أتمتة ذكاء اصطناعي إضافية',
    status: 'in-progress' as ProjectStatus,
    categories: ['AI', 'Automation'] as ProjectCategory[],
    descriptionEn: 'New AI and automation projects currently in active development.',
    descriptionAr: 'مشاريع ذكاء اصطناعي وأتمتة جديدة قيد التطوير النشط.',
    accentColor: '#6366f1',
  },
];

export default projects;

