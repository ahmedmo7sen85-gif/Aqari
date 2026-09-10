import type { Dictionary } from '../dictionary';

/** Türkçe. */
const tr: Dictionary = {
  'brand.tagline': 'Karar vermeden önce sonucu kendinde gör.',
  'brand.principle': 'Sen istersin. Yapay zekâ gösterir.',

  'common.back': 'Geri',
  'common.next': 'Devam',
  'common.restart': 'Baştan başla',
  'common.close': 'Kapat',
  'common.copy': 'Kopyala',
  'common.copied': 'Kopyalandı',
  'common.language': 'Dil',
  'common.working': 'İşleniyor…',
  'common.step': 'Adım {n} / {total}',

  'welcome.title': 'Herhangi bir karar vermeden önce, kendi yüzünde gör.',
  'welcome.lede':
    'Fotoğrafını yükle, merak ettiğin değişikliği anlat ve onu kendi yüzünde gör — bir mankende değil, başkasında değil.',
  'welcome.point1': 'Senin fotoğrafın, senin yüzün, senin isteğin. İstemediğin hiçbir şey değişmez.',
  'welcome.point2': 'Teşhis değil, bilgilendirme. Sana asla neye «ihtiyacın olduğunu» söylemeyiz.',
  'welcome.point3': 'Görselleştirme bir sonuç vaadi değildir.',
  'welcome.cta': 'Başla',
  'welcome.legal':
    'Bu bir görselleştirme ve bilgilendirme aracıdır. Tıbbi tavsiye, teşhis ya da herhangi bir işlemin sonucuna dair bir öngörü değildir.',

  'upload.title': 'Fotoğrafını ekle',
  'upload.lede': 'Cepheden, dengeli ışıkta, filtresiz. Karede tek kişi olsun.',
  'upload.pick': 'Fotoğraf seç',
  'upload.replace': 'Başka fotoğraf seç',
  'upload.measuring': 'Fotoğraf kalitesi ölçülüyor…',
  'upload.consent':
    'Bunun bana ait bir fotoğraf olduğunu ve 18 yaşından büyük olduğumu onaylıyorum. Fotoğrafım görselleştirmemi oluşturmak için işlenir ve projeyi kaydetmezsem işlem bittikten 24 saat sonra silinir.',
  'upload.privacy': 'Gizlilik: yüz veritabanı yok, veri satışı yok, tüm isteğe bağlı izinler varsayılan olarak kapalı.',

  'check.title': 'Fotoğraf kontrolü',
  'check.lede': 'Bu fotoğrafta ölçebildiklerimiz ve ölçemediklerimiz.',
  'check.notrun':
    'Yüz düzeyindeki kontroller bu kurulumda çalışmadı; kadraj, açı ve filtre doğrulanmadı. «Sorun yoktur» diye varsaymak yerine bunu sana söylüyoruz.',
  'check.continue': 'Bu fotoğrafı kullan',
  'check.retake': 'Başka fotoğraf kullan',
  'check.overall.pass': 'Bu fotoğraf uygun.',
  'check.overall.warn': 'Bu fotoğraf iş görebilir, ama sonucu etkileyebilecek bir şey var.',
  'check.overall.fail': 'Bu fotoğraf büyük olasılıkla zayıf bir görselleştirme verir.',
  'check.overall.not_evaluated': 'Bu fotoğraf kontrol edilmedi.',

  'status.pass': 'İyi',
  'status.warn': 'Daha iyi olabilir',
  'status.fail': 'Sorun',
  'status.not_evaluated': 'Kontrol edilmedi',

  'check.resolution': 'Çözünürlük',
  'check.exposure': 'Işık',
  'check.sharpness': 'Netlik',
  'check.face_present': 'Yüz görünür',
  'check.single_face': 'Yalnızca tek kişi',
  'check.face_angle': 'Cepheden açı',
  'check.face_unobstructed': 'Yüz kapalı değil',
  'check.no_heavy_filter': 'Filtre yok',
  'check.eyes_open': 'Gözler açık',

  'intent.title': 'Ne görmek istersin?',
  'intent.lede': 'Kendi cümlelerinle anlat. Yalnızca istediğin şeyi değiştiririz.',
  'intent.placeholder': 'Örneğin: biraz daha dolgun bir üst dudak',
  'intent.chips': 'Ya da bir bölge seç',
  'intent.style': 'Tercih edilen stil',
  'intent.parse': 'Devam',
  'intent.parsing': 'İsteğin okunuyor…',
  'intent.ambiguous': 'Devam etmeden önce bir soru:',
  'intent.out_of_scope':
    'Bu isteği görselleştiremeyiz. Mirra yalnızca kendi yetişkin yüzün üzerinde çalışır; kimliği, yaşı veya kökeni asla değiştirmez.',
  'intent.unavailable':
    'Serbest metin anlama bu kurulumda bağlı değil, bu yüzden cümlen çözümlenmedi. Bunun yerine aşağıdan bir bölge seç — onlar bu olmadan da çalışır.',

  'intensity.title': 'Ne kadar değişiklik?',
  'intensity.lede': 'Varsayılan «hafif». Sonrasında üçünü karşılaştırabilirsin.',
  'intensity.subtle': 'Hafif',
  'intensity.moderate': 'Orta',
  'intensity.strong': 'Belirgin',
  'intensity.note': 'Daha güçlü ayar daha iyi sonuç demek değildir; yalnızca daha görünür bir değişiklik demektir.',

  'style.natural': 'Doğal',
  'style.subtle': 'Sade',
  'style.soft': 'Yumuşak',
  'style.defined': 'Belirgin',
  'style.glam': 'Gösterişli',
  'style.sculpted': 'Hatlı',
  'style.youthful': 'Dinç',
  'style.minimal_intervention': 'En az müdahale',

  'region.lips': 'Dudaklar',
  'region.nose': 'Burun',
  'region.jawline': 'Çene hattı',
  'region.chin': 'Çene ucu',
  'region.cheeks': 'Elmacık kemikleri',
  'region.under_eyes': 'Göz altı',
  'region.eyelids': 'Göz kapakları',
  'region.eyebrows': 'Kaşlar',
  'region.forehead': 'Alın',
  'region.nasolabial_folds': 'Gülme çizgileri',
  'region.skin_texture': 'Cilt dokusu',
  'region.teeth': 'Dişler',
  'region.neck': 'Boyun',
  'region.hairstyle': 'Saç kesimi',
  'region.hair_color': 'Saç rengi',
  'region.hairline': 'Saç çizgisi',
  'region.facial_hair': 'Sakal',
  'region.makeup_look': 'Makyaj',
  'region.outfit': 'Kıyafet',
  'region.posture': 'Duruş',
  'region.full_look': 'Bütün görünüm',

  'result.title': 'Görselleştirmen',
  'result.generating': 'Görselleştirmen oluşturuluyor…',
  'result.before': 'Önce',
  'result.after': 'Sonra',
  'result.drag': 'Karşılaştırmak için sürükle',
  'result.disclaimer':
    'Bu, isteğinin bir görselleştirmesidir. Bir öngörü ya da vaat değildir ve hiçbir uzman bunu birebir uygulamakla yükümlü değildir.',
  'result.assess_title': 'Bir uzmanın gerçekte değerlendireceği şeyler',
  'result.assess_body':
    'Nitelikli bir uzman, fotoğrafın gösteremediklerine bakar: anatomin, cilt kaliten, tıbbi geçmişin, kullandığın ilaçlar, iyileşme eğilimin ve senin için gerçekçi olan.',
  'result.questions_title': 'Sormaya değer sorular',
  'result.q1': 'Benim anatomimle gerçekçi olarak ne elde edilebilir?',
  'result.q2': 'Riskler neler ve sonuçtan memnun kalmazsam ne olur?',
  'result.q3': 'Ne kadar iyileşme süresi planlamalıyım?',
  'result.q4': 'Hiçbir şey yapmamak dahil, alternatifler neler?',
  'result.variants': 'Şiddetleri karşılaştır',
  'result.variants_cta': 'Üçünü de oluştur',
  'result.brief_cta': 'Konsültasyon özeti oluştur',
  'result.brief_title': 'Konsültasyon özeti',
  'result.brief_hint': 'Randevuna götür. Sana ne söylendiğini değil, senin ne istediğini kaydeder.',
  'result.again': 'Başka bir değişiklik dene',

  'gap.title': 'Yapay zekâ sonucu yok — ve sahtesini üretmeyeceğiz',
  'gap.body':
    'Bu kurulum gerçek bir görselleştirme üretemedi, bu yüzden yukarıda hiçbir şey gösterilmiyor. Model sonucunun yerine benzetilmiş ya da filtrelenmiş bir görsel asla göstermeyiz.',
  'gap.code': 'Sebep',
  'gap.fix':
    'Kurulum senin ise: GEMINI_API_KEY değerini barındırma platformunun ortam değişkenlerine (yalnızca sunucu tarafında) ekle ve yeniden dağıt.',

  'brief.for': 'Şunun için hazırlandı',
  'brief.request': 'Görmek istediğim şey',
  'brief.area': 'Bölge',
  'brief.intensity': 'Gösterilen şiddet',
  'brief.style': 'Tercih edilen stil',
  'brief.note':
    'Ekteki görselleştirme, kendi fotoğrafımdan yapay zekâ ile üretildi. Bunun öngörülen bir sonuç olmadığını biliyorum ve birebir uygulanmasını istemiyorum.',
  'brief.questions': 'Sorularım',

  'footer.notmedical': 'Tıbbi tavsiye değildir. Teşhis değildir. Garanti edilen bir sonuç değildir.',
  'footer.privacy': 'Gizlilik',
};

export default tr;
