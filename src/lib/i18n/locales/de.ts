import type { Dictionary } from '../dictionary';

/** Deutsch. */
const de: Dictionary = {
  'brand.tagline': 'Sieh dein Ziel, bevor du dich entscheidest.',
  'brand.principle': 'Du fragst. Die KI visualisiert.',

  'common.back': 'Zurück',
  'common.next': 'Weiter',
  'common.restart': 'Neu beginnen',
  'common.close': 'Schließen',
  'common.copy': 'Kopieren',
  'common.copied': 'Kopiert',
  'common.language': 'Sprache',
  'common.working': 'Wird bearbeitet…',
  'common.step': 'Schritt {n} von {total}',

  'welcome.title': 'Sieh es an dir – bevor du irgendetwas entscheidest.',
  'welcome.lede':
    'Lade dein Foto hoch, beschreibe die Veränderung, die dich interessiert, und sieh sie auf deinem eigenen Gesicht – nicht an einem Model, nicht an jemand anderem.',
  'welcome.point1': 'Dein Foto, dein Gesicht, deine Anfrage. Nichts wird verändert, worum du nicht gebeten hast.',
  'welcome.point2': 'Aufklärung statt Diagnose. Wir sagen dir nie, was du „brauchst“.',
  'welcome.point3': 'Eine Visualisierung ist kein Ergebnisversprechen.',
  'welcome.cta': 'Starten',
  'welcome.legal':
    'Dies ist ein Visualisierungs- und Informationswerkzeug. Es ist keine medizinische Beratung, keine Diagnose und keine Vorhersage eines Behandlungsergebnisses.',

  'upload.title': 'Foto hinzufügen',
  'upload.lede': 'Frontal, gleichmäßiges Licht, kein Filter. Nur eine Person im Bild.',
  'upload.pick': 'Foto auswählen',
  'upload.replace': 'Anderes Foto auswählen',
  'upload.measuring': 'Fotoqualität wird gemessen…',
  'upload.consent':
    'Ich bestätige, dass dies ein Foto von mir ist und ich über 18 bin. Mein Foto wird zur Erstellung meiner Visualisierung verarbeitet und 24 Stunden nach Abschluss gelöscht, sofern ich das Projekt nicht speichere.',
  'upload.privacy': 'Datenschutz: keine Gesichtsdatenbank, kein Datenverkauf, alle optionalen Einwilligungen standardmäßig aus.',

  'check.title': 'Fotoprüfung',
  'check.lede': 'Was wir an diesem Foto messen konnten – und was nicht.',
  'check.notrun':
    'Die gesichtsbezogenen Prüfungen liefen in dieser Installation nicht. Bildausschnitt, Winkel und Filter wurden also nicht geprüft. Wir sagen es dir, statt anzunehmen, dass alles passt.',
  'check.continue': 'Dieses Foto verwenden',
  'check.retake': 'Anderes Foto verwenden',
  'check.overall.pass': 'Dieses Foto ist geeignet.',
  'check.overall.warn': 'Dieses Foto kann funktionieren, etwas könnte das Ergebnis aber beeinträchtigen.',
  'check.overall.fail': 'Dieses Foto führt wahrscheinlich zu einer schlechten Visualisierung.',
  'check.overall.not_evaluated': 'Dieses Foto wurde nicht geprüft.',

  'status.pass': 'Gut',
  'status.warn': 'Verbesserungsfähig',
  'status.fail': 'Problem',
  'status.not_evaluated': 'Nicht geprüft',

  'check.resolution': 'Auflösung',
  'check.exposure': 'Beleuchtung',
  'check.sharpness': 'Schärfe',
  'check.face_present': 'Gesicht sichtbar',
  'check.single_face': 'Nur eine Person',
  'check.face_angle': 'Frontale Aufnahme',
  'check.face_unobstructed': 'Gesicht frei',
  'check.no_heavy_filter': 'Kein Filter',
  'check.eyes_open': 'Augen offen',

  'intent.title': 'Was möchtest du sehen?',
  'intent.lede': 'Beschreibe es in deinen Worten. Wir ändern nur, worum du bittest.',
  'intent.placeholder': 'Zum Beispiel: eine etwas vollere Oberlippe',
  'intent.chips': 'Oder wähle einen Bereich',
  'intent.style': 'Stilrichtung',
  'intent.parse': 'Weiter',
  'intent.parsing': 'Deine Anfrage wird gelesen…',
  'intent.ambiguous': 'Eine Frage, bevor es weitergeht:',
  'intent.out_of_scope':
    'Diese Anfrage können wir nicht visualisieren. Mirra arbeitet nur an deinem eigenen erwachsenen Gesicht und verändert niemals Identität, Alter oder Herkunft.',
  'intent.unavailable':
    'Das Verstehen von Freitext ist in dieser Installation nicht angebunden, dein Satz wurde also nicht ausgewertet. Wähle stattdessen unten einen Bereich – das funktioniert auch ohne.',

  'intensity.title': 'Wie stark soll die Veränderung sein?',
  'intensity.lede': 'Dezent ist die Voreinstellung. Danach kannst du alle drei vergleichen.',
  'intensity.subtle': 'Dezent',
  'intensity.moderate': 'Mittel',
  'intensity.strong': 'Deutlich',
  'intensity.note': 'Stärker heißt nicht besser – nur sichtbarer.',

  'style.natural': 'Natürlich',
  'style.subtle': 'Zurückhaltend',
  'style.soft': 'Weich',
  'style.defined': 'Definiert',
  'style.glam': 'Glamourös',
  'style.sculpted': 'Konturiert',
  'style.youthful': 'Frischer',
  'style.minimal_intervention': 'Minimal',

  'region.lips': 'Lippen',
  'region.nose': 'Nase',
  'region.jawline': 'Kieferlinie',
  'region.chin': 'Kinn',
  'region.cheeks': 'Wangen',
  'region.under_eyes': 'Augenpartie',
  'region.eyelids': 'Augenlider',
  'region.eyebrows': 'Augenbrauen',
  'region.forehead': 'Stirn',
  'region.nasolabial_folds': 'Nasolabialfalten',
  'region.skin_texture': 'Hautbild',
  'region.teeth': 'Zähne',
  'region.neck': 'Hals',
  'region.hairstyle': 'Frisur',
  'region.hair_color': 'Haarfarbe',
  'region.hairline': 'Haaransatz',
  'region.facial_hair': 'Bart',
  'region.makeup_look': 'Make-up',
  'region.outfit': 'Outfit',
  'region.posture': 'Haltung',
  'region.full_look': 'Gesamtlook',

  'result.title': 'Deine Visualisierung',
  'result.generating': 'Deine Visualisierung wird erstellt…',
  'result.before': 'Vorher',
  'result.after': 'Nachher',
  'result.drag': 'Zum Vergleichen ziehen',
  'result.disclaimer':
    'Das ist eine Visualisierung deiner Anfrage. Sie ist keine Vorhersage und kein Versprechen, und keine Fachperson ist verpflichtet, sie zu reproduzieren.',
  'result.assess_title': 'Was eine Fachperson tatsächlich beurteilt',
  'result.assess_body':
    'Eine qualifizierte Fachperson betrachtet, was ein Foto nicht zeigt: deine Anatomie, deine Hautqualität, deine Krankengeschichte, Medikamente, Heilungsverhalten und was für dich realistisch ist.',
  'result.questions_title': 'Fragen, die sich lohnen',
  'result.q1': 'Was ist bei meiner Anatomie realistisch erreichbar?',
  'result.q2': 'Welche Risiken gibt es, und was passiert, wenn ich mit dem Ergebnis unzufrieden bin?',
  'result.q3': 'Mit welcher Ausfallzeit sollte ich planen?',
  'result.q4': 'Welche Alternativen gibt es – auch, nichts zu tun?',
  'result.variants': 'Intensitäten vergleichen',
  'result.variants_cta': 'Alle drei erzeugen',
  'result.brief_cta': 'Beratungsunterlage erstellen',
  'result.brief_title': 'Beratungsunterlage',
  'result.brief_hint': 'Nimm sie zum Termin mit. Sie hält fest, worum du gebeten hast – nicht, was dir gesagt wurde.',
  'result.again': 'Andere Veränderung ausprobieren',

  'gap.title': 'Kein KI-Ergebnis – und wir täuschen keines vor',
  'gap.body':
    'Diese Installation konnte keine echte Visualisierung erzeugen, deshalb wird oben nichts angezeigt. Wir zeigen niemals ein simuliertes oder gefiltertes Bild anstelle eines Modellergebnisses.',
  'gap.code': 'Grund',
  'gap.fix':
    'Falls das deine Installation ist: Setze GEMINI_API_KEY in den Umgebungsvariablen deiner Hosting-Plattform (nur serverseitig) und deploye neu.',

  'brief.for': 'Erstellt für',
  'brief.request': 'Worum ich gebeten habe',
  'brief.area': 'Bereich',
  'brief.intensity': 'Gezeigte Intensität',
  'brief.style': 'Stilrichtung',
  'brief.note':
    'Die beigefügte Visualisierung wurde von einer KI aus meinem eigenen Foto erzeugt. Mir ist bewusst, dass sie kein vorhergesagtes Ergebnis ist, und ich verlange keine exakte Umsetzung.',
  'brief.questions': 'Meine Fragen',

  'footer.notmedical': 'Keine medizinische Beratung. Keine Diagnose. Kein garantiertes Ergebnis.',
  'footer.privacy': 'Datenschutz',
};

export default de;
