import type { Dictionary } from '../dictionary';

/** Português. */
const pt: Dictionary = {
  'brand.tagline': 'Veja o seu objetivo antes de decidir.',
  'brand.principle': 'Você pede. A IA visualiza.',

  'common.back': 'Voltar',
  'common.next': 'Continuar',
  'common.restart': 'Começar de novo',
  'common.close': 'Fechar',
  'common.copy': 'Copiar',
  'common.copied': 'Copiado',
  'common.language': 'Idioma',
  'common.working': 'A processar…',
  'common.step': 'Passo {n} de {total}',

  'welcome.title': 'Veja em si, antes de decidir seja o que for.',
  'welcome.lede':
    'Carregue a sua foto, descreva a mudança que lhe desperta curiosidade e veja-a no seu próprio rosto — não numa modelo, não noutra pessoa.',
  'welcome.point1': 'A sua foto, o seu rosto, o seu pedido. Nada muda sem que o peça.',
  'welcome.point2': 'Informação, não diagnóstico. Nunca lhe dizemos do que «precisa».',
  'welcome.point3': 'Uma visualização não é a promessa de um resultado.',
  'welcome.cta': 'Começar',
  'welcome.legal':
    'Ferramenta de visualização e informação. Não é aconselhamento médico, nem diagnóstico, nem previsão do resultado de qualquer tratamento.',

  'upload.title': 'Adicione a sua foto',
  'upload.lede': 'De frente, luz uniforme, sem filtros. Apenas uma pessoa.',
  'upload.pick': 'Escolher uma foto',
  'upload.replace': 'Escolher outra foto',
  'upload.measuring': 'A medir a qualidade da foto…',
  'upload.consent':
    'Confirmo que esta é a minha foto e que tenho mais de 18 anos. A foto é processada para criar a minha visualização e eliminada 24 horas após a conclusão, salvo se guardar o projeto.',
  'upload.privacy': 'Privacidade: sem base de dados facial, sem venda de dados, todos os consentimentos opcionais desativados por predefinição.',

  'check.title': 'Verificação da foto',
  'check.lede': 'O que conseguimos medir nesta foto e o que não conseguimos.',
  'check.notrun':
    'As verificações do rosto não foram executadas nesta instalação, por isso o enquadramento, o ângulo e os filtros não foram verificados. Dizemos-lhe, em vez de assumir que está tudo bem.',
  'check.continue': 'Usar esta foto',
  'check.retake': 'Usar outra foto',
  'check.overall.pass': 'Esta foto é adequada.',
  'check.overall.warn': 'Esta foto pode servir, mas algo poderá afetar o resultado.',
  'check.overall.fail': 'Esta foto deverá dar uma visualização fraca.',
  'check.overall.not_evaluated': 'Esta foto não foi verificada.',

  'status.pass': 'Bom',
  'status.warn': 'Pode melhorar',
  'status.fail': 'Problema',
  'status.not_evaluated': 'Não verificado',

  'check.resolution': 'Resolução',
  'check.exposure': 'Iluminação',
  'check.sharpness': 'Focagem',
  'check.face_present': 'Rosto visível',
  'check.single_face': 'Apenas uma pessoa',
  'check.face_angle': 'Ângulo frontal',
  'check.face_unobstructed': 'Rosto desobstruído',
  'check.no_heavy_filter': 'Sem filtro',
  'check.eyes_open': 'Olhos abertos',

  'intent.title': 'O que gostaria de ver?',
  'intent.lede': 'Descreva por palavras suas. Só alteramos o que pedir.',
  'intent.placeholder': 'Por exemplo: um lábio superior ligeiramente mais cheio',
  'intent.chips': 'Ou escolha uma zona',
  'intent.style': 'Estilo preferido',
  'intent.parse': 'Continuar',
  'intent.parsing': 'A ler o seu pedido…',
  'intent.ambiguous': 'Uma pergunta antes de continuar:',
  'intent.out_of_scope':
    'Não podemos visualizar este pedido. A Mirra trabalha apenas sobre o seu próprio rosto adulto e nunca altera identidade, idade ou origem.',
  'intent.unavailable':
    'A compreensão de texto livre não está ligada nesta instalação, por isso a sua frase não foi analisada. Escolha antes uma zona abaixo — essas funcionam sem isso.',

  'intensity.title': 'Que grau de mudança?',
  'intensity.lede': 'Subtil é a predefinição. Poderá comparar as três a seguir.',
  'intensity.subtle': 'Subtil',
  'intensity.moderate': 'Moderado',
  'intensity.strong': 'Acentuado',
  'intensity.note': 'Mais intensidade não significa melhor resultado, apenas uma mudança mais visível.',

  'style.natural': 'Natural',
  'style.subtle': 'Discreto',
  'style.soft': 'Suave',
  'style.defined': 'Definido',
  'style.glam': 'Glam',
  'style.sculpted': 'Esculpido',
  'style.youthful': 'Fresco',
  'style.minimal_intervention': 'Mínimo',

  'region.lips': 'Lábios',
  'region.nose': 'Nariz',
  'region.jawline': 'Linha da mandíbula',
  'region.chin': 'Queixo',
  'region.cheeks': 'Maçãs do rosto',
  'region.under_eyes': 'Zona sob os olhos',
  'region.eyelids': 'Pálpebras',
  'region.eyebrows': 'Sobrancelhas',
  'region.forehead': 'Testa',
  'region.nasolabial_folds': 'Sulcos nasogenianos',
  'region.skin_texture': 'Textura da pele',
  'region.teeth': 'Dentes',
  'region.neck': 'Pescoço',
  'region.hairstyle': 'Corte de cabelo',
  'region.hair_color': 'Cor do cabelo',
  'region.hairline': 'Linha do cabelo',
  'region.facial_hair': 'Barba',
  'region.makeup_look': 'Maquilhagem',
  'region.outfit': 'Vestuário',
  'region.posture': 'Postura',
  'region.full_look': 'Visual completo',

  'result.title': 'A sua visualização',
  'result.generating': 'A criar a sua visualização…',
  'result.before': 'Antes',
  'result.after': 'Depois',
  'result.drag': 'Arraste para comparar',
  'result.disclaimer':
    'Esta é uma visualização do seu pedido. Não é uma previsão nem uma promessa, e nenhum profissional está obrigado a reproduzi-la.',
  'result.assess_title': 'O que um especialista avaliaria de facto',
  'result.assess_body':
    'Um profissional qualificado analisa o que uma foto não mostra: a sua anatomia, a qualidade da pele, o historial clínico, a medicação, a cicatrização e o que é realista no seu caso.',
  'result.questions_title': 'Perguntas que vale a pena fazer',
  'result.q1': 'O que é realisticamente possível com a minha anatomia?',
  'result.q2': 'Quais são os riscos e o que acontece se não gostar do resultado?',
  'result.q3': 'Que recuperação devo prever?',
  'result.q4': 'Que alternativas existem, incluindo não fazer nada?',
  'result.variants': 'Comparar intensidades',
  'result.variants_cta': 'Gerar as três',
  'result.brief_cta': 'Criar resumo para a consulta',
  'result.brief_title': 'Resumo para a consulta',
  'result.brief_hint': 'Leve-o à consulta. Regista o que você pediu, não o que lhe disseram que precisava.',
  'result.again': 'Experimentar outra mudança',

  'gap.title': 'Sem resultado de IA — e não vamos simular um',
  'gap.body':
    'Esta instalação não conseguiu produzir uma visualização real, por isso nada é mostrado acima. Nunca mostramos uma imagem simulada ou filtrada em vez do resultado do modelo.',
  'gap.code': 'Motivo',
  'gap.fix':
    'Se a instalação é sua: defina GEMINI_API_KEY nas variáveis de ambiente da sua plataforma de alojamento (apenas no servidor) e volte a publicar.',

  'brief.for': 'Preparado para',
  'brief.request': 'O que pedi para ver',
  'brief.area': 'Zona',
  'brief.intensity': 'Intensidade apresentada',
  'brief.style': 'Estilo preferido',
  'brief.note':
    'A visualização anexa foi gerada por IA a partir de uma foto minha. Compreendo que não é um resultado previsto e não peço que seja reproduzida exatamente.',
  'brief.questions': 'As minhas perguntas',

  'footer.notmedical': 'Não é aconselhamento médico. Não é diagnóstico. Não é um resultado garantido.',
  'footer.privacy': 'Privacidade',
};

export default pt;
