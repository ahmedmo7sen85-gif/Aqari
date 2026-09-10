import type { Dictionary } from '../dictionary';

/** العربية — RTL. */
const ar: Dictionary = {
  'brand.tagline': 'شاهد نتيجتك قبل أن تقرر.',
  'brand.principle': 'أنت تطلب. الذكاء الاصطناعي يُظهر.',

  'common.back': 'رجوع',
  'common.next': 'متابعة',
  'common.restart': 'البدء من جديد',
  'common.close': 'إغلاق',
  'common.copy': 'نسخ',
  'common.copied': 'تم النسخ',
  'common.language': 'اللغة',
  'common.working': 'جارٍ العمل…',
  'common.step': 'الخطوة {n} من {total}',

  'welcome.title': 'شاهدها على وجهك أنت، قبل أن تتخذ أي قرار.',
  'welcome.lede':
    'ارفع صورتك، واكتب التغيير الذي يثير فضولك، وشاهده على وجهك أنت — لا على عارضة، ولا على أي شخص آخر.',
  'welcome.point1': 'صورتك، وجهك، طلبك. لا يتغيّر شيء لم تطلبه.',
  'welcome.point2': 'توعية لا تشخيص. لا نخبرك أبداً بما «تحتاج» إليه.',
  'welcome.point3': 'الصورة الناتجة ليست وعداً بنتيجة.',
  'welcome.cta': 'ابدأ',
  'welcome.legal':
    'هذه أداة للتصوّر والتوعية. ليست استشارة طبية ولا تشخيصاً ولا تنبؤاً بنتيجة أي إجراء.',

  'upload.title': 'أضف صورتك',
  'upload.lede': 'وجه أمامي، إضاءة متساوية، بلا فلاتر، وشخص واحد في الصورة.',
  'upload.pick': 'اختر صورة',
  'upload.replace': 'اختر صورة أخرى',
  'upload.measuring': 'جارٍ قياس جودة الصورة…',
  'upload.consent':
    'أؤكد أن هذه صورتي وأن عمري يتجاوز ١٨ عاماً. تُعالَج صورتي لإنشاء التصوّر الخاص بي وتُحذف بعد ٢٤ ساعة من انتهاء المعالجة ما لم أحفظ المشروع.',
  'upload.privacy': 'الخصوصية: لا قاعدة بيانات للوجوه، ولا بيع للبيانات، وكل الأذونات الاختيارية معطّلة افتراضياً.',

  'check.title': 'فحص الصورة',
  'check.lede': 'ما تمكّنا من قياسه في هذه الصورة، وما لم نتمكن من قياسه.',
  'check.notrun':
    'لم تُنفَّذ فحوص الوجه في هذه النسخة، لذلك لم يُتحقق من الزاوية أو التأطير أو الفلاتر. نخبرك بذلك بدل افتراض أن كل شيء سليم.',
  'check.continue': 'استخدم هذه الصورة',
  'check.retake': 'استخدم صورة أخرى',
  'check.overall.pass': 'هذه الصورة مناسبة.',
  'check.overall.warn': 'قد تصلح هذه الصورة، لكن هناك ما قد يؤثر في النتيجة.',
  'check.overall.fail': 'من المرجّح أن تعطي هذه الصورة نتيجة ضعيفة.',
  'check.overall.not_evaluated': 'لم يتم فحص هذه الصورة.',

  'status.pass': 'جيد',
  'status.warn': 'يمكن أن يكون أفضل',
  'status.fail': 'مشكلة',
  'status.not_evaluated': 'لم يُفحص',

  'check.resolution': 'الدقة',
  'check.exposure': 'الإضاءة',
  'check.sharpness': 'وضوح الصورة',
  'check.face_present': 'الوجه ظاهر',
  'check.single_face': 'شخص واحد فقط',
  'check.face_angle': 'زاوية أمامية',
  'check.face_unobstructed': 'الوجه غير محجوب',
  'check.no_heavy_filter': 'بلا فلاتر',
  'check.eyes_open': 'العينان مفتوحتان',

  'intent.title': 'ما الذي تودّ رؤيته؟',
  'intent.lede': 'اكتبه بكلماتك. لا نغيّر إلا ما تطلبه.',
  'intent.placeholder': 'مثال: شفة عليا أكثر امتلاءً قليلاً',
  'intent.chips': 'أو اختر منطقة',
  'intent.style': 'النمط المفضّل',
  'intent.parse': 'متابعة',
  'intent.parsing': 'جارٍ قراءة طلبك…',
  'intent.ambiguous': 'سؤال واحد قبل المتابعة:',
  'intent.out_of_scope':
    'لا يمكننا تنفيذ هذا الطلب. تعمل مِرّا على وجهك أنت فقط كشخص بالغ، ولا تغيّر الهوية أو العمر أو الأصل.',
  'intent.unavailable':
    'فهم النص الحر غير متصل في هذه النسخة، لذلك لم تُحلَّل جملتك. اختر منطقة من الأسفل — فهي تعمل من دونه.',

  'intensity.title': 'ما مقدار التغيير؟',
  'intensity.lede': 'الخفيف هو الوضع الافتراضي، ويمكنك مقارنة الثلاثة لاحقاً.',
  'intensity.subtle': 'خفيف',
  'intensity.moderate': 'متوسط',
  'intensity.strong': 'قوي',
  'intensity.note': 'الإعداد الأقوى لا يعني نتيجة أفضل، بل تغييراً أوضح فحسب.',

  'style.natural': 'طبيعي',
  'style.subtle': 'هادئ',
  'style.soft': 'ناعم',
  'style.defined': 'محدّد',
  'style.glam': 'لافت',
  'style.sculpted': 'منحوت',
  'style.youthful': 'أكثر نضارة',
  'style.minimal_intervention': 'أدنى تدخل',

  'region.lips': 'الشفاه',
  'region.nose': 'الأنف',
  'region.jawline': 'خط الفك',
  'region.chin': 'الذقن',
  'region.cheeks': 'الوجنتان',
  'region.under_eyes': 'أسفل العينين',
  'region.eyelids': 'الجفون',
  'region.eyebrows': 'الحاجبان',
  'region.forehead': 'الجبهة',
  'region.nasolabial_folds': 'خطوط الابتسامة',
  'region.skin_texture': 'ملمس البشرة',
  'region.teeth': 'الأسنان',
  'region.neck': 'الرقبة',
  'region.hairstyle': 'قصة الشعر',
  'region.hair_color': 'لون الشعر',
  'region.hairline': 'خط الشعر',
  'region.facial_hair': 'اللحية',
  'region.makeup_look': 'المكياج',
  'region.outfit': 'الملابس',
  'region.posture': 'الوقفة',
  'region.full_look': 'الإطلالة الكاملة',

  'result.title': 'التصوّر الخاص بك',
  'result.generating': 'جارٍ إنشاء التصوّر…',
  'result.before': 'قبل',
  'result.after': 'بعد',
  'result.drag': 'اسحب للمقارنة',
  'result.disclaimer':
    'هذا تصوّر واحد لطلبك. ليس تنبؤاً ولا وعداً، ولا يلتزم أي مختص بإعادة إنتاجه.',
  'result.assess_title': 'ما الذي سيقيّمه المختص فعلياً',
  'result.assess_body':
    'ينظر المختص المؤهل إلى ما لا تُظهره الصورة: بنيتك التشريحية، وجودة البشرة، والتاريخ الطبي، والأدوية، وقابلية الالتئام، وما هو واقعي بالنسبة لك.',
  'result.questions_title': 'أسئلة تستحق أن تُطرح',
  'result.q1': 'ما الذي يمكن تحقيقه واقعياً مع بنيتي التشريحية؟',
  'result.q2': 'ما المخاطر؟ وماذا يحدث إن لم أكن راضياً عن النتيجة؟',
  'result.q3': 'ما فترة النقاهة التي ينبغي أن أخطط لها؟',
  'result.q4': 'ما البدائل، بما فيها عدم فعل أي شيء؟',
  'result.variants': 'قارن بين الدرجات',
  'result.variants_cta': 'أنشئ الدرجات الثلاث',
  'result.brief_cta': 'أنشئ ملخّص الاستشارة',
  'result.brief_title': 'ملخّص الاستشارة',
  'result.brief_hint': 'خذ هذا معك إلى الموعد. يسجّل ما طلبته أنت، لا ما قيل لك إنك تحتاجه.',
  'result.again': 'جرّب تغييراً آخر',

  'gap.title': 'لا توجد نتيجة من الذكاء الاصطناعي — ولن نصطنع واحدة',
  'gap.body':
    'تعذّر على هذه النسخة إنتاج تصوّر حقيقي، لذلك لا تُعرض أي صورة أعلاه. لا نعرض صورة محاكاة أو مفلترة مكان نتيجة النموذج.',
  'gap.code': 'السبب',
  'gap.fix':
    'إن كانت هذه نسختك: أضف GEMINI_API_KEY إلى متغيّرات البيئة في منصة الاستضافة (على الخادم فقط) ثم أعد النشر.',

  'brief.for': 'أُعدّ لـ',
  'brief.request': 'ما طلبت رؤيته',
  'brief.area': 'المنطقة',
  'brief.intensity': 'الدرجة المعروضة',
  'brief.style': 'النمط المفضّل',
  'brief.note':
    'أُنشئ التصوّر المرفق بالذكاء الاصطناعي من صورتي الشخصية. أدرك أنه ليس نتيجة متوقعة ولا أطلب إعادة إنتاجه حرفياً.',
  'brief.questions': 'أسئلتي',

  'footer.notmedical': 'ليست استشارة طبية. ليست تشخيصاً. ليست نتيجة مضمونة.',
  'footer.privacy': 'الخصوصية',
};

export default ar;
