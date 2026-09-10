import type { Dictionary } from '../dictionary';

/** Español. */
const es: Dictionary = {
  'brand.tagline': 'Visualiza tu objetivo antes de decidir.',
  'brand.principle': 'Tú pides. La IA visualiza.',

  'common.back': 'Atrás',
  'common.next': 'Continuar',
  'common.restart': 'Empezar de nuevo',
  'common.close': 'Cerrar',
  'common.copy': 'Copiar',
  'common.copied': 'Copiado',
  'common.language': 'Idioma',
  'common.working': 'Procesando…',
  'common.step': 'Paso {n} de {total}',

  'welcome.title': 'Verlo en ti, antes de decidir nada.',
  'welcome.lede':
    'Sube tu foto, describe el cambio que te da curiosidad y velo en tu propio rostro: no en una modelo, no en otra persona.',
  'welcome.point1': 'Tu foto, tu rostro, tu petición. No se cambia nada que no hayas pedido.',
  'welcome.point2': 'Información, no diagnóstico. Nunca te decimos qué «necesitas».',
  'welcome.point3': 'Una visualización no es una promesa de resultado.',
  'welcome.cta': 'Empezar',
  'welcome.legal':
    'Herramienta de visualización e información. No es consejo médico, ni diagnóstico, ni una predicción del resultado de ningún tratamiento.',

  'upload.title': 'Añade tu foto',
  'upload.lede': 'De frente, luz uniforme, sin filtros. Una sola persona.',
  'upload.pick': 'Elegir una foto',
  'upload.replace': 'Elegir otra foto',
  'upload.measuring': 'Midiendo la calidad de la foto…',
  'upload.consent':
    'Confirmo que esta es mi foto y que soy mayor de 18 años. Mi foto se procesa para crear mi visualización y se elimina 24 h después de finalizar el proceso, salvo que guarde el proyecto.',
  'upload.privacy': 'Privacidad: sin base de datos facial, sin venta de datos, todos los consentimientos opcionales desactivados por defecto.',

  'check.title': 'Comprobación de la foto',
  'check.lede': 'Lo que hemos podido medir en esta foto y lo que no.',
  'check.notrun':
    'Las comprobaciones del rostro no se han ejecutado en esta instalación, así que no se ha verificado el encuadre, el ángulo ni los filtros. Te lo decimos en lugar de suponer que está bien.',
  'check.continue': 'Usar esta foto',
  'check.retake': 'Usar otra foto',
  'check.overall.pass': 'Esta foto es adecuada.',
  'check.overall.warn': 'Esta foto puede servir, pero algo podría afectar al resultado.',
  'check.overall.fail': 'Es probable que esta foto dé una visualización pobre.',
  'check.overall.not_evaluated': 'Esta foto no se ha comprobado.',

  'status.pass': 'Bien',
  'status.warn': 'Mejorable',
  'status.fail': 'Problema',
  'status.not_evaluated': 'Sin comprobar',

  'check.resolution': 'Resolución',
  'check.exposure': 'Iluminación',
  'check.sharpness': 'Enfoque',
  'check.face_present': 'Rostro visible',
  'check.single_face': 'Una sola persona',
  'check.face_angle': 'Ángulo frontal',
  'check.face_unobstructed': 'Rostro despejado',
  'check.no_heavy_filter': 'Sin filtro',
  'check.eyes_open': 'Ojos abiertos',

  'intent.title': '¿Qué te gustaría ver?',
  'intent.lede': 'Descríbelo con tus palabras. Solo cambiamos lo que pides.',
  'intent.placeholder': 'Por ejemplo: un labio superior algo más lleno',
  'intent.chips': 'O elige una zona',
  'intent.style': 'Estilo preferido',
  'intent.parse': 'Continuar',
  'intent.parsing': 'Leyendo tu petición…',
  'intent.ambiguous': 'Una pregunta antes de continuar:',
  'intent.out_of_scope':
    'No podemos visualizar esta petición. Mirra trabaja solo sobre tu propio rostro adulto y nunca cambia identidad, edad ni origen.',
  'intent.unavailable':
    'La comprensión de texto libre no está conectada aquí, así que tu frase no se ha analizado. Elige una zona abajo: funcionan sin ella.',

  'intensity.title': '¿Cuánto cambio?',
  'intensity.lede': 'Sutil es la opción por defecto. Después podrás comparar las tres.',
  'intensity.subtle': 'Sutil',
  'intensity.moderate': 'Moderado',
  'intensity.strong': 'Marcado',
  'intensity.note': 'Más intensidad no significa mejor resultado, solo un cambio más visible.',

  'style.natural': 'Natural',
  'style.subtle': 'Discreto',
  'style.soft': 'Suave',
  'style.defined': 'Definido',
  'style.glam': 'Glam',
  'style.sculpted': 'Esculpido',
  'style.youthful': 'Fresco',
  'style.minimal_intervention': 'Mínimo',

  'region.lips': 'Labios',
  'region.nose': 'Nariz',
  'region.jawline': 'Mandíbula',
  'region.chin': 'Mentón',
  'region.cheeks': 'Pómulos',
  'region.under_eyes': 'Ojeras',
  'region.eyelids': 'Párpados',
  'region.eyebrows': 'Cejas',
  'region.forehead': 'Frente',
  'region.nasolabial_folds': 'Surcos nasogenianos',
  'region.skin_texture': 'Textura de la piel',
  'region.teeth': 'Dientes',
  'region.neck': 'Cuello',
  'region.hairstyle': 'Corte de pelo',
  'region.hair_color': 'Color de pelo',
  'region.hairline': 'Línea del cabello',
  'region.facial_hair': 'Barba',
  'region.makeup_look': 'Maquillaje',
  'region.outfit': 'Vestuario',
  'region.posture': 'Postura',
  'region.full_look': 'Look completo',

  'result.title': 'Tu visualización',
  'result.generating': 'Creando tu visualización…',
  'result.before': 'Antes',
  'result.after': 'Después',
  'result.drag': 'Arrastra para comparar',
  'result.disclaimer':
    'Esta es una visualización de tu petición. No es una predicción ni una promesa, y ningún profesional está obligado a reproducirla.',
  'result.assess_title': 'Lo que un especialista evaluaría de verdad',
  'result.assess_body':
    'Un profesional cualificado valora lo que una foto no muestra: tu anatomía, la calidad de tu piel, tu historial médico, tu medicación, tu cicatrización y qué es realista en tu caso.',
  'result.questions_title': 'Preguntas que vale la pena hacer',
  'result.q1': '¿Qué es realmente alcanzable con mi anatomía?',
  'result.q2': '¿Cuáles son los riesgos y qué pasa si no me gusta el resultado?',
  'result.q3': '¿Qué recuperación debería prever?',
  'result.q4': '¿Qué alternativas hay, incluida la de no hacer nada?',
  'result.variants': 'Comparar intensidades',
  'result.variants_cta': 'Generar las tres',
  'result.brief_cta': 'Crear resumen para la consulta',
  'result.brief_title': 'Resumen para la consulta',
  'result.brief_hint': 'Llévalo a tu cita. Recoge lo que tú pediste, no lo que te dijeron que necesitabas.',
  'result.again': 'Probar otro cambio',

  'gap.title': 'Sin resultado de IA, y no vamos a simular uno',
  'gap.body':
    'Esta instalación no ha podido producir una visualización real, así que arriba no se muestra nada. Nunca mostramos una imagen simulada o filtrada en lugar del resultado del modelo.',
  'gap.code': 'Motivo',
  'gap.fix':
    'Si esta instalación es tuya: define GEMINI_API_KEY en las variables de entorno de tu plataforma de hosting (solo en el servidor) y vuelve a desplegar.',

  'brief.for': 'Preparado para',
  'brief.request': 'Lo que pedí ver',
  'brief.area': 'Zona',
  'brief.intensity': 'Intensidad mostrada',
  'brief.style': 'Estilo preferido',
  'brief.note':
    'La visualización adjunta fue generada por IA a partir de mi propia foto. Entiendo que no es un resultado previsto y no pido reproducirla exactamente.',
  'brief.questions': 'Mis preguntas',

  'footer.notmedical': 'No es consejo médico. No es diagnóstico. No es un resultado garantizado.',
  'footer.privacy': 'Privacidad',
};

export default es;
