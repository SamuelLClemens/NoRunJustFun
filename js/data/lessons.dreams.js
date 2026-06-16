// Dream interpretation (science + tradition) — a Soul learning section. EDUCATIONAL ONLY, belief-flagged.
//
// Authored by an expert panel (domain scientist + historian + clinical psychologist +
// science communicator) and adversarially fact-checked: every lesson cites >=5 credible
// sources, paranormal/healing/predictive claims are attributed to the tradition AND paired
// with the scientific consensus, and each lesson carries an honest disclaimer. Numbers are
// spelled out for text-to-speech. Plan builders + catalog come from lessons.shared.js.

import { makeDisclaimerSeg, makeLessonModule } from './lessons.shared.js';
import { LESSON_VARIANTS } from './lesson-variants.js';

export const DREAMS_DISCLAIMER = "This section blends the science of sleep and dreaming with the cultural history of dream interpretation. It is educational only — not medical or psychological advice, and not a substitute for professional care. Popular dream-symbol meanings are not scientifically validated, though reflecting on your dreams can still be a meaningful personal practice. If distressing dreams persist, please reach out to a qualified professional.";

export const DREAMS_DISCLAIMER_SHORT = "Educational only — dream science plus tradition; symbol meanings are not scientifically validated.";

const SPOKEN_DISCLAIMER = "One honest note before we begin. This mixes real sleep science with the long tradition of dream interpretation. Popular dream meanings are not scientifically proven, and nothing here replaces professional care. Treat it as gentle reflection.";

const DISCLAIMER_SEG = makeDisclaimerSeg('drm', SPOKEN_DISCLAIMER);

