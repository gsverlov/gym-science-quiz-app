/**
 * Gym Science Quiz — Question Data
 *
 * Each entry has:
 *   topic        {string}   Category label shown in the UI
 *   question     {string}   The question stem
 *   options      {string[]} Exactly 4 answer options
 *   correctIndex {number}   0-based index of the correct option
 *   explanation  {string}   1–2 sentence explanation shown after answering
 */
const questions = [
  // ── Muscle Physiology ──────────────────────────────────────────────────────
  {
    topic: "Muscle Physiology",
    question: "Which type of muscle fiber is most suited for explosive, high-intensity activities like sprinting or heavy lifting?",
    options: [
      "Type I (slow-twitch) fibers",
      "Type IIa (fast-twitch oxidative) fibers",
      "Type IIx (fast-twitch glycolytic) fibers",
      "Cardiac muscle fibers"
    ],
    correctIndex: 2,
    explanation: "Type IIx fibers contract rapidly and generate high force but fatigue quickly, making them ideal for short, explosive efforts. They rely primarily on anaerobic glycolysis rather than oxidative metabolism."
  },
  {
    topic: "Muscle Physiology",
    question: "What is the primary mechanism by which muscles grow larger (hypertrophy)?",
    options: [
      "An increase in the number of muscle fibers (hyperplasia)",
      "An increase in the cross-sectional area of individual muscle fibers",
      "An increase in intramuscular fat deposits",
      "Lengthening of the muscle belly"
    ],
    correctIndex: 1,
    explanation: "Skeletal muscle hypertrophy is predominantly driven by an increase in the size of existing muscle fibers — specifically via myofibrillar protein accretion stimulated by mechanical tension and subsequent satellite-cell activity."
  },
  {
    topic: "Muscle Physiology",
    question: "Which protein complex is directly responsible for muscle contraction by sliding along actin filaments?",
    options: [
      "Collagen",
      "Titin",
      "Myosin",
      "Troponin"
    ],
    correctIndex: 2,
    explanation: "Myosin heads bind to actin and, powered by ATP hydrolysis, generate the power strokes that slide the filaments past each other and shorten the sarcomere. Troponin and tropomyosin regulate when this interaction can occur."
  },

  // ── Nutrition & Macronutrients ─────────────────────────────────────────────
  {
    topic: "Nutrition & Macronutrients",
    question: "Approximately how many grams of protein per kilogram of bodyweight does current evidence recommend for maximising muscle protein synthesis in resistance-trained individuals?",
    options: [
      "0.5–0.8 g/kg",
      "1.6–2.2 g/kg",
      "3.0–3.5 g/kg",
      "4.0–5.0 g/kg"
    ],
    correctIndex: 1,
    explanation: "Meta-analyses (e.g., Morton et al., 2018) consistently place the upper threshold for resistance-trained athletes at roughly 1.6–2.2 g of protein per kg of bodyweight per day. Intakes above ~2.2 g/kg provide no further hypertrophy benefit for most individuals."
  },
  {
    topic: "Nutrition & Macronutrients",
    question: "What is the primary role of carbohydrates in a strength and conditioning context?",
    options: [
      "Providing the building blocks (amino acids) for muscle repair",
      "Replenishing muscle glycogen to fuel high-intensity exercise",
      "Transporting fat-soluble vitamins",
      "Stimulating testosterone production"
    ],
    correctIndex: 1,
    explanation: "Carbohydrates are stored as glycogen in muscle and liver and serve as the dominant fuel source during moderate-to-high intensity efforts. Adequate glycogen availability delays fatigue and maintains training quality."
  },
  {
    topic: "Nutrition & Macronutrients",
    question: "Which of the following best describes a 'caloric surplus' in the context of muscle building?",
    options: [
      "Consuming fewer calories than your body expends",
      "Matching caloric intake precisely to total daily energy expenditure",
      "Consuming more calories than your body expends",
      "Cycling between high-carb and zero-carb days"
    ],
    correctIndex: 2,
    explanation: "A caloric surplus means energy intake exceeds energy expenditure, providing the raw substrate needed to synthesise new muscle tissue. The size of the surplus is typically kept modest (200–500 kcal/day) to minimise concurrent fat gain."
  },
  {
    topic: "Nutrition & Macronutrients",
    question: "Creatine monohydrate primarily enhances performance by doing which of the following?",
    options: [
      "Increasing plasma testosterone levels",
      "Improving VO₂ max during aerobic exercise",
      "Replenishing phosphocreatine stores to support rapid ATP regeneration",
      "Reducing delayed-onset muscle soreness (DOMS)"
    ],
    correctIndex: 2,
    explanation: "Creatine supplementation increases intramuscular phosphocreatine, which donates its phosphate group to ADP to rapidly regenerate ATP during short-duration, high-intensity efforts (e.g., heavy sets, sprints). It is one of the most well-researched and effective ergogenic aids."
  },

  // ── Training Principles ────────────────────────────────────────────────────
  {
    topic: "Training Principles",
    question: "Progressive overload refers to which fundamental training concept?",
    options: [
      "Training to muscle failure on every set",
      "Gradually increasing the demands placed on the body over time to drive adaptation",
      "Alternating between strength and cardio workouts each day",
      "Reducing training volume as you become more advanced"
    ],
    correctIndex: 1,
    explanation: "Progressive overload — systematically increasing load, volume, density, or difficulty over time — is the cornerstone of long-term strength and hypertrophy gains. Without a progressively increasing stimulus, adaptation plateaus."
  },
  {
    topic: "Training Principles",
    question: "What does 'training volume' typically refer to in resistance training programming?",
    options: [
      "The speed at which you perform each repetition",
      "The total amount of work performed, often expressed as sets × reps × load",
      "The number of different exercises performed per session",
      "The intensity expressed as a percentage of one-rep maximum (%1RM)"
    ],
    correctIndex: 1,
    explanation: "Volume is commonly quantified as sets × reps × load (total tonnage) or, more practically, as weekly hard sets per muscle group. It is one of the most important variables governing hypertrophic adaptations."
  },
  {
    topic: "Training Principles",
    question: "Which principle explains why continued training prevents fitness gains from disappearing and why detraining reverses adaptations?",
    options: [
      "The SAID principle (Specific Adaptation to Imposed Demands)",
      "The principle of reversibility (use it or lose it)",
      "The principle of individuality",
      "The overtraining principle"
    ],
    correctIndex: 1,
    explanation: "The principle of reversibility states that training adaptations — such as increased strength, muscle size, and cardiovascular fitness — diminish when the training stimulus is removed. Regular, consistent training is required to maintain physiological adaptations."
  },
  {
    topic: "Training Principles",
    question: "The SAID principle stands for 'Specific Adaptation to Imposed Demands.' What does this mean in practice?",
    options: [
      "The body adapts in a manner specific to the type, intensity, and volume of training performed",
      "All athletes should follow the same standardised programme",
      "Recovery must exactly match the duration of the preceding workout",
      "Muscles only grow when trained to complete failure"
    ],
    correctIndex: 0,
    explanation: "SAID means the body's adaptations mirror the exact stresses placed on it — endurance training improves aerobic capacity, heavy compound lifting builds maximal strength, and explosive work develops power. Training must match the target outcome."
  },

  // ── Recovery & Physiology ──────────────────────────────────────────────────
  {
    topic: "Recovery & Physiology",
    question: "During which phase of the recovery–adaptation cycle does muscle protein synthesis peak following a resistance training session?",
    options: [
      "Immediately during the workout",
      "Within the first 30 seconds after the final set",
      "In the hours-to-days post-exercise recovery window",
      "Only during a subsequent warm-up session"
    ],
    correctIndex: 2,
    explanation: "Muscle protein synthesis is elevated for up to 24–48 hours (and sometimes longer in novice lifters) following resistance exercise. This extended window underscores why adequate protein intake and sleep throughout the recovery period — not just the post-workout shake — matter."
  },
  {
    topic: "Recovery & Physiology",
    question: "Which hormone is particularly important for promoting muscle repair and growth during sleep?",
    options: [
      "Cortisol",
      "Insulin",
      "Adrenaline (epinephrine)",
      "Growth hormone (GH)"
    ],
    correctIndex: 3,
    explanation: "The largest pulse of growth hormone secretion occurs during slow-wave (deep) sleep, stimulating IGF-1 production and promoting anabolism, fat metabolism, and tissue repair. Consistently poor sleep blunts GH release and impairs recovery."
  }
];
