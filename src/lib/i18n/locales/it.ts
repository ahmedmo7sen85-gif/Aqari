import type { Dictionary } from '../dictionary';

/** Italiano. */
const it: Dictionary = {
  'brand.tagline': 'Vedi il tuo obiettivo prima di decidere.',
  'brand.principle': 'Tu chiedi. L’IA visualizza.',

  'common.back': 'Indietro',
  'common.next': 'Continua',
  'common.restart': 'Ricomincia',
  'common.close': 'Chiudi',
  'common.copy': 'Copia',
  'common.copied': 'Copiato',
  'common.language': 'Lingua',
  'common.working': 'Elaborazione…',
  'common.step': 'Passo {n} di {total}',

  'welcome.title': 'Guardalo su di te, prima di decidere qualsiasi cosa.',
  'welcome.lede':
    'Carica la tua foto, descrivi il cambiamento che ti incuriosisce e vedilo sul tuo viso — non su una modella, non su qualcun altro.',
  'welcome.point1': 'La tua foto, il tuo viso, la tua richiesta. Non cambia nulla che tu non abbia chiesto.',
  'welcome.point2': 'Informazione, non diagnosi. Non ti diciamo mai di cosa «hai bisogno».',
  'welcome.point3': 'Una visualizzazione non è la promessa di un risultato.',
  'welcome.cta': 'Inizia',
  'welcome.legal':
    'Strumento di visualizzazione e informazione. Non è un parere medico, né una diagnosi, né una previsione dell’esito di un trattamento.',

  'upload.title': 'Aggiungi la tua foto',
  'upload.lede': 'Di fronte, luce uniforme, senza filtri. Una sola persona.',
  'upload.pick': 'Scegli una foto',
  'upload.replace': 'Scegli un’altra foto',
  'upload.measuring': 'Misurazione della qualità della foto…',
  'upload.consent':
    'Confermo che questa è una mia foto e di avere più di 18 anni. La foto viene elaborata per creare la mia visualizzazione ed eliminata 24 ore dopo il completamento, se non salvo il progetto.',
  'upload.privacy': 'Privacy: nessun database facciale, nessuna vendita di dati, tutti i consensi facoltativi disattivati per impostazione predefinita.',

  'check.title': 'Controllo della foto',
  'check.lede': 'Che cosa siamo riusciti a misurare in questa foto e che cosa no.',
  'check.notrun':
    'I controlli sul viso non sono stati eseguiti in questa installazione: inquadratura, angolo e filtri non sono stati verificati. Te lo diciamo invece di dare per scontato che vada bene.',
  'check.continue': 'Usa questa foto',
  'check.retake': 'Usa un’altra foto',
  'check.overall.pass': 'Questa foto è adatta.',
  'check.overall.warn': 'Questa foto può andare, ma qualcosa potrebbe influire sul risultato.',
  'check.overall.fail': 'Questa foto darà probabilmente una visualizzazione scadente.',
  'check.overall.not_evaluated': 'Questa foto non è stata controllata.',

  'status.pass': 'Buono',
  'status.warn': 'Migliorabile',
  'status.fail': 'Problema',
  'status.not_evaluated': 'Non verificato',

  'check.resolution': 'Risoluzione',
  'check.exposure': 'Illuminazione',
  'check.sharpness': 'Messa a fuoco',
  'check.face_present': 'Viso visibile',
  'check.single_face': 'Una sola persona',
  'check.face_angle': 'Angolazione frontale',
  'check.face_unobstructed': 'Viso libero',
  'check.no_heavy_filter': 'Senza filtri',
  'check.eyes_open': 'Occhi aperti',

  'intent.title': 'Che cosa vorresti vedere?',
  'intent.lede': 'Descrivilo con parole tue. Cambiamo solo ciò che chiedi.',
  'intent.placeholder': 'Per esempio: un labbro superiore un po’ più pieno',
  'intent.chips': 'Oppure scegli una zona',
  'intent.style': 'Stile preferito',
  'intent.parse': 'Continua',
  'intent.parsing': 'Lettura della tua richiesta…',
  'intent.ambiguous': 'Una domanda prima di continuare:',
  'intent.out_of_scope':
    'Non possiamo visualizzare questa richiesta. Mirra lavora solo sul tuo viso adulto e non modifica mai identità, età o origine.',
  'intent.unavailable':
    'La comprensione del testo libero non è collegata in questa installazione, quindi la tua frase non è stata analizzata. Scegli invece una zona qui sotto: funzionano anche senza.',

  'intensity.title': 'Quanto cambiamento?',
  'intensity.lede': 'Lieve è l’impostazione predefinita. Potrai confrontare tutte e tre dopo.',
  'intensity.subtle': 'Lieve',
  'intensity.moderate': 'Moderato',
  'intensity.strong': 'Marcato',
  'intensity.note': 'Un’intensità maggiore non significa un risultato migliore, solo un cambiamento più visibile.',

  'style.natural': 'Naturale',
  'style.subtle': 'Discreto',
  'style.soft': 'Morbido',
  'style.defined': 'Definito',
  'style.glam': 'Glam',
  'style.sculpted': 'Scolpito',
  'style.youthful': 'Fresco',
  'style.minimal_intervention': 'Minimo',

  'region.lips': 'Labbra',
  'region.nose': 'Naso',
  'region.jawline': 'Mandibola',
  'region.chin': 'Mento',
  'region.cheeks': 'Zigomi',
  'region.under_eyes': 'Zona sotto gli occhi',
  'region.eyelids': 'Palpebre',
  'region.eyebrows': 'Sopracciglia',
  'region.forehead': 'Fronte',
  'region.nasolabial_folds': 'Solchi nasogenieni',
  'region.skin_texture': 'Grana della pelle',
  'region.teeth': 'Denti',
  'region.neck': 'Collo',
  'region.hairstyle': 'Taglio di capelli',
  'region.hair_color': 'Colore dei capelli',
  'region.hairline': 'Attaccatura dei capelli',
  'region.facial_hair': 'Barba',
  'region.makeup_look': 'Trucco',
  'region.outfit': 'Outfit',
  'region.posture': 'Postura',
  'region.full_look': 'Look completo',

  'result.title': 'La tua visualizzazione',
  'result.generating': 'Creazione della tua visualizzazione…',
  'result.before': 'Prima',
  'result.after': 'Dopo',
  'result.drag': 'Trascina per confrontare',
  'result.disclaimer':
    'Questa è una visualizzazione della tua richiesta. Non è una previsione né una promessa, e nessun professionista è tenuto a riprodurla.',
  'result.assess_title': 'Che cosa valuterebbe davvero uno specialista',
  'result.assess_body':
    'Un professionista qualificato guarda ciò che una foto non mostra: la tua anatomia, la qualità della pelle, la storia clinica, i farmaci, la capacità di guarigione e ciò che è realistico per te.',
  'result.questions_title': 'Domande che vale la pena fare',
  'result.q1': 'Che cosa è realisticamente ottenibile con la mia anatomia?',
  'result.q2': 'Quali sono i rischi e che cosa succede se non sono soddisfatto del risultato?',
  'result.q3': 'Quanto tempo di recupero devo mettere in conto?',
  'result.q4': 'Quali sono le alternative, compreso non fare nulla?',
  'result.variants': 'Confronta le intensità',
  'result.variants_cta': 'Genera tutte e tre',
  'result.brief_cta': 'Crea la scheda per la consulenza',
  'result.brief_title': 'Scheda per la consulenza',
  'result.brief_hint': 'Portala all’appuntamento. Registra ciò che hai chiesto tu, non ciò che ti è stato detto che ti serve.',
  'result.again': 'Prova un altro cambiamento',

  'gap.title': 'Nessun risultato dell’IA, e non ne simuleremo uno',
  'gap.body':
    'Questa installazione non ha potuto produrre una visualizzazione reale, quindi sopra non viene mostrato nulla. Non mostriamo mai un’immagine simulata o filtrata al posto del risultato del modello.',
  'gap.code': 'Motivo',
  'gap.fix':
    'Se l’installazione è tua: imposta GEMINI_API_KEY nelle variabili d’ambiente della tua piattaforma di hosting (solo lato server) e ridistribuisci.',

  'brief.for': 'Preparata per',
  'brief.request': 'Che cosa ho chiesto di vedere',
  'brief.area': 'Zona',
  'brief.intensity': 'Intensità mostrata',
  'brief.style': 'Stile preferito',
  'brief.note':
    'La visualizzazione allegata è stata generata dall’IA a partire da una mia foto. So che non è un risultato previsto e non chiedo di riprodurla esattamente.',
  'brief.questions': 'Le mie domande',

  'footer.notmedical': 'Non è un parere medico. Non è una diagnosi. Non è un risultato garantito.',
  'footer.privacy': 'Privacy',
};

export default it;