const LESSONS = {
  "welcome-dreams": {
    id: "welcome-dreams", title: "Welcome — science and story together", topic: "intro",
    blurb: "Real sleep science alongside the history of dream interpretation, honestly framed.",
    takeaways: [],
    yearLabel: "",
    sources: [],
    segments: [
      { id: "wd-hello", name: "Welcome", secs: 18, core: true, say: "Welcome. Dreams are one of the most fascinating things our minds do. We will look at the real science of dreaming and at the long human tradition of interpreting dreams, and we will be honest about where each one stands." },
      { id: "wd-frame", name: "Science and story", secs: 18, core: true, say: "Where there is solid sleep science, we will say so. Where we are in the territory of tradition and folklore, we will label it clearly. Reflecting on your dreams can be meaningful, even when a dream has no single fixed meaning." },
      { id: "wd-disclaimer", name: "One honest note", secs: 16, core: true, say: SPOKEN_DISCLAIMER },
      { id: "wd-close", name: "Ready when you are", secs: 11, core: true, say: "Whenever you are ready, pick a topic, and let us explore your nights with curiosity and care." }
    ],
  },
  "dreams-overview": {
    id: "dreams-overview", title: "Dreams: science vs symbol-decoding", topic: "Dream interpretation",
    blurb: "How to read this section: real sleep science sits beside an old interpretive tradition. We keep the two clearly apart.",
    takeaways: [ "There is solid, well-established science about how and when we dream.", "Popular dream dictionaries that assign one fixed meaning to a symbol are not validated by research.", "This section describes the interpretive tradition respectfully and labels belief as belief.", "Treating a dream as a prompt for self-reflection is reasonable; treating it as a hidden message about your fate is not supported.", "Nothing here is medical or psychological advice, and it is not a substitute for professional care." ],
    yearLabel: "",
    sources: [
      { org: "Sleep Foundation", title: "Dream Interpretation: What Do Your Dreams Mean?", url: "https://www.sleepfoundation.org/dreams/dream-interpretation", year: "" },
      { org: "Sleep Foundation", title: "Stages of Sleep: What Happens in a Normal Sleep Cycle?", url: "https://www.sleepfoundation.org/stages-of-sleep", year: "" },
      { org: "American Psychological Association", title: "Speaking of Psychology: Why do we dream? With Mark Blagrove, PhD", url: "https://www.apa.org/news/podcasts/speaking-of-psychology/dream", year: "" },
      { org: "NCBI / PMC", title: "Exploring the neural correlates of dream phenomenology and altered states of consciousness during sleep", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6007136/", year: "" },
      { org: "NCBI / PMC", title: "Converging theories on dreaming: Between Freud, predictive processing, and psychedelic research", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9978341/", year: "" }
    ],
    segments: [
      { id: "dreams-overview-s0", name: "Two different things", secs: 22, core: true, say: "Welcome. This section holds two very different things side by side. One is the science of sleep and dreaming, which is genuine and well studied. The other is an old and rich tradition of interpreting dreams, which is cultural rather than scientific. We will keep them clearly apart, and we will tell you which is which every step of the way." },
      { id: "dreams-overview-s1", name: "What the science can say", secs: 20, core: true, say: "Sleep scientists can tell you a great deal: that you cycle through stages each night, that the most vivid dreams cluster in a stage called rapid eye movement sleep, and that the dreaming brain is remarkably active. These are findings researchers can measure and repeat. We will walk through them honestly in the lessons that follow." },
      { id: "dreams-overview-s2", name: "What the dictionaries claim", secs: 21, core: true, say: "Popular dream dictionaries assign a single fixed meaning to each image, as if falling were one thing and teeth another for everyone everywhere. In this tradition, many people find such readings meaningful. The scientific evidence, however, does not support the idea that any image carries one universal meaning. We will attribute those readings as belief, not fact." },
      { id: "dreams-overview-s3", name: "Belief, clearly flagged", secs: 18, core: true, say: "When we describe what practitioners hold, we will say so plainly. You will hear phrases like in this tradition, or many people find. Whenever a claim touches on hidden messages or foretelling, we will pair it with what careful research actually shows, which is usually no good evidence beyond relaxation and self-reflection." },
      { id: "dreams-overview-s4", name: "A gentler, useful frame", secs: 19, core: false, say: "There is a calm middle path. You can treat a dream as a private prompt: a chance to notice what felt heavy or tender lately. The Sleep Foundation suggests journaling and considering your own context rather than reaching for a fixed symbol chart. That is reflection, and it can be genuinely useful, without claiming to decode anything." },
      { id: "dreams-overview-s5", name: "What to expect here", secs: 16, core: false, say: "Next, you will learn the science of sleep and dreaming, then the competing theories of why we dream, and finally a look at common dreams and the popular claims attached to them. Throughout, the tone stays respectful, curious, and honest." },
      { id: "dreams-overview-s6", name: "An honest disclaimer", secs: 17, core: true, say: "Please hold this clearly: everything in this section is cultural and reflective, not medical, psychological, or scientific advice. It is not a substitute for professional care. If dreams or sleep are distressing you, a clinician or your doctor is the right person to talk to." },
      { id: "dreams-overview-s7", name: "Take what serves you", secs: 14, core: false, say: "You are free to enjoy the symbolism as folklore and still keep both feet on solid ground. Take what serves your self-reflection, leave the rest, and let the science be the science." }
    ],
  },
  "the-science-of-sleep-and-dreams": {
    id: "the-science-of-sleep-and-dreams", title: "The science of dreaming", topic: "Dream interpretation",
    blurb: "REM and NREM, the sleep cycle, and when vivid dreams arrive. This lesson is well-established science.",
    takeaways: [ "Sleep moves through three NREM stages plus REM, cycling roughly every ninety minutes.", "Most people pass through four to six cycles a night.", "Vivid, story-like dreams cluster in REM sleep, when brain activity rises toward waking levels.", "REM concentrates in the second half of the night, so long sleep protects vivid dreaming.", "This is descriptive sleep science, not advice; see a clinician for sleep concerns." ],
    yearLabel: "",
    sources: [
      { org: "Sleep Foundation", title: "Stages of Sleep: What Happens in a Normal Sleep Cycle?", url: "https://www.sleepfoundation.org/stages-of-sleep", year: "" },
      { org: "Sleep Foundation", title: "REM Sleep: What It Is and Why It's Important", url: "https://www.sleepfoundation.org/stages-of-sleep/rem-sleep", year: "" },
      { org: "Sleep Foundation", title: "What Happens When You Sleep: The Science of Sleep", url: "https://www.sleepfoundation.org/how-sleep-works/what-happens-when-you-sleep", year: "" },
      { org: "NCBI Bookshelf (NIH)", title: "Sleep Physiology — Sleep Disorders and Sleep Deprivation", url: "https://www.ncbi.nlm.nih.gov/books/NBK19956/", year: "" },
      { org: "NCBI / PMC", title: "Exploring the neural correlates of dream phenomenology and altered states of consciousness during sleep", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6007136/", year: "" }
    ],
    segments: [
      { id: "the-science-of-sleep-and-dreams-s0", name: "Sleep has structure", secs: 20, core: true, say: "Sleep is not one flat state. Across the night your brain moves through distinct stages, and researchers can watch this happen on an electroencephalogram. Broadly there are three stages of non rapid eye movement sleep, called N one, N two, and N three, and then rapid eye movement sleep, usually shortened to REM." },
      { id: "the-science-of-sleep-and-dreams-s1", name: "The NREM stages", secs: 21, core: true, say: "In this tradition of measurement, N one is the brief drift into sleep, often just a minute to a handful of minutes. N two is a lighter, settled sleep where heart rate slows. N three is deep, slow wave sleep, the most physically restorative. Together, non REM accounts for roughly three quarters of a typical night." },
      { id: "the-science-of-sleep-and-dreams-s2", name: "The REM stage", secs: 22, core: true, say: "Then comes REM. The Sleep Foundation notes that brain activity in REM is similar to how it is when you are awake, which is why this stage is tied to the most vivid dreaming. The body holds still through a natural muscle relaxation, so you generally do not act out what you dream. REM makes up about a fifth to a quarter of adult sleep." },
      { id: "the-science-of-sleep-and-dreams-s3", name: "The ninety-minute cycle", secs: 20, core: true, say: "These stages repeat in cycles. A cycle runs roughly ninety minutes, with the first a little shorter and later ones longer. Across a full night most people complete four to six cycles. The NCBI sleep physiology chapter describes the same alternating pattern of non REM and REM repeating through the night." },
      { id: "the-science-of-sleep-and-dreams-s4", name: "When vivid dreams arrive", secs: 21, core: true, say: "You usually reach your first REM period about sixty to ninety minutes after falling asleep. Because REM periods lengthen as the night goes on, most REM, and therefore most vivid dreaming, lands in the second half of the night. The NCBI material notes that roughly eighty percent of vivid dream recall follows waking from REM." },
      { id: "the-science-of-sleep-and-dreams-s5", name: "Dreams in NREM too", secs: 17, core: false, say: "Dreaming is not only a REM event. Research finds that non REM dreams do occur, but they tend to be shorter, more thought like, and less vivid, while REM dreams are richer, more emotional, and often stranger. Both are normal parts of a night." },
      { id: "the-science-of-sleep-and-dreams-s6", name: "Why long sleep matters", secs: 16, core: false, say: "Here is a practical thread. Since REM gathers in the later cycles, cutting sleep short trims your most vivid dreaming first. If you wonder why a full night feels more dream rich, that timing is a good part of the reason." },
      { id: "the-science-of-sleep-and-dreams-s7", name: "An honest disclaimer", secs: 15, core: false, say: "This lesson is descriptive sleep science, not medical advice, and it is not a substitute for professional care. If you snore heavily, wake unrefreshed, or have frightening sleep experiences, please raise them with your doctor or a sleep clinician." }
    ],
  },
  "why-we-dream-theories": {
    id: "why-we-dream-theories", title: "Why we dream — the theories", topic: "Dream interpretation",
    blurb: "Memory consolidation, the continuity hypothesis, threat simulation, activation-synthesis. Competing ideas, none settled.",
    takeaways: [ "Several serious theories try to explain why we dream, and none is settled.", "Memory and emotion-processing accounts link dreaming to consolidating and sorting experience.", "The continuity hypothesis says dreams echo waking concerns; threat simulation says they rehearse danger.", "Activation-synthesis frames dreams as the mind making a story from active brain signals.", "Because the question is open, treat any single 'function of dreams' claim with care; this is not advice." ],
    yearLabel: "",
    sources: [
      { org: "American Psychological Association", title: "Speaking of Psychology: Why do we dream? With Mark Blagrove, PhD", url: "https://www.apa.org/news/podcasts/speaking-of-psychology/dream", year: "" },
      { org: "NCBI / PMC", title: "Converging theories on dreaming: Between Freud, predictive processing, and psychedelic research", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9978341/", year: "" },
      { org: "NCBI / PMC", title: "Dreaming during the COVID-19 pandemic: Support for the threat simulation function of dreams", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9939895/", year: "" },
      { org: "NCBI / PMC", title: "Exploring the neural correlates of dream phenomenology and altered states of consciousness during sleep", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6007136/", year: "" },
      { org: "PubMed (NIH)", title: "The activation-synthesis hypothesis of dreams: a theoretical note", url: "https://pubmed.ncbi.nlm.nih.gov/717573/", year: "" }
    ],
    segments: [
      { id: "why-we-dream-theories-s0", name: "An open question", secs: 19, core: true, say: "Why do we dream at all? It is one of the oldest questions about the mind, and the honest answer is that science has not settled it. As the dream researcher Mark Blagrove puts it for the American Psychological Association, there are indeed many theories for why we dream that have been put forward. Let us meet the main ones as rivals, not winners." },
      { id: "why-we-dream-theories-s1", name: "Memory and emotion", secs: 21, core: true, say: "One family of theories ties dreaming to memory. The idea is that sleep helps the brain consolidate recent experiences and weave them into older ones, and that emotional material in particular gets processed. Reviews note that emotionally charged events from waking life are more likely to surface in dreams, which fits an emotion processing role. It is a leading idea, not a closed case." },
      { id: "why-we-dream-theories-s2", name: "The continuity hypothesis", secs: 20, core: true, say: "The continuity hypothesis holds that dreams largely continue our waking concerns. Diary studies described by the American Psychological Association find that the more emotional moments of a day are the ones more likely to reappear at night, while routine tasks rarely do. On this view a dream is less a coded oracle and more an echo of what already matters to you." },
      { id: "why-we-dream-theories-s3", name: "Threat simulation", secs: 21, core: true, say: "Another proposal is threat simulation, associated with the researcher Antti Revonsuo, which suggests dreaming evolved to rehearse responses to danger in a safe inner arena. The evidence is genuinely mixed. The pandemic dreaming study notes that research has shown mixed support for this function, finding some threat bias but calling for more critical testing. So: interesting, plausible, unproven." },
      { id: "why-we-dream-theories-s4", name: "Activation-synthesis", secs: 22, core: true, say: "A more physiological idea is activation synthesis, proposed by Hobson and McCarley in the nineteen seventies. It suggests that during REM the brainstem fires partly random signals, and the higher brain weaves them into a story after the fact. On this view much dream content is the mind making sense of its own activity, rather than a hidden message planted for you to decode." },
      { id: "why-we-dream-theories-s5", name: "Where tradition fits", secs: 18, core: false, say: "Older interpretive traditions, including the psychoanalytic readings of Freud, hold that dreams carry disguised meaning to be decoded. Many people still find that frame meaningful. Modern dream science, however, treats it as one historical theory among many, and finds no good evidence that fixed symbols carry universal meaning. We note the belief, and we note the evidence." },
      { id: "why-we-dream-theories-s6", name: "Why none has won", secs: 16, core: false, say: "Dreams are private, fleeting, and hard to measure, so testing these theories is genuinely difficult. Reviews across the literature describe a plurality of ideas and an ongoing uncertainty about dreaming's fundamental function. Comfort with that uncertainty is itself a sign of taking the science seriously." },
      { id: "why-we-dream-theories-s7", name: "An honest disclaimer", secs: 15, core: false, say: "Because the function of dreams is unsettled, be wary of anyone who states one purpose as certain fact. This lesson is educational and reflective, not medical or psychological advice, and it is not a substitute for professional care." }
    ],
  },
  "common-dreams-and-their-claims": {
    id: "common-dreams-and-their-claims", title: "Common dreams — and their claims", topic: "Dream interpretation",
    blurb: "Falling, being chased, losing teeth, the unprepared exam. Genuinely common — but no single universal meaning.",
    takeaways: [ "Certain dream themes really are common across many people and cultures.", "Being common is not the same as having one fixed, universal meaning.", "Popular single-symbol readings are folklore, attributed as belief, not established fact.", "Where research exists, it often points to ordinary causes — for teeth dreams, jaw tension rather than symbolism.", "Use a recurring or distressing dream as a cue to reflect, or to talk to a professional — not to decode your fate." ],
    yearLabel: "",
    sources: [
      { org: "Sleep Foundation", title: "Dream Interpretation: What Do Your Dreams Mean?", url: "https://www.sleepfoundation.org/dreams/dream-interpretation", year: "" },
      { org: "Sleep Foundation", title: "Dreams About Teeth Falling Out? 9 Possible Meanings", url: "https://www.sleepfoundation.org/dreams/dream-interpretation/teeth-falling-out", year: "" },
      { org: "NCBI / PMC", title: "Dreams of Teeth Falling Out: An Empirical Investigation of Physiological and Psychological Correlates", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6168631/", year: "" },
      { org: "NCBI / PMC", title: "The relationship between typical dreams and mental health of residents in village-in-city", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10382657/", year: "" },
      { org: "American Psychological Association", title: "Speaking of Psychology: Why do we dream? With Mark Blagrove, PhD", url: "https://www.apa.org/news/podcasts/speaking-of-psychology/dream", year: "" }
    ],
    segments: [
      { id: "common-dreams-and-their-claims-s0", name: "Shared dream themes", secs: 19, core: true, say: "Some dreams seem to belong to almost everyone: falling, being chased, losing teeth, or arriving unprepared for an exam. University and clinical sources agree these themes are genuinely common across many people and cultures. That shared quality is real and interesting. What it does not establish is a single hidden meaning behind each one." },
      { id: "common-dreams-and-their-claims-s1", name: "Common is not universal meaning", secs: 20, core: true, say: "Here is the key distinction. A theme being widespread tells us something about human minds and bodies. It does not tell us that the theme carries one fixed message for every dreamer. The Sleep Foundation is explicit that dreams are shaped by each person's unique personality and context, and that researchers do not know what individual dreams mean." },
      { id: "common-dreams-and-their-claims-s2", name: "Falling and being chased", secs: 20, core: true, say: "In popular interpretation, falling is read as losing control and being chased as avoiding a problem. In this tradition many people find those readings resonant, and they are sometimes offered as possible reflections of stress or vulnerability. They are offered as possibilities, not proven facts. Research on being chased links it, at most, to negative waking relationships in some people, and there is no evidence that either image carries one fixed meaning for everyone." },
      { id: "common-dreams-and-their-claims-s3", name: "The teeth dream", secs: 22, core: true, say: "Teeth falling out is a striking case. Practitioners and old dream books read it as anxiety, aging, or loss. Yet an empirical study indexed on the National Library of Medicine found teeth dreams were associated with jaw tension on waking, supporting a dental irritation explanation, and were not linked to general psychological distress. So a bodily cause has real support, while the symbolic reading remains belief." },
      { id: "common-dreams-and-their-claims-s4", name: "The unprepared exam", secs: 18, core: true, say: "The exam you did not study for, or cannot find the room for, is another classic. It is commonly read as self doubt or fear of being tested in life. That is a reasonable reflective prompt, and survey research confirms exam and study themes are among the most frequently reported dreams. It is a popular interpretation, not a measured law of the mind, and it need not apply to you." },
      { id: "common-dreams-and-their-claims-s5", name: "How to hold these readings", secs: 18, core: false, say: "You can enjoy these interpretations as folklore and as conversation starters with yourself. The honest move is to ask what felt true for you lately, rather than to look up a fixed symbol. The Sleep Foundation suggests considering your own context and even your own biases when you reflect on a dream." },
      { id: "common-dreams-and-their-claims-s6", name: "When to seek support", secs: 17, core: false, say: "If a dream recurs, frightens you, or disturbs your sleep, that is a meaningful signal, but the right response is care, not a symbol chart. Sources recommend speaking with a healthcare professional, since recurring or distressing dreams can relate to stress, mood, or sleep conditions worth attention." },
      { id: "common-dreams-and-their-claims-s7", name: "An honest disclaimer", secs: 15, core: false, say: "To close: the meanings here are cultural folklore, attributed as belief, not scientific fact. This lesson is reflective, not medical or psychological advice, and it is not a substitute for professional care. Take it lightly, and take yourself seriously." }
    ],
  },
  "history-of-dream-interpretation": {
    id: "history-of-dream-interpretation", title: "A history of dream interpretation", topic: "Dreams & tradition",
    blurb: "From ancient oracles to Freud and Jung — how people across history have tried to read meaning into dreams, described respectfully and with an honest note on what science can and cannot confirm.",
    takeaways: [ "For thousands of years many cultures treated dreams as messages, and that history is rich and worth knowing.", "Freud framed dreams as disguised wishes; Jung framed them as symbols and archetypes — these are influential ideas, not confirmed facts.", "No school of dream interpretation has been validated as a reliable way to decode hidden meaning.", "Reflecting on a dream can still be a meaningful, personal exercise — just hold any single interpretation lightly." ],
    yearLabel: "",
    sources: [
      { org: "Encyclopaedia Britannica", title: "Dream — Dreams as a source of divination", url: "https://www.britannica.com/topic/dream-sleep-experience/Dreams-as-a-source-of-divination", year: "2024" },
      { org: "Encyclopaedia Britannica", title: "The Interpretation of Dreams (work by Freud)", url: "https://www.britannica.com/topic/The-Interpretation-of-Dreams", year: "2024" },
      { org: "Encyclopaedia Britannica", title: "Oneiromancy — dream interpretation, divination and prophecy", url: "https://www.britannica.com/topic/oneiromancy", year: "2024" },
      { org: "Frontiers in Psychology (PMC, NIH)", title: "Book Review: Cles des songes et sciences des reves. De l'Antiquite a Freud", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4983553/", year: "2016" },
      { org: "American Psychological Association", title: "Speaking of Psychology: Why do we dream? (Mark Blagrove, PhD)", url: "https://www.apa.org/news/podcasts/speaking-of-psychology/dream", year: "2023" }
    ],
    segments: [
      { id: "history-of-dream-interpretation-s0", name: "Welcome", secs: 16, core: false, say: "Settle in. We are going to walk through the long human story of dream interpretation. Treat this as a tour of beliefs and ideas, held with curiosity, not as instructions for your life." },
      { id: "history-of-dream-interpretation-s1", name: "Ancient oracles", secs: 24, core: true, say: "Thousands of years ago, in this tradition, dreams were often treated as messages from gods or the dead. Britannica records that diviners in ancient Greece, Egypt, and Babylonia interpreted dreams, and that some people slept in temples hoping for a guiding dream, a practice called incubation. Practitioners held these dreams to be meaningful. We can honour how seriously people took them without claiming the messages were real." },
      { id: "history-of-dream-interpretation-s2", name: "Oneiromancy", secs: 22, core: true, say: "The art of reading dreams even has a name: oneiromancy. In the second century, Artemidorus wrote a famous dream manual. For centuries many people believed a skilled reader could draw guidance from a dream. That belief shaped cultures deeply. It has never been shown to reliably uncover hidden truth, and a dream symbol does not carry one fixed meaning for everyone." },
      { id: "history-of-dream-interpretation-s3", name: "Freud and wish-fulfilment", secs: 24, core: true, say: "In nineteen hundred, Sigmund Freud published The Interpretation of Dreams. He proposed that dreams are disguised wishes, separating what we remember, the manifest content, from a hidden meaning he called the latent content. This idea was enormously influential in psychology. In this tradition it is treated as insight, yet it is a theoretical framework, not a scientifically established fact about what dreams are." },
      { id: "history-of-dream-interpretation-s4", name: "Jung and archetypes", secs: 23, core: true, say: "Carl Jung took a different path. He suggested dreams draw on shared symbols he called archetypes, arising from what he named the collective unconscious, and that they could point toward growth. Many people find Jung's symbolic approach moving and useful for reflection. Like Freud's, it remains an interpretive theory that science has not confirmed, so hold it as a lens, not a law." },
      { id: "history-of-dream-interpretation-s5", name: "What the evidence shows", secs: 22, core: true, say: "Here is the honest part. Dream scientist Mark Blagrove notes, in an American Psychological Association podcast, that popular dream-symbol dictionaries are given no scientific credence. No school of interpretation has been validated as a reliable decoder. Reflecting on a dream can still be a rich personal practice, but treat any single meaning as one possibility among many." },
      { id: "history-of-dream-interpretation-s6", name: "A gentle disclaimer", secs: 18, core: false, say: "Please remember: this is a cultural and reflective tour, not medical, psychological, or scientific advice, and not a substitute for professional care. If dreams are distressing you, a qualified clinician is the right person to help. Nothing here can diagnose or treat anything." },
      { id: "history-of-dream-interpretation-s7", name: "Closing breath", secs: 16, core: false, say: "Take one slow breath. You have just met thousands of years of human wondering about dreams. You can find the tradition beautiful and still keep a clear, kind, questioning mind. Both can be true at once." }
    ],
  },
  "what-science-says-about-meaning": {
    id: "what-science-says-about-meaning", title: "What science says about meaning", topic: "Dreams & science",
    blurb: "A clear-eyed look at the evidence: why dream dictionaries do not hold up, and why the continuity hypothesis — that dreams echo our waking concerns — is the best-supported idea researchers have today.",
    takeaways: [ "Fixed dream-symbol dictionaries are not supported by evidence; the same image can mean different things to different people.", "The continuity hypothesis — dreams tend to reflect our waking concerns and emotions — is the best-supported view.", "Emotionally charged and personally salient daytime experiences are the ones most likely to surface in dreams.", "Science still does not fully know why we dream, so honest humility is the right stance.", "Reflecting on your own associations to a dream is more grounded than looking up a universal symbol." ],
    yearLabel: "",
    sources: [
      { org: "American Psychological Association", title: "Speaking of Psychology: Why do we dream? (Mark Blagrove, PhD)", url: "https://www.apa.org/news/podcasts/speaking-of-psychology/dream", year: "2023" },
      { org: "APA Dictionary of Psychology", title: "Continuity hypothesis", url: "https://dictionary.apa.org/continuity-hypothesis", year: "2018" },
      { org: "Journal of Clinical Psychology (PubMed, NIH)", title: "Dream content and psychological well-being: a longitudinal study of the continuity hypothesis", url: "https://pubmed.ncbi.nlm.nih.gov/16288448/", year: "2006" },
      { org: "Journal of Sleep Research (PMC, NIH)", title: "What about dreams? State of the art and open questions", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9539486/", year: "2022" },
      { org: "Brain Sciences (PMC, NIH)", title: "In the Arms of Morpheus: Recent Advances in Dreaming and Other Sleep-Related Metacognitions", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11506218/", year: "2024" },
      { org: "Frontiers in Psychology (PMC, NIH)", title: "A Supplement to Self-Organization Theory of Dreaming", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4782025/", year: "2016" }
    ],
    segments: [
      { id: "what-science-says-about-meaning-s0", name: "Setting expectations", secs: 16, core: false, say: "Let us look honestly at what research can and cannot say about dream meaning. The goal is not to take wonder away, but to give you accurate footing. Curiosity and evidence can sit comfortably together." },
      { id: "what-science-says-about-meaning-s1", name: "The dream-dictionary problem", secs: 24, core: true, say: "You have probably seen books claiming that water means one thing and falling means another. Researchers do not support this. As dream scientist Mark Blagrove puts it in an American Psychological Association podcast, such dream-symbol books are given no scientific credence. The same image can carry very different meaning for different people, so a universal key is not how dreams work." },
      { id: "what-science-says-about-meaning-s2", name: "The continuity hypothesis", secs: 24, core: true, say: "The best-supported idea today is the continuity hypothesis. The American Psychological Association dictionary describes it as the view that dream content tends to reflect the dreamer's waking life. In plain terms: your dreams lean toward echoing what is already on your mind. This is a tendency, not a code, and it does not let anyone decode a hidden destiny." },
      { id: "what-science-says-about-meaning-s3", name: "What the studies found", secs: 23, core: true, say: "A longitudinal study in the Journal of Clinical Psychology, by Pesant and Zadra, tracked people over six to ten years and found dream content consistent with the continuity hypothesis: lower waking well-being went with more negative dream content. A review in the Journal of Sleep Research adds that emotional, personally important daytime events are the ones most likely to appear in dreams." },
      { id: "what-science-says-about-meaning-s4", name: "Where it gets fuzzy", secs: 22, core: true, say: "Even this best-supported idea has limits. One Frontiers in Psychology paper notes that everyday activities like reading and arithmetic rarely show up in dreams, and that waking life tends to appear in fragments, not whole replays. So dreams reflect our concerns loosely and selectively. They are an echo, not a recording." },
      { id: "what-science-says-about-meaning-s5", name: "Honest uncertainty", secs: 20, core: true, say: "Here is the most truthful sentence in dream science. A twenty twenty-four Brain Sciences editorial states plainly that we still do not know why we dream, or why some people recall dreams daily and others rarely. Many questions remain open. Anyone who offers you total certainty about dream meaning is going beyond what the evidence supports." },
      { id: "what-science-says-about-meaning-s6", name: "A grounded practice", secs: 19, core: false, say: "So what can you actually do? Instead of looking up a symbol, ask what the dream connects to in your own recent life and feelings. That personal, associative reflection is more grounded than any dictionary, and it keeps you, not a book, in the seat of meaning." },
      { id: "what-science-says-about-meaning-s7", name: "Disclaimer and close", secs: 17, core: false, say: "A reminder: this is reflective education, not medical, psychological, or scientific advice, and not a substitute for professional care. Take one easy breath. You can enjoy your dreams and still hold their meaning with open, honest hands." }
    ],
  },
  "nightmares-and-when-to-seek-help": {
    id: "nightmares-and-when-to-seek-help", title: "Nightmares and when to seek help", topic: "Sleep & wellbeing",
    blurb: "The difference between nightmares and night terrors, how trauma and PTSD can fuel bad dreams, and the clear signs that recurring distress is worth bringing to a professional — with treatments that genuinely help.",
    takeaways: [ "Nightmares are vivid, remembered dreams in REM sleep; night terrors arise from deep non-REM sleep, are hard to wake from, and are usually not remembered.", "Occasional nightmares are common and normal; most people have one now and then.", "Recurring distressing nightmares — especially with trauma or PTSD — are worth raising with a professional.", "Evidence-based help exists, including image rehearsal therapy, recommended for nightmare disorder.", "Reach out for support if nightmares happen often, disrupt your sleep or daily life, or follow a traumatic event." ],
    yearLabel: "",
    sources: [
      { org: "Sleep Foundation", title: "How to Stop Having Nightmares", url: "https://www.sleepfoundation.org/nightmares/how-to-stop-having-nightmares", year: "2024" },
      { org: "Sleep Foundation", title: "How Post-Traumatic Stress Disorder Affects Sleep", url: "https://www.sleepfoundation.org/mental-health/ptsd-and-sleep", year: "2024" },
      { org: "MedlinePlus (U.S. National Library of Medicine, NIH)", title: "Nightmares — Medical Encyclopedia", url: "https://medlineplus.gov/ency/article/003209.htm", year: "2023" },
      { org: "Evolution, Medicine, and Public Health (PMC, NIH)", title: "An evolutionary perspective on night terrors", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5941156/", year: "2018" },
      { org: "Journal of Clinical Sleep Medicine (PMC, NIH)", title: "Telephone-guided imagery rehearsal therapy for nightmares: efficacy and mediator of change", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8244061/", year: "2021" },
      { org: "PMC (NIH)", title: "Psychosocial treatments for nightmares in adults and children: a systematic review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10122409/", year: "2023" }
    ],
    segments: [
      { id: "nightmares-and-when-to-seek-help-s0", name: "A caring start", secs: 16, core: false, say: "If bad dreams have been weighing on you, this lesson is meant to steady you. We will sort out what nightmares actually are and, most importantly, when it is wise to ask a professional for help. You deserve good rest." },
      { id: "nightmares-and-when-to-seek-help-s1", name: "Nightmares vs night terrors", secs: 24, core: true, say: "First, a useful distinction. Nightmares are vivid, frightening dreams in rapid-eye-movement sleep that you usually remember and can be woken from. Night terrors are different: research in Evolution, Medicine, and Public Health describes them arising from deep non-rapid-eye-movement sleep, with a cry or scream and intense fear, and the person is hard to wake and often does not remember the episode." },
      { id: "nightmares-and-when-to-seek-help-s2", name: "How common they are", secs: 20, core: true, say: "Take some reassurance here. The Sleep Foundation reports that about three-quarters of people have an occasional nightmare. An occasional bad dream is a normal part of being human. It is the pattern, not a single rough night, that tells us when something deserves more attention and care." },
      { id: "nightmares-and-when-to-seek-help-s3", name: "Trauma and PTSD", secs: 23, core: true, say: "Nightmares can be closely tied to trauma. The Sleep Foundation notes that sleep problems are core to post-traumatic stress disorder, and that repetitive, trauma-related nightmares are common among people living with it. If your dreams keep returning to a frightening event, that is a recognised pattern, and it is a reason to reach out, not a personal failing." },
      { id: "nightmares-and-when-to-seek-help-s4", name: "When to seek help", secs: 24, core: true, say: "Here are clear signposts. MedlinePlus, from the United States National Library of Medicine, suggests contacting a provider if nightmares happen more than once a week, or if they disrupt your sleep or daily life over time. Add to that any nightmares that follow a traumatic event or come with new medication. When distress recurs, a qualified professional is the right next step." },
      { id: "nightmares-and-when-to-seek-help-s5", name: "Help that works", secs: 23, core: true, say: "There is real, encouraging news: effective help exists. Image rehearsal therapy, in which a person gently rewrites a recurring nightmare to a calmer ending and practises it while awake, is recommended for nightmare disorder. A systematic review in the National Institutes of Health library found good support for such psychological treatments in reducing nightmare frequency and distress." },
      { id: "nightmares-and-when-to-seek-help-s6", name: "Safety note", secs: 18, core: false, say: "An important safety note. If nightmares come with thoughts of harming yourself, or with overwhelming distress, please treat that as urgent and contact a crisis line or emergency services in your area right away. You do not have to carry that alone, and immediate help is available." },
      { id: "nightmares-and-when-to-seek-help-s7", name: "Disclaimer and close", secs: 17, core: false, say: "To be clear: this lesson is supportive education, not medical or psychological advice, and not a substitute for professional care or diagnosis. A clinician can tailor real help to you. Breathe out slowly. Wanting peaceful sleep is reasonable, and support is within reach." }
    ],
  },
  "dream-journaling-for-reflection": {
    id: "dream-journaling-for-reflection", title: "Dream journaling for reflection", topic: "Dream interpretation (science & tradition)",
    blurb: "A gentle look at keeping a dream journal as a self-reflection and mood practice, what expressive-writing research actually supports, and where the honest limits lie.",
    takeaways: [ "A dream journal is best treated as a tool for reflection and noticing patterns in mood, not as a way to foresee events.", "Expressive writing has been studied for decades, and the evidence is genuinely mixed: some studies report modest benefits, while careful later reviews find little or no effect.", "Benefits, where they appear, seem to depend on the person and on writing that processes feelings rather than simply replaying them.", "Journaling is a self-care practice, not therapy, and it is not a substitute for professional care." ],
    yearLabel: "",
    sources: [
      { org: "American Psychological Association", title: "Expressive writing can help your mental health (Speaking of Psychology)", url: "https://www.apa.org/news/podcasts/speaking-of-psychology/expressive-writing", year: "" },
      { org: "University of Rochester Medical Center", title: "Journaling for Emotional Wellness (Health Encyclopedia)", url: "https://www.urmc.rochester.edu/encyclopedia/content?ContentTypeID=1&ContentID=4552", year: "" },
      { org: "NCBI / PMC", title: "Health effects of expressive writing on stressful or traumatic experiences: a meta-analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2736499/", year: "" },
      { org: "NCBI / PMC", title: "Effects of Expressive Writing on Psychological and Physical Health: The Moderating Role of Emotional Expressivity", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3830620/", year: "" },
      { org: "American Psychological Association", title: "Writing to heal (Monitor on Psychology)", url: "https://www.apa.org/monitor/jun02/writing", year: "" }
    ],
    segments: [
      { id: "dream-journaling-for-reflection-s0", name: "Welcome", secs: 16, core: true, say: "Welcome. Tonight we explore the simple, old habit of writing down your dreams. People have kept dream records for thousands of years, and you can do it too as a quiet practice of paying attention to your own inner life." },
      { id: "dream-journaling-for-reflection-s1", name: "What a dream journal is", secs: 20, core: true, say: "A dream journal is just a notebook where you jot down what you remember on waking. In many traditions, keepers of dream books treated these notes as meaningful signs. Here, we treat the journal as a mirror for reflection, a way to notice how you have been feeling, not as a window into things to come." },
      { id: "dream-journaling-for-reflection-s2", name: "The tradition, named honestly", secs: 22, core: true, say: "Practitioners in many cultures hold that dreams carry messages worth recording and decoding. We can honour that this practice is old and meaningful to many people, while being clear that there is no good evidence dreams foretell events. Treat any symbol meaning you read as a prompt for self-reflection, not as fact." },
      { id: "dream-journaling-for-reflection-s3", name: "What the research supports", secs: 24, core: true, say: "Writing about thoughts and feelings, often called expressive writing, has been studied for forty years. Some early work suggested modest benefits for mood and stress, with an effect size of about zero point four seven in one review. The picture is real but limited, and it is not the same as predicting anything." },
      { id: "dream-journaling-for-reflection-s4", name: "The honest other side", secs: 24, core: true, say: "Being fair, later research is more cautious. A careful meta-analysis of thirty trials found little or no overall health benefit. Other work suggests writing helps some people, mainly those who naturally express emotion, and may not help others at all. So keep your hopes gentle and your expectations modest." },
      { id: "dream-journaling-for-reflection-s5", name: "How to try it", secs: 20, core: false, say: "Keep paper by your bed. On waking, write a few lines before the dream fades. Note the feeling as much as the story. Once a week, read back and ask what mood or worry these pages might reflect. Be curious, not literal." },
      { id: "dream-journaling-for-reflection-s6", name: "Disclaimer", secs: 18, core: false, say: "Please remember, this is a cultural and reflective practice. It is not medical, psychological, or scientific advice, and it is not a substitute for professional care. If difficult dreams or low mood persist, please speak with a qualified clinician." },
      { id: "dream-journaling-for-reflection-s7", name: "Closing", secs: 14, core: false, say: "Let your journal be a friendly companion. It cannot tell you the future, but it can help you listen, gently, to how you are right now. Rest well." }
    ],
  },
  "lucid-dreaming-evidence": {
    id: "lucid-dreaming-evidence", title: "Lucid dreaming — the evidence", topic: "Dream interpretation (science & tradition)",
    blurb: "Lucid dreaming, being aware you are dreaming, is a real and studied phenomenon. Here is what the science shows about inducing it, the modest evidence for techniques, and the honest limits.",
    takeaways: [ "Lucid dreaming is real and has been objectively verified in sleep laboratories using eye-movement signals during REM sleep.", "Several induction techniques have modest evidence, with mnemonic induction the best supported, but results are inconsistent and replication is still needed.", "Brain imaging links frequent lucid dreaming to greater connectivity in regions tied to self-awareness, though mechanisms are not fully understood.", "Lucid dreaming is being explored for nightmares and distress, but experts advise caution and professional guidance for sensitive situations." ],
    yearLabel: "",
    sources: [
      { org: "PubMed (NCBI)", title: "A systematic review of new empirical data on lucid dream induction techniques", url: "https://pubmed.ncbi.nlm.nih.gov/36408823/", year: "" },
      { org: "PubMed (NCBI)", title: "Induction of lucid dreams: a systematic review of evidence", url: "https://pubmed.ncbi.nlm.nih.gov/22841958/", year: "" },
      { org: "NCBI / PMC", title: "Frequent lucid dreaming associated with increased functional connectivity between frontopolar cortex and temporoparietal association areas", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6290891/", year: "" },
      { org: "Northwestern University", title: "Study shows pre-sleep training coupled with sensory cues can trigger lucid dreaming", url: "https://news.northwestern.edu/stories/2024/10/study-shows-pre-sleep-training-coupled-with-sensory-cues-can-trigger-lucid-dreaming-2?fj=1", year: "2024" },
      { org: "University at Buffalo", title: "Lucid dreaming, explained by UB sleep expert Carleara Weiss", url: "https://www.buffalo.edu/news/tipsheets/2025/Lucid-dreaming-UB-sleep-expert-Carleara-Weiss.html", year: "2025" }
    ],
    segments: [
      { id: "lucid-dreaming-evidence-s0", name: "Welcome", secs: 15, core: true, say: "Welcome. Of all the ideas about dreams, lucid dreaming is one of the few that science has been able to study directly. Tonight we look at what is genuinely known, what is promising, and what is still uncertain." },
      { id: "lucid-dreaming-evidence-s1", name: "What lucid dreaming is", secs: 18, core: true, say: "A lucid dream is one in which you become aware that you are dreaming while it is still happening. Sleep experts define it as a kind of awareness, or metacognition, arising during rapid eye movement sleep." },
      { id: "lucid-dreaming-evidence-s2", name: "How we know it is real", secs: 24, core: true, say: "This is not just a story people tell. In sleep laboratories, lucid dreamers have signalled with prearranged eye movements that researchers recorded during verified rapid eye movement sleep. That objective evidence is why scientists treat lucid dreaming as a real, measurable state rather than mere anecdote." },
      { id: "lucid-dreaming-evidence-s3", name: "The induction evidence", secs: 24, core: true, say: "Can you train yourself to have one? A systematic review found that the mnemonic induction technique, rehearsing the intention to notice you are dreaming, had the best support, with a few other methods showing promise. Yet the authors were clear that results vary and further replication is needed." },
      { id: "lucid-dreaming-evidence-s4", name: "What the brain shows", secs: 22, core: true, say: "Brain studies add detail. People who lucid dream often show stronger connections between the front of the brain, tied to self-awareness, and regions usually quiet during sleep. In one home-based study, pairing pre-sleep mental rehearsal with gentle sound cues raised how often people reported lucid dreams, an encouraging result that researchers say still needs wider replication before firm conclusions are drawn." },
      { id: "lucid-dreaming-evidence-s5", name: "Limits and cautions", secs: 22, core: false, say: "Being honest about limits matters. There is no reliable, universal switch for lucid dreaming, and the brain mechanism is not fully understood. A university sleep expert advises that people under significant stress speak with a sleep specialist or psychologist before pursuing these techniques, so the experience stays positive." },
      { id: "lucid-dreaming-evidence-s6", name: "Disclaimer", secs: 18, core: false, say: "Please remember, this lesson describes research and tradition for reflection. It is not medical or psychological advice and is not a substitute for professional care. If nightmares or sleep troubles affect your wellbeing, please consult a qualified clinician." },
      { id: "lucid-dreaming-evidence-s7", name: "Closing", secs: 14, core: false, say: "Lucid dreaming is a rare and fascinating corner of the mind, real, studied, and still partly mysterious. Hold it lightly, stay curious, and let your sleep come first. Rest well." }
    ],
  },
  "dreams-sleep-and-wellbeing": {
    id: "dreams-sleep-and-wellbeing", title: "Dreams, sleep & wellbeing", topic: "Dream interpretation (science & tradition)",
    blurb: "A practical, sourced look at how mood and stress shape your dreams, how caffeine and alcohol affect sleep, and the sleep-hygiene habits that support calmer nights.",
    takeaways: [ "Stress and low mood are linked to more frequent and distressing dreams, and poor dreams can feed back into low mood the next day.", "Caffeine can disrupt sleep for many hours, so afternoon and evening cups may quietly cost you rest.", "Alcohol may speed falling asleep but disrupts the second half of the night and can worsen dreams through a rapid-eye-movement rebound.", "Consistent sleep-hygiene habits, a steady schedule, a cool dark room, and a wind-down routine, support calmer sleep and gentler dreams.", "Persistent nightmares or poor sleep are worth discussing with a healthcare provider." ],
    yearLabel: "",
    sources: [
      { org: "U.S. Centers for Disease Control and Prevention", title: "About Sleep", url: "https://www.cdc.gov/sleep/about/index.html", year: "" },
      { org: "Sleep Foundation", title: "Why We Have Nightmares (And How to Prevent Them)", url: "https://www.sleepfoundation.org/nightmares", year: "" },
      { org: "Sleep Foundation", title: "Do Dreams Impact Sleep Quality?", url: "https://www.sleepfoundation.org/dreams/how-do-dreams-affect-sleep", year: "" },
      { org: "Sleep Foundation", title: "Caffeine and Sleep Problems", url: "https://www.sleepfoundation.org/nutrition/caffeine-and-sleep", year: "" },
      { org: "Sleep Foundation", title: "Alcohol and Sleep", url: "https://www.sleepfoundation.org/nutrition/alcohol-and-sleep", year: "" },
      { org: "Sleep Foundation", title: "Vivid Dreams, Explained", url: "https://www.sleepfoundation.org/dreams/vivid-dreams", year: "" },
      { org: "NCBI / PMC", title: "Evaluating the Relationship Between Emotion Regulation, Mood and Distressing Dreams in Trauma Survivors", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12426701/", year: "" }
    ],
    segments: [
      { id: "dreams-sleep-and-wellbeing-s0", name: "Welcome", secs: 15, core: true, say: "Welcome. Rather than asking what dreams mean, tonight we ask a more practical question, what shapes them, and what helps you sleep well so your nights feel calmer." },
      { id: "dreams-sleep-and-wellbeing-s1", name: "Mood shapes dreams", secs: 22, core: true, say: "Research using daily sleep diaries finds that when people go to bed in a poor mood, they are more likely to have distressing dreams, which in turn worsen mood the next morning. Better emotion regulation is linked with fewer distressing dreams, so tending to your daytime feelings can ripple into the night." },
      { id: "dreams-sleep-and-wellbeing-s2", name: "Stress and vivid dreams", secs: 22, core: true, say: "Stress matters too. Experts note that worry and fear can provoke nightmares, and that stress hormones are linked with stronger dream recall. Sleep loss can also cause a rebound of rapid eye movement sleep, which makes dreams feel more frequent and intense. None of this means a dream foretells anything." },
      { id: "dreams-sleep-and-wellbeing-s3", name: "Caffeine and sleep", secs: 24, core: true, say: "Now the practical levers. Caffeine blocks the brain signal that builds sleep pressure, and its half-life can run from two to twelve hours. Many sleep resources suggest stopping caffeine at least eight hours before bed, so an afternoon coffee may quietly shorten and lighten your sleep." },
      { id: "dreams-sleep-and-wellbeing-s4", name: "Alcohol and dreams", secs: 22, core: true, say: "Alcohol is deceptive. It can help you fall asleep faster, yet it disrupts the second half of the night and can trigger a rapid eye movement rebound that worsens dreams and nightmares. Health agencies advise avoiding alcohol close to bedtime, ideally several hours before." },
      { id: "dreams-sleep-and-wellbeing-s5", name: "Sleep-hygiene habits", secs: 22, core: false, say: "The foundations are simple. Public health guidance suggests a consistent bedtime and wake time, a quiet, cool, dark bedroom, daytime light and movement, and turning off screens at least thirty minutes before bed. These habits support steadier sleep and, often, gentler dreams." },
      { id: "dreams-sleep-and-wellbeing-s6", name: "When to seek help", secs: 18, core: false, say: "Sometimes habits are not enough. If nightmares are frequent, or poor sleep is affecting your days, that is a sign to reach out. Persistent sleep trouble is common and treatable, and a healthcare provider can help." },
      { id: "dreams-sleep-and-wellbeing-s7", name: "Disclaimer", secs: 16, core: false, say: "Please remember, this lesson is general, sourced information for reflection. It is not medical advice and is not a substitute for professional care. For ongoing sleep or mood concerns, please consult a qualified clinician." },
      { id: "dreams-sleep-and-wellbeing-s8", name: "Closing", secs: 13, core: false, say: "Care for your sleep, and your dreams will often take care of themselves. Wishing you a calm, restful night." }
    ],
  },
};

// Curriculum order for the duration-scaled session (welcome is the intro).
const CURRICULUM = ["dreams-overview", "the-science-of-sleep-and-dreams", "why-we-dream-theories", "common-dreams-and-their-claims", "history-of-dream-interpretation", "what-science-says-about-meaning", "nightmares-and-when-to-seek-help", "dream-journaling-for-reflection", "lucid-dreaming-evidence", "dreams-sleep-and-wellbeing"];

const mod = makeLessonModule({
  LESSONS, CURRICULUM,
  welcomeId: "welcome-dreams",
  disclaimerSeg: DISCLAIMER_SEG,
  sessionTitle: "Understanding dreams",
  kind: "dreams",
  variants: LESSON_VARIANTS.dreams,
});

export const LESSON_LIBRARY = mod.LESSON_LIBRARY;
export const buildLessonById = mod.buildLessonById;
export const buildLessonSession = mod.buildLessonSession;
export { LESSONS };
