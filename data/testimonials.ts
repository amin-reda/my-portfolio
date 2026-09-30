export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  organizationEn: string;
  organizationAr: string;
  avatar: string;
  screenshot: string;
  commentAr: string;
  commentEn: string;
  tagEn: string;
  tagAr: string;
  accentColor: string;
  featured?: boolean;
  projectReferencedEn?: string;
  projectReferencedAr?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'muhammed-gheryani',
    name: 'Muhammed Gheryani',
    nameAr: 'محمد غرياني',
    roleEn: 'Senior NLP & LLM Engineer',
    roleAr: 'مهندس أول معالجة لغات طبيعية ونماذج لغوية (NLP & LLM)',
    organizationEn: 'AI Industry',
    organizationAr: 'قطاع الذكاء الاصطناعي',
    avatar: '/images/testimonials/avatar_muhammed-gheryani.jpg',
    screenshot: '/images/testimonials/photo_2026-09-17_04-07-12.jpg',
    commentAr:
      'عاش يا هندسه بجد، عاجبني إنك فكرت في الـ business logic وإدارة للمخزن مش مجرد شات بوت.\n\nكـ feature جاية جرب تضيف Voice Ordering مع اقتراحات ذكية Smart Upselling لإضافات أو مشروبات لايقة على الطلب هتفرق جدا.\n\nفخور بيك يا هندسة وبالتوفيق دائماً ❤️',
    commentEn:
      'Truly outstanding work, engineer! I really like that you engineered the actual business logic and warehouse inventory management, rather than just building a superficial chatbot.\n\nAs an upcoming feature: consider adding Voice Ordering with intelligent Smart Upselling for side orders or beverages that match the customer request — it will make a massive impact.\n\nVery proud of you, engineer, and wishing you continued success always! ❤️',
    tagEn: 'Technical Architecture Review',
    tagAr: 'تقييم معماري تقني',
    accentColor: '#6366f1',
    featured: true,
    projectReferencedEn: 'Restaurant AI Automation',
    projectReferencedAr: 'أتمتة المطعم بالذكاء الاصطناعي',
  },
  {
    id: 'belal-hamed',
    name: 'Belal A Hamed',
    nameAr: 'بلال عبد الحميد',
    roleEn: 'Lecturer | AI Specialist',
    roleAr: 'مدرس جامعي | متخصص في الذكاء الاصطناعي',
    organizationEn: 'Minia University',
    organizationAr: 'جامعة المنيا',
    avatar: '/images/testimonials/avatar_belal-hamed.jpg',
    screenshot: '/images/testimonials/photo_2026-09-17_04-06-30.jpg',
    commentAr: 'ما شاء الله جميل يا أمين كالعادة استمر ❤️🦾 بالتوفيق دائما يارب ❤️🤲🏻',
    commentEn:
      'Mashallah, magnificent work Amin as always, keep moving forward! ❤️🦾 Wishing you continued success always, Insha\'Allah ❤️🤲🏻',
    tagEn: 'University Lecturer',
    tagAr: 'محاضر جامعي',
    accentColor: '#8b5cf6',
    featured: true,
  },
  {
    id: 'salma-mohamed',
    name: 'Salma Mohamed',
    nameAr: 'سلمى محمد',
    roleEn: 'Instructor @ DEPI',
    roleAr: 'مدربة ومحاضرة في مبادرة DEPI',
    organizationEn: 'DEPI Initiative',
    organizationAr: 'مبادرة رواد مصر الرقمية (DEPI)',
    avatar: '/images/testimonials/avatar_salma-mohamed.jpg',
    screenshot: '/images/testimonials/photo_2026-09-17_04-07-01.jpg',
    commentAr: 'ماشاءالله تحفه 👏🏻 بالتوفيق دايما يارب 😍😍',
    commentEn: 'Mashallah, superb and impressive work! 👏🏻 Wishing you everlasting success always 😍😍',
    tagEn: 'DEPI Instructor',
    tagAr: 'مدربة DEPI',
    accentColor: '#10b981',
  },
  {
    id: 'kholoud-ali',
    name: 'Kholoud Abd El-Naby Ali',
    nameAr: 'خلود عبد النبي علي',
    roleEn: 'Data Science Instructor @ DEPI',
    roleAr: 'مدربة علم البيانات في مبادرة DEPI',
    organizationEn: 'DEPI Initiative',
    organizationAr: 'مبادرة رواد مصر الرقمية (DEPI)',
    avatar: '/images/testimonials/avatar_kholoud-ali.jpg',
    screenshot: '/images/testimonials/photo_2026-09-17_04-07-30.jpg',
    commentAr: 'So proud of you 👏 برافو بجد عليك، بالتوفيق يبشمهندس 😉',
    commentEn: 'So proud of you 👏 Bravo, truly commendable job. Wishing you great success, engineer 😉',
    tagEn: 'Data Science Instructor',
    tagAr: 'مدربة علم بيانات',
    accentColor: '#06b6d4',
  },
  {
    id: 'ahmed-hamdy',
    name: 'Ahmed Hamdy',
    nameAr: 'أحمد حمدي',
    roleEn: 'Data Analyst & Data Scientist',
    roleAr: 'محلل بيانات وعالم بيانات',
    organizationEn: 'Data Industry',
    organizationAr: 'مجال تحليل البيانات',
    avatar: '/images/testimonials/avatar_ahmed-hamdy.jpg',
    screenshot: '/images/testimonials/photo_2026-09-17_04-07-22.jpg',
    commentAr: 'عااااش جدا استمر ❤️',
    commentEn: 'Awesome work, keep going strong! ❤️',
    tagEn: 'Data Practitioner',
    tagAr: 'متخصص بيانات',
    accentColor: '#f59e0b',
  },
  {
    id: 'aya-mohamed',
    name: 'Aya Mohamed',
    nameAr: 'آية محمد',
    roleEn: 'Engineering Professional',
    roleAr: 'مهندسة ومحترفة تقنية',
    organizationEn: 'Tech Community',
    organizationAr: 'المجتمع التقني',
    avatar: '/images/testimonials/avatar_aya-mohamed.jpg',
    screenshot: '/images/testimonials/photo_2026-09-17_04-04-55.jpg',
    commentAr: 'Good work and keep going, looking forward to more 😍',
    commentEn: 'Good work and keep going, looking forward to more 😍',
    tagEn: 'Peer Endorsement',
    tagAr: 'إشادة زملاء المجال',
    accentColor: '#ec4899',
  },
];

export default testimonials;

