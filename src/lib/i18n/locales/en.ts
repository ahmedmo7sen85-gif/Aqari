/** English — the reference dictionary. Every other locale must match its keys. */
const en = {
  'brand.tagline': 'See your beauty goals before you decide.',
  'brand.principle': 'You ask. AI visualizes.',

  'common.back': 'Back',
  'common.next': 'Continue',
  'common.restart': 'Start over',
  'common.close': 'Close',
  'common.copy': 'Copy',
  'common.copied': 'Copied',
  'common.language': 'Language',
  'common.working': 'Working…',
  'common.step': 'Step {n} of {total}',

  'welcome.title': 'See it on you, before you decide anything.',
  'welcome.lede':
    'Upload your photo, describe the change you are curious about, and see it visualized on your own face — not on a model, not on anyone else.',
  'welcome.point1': 'Your photo, your face, your request. Nothing is changed unless you ask for it.',
  'welcome.point2': 'Education, not diagnosis. We never tell you what you need.',
  'welcome.point3': 'A visualization is not a promise of a result.',
  'welcome.cta': 'Start',
  'welcome.legal':
    'This is a visualization and education tool. It is not medical advice, not a diagnosis, and not a prediction of any treatment outcome.',

  'upload.title': 'Add your photo',
  'upload.lede': 'Front-facing, even light, no filter. One person in frame.',
  'upload.pick': 'Choose a photo',
  'upload.replace': 'Choose a different photo',
  'upload.measuring': 'Measuring photo quality…',
  'upload.consent':
    'I confirm this is a photo of me, and I am over 18. My photo is processed to create my visualization and deleted 24 hours after the job completes unless I save the project.',
  'upload.privacy': 'Privacy: no facial database, no data selling, all optional consents off by default.',

  'check.title': 'Photo check',
  'check.lede': 'What we could measure on this photo, and what we could not.',
  'check.notrun':
    'The face-level checks did not run in this deployment, so nothing was verified about framing, angle or filtering. We are telling you rather than assuming it is fine.',
  'check.continue': 'Use this photo',
  'check.retake': 'Use another photo',
  'check.overall.pass': 'This photo is suitable.',
  'check.overall.warn': 'This photo may work, but something could affect the result.',
  'check.overall.fail': 'This photo is likely to produce a poor visualization.',
  'check.overall.not_evaluated': 'This photo has not been checked.',

  'status.pass': 'Good',
  'status.warn': 'Could be better',
  'status.fail': 'Problem',
  'status.not_evaluated': 'Not checked',

  'check.resolution': 'Resolution',
  'check.exposure': 'Lighting',
  'check.sharpness': 'Focus',
  'check.face_present': 'Face visible',
  'check.single_face': 'One person only',
  'check.face_angle': 'Front-facing angle',
  'check.face_unobstructed': 'Face unobstructed',
  'check.no_heavy_filter': 'No filter applied',
  'check.eyes_open': 'Eyes open',

  'intent.title': 'What would you like to see?',
  'intent.lede': 'Describe it in your own words. We change only what you ask for.',
  'intent.placeholder': 'For example: a slightly fuller upper lip',
  'intent.chips': 'Or pick an area',
  'intent.style': 'Style preference',
  'intent.parse': 'Continue',
  'intent.parsing': 'Reading your request…',
  'intent.ambiguous': 'One question before we continue:',
  'intent.out_of_scope':
    'We cannot visualize this request. Mirra only works on your own adult face, and never changes identity, age or ethnicity.',
  'intent.unavailable':
    'Free-text understanding is not connected in this deployment, so your sentence was not parsed. Pick an area below instead — those work without it.',

  'intensity.title': 'How much change?',
  'intensity.lede': 'Subtle is the default. You can compare all three afterwards.',
  'intensity.subtle': 'Subtle',
  'intensity.moderate': 'Moderate',
  'intensity.strong': 'Strong',
  'intensity.note': 'Stronger settings do not mean a better outcome — they mean a bigger visible change.',

  'style.natural': 'Natural',
  'style.subtle': 'Subtle',
  'style.soft': 'Soft',
  'style.defined': 'Defined',
  'style.glam': 'Glam',
  'style.sculpted': 'Sculpted',
  'style.youthful': 'Youthful',
  'style.minimal_intervention': 'Minimal',

  'region.lips': 'Lips',
  'region.nose': 'Nose',
  'region.jawline': 'Jawline',
  'region.chin': 'Chin',
  'region.cheeks': 'Cheeks',
  'region.under_eyes': 'Under-eye area',
  'region.eyelids': 'Eyelids',
  'region.eyebrows': 'Eyebrows',
  'region.forehead': 'Forehead',
  'region.nasolabial_folds': 'Smile lines',
  'region.skin_texture': 'Skin texture',
  'region.teeth': 'Teeth',
  'region.neck': 'Neck',
  'region.hairstyle': 'Hairstyle',
  'region.hair_color': 'Hair colour',
  'region.hairline': 'Hairline',
  'region.facial_hair': 'Beard',
  'region.makeup_look': 'Makeup',
  'region.outfit': 'Outfit',
  'region.posture': 'Posture',
  'region.full_look': 'Full look',

  'result.title': 'Your visualization',
  'result.generating': 'Creating your visualization…',
  'result.before': 'Before',
  'result.after': 'After',
  'result.drag': 'Drag to compare',
  'result.disclaimer':
    'This is one visualization of your request. It is not a prediction, not a promise, and no professional is bound to reproduce it.',
  'result.assess_title': 'What a specialist would actually assess',
  'result.assess_body':
    'A qualified professional looks at things a photo cannot show: your anatomy, skin quality, medical history, medication, healing tendency and what is realistic for you.',
  'result.questions_title': 'Questions worth asking',
  'result.q1': 'What is realistically achievable for my anatomy?',
  'result.q2': 'What are the risks, and what happens if I am unhappy with the result?',
  'result.q3': 'What kind of downtime should I plan for?',
  'result.q4': 'What are the alternatives, including doing nothing?',
  'result.variants': 'Compare intensities',
  'result.variants_cta': 'Generate all three',
  'result.brief_cta': 'Create consultation brief',
  'result.brief_title': 'Consultation brief',
  'result.brief_hint': 'Take this to your appointment. It records what you asked for, not what you were told you need.',
  'result.again': 'Try another change',

  'gap.title': 'No AI result — and we will not fake one',
  'gap.body':
    'This deployment could not produce a real visualization, so nothing is shown above. We do not display a simulated or filtered image in place of a model result.',
  'gap.code': 'Reason',
  'gap.fix':
    'If this is your deployment: set GEMINI_API_KEY in your hosting platform environment variables (server-side only) and redeploy.',

  'brief.for': 'Prepared for',
  'brief.request': 'What I asked to see',
  'brief.area': 'Area',
  'brief.intensity': 'Intensity shown',
  'brief.style': 'Style preference',
  'brief.note':
    'The attached visualization was generated by AI from my own photo. I understand it is not a predicted outcome and I am not asking you to reproduce it exactly.',
  'brief.questions': 'My questions',

  'footer.notmedical': 'Not medical advice. Not a diagnosis. Not a guaranteed outcome.',
  'footer.privacy': 'Privacy',
} as const;

export default en;
