import type { Dictionary } from '../dictionary';

/** Français. */
const fr: Dictionary = {
  'brand.tagline': 'Visualisez votre objectif avant de décider.',
  'brand.principle': 'Vous demandez. L’IA visualise.',

  'common.back': 'Retour',
  'common.next': 'Continuer',
  'common.restart': 'Recommencer',
  'common.close': 'Fermer',
  'common.copy': 'Copier',
  'common.copied': 'Copié',
  'common.language': 'Langue',
  'common.working': 'En cours…',
  'common.step': 'Étape {n} sur {total}',

  'welcome.title': 'Voyez le résultat sur vous, avant toute décision.',
  'welcome.lede':
    'Importez votre photo, décrivez le changement qui vous intrigue, et voyez-le sur votre propre visage — pas sur un mannequin, pas sur quelqu’un d’autre.',
  'welcome.point1': 'Votre photo, votre visage, votre demande. Rien ne change sans que vous le demandiez.',
  'welcome.point2': 'De l’information, pas un diagnostic. Nous ne vous disons jamais ce dont vous « auriez besoin ».',
  'welcome.point3': 'Une visualisation n’est pas une promesse de résultat.',
  'welcome.cta': 'Commencer',
  'welcome.legal':
    'Outil de visualisation et d’information. Ce n’est ni un avis médical, ni un diagnostic, ni une prédiction du résultat d’un acte.',

  'upload.title': 'Ajoutez votre photo',
  'upload.lede': 'De face, lumière homogène, sans filtre. Une seule personne.',
  'upload.pick': 'Choisir une photo',
  'upload.replace': 'Choisir une autre photo',
  'upload.measuring': 'Mesure de la qualité de la photo…',
  'upload.consent':
    'Je confirme qu’il s’agit de ma photo et que j’ai plus de 18 ans. Ma photo est traitée pour créer ma visualisation et supprimée 24 h après la fin du traitement, sauf si j’enregistre le projet.',
  'upload.privacy': 'Confidentialité : aucune base de données faciale, aucune revente de données, consentements optionnels désactivés par défaut.',

  'check.title': 'Contrôle de la photo',
  'check.lede': 'Ce que nous avons pu mesurer sur cette photo, et ce que nous n’avons pas pu vérifier.',
  'check.notrun':
    'Les contrôles du visage n’ont pas été exécutés dans ce déploiement : ni le cadrage, ni l’angle, ni les filtres n’ont été vérifiés. Nous vous le disons plutôt que de supposer que tout va bien.',
  'check.continue': 'Utiliser cette photo',
  'check.retake': 'Utiliser une autre photo',
  'check.overall.pass': 'Cette photo convient.',
  'check.overall.warn': 'Cette photo peut convenir, mais un point risque d’affecter le résultat.',
  'check.overall.fail': 'Cette photo donnera probablement une visualisation médiocre.',
  'check.overall.not_evaluated': 'Cette photo n’a pas été contrôlée.',

  'status.pass': 'Bon',
  'status.warn': 'Améliorable',
  'status.fail': 'Problème',
  'status.not_evaluated': 'Non vérifié',

  'check.resolution': 'Résolution',
  'check.exposure': 'Luminosité',
  'check.sharpness': 'Netteté',
  'check.face_present': 'Visage visible',
  'check.single_face': 'Une seule personne',
  'check.face_angle': 'Angle de face',
  'check.face_unobstructed': 'Visage dégagé',
  'check.no_heavy_filter': 'Sans filtre',
  'check.eyes_open': 'Yeux ouverts',

  'intent.title': 'Que souhaitez-vous voir ?',
  'intent.lede': 'Décrivez-le avec vos mots. Nous ne modifions que ce que vous demandez.',
  'intent.placeholder': 'Par exemple : une lèvre supérieure légèrement plus pulpeuse',
  'intent.chips': 'Ou choisissez une zone',
  'intent.style': 'Style préféré',
  'intent.parse': 'Continuer',
  'intent.parsing': 'Lecture de votre demande…',
  'intent.ambiguous': 'Une question avant de continuer :',
  'intent.out_of_scope':
    'Nous ne pouvons pas visualiser cette demande. Mirra ne travaille que sur votre propre visage adulte et ne modifie jamais l’identité, l’âge ou l’origine.',
  'intent.unavailable':
    'La compréhension du texte libre n’est pas connectée ici, votre phrase n’a donc pas été analysée. Choisissez plutôt une zone ci-dessous : elles fonctionnent sans cela.',

  'intensity.title': 'Quelle intensité ?',
  'intensity.lede': 'Subtil par défaut. Vous pourrez comparer les trois ensuite.',
  'intensity.subtle': 'Subtil',
  'intensity.moderate': 'Modéré',
  'intensity.strong': 'Marqué',
  'intensity.note': 'Une intensité plus forte ne signifie pas un meilleur résultat, seulement un changement plus visible.',

  'style.natural': 'Naturel',
  'style.subtle': 'Discret',
  'style.soft': 'Doux',
  'style.defined': 'Défini',
  'style.glam': 'Glamour',
  'style.sculpted': 'Sculpté',
  'style.youthful': 'Frais',
  'style.minimal_intervention': 'Minimal',

  'region.lips': 'Lèvres',
  'region.nose': 'Nez',
  'region.jawline': 'Mâchoire',
  'region.chin': 'Menton',
  'region.cheeks': 'Pommettes',
  'region.under_eyes': 'Cernes',
  'region.eyelids': 'Paupières',
  'region.eyebrows': 'Sourcils',
  'region.forehead': 'Front',
  'region.nasolabial_folds': 'Sillons nasogéniens',
  'region.skin_texture': 'Grain de peau',
  'region.teeth': 'Dents',
  'region.neck': 'Cou',
  'region.hairstyle': 'Coupe de cheveux',
  'region.hair_color': 'Couleur des cheveux',
  'region.hairline': 'Ligne des cheveux',
  'region.facial_hair': 'Barbe',
  'region.makeup_look': 'Maquillage',
  'region.outfit': 'Tenue',
  'region.posture': 'Posture',
  'region.full_look': 'Look complet',

  'result.title': 'Votre visualisation',
  'result.generating': 'Création de votre visualisation…',
  'result.before': 'Avant',
  'result.after': 'Après',
  'result.drag': 'Faites glisser pour comparer',
  'result.disclaimer':
    'Ceci est une visualisation de votre demande. Ce n’est ni une prédiction ni une promesse, et aucun professionnel n’est tenu de la reproduire.',
  'result.assess_title': 'Ce qu’un spécialiste évaluerait réellement',
  'result.assess_body':
    'Un professionnel qualifié examine ce qu’une photo ne montre pas : votre anatomie, la qualité de votre peau, vos antécédents médicaux, vos traitements, votre cicatrisation et ce qui est réaliste pour vous.',
  'result.questions_title': 'Questions à poser',
  'result.q1': 'Qu’est-il réellement possible d’obtenir avec mon anatomie ?',
  'result.q2': 'Quels sont les risques, et que se passe-t-il si le résultat ne me convient pas ?',
  'result.q3': 'Quelle durée de récupération dois-je prévoir ?',
  'result.q4': 'Quelles sont les alternatives, y compris ne rien faire ?',
  'result.variants': 'Comparer les intensités',
  'result.variants_cta': 'Générer les trois',
  'result.brief_cta': 'Créer la fiche de consultation',
  'result.brief_title': 'Fiche de consultation',
  'result.brief_hint': 'À emporter en rendez-vous. Elle consigne ce que vous avez demandé, pas ce qu’on vous a dit qu’il vous fallait.',
  'result.again': 'Essayer un autre changement',

  'gap.title': 'Aucun résultat d’IA — et nous n’en simulerons pas',
  'gap.body':
    'Ce déploiement n’a pas pu produire de visualisation réelle : rien n’est affiché ci-dessus. Nous n’affichons jamais une image simulée ou filtrée à la place d’un résultat de modèle.',
  'gap.code': 'Motif',
  'gap.fix':
    'S’il s’agit de votre déploiement : définissez GEMINI_API_KEY dans les variables d’environnement de votre hébergeur (côté serveur uniquement) et redéployez.',

  'brief.for': 'Préparée pour',
  'brief.request': 'Ce que j’ai demandé à voir',
  'brief.area': 'Zone',
  'brief.intensity': 'Intensité affichée',
  'brief.style': 'Style préféré',
  'brief.note':
    'La visualisation jointe a été générée par IA à partir de ma propre photo. Je comprends qu’il ne s’agit pas d’un résultat prédit et je ne demande pas de le reproduire à l’identique.',
  'brief.questions': 'Mes questions',

  'footer.notmedical': 'Ni avis médical, ni diagnostic, ni résultat garanti.',
  'footer.privacy': 'Confidentialité',
};

export default fr;
