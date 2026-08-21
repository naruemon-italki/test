/* =========================================================================
   sentences.js  —  Sentence Builder game data (Thai Beginner Course)
   -------------------------------------------------------------------------
   DATA ONLY. No logic lives here. Loaded BEFORE sentence-builder.js and AFTER
   the main inline script, so it shares the global scope (plain script, no
   modules). To add or edit sentences, edit THIS file only.

   Each record is SELF-CONTAINED:
     th[]   parallel array of Thai word-tokens (each becomes one tappable button)
     rom[]  parallel array of romanizations  (rom[i] matches th[i] by index)
     en     the English prompt shown above the puzzle
     less   lesson number (drives the Sentence Pool lesson chips)
     answers (OPTIONAL) array of acceptable word-orderings written as readable
             Thai token arrays. Absent => the canonical th[] order is the only
             correct answer. Present => player's arrangement is correct if it
             matches ANY listed ordering. Use only for genuinely different valid
             orders a native speaker would actually say.

   Answer checking is STRING-BASED (by displayed word sequence), never by which
   physical button — so duplicate words within a sentence are interchangeable
   automatically with no special handling.
   ========================================================================= */

const sentences = [
  // ===== LESSON 1 =====

  {
    th: ["ผม", "ชื่อ", "เจมส์", "ครับ"],
    rom: ["pŏm", "chûu", "James", "kráp"],
    en: "My name is James.",
    less: 1
  },
  {
    th: ["ฉัน", "ชื่อ", "แมรี", "ค่ะ"],
    rom: ["chăn", "chûu", "Mary", "kâ"],
    en: "My name is Mary.",
    less: 1
  },
  {
    th: ["คุณ", "ชื่อ", "อะไร", "ครับ/ค่ะ"],
    rom: ["kun", "chûu", "à-rai", "kráp/ká"],
    en: "What's your name?",
    less: 1
  },
  {
    th: ["ยินดี", "ที่", "ได้", "รู้จัก", "ครับ/ค่ะ"],
    rom: ["yin dee", "têe", "dâai", "róo jàk", "kráp/kâ"],
    en: "Nice to meet you.",
    less: 1
  },

  // ===== LESSON 2 =====

  {
    th: ["ผม", "มาจาก", "อเมริกา", "ครับ"],
    rom: ["pŏm", "maa jàak", "à-may-rí-gaa", "kráp"],
    en: "I am from America. (male speaker)",
    less: 2
  },
  {
    th: ["ผม", "มาจาก", "อังกฤษ", "ครับ"],
    rom: ["pŏm", "maa jàak", "ang-grìt", "kráp"],
    en: "I am from England. (male speaker)",
    less: 2
  },
  {
    th: ["ฉัน", "มาจาก", "ญี่ปุ่น", "ค่ะ"],
    rom: ["chăn", "maa jàak", "yêe-pùn", "kâ"],
    en: "I am from Japan. (female speaker)",
    less: 2
  },
  {
    th: ["ผม", "มาจาก", "ประเทศไทย", "ครับ"],
    rom: ["pŏm", "maa jàak", "bprà-têt Thai", "kráp"],
    en: "I am from Thailand. (male speaker)",
    less: 2
  },
  {
    th: ["คุณ", "มาจาก", "ที่ไหน", "ครับ"],
    rom: ["kun", "maa jàak", "têe năi", "kráp"],
    en: "Where are you from? (male speaker)",
    less: 2
  },
  {
    th: ["คุณ", "มาจาก", "ที่ไหน", "คะ"],
    rom: ["kun", "maa jàak", "têe năi", "ká"],
    en: "Where are you from? (female speaker)",
    less: 2
  },
    {
    th: ["เขา", "มาจาก", "ที่ไหน", "คะ"],
    rom: ["kăo", "maa jàak", "têe năi", "ká"],
    en: "Where is he/she from? (female speaker)",
    less: 2
  },
  {
    th: ["คุณ", "สบายดี", "ไหม", "ครับ/คะ"],
    rom: ["kun", "sà-baai dee", "măi", "kráp/ká"],
    en: "How are you? / Are you fine?",
    less: 2
  },
  {
    th: ["ผม", "สบายดี", "ครับ"],
    rom: ["pŏm", "sà-baai dee", "kráp"],
    en: "I am fine. (male speaker)",
    less: 2
  },
  {
    th: ["ฉัน", "สบายดี", "ค่ะ"],
    rom: ["chăn", "sà-baai dee", "kâ"],
    en: "I am fine. (female speaker)",
    less: 2
  },
  {
    th: ["เขา", "ชื่อ", "เจสสิก้า", "ครับ"],
    rom: ["kăo", "chûu", "Jessica", "kráp"],
    en: "Her name is Jessica. (male speaker)",
    less: 2
  },
  {
    th: ["เขา", "มาจาก", "อเมริกา", "ค่ะ"],
    rom: ["kăo", "maa jàak", "à-may-rí-gaa", "kâ"],
    en: "She/he is from America. (female speaker)",
    less: 2
  },
  {
    th: ["เขา", "ชื่อ", "อะไร", "ครับ"],
    rom: ["kăo", "chûu", "à-rai", "kráp"],
    en: "What's his/her name? (male speaker)",
    less: 2
  },
  {
    th: ["เรา", "มาจาก", "ญี่ปุ่น", "ครับ"],
    rom: ["rao", "maa jàak", "yêe-pùn", "kráp"],
    en: "We are from Japan. (male speaker)",
    less: 2
  },

  // ===== LESSON 3 (Numbers) =====

  {
  th: ["หนึ่ง", "พัน", "เก้า", "ร้อย", "แปด", "สิบ"],
  rom: ["nèung", "pan", "gâo", "rói", "bpàet", "sìp"],
  en: "1,980 (one thousand nine hundred eighty)",
  less: 3
  },
  {
  th: ["สอง", "ร้อย", "เก้า", "สิบ", "เก้า", "บาท"],
  rom: ["sŏng", "rói", "gâo", "sìp", "gâo", "bàat"],
  en: "299 THB (two hundred ninety-nine baht)",
  less: 3
  },
  {
  th: ["หก", "พัน", "สี่", "ร้อย", "ห้า", "สิบ"],
  rom: ["hòk", "pan", "sèe", "rói", "hâa", "sìp"],
  en: "6,450 (six thousand four hundred fifty)",
  less: 3
  },
  {
  th: ["สาม", "หมื่น", "สอง", "พัน", "แปด", "ร้อย"],
  rom: ["săam", "mèun", "sŏng", "pan", "bpàet", "rói"],
  en: "32,800 (thirty-two thousand eight hundred)",
  less: 3
  },
  {
  th: ["สิบ", "สอง", "จุด", "ห้า", "ล้าน"],
  rom: ["sìp", "sŏng", "jùt", "hâa", "láan"],
  en: "12.5 million (twelve point five million)",
  less: 3
  },
  {
  th: ["เจ็ด", "ร้อย", "สี่", "สิบ", "เอ็ด"],
  rom: ["jèt", "rói", "sèe", "sìp", "èt"],
  en: "741 (seven hundred forty-one)",
  less: 3
  },
  {
  th: ["หนึ่ง", "หมื่น", "สาม", "พัน", "หก", "ร้อย", "ยี่", "สิบ"],
  rom: ["nèung", "mèun", "săam", "pan", "hòk", "rói", "yêe", "sìp"],
  en: "13,620 (thirteen thousand six hundred twenty)",
  less: 3
  },
  {
  th: ["แปด", "พัน", "หนึ่ง", "ร้อย", "เก้า", "สิบ", "เก้า"],
  rom: ["bpàet", "pan", "nèung", "rói", "gâo", "sìp", "gâo"],
  en: "8,199 (eight thousand one hundred ninety-nine)",
  less: 3
  },
  {
  th: ["แปด", "ร้อย", "ยี่", "สิบ", "เอ็ด", "บาท"],
  rom: ["bpàet", "rói", "yêe", "sìp", "èt", "bàat"],
  en: "821 THB (eight hundred twenty-one)",
  less: 3
  },
  {
  th: ["หก", "พัน", "แปด", "สิบ", "เอ็ด"],
  rom: ["hòk", "pan", "bpàet", "sìp", "èt"],
  en: "6,081 (six thousand eighty-one)",
  less: 3
  },
  {
    th: ["ห้า", "จุด", "เก้า", "ห้า", "ล้าน"],
    rom: ["hâa", "jùt", "gâo", "hâa", "láan"],
    en: "5.95 million (five point nine five million)",
    less: 3
  },
    {
    th: ["สาม", "แสน", "แปด", "หมื่น", "เก้า", "พัน", "บาท"],
    rom: ["săam", "săen", "bpàet", "mèun", "gâo", "pan", "bàat"],
    en: "389,000 THB (three hundred eighty-nine thousand baht)",
    less: 3
  },
    {
    th: ["สอง", "พัน", "เจ็ด", "ร้อย", "ห้า", "สิบ"],
    rom: ["sŏng", "pan", "jèt", "rói", "hâa", "sìp"],
    en: "2,750 (two thousand seven hundred fifty)",
    less: 3
  },
    {
    th: ["สี่", "หมื่น", "ห้า", "พัน", "บาท"],
    rom: ["sèe", "mèun", "hâa", "pan", "bàat"],
    en: "45,000 THB (forty-five thousand baht)",
    less: 3
  },

  // ===== LESSON 4 (Age) =====

  {
    th: ["ผม", "อายุ", "สาม", "สิบ", "ห้า", "ปี", "ครับ"],
    rom: ["pŏm", "aa-yú", "săam", "sìp", "hâa", "bpee", "kráp"],
    en: "I am 35 years old. (male speaker)",
    less: 4
  },
  {
    th: ["ฉัน", "อายุ", "ยี่สิบ", "เจ็ด", "ปี", "ค่ะ"],
    rom: ["chăn", "aa-yú", "yêe-sìp", "jèt", "bpee", "kâ"],
    en: "I am 27 years old. (female speaker)",
    less: 4
  },
  {
    th: ["ผม", "อายุ", "ยี่สิบ", "หก", "ปี", "ครับ"],
    rom: ["pŏm", "aa-yú", "yêe-sìp", "hòk", "bpee", "kráp"],
    en: "I am 26 years old. (male speaker)",
    less: 4
  },
  {
    th: ["คุณ", "อายุ", "เท่าไหร่", "ครับ/คะ"],
    rom: ["kun", "aa-yú", "tâo rai", "kráp/ká"],
    en: "How old are you?",
    less: 4
  },
  {
    th: ["เขา", "อายุ", "เท่าไหร่", "คะ"],
    rom: ["kăo", "aa-yú", "tâo rai", "ká"],
    en: "How old is he/she? (female speaker)",
    less: 4
  },
  {
    th: ["เขา", "อายุ", "สาม", "สิบ", "หก", "ปี", "ครับ"],
    rom: ["kăo", "aa-yú", "săam", "sìp", "hòk", "bpee", "kráp"],
    en: "He/she is 36 years old. (male speaker)",
    less: 4
  },
  {
    th: ["เขา", "อายุ", "เจ็ด", "สิบ", "เอ็ด", "ปี", "ค่ะ"],
    rom: ["kăo", "aa-yú", "jèt", "sìp", "èt", "bpee", "kâ"],
    en: "He/she is 71 years old. (female speaker)",
    less: 4
  },
  {
    th: ["เขา", "มาจาก", "ประเทศ", "อังกฤษ", "ครับ"],
    rom: ["kăo", "maa jàak", "bprà-têt", "ang-grìt", "kráp"],
    en: "He/she is from England. (male speaker)",
    less: 4
  },

// ===== LESSON 5 (Simple Sentences) =====

{
  th: ["ผม", "กิน", "ไก่", "ครับ"],
  rom: ["pŏm", "gin", "gài", "kráp"],
  en: "I eat chicken. (male speaker)",
  less: 5
},
{
  th: ["ฉัน", "ดื่ม", "น้ำ", "ค่ะ"],
  rom: ["chăn", "dèum", "náam", "kâ"],
  en: "I drink water. (female speaker)",
  less: 5
},
{
  th: ["ผม", "อ่าน", "หนังสือ", "ครับ"],
  rom: ["pŏm", "àan", "năng-sĕu", "kráp"],
  en: "I read a book. (male speaker)",
  less: 5
},
{
  th: ["เขา", "อ่าน", "หนังสือ", "ค่ะ"],
  rom: ["kăo", "àan", "năng-sĕu", "kâ"],
  en: "He/she reads a book. (female speaker)",
  less: 5
},
{
  th: ["เรา", "กิน", "ไก่", "ครับ"],
  rom: ["rao", "gin", "gài", "kráp"],
  en: "We eat chicken. (male speaker)",
  less: 5
},
{
  th: ["พวก", "เขา", "ดื่ม", "น้ำ"],
  rom: ["pûak", "kăo", "dèum", "náam"],
  en: "They drink water.",
  less: 5
},
{
  th: ["แมว", "ชอบ", "ดื่ม", "นม"],
  rom: ["maew", "chôp", "dèum", "nom"],
  en: "The cat likes to drink milk.",
  less: 5
},
{
  th: ["ผม", "กิน", "ยา", "ครับ"],
  rom: ["pŏm", "gin", "yaa", "kráp"],
  en: "I take medicine. (male speaker)",
  less: 5
},
{
  th: ["ฉัน", "กิน", "ข้าว", "ค่ะ"],
  rom: ["chăn", "gin", "kâao", "kâ"],
  en: "I'm eating. / I eat a meal. (female speaker)",
  less: 5
},
{
  th: ["ผม", "ชอบ", "กิน", "ไก่"],
  rom: ["pŏm", "chôp", "gin", "gài"],
  en: "I like to eat chicken. (male speaker)",
  less: 5
},
{
  th: ["ฉัน", "ชอบ", "ดื่ม", "เบียร์"],
  rom: ["chăn", "chôp", "dèum", "bia"],
  en: "I like to drink beer. (female speaker)",
  less: 5
},
{
  th: ["เรา", "ชอบ", "แมว", "ครับ"],
  rom: ["rao", "chôp", "maew", "kráp"],
  en: "We like cats. (male speaker)",
  less: 5
},
{
  th: ["เขา", "ชอบ", "อ่าน", "หนังสือ"],
  rom: ["kăo", "chôp", "àan", "năng-sĕu"],
  en: "He/she likes to read books.",
  less: 5
},
{
  th: ["ผม", "ชอบ", "กิน", "พิซซ่า", "ครับ"],
  rom: ["pŏm", "chôp", "gin", "pít-sâa", "kráp"],
  en: "I like to eat pizza. (male speaker)",
  less: 5
},
{
  th: ["ฉัน", "ชอบ", "กิน", "ซูชิ", "ค่ะ"],
  rom: ["chăn", "chôp", "gin", "soo-chí", "kâ"],
  en: "I like to eat sushi. (female speaker)",
  less: 5
},
{
  th: ["ผม", "ชอบ", "ดื่ม", "โค้ก"],
  rom: ["pŏm", "chôp", "dèum", "kóhk"],
  en: "I like to drink coke.",
  less: 5
},
{
  th: ["ผม", "ชอบ", "กิน", "อาหารไทย"],
  rom: ["pŏm", "chôp", "gin", "aa-hăan Thai"],
  en: "I like to eat Thai food. (male speaker)",
  less: 5
},
{
  th: ["เรา", "ชอบ", "กิน", "ผลไม้"],
  rom: ["rao", "chôp", "gin", "pŏn-lá-mái"],
  en: "We like to eat fruit.",
  less: 5
},
{
  th: ["ฉัน", "ชอบ", "กิน", "แอปเปิ้ล"],
  rom: ["chăn", "chôp", "gin", "àep-pên"],
  en: "I like to eat apples. (female speaker)",
  less: 5
},
{
  th: ["ผม", "ชอบ", "ทำ", "งาน", "ครับ"],
  rom: ["pŏm", "chôp", "tam", "ngaan", "kráp"],
  en: "I like to work. (male speaker)",
  less: 5
},
{
  th: ["เขา", "ทำ", "อาหาร", "ค่ะ"],
  rom: ["kăo", "tam", "aa-hăan", "kâ"],
  en: "He/she cooks. (female speaker)",
  less: 5
},
{
  th: ["ฉัน", "ชอบ", "ทำ", "อาหาร", "ค่ะ"],
  rom: ["chăn", "chôp", "tam", "aa-hăan", "kâ"],
  en: "I like to cook. (female speaker)",
  less: 5
},
{
  th: ["เรา", "ซื้อ", "ไก่", "ค่ะ"],
  rom: ["rao", "séu", "gài", "kâ"],
  en: "We buy chicken. (female speaker)",
  less: 5
},
{
  th: ["เขา", "ซื้อ", "ผลไม้", "ค่ะ"],
  rom: ["kăo", "séu", "pŏn-lá-mái", "kâ"],
  en: "He/she buys fruit. (female speaker)",
  less: 5
},
{
  th: ["ผม", "ซื้อ", "น้ำ", "ครับ"],
  rom: ["pŏm", "séu", "náam", "kráp"],
  en: "I buy water. (male speaker)",
  less: 5
},
{
  th: ["เขา", "ชอบ", "ทำงาน", "ครับ"],
  rom: ["kăo", "chôp", "tam ngaan", "kráp"],
  en: "He/she likes to work. (male speaker)",
  less: 5
},
{
  th: ["ผม", "ไป", "ร้านอาหาร", "ครับ"],
  rom: ["pŏm", "bpai", "ráan aa-hăan", "kráp"],
  en: "I go to a restaurant. (male speaker)",
  less: 5
},
{
  th: ["ฉัน", "ไป", "ซูเปอร์มาร์เก็ต", "ค่ะ"],
  rom: ["chăn", "bpai", "soo-bper-maa-gèt", "kâ"],
  en: "I go to a supermarket. (female speaker)",
  less: 5
},
{
  th: ["เรา", "ไป", "ออฟฟิศ"],
  rom: ["rao", "bpai", "óf-fít"],
  en: "We go to the office.",
  less: 5
},
{
  th: ["ผม", "เรียน", "ภาษา", "ไทย", "ครับ"],
  rom: ["pŏm", "rian", "paa-săa", "Thai", "kráp"],
  en: "I study Thai language. (male speaker)",
  less: 5
},
{
  th: ["ฉัน", "เรียน", "ภาษา", "ไทย", "ค่ะ"],
  rom: ["chăn", "rian", "paa-săa", "Thai", "kâ"],
  en: "I study Thai language. (female speaker)",
  less: 5
},
{
  th: ["ฉัน", "ซื้อ", "อาหาร", "ค่ะ"],
  rom: ["chăn", "séu", "aa-hăan", "kâ"],
  en: "I buy food. (female speaker)",
  less: 5
},
{
  th: ["เขา", "ชอบ", "กิน", "อาหาร", "อเมริกัน"],
  rom: ["kăo", "chôp", "gin", "aa-hăan", "à-may-rí-gan"],
  en: "He/she likes to eat American food.",
  less: 5
},
{
  th: ["เรา", "ชอบ", "กิน", "อาหาร", "ไทย", "ครับ"],
  rom: ["rao", "chôp", "gin", "aa-hăan", "thai", "kráp"],
  en: "We like to eat Thai food. (male speaker)",
  less: 5
},
{
  th: ["พวก", "เขา", "ชอบ", "กิน", "อาหาร", "อิตาลี"],
  rom: ["pûak", "kăo", "chôp", "gin", "aa-hăan", "ì-dtaa-lee"],
  en: "They like to eat Italian food.",
  less: 5
},

// ===== LESSON 6 (Questions) =====
{
  th: ["คุณ", "ชอบ", "แมว", "ไหม"],
  rom: ["kun", "chôp", "maew", "măi"],
  en: "Do you like cats?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "อ่าน", "หนังสือ", "ไหม"],
  rom: ["kun", "chôp", "àan", "năng-sĕu", "măi"],
  en: "Do you like to read books?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ทำ", "อาหาร", "ไหม"],
  rom: ["kun", "chôp", "tam", "aa-hăan", "măi"],
  en: "Do you like to cook?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "หมา", "ไหม"],
  rom: ["kun", "chôp", "măa", "măi"],
  en: "Do you like dogs?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ออกกำลังกาย", "ไหม"],
  rom: ["kun", "chôp", "òk gam-lang gaai", "măi"],
  en: "Do you like to exercise?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "กิน", "พิซซ่า", "ไหม"],
  rom: ["kun", "chôp", "gin", "pít-sâa", "măi"],
  en: "Do you like to eat pizza?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ดื่ม", "เบียร์", "ไหม"],
  rom: ["kun", "chôp", "dèum", "bia", "măi"],
  en: "Do you like to drink beer?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "กิน", "อาหาร", "ไทย", "ไหม", "คะ"],
  rom: ["kun", "chôp", "gin", "aa-hăan", "Thai", "măi", "ká"],
  en: "Do you like to eat Thai food? (female)",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ดู", "หนัง", "ไหม"],
  rom: ["kun", "chôp", "doo", "năng", "măi"],
  en: "Do you like to watch movies?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ฟัง", "เพลง", "ไหม"],
  rom: ["kun", "chôp", "fang", "pleng", "măi"],
  en: "Do you like to listen to music?",
  less: 6
},
{
  th: ["เขา", "ชอบ", "ดื่ม", "เบียร์", "ไหม"],
  rom: ["kăo", "chôp", "dèum", "bia", "măi"],
  en: "Does he/she like to drink beer?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "เล่น", "โทรศัพท์", "ไหม"],
  rom: ["kun", "chôp", "lên", "toh-rá-sàp", "măi"],
  en: "Do you like to use your phone?",
  less: 6
},
{
  th: ["คุณ", "กิน", "อะไร", "ครับ"],
  rom: ["kun", "gin", "à-rai", "kráp"],
  en: "What are you eating? (male)",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "กิน", "อะไร", "คะ"],
  rom: ["kun", "chôp", "gin", "à-rai", "ká"],
  en: "What do you like to eat? (female)",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ดื่ม", "อะไร", "ครับ"],
  rom: ["kun", "chôp", "dèum", "à-rai", "kráp"],
  en: "What do you like to drink? (male)",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ทำ", "อะไร"],
  rom: ["kun", "chôp", "tam", "à-rai"],
  en: "What do you like to do?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "อ่าน", "หนังสือ", "อะไร"],
  rom: ["kun", "chôp", "àan", "năng-sĕu", "à-rai"],
  en: "What do you like to read?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ดู", "หนัง", "อะไร"],
  rom: ["kun", "chôp", "doo", "năng", "à-rai"],
  en: "What kind of movies do you like to watch?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ฟัง", "เพลง", "อะไร"],
  rom: ["kun", "chôp", "fang", "pleng", "à-rai"],
  en: "What kind of music do you like to listen to?",
  less: 6
},
{
  th: ["เขา", "ไป", "ไหน", "คะ"],
  rom: ["kăo", "bpai", "năi", "ká"],
  en: "Where does he/she go?",
  less: 6
},
{
  th: ["ผม", "ชอบ", "ดู", "หนัง", "และ", "ฟัง", "เพลง"],
  rom: ["pŏm", "chôp", "doo", "năng", "láe", "fang", "pleng"],
  en: "I like to watch movies and listen to music.",
  less: 6,
  answers: [
    ["ผม", "ชอบ", "ดู", "หนัง", "และ", "ฟัง", "เพลง"],
    ["ผม", "ชอบ", "ฟัง", "เพลง", "และ", "ดู", "หนัง"]
  ]
},
{
  th: ["ฉัน", "ชอบ", "หมา", "และ", "แมว"],
  rom: ["chăn", "chôp", "măa", "láe", "maew"],
  en: "I like dogs and cats.",
  less: 6,
  answers: [
    ["ฉัน", "ชอบ", "หมา", "และ", "แมว"],
    ["ฉัน", "ชอบ", "แมว", "และ", "หมา"]
  ]
},
{
  th: ["เรา", "กิน", "ไก่", "และ", "ดื่ม", "เบียร์"],
  rom: ["rao", "gin", "gài", "láe", "dèum", "bia"],
  en: "We eat chicken and drink beer.",
  less: 6,
  answers: [
    ["เรา", "กิน", "ไก่", "และ", "ดื่ม", "เบียร์"],
    ["เรา", "ดื่ม", "เบียร์", "และ", "กิน", "ไก่"]
  ]
},
{
  th: ["ผม", "กิน", "ไก่", "และ", "ดื่ม", "น้ำ"],
  rom: ["pŏm", "gin", "gài", "láe", "dèum", "náam"],
  en: "I eat chicken and drink water.",
  less: 6,
  answers: [
    ["ผม", "กิน", "ไก่", "และ", "ดื่ม", "น้ำ"],
    ["ผม", "ดื่ม", "น้ำ", "และ", "กิน", "ไก่"]
  ]
},
{
  th: ["ฉัน", "ชอบ", "กิน", "อาหารไทย", "และ", "อาหารญี่ปุ่น"],
  rom: ["chăn", "chôp", "gin", "aa-hăan Thai", "láe", "aa-hăan yêe-pùn"],
  en: "I like to eat Thai and Japanese food.",
  less: 6,
  answers: [
    ["ฉัน", "ชอบ", "กิน", "อาหารไทย", "และ", "อาหารญี่ปุ่น"],
    ["ฉัน", "ชอบ", "กิน", "อาหารญี่ปุ่น", "และ", "อาหารไทย"]
  ]
},
{
  th: ["ฉัน", "ซื้อ", "อาหาร", "น้ำ", "และ", "เบียร์"],
  rom: ["chăn", "séu", "aa-hăan", "náam", "láe", "bia"],
  en: "I buy food, water and beer.",
  less: 6,
  answers: [
    ["ฉัน", "ซื้อ", "อาหาร", "น้ำ", "และ", "เบียร์"],
    ["ฉัน", "ซื้อ", "อาหาร", "เบียร์", "และ", "น้ำ"],
    ["ฉัน", "ซื้อ", "น้ำ", "อาหาร", "และ", "เบียร์"],
    ["ฉัน", "ซื้อ", "น้ำ", "เบียร์", "และ", "อาหาร"],
    ["ฉัน", "ซื้อ", "เบียร์", "อาหาร", "และ", "น้ำ"],
    ["ฉัน", "ซื้อ", "เบียร์", "น้ำ", "และ", "อาหาร"]
  ]
},
{
  th: ["คุณ", "ชอบ", "หมา", "ใช่", "ไหม"],
  rom: ["kun", "chôp", "măa", "châi", "măi"],
  en: "You like dogs, right?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "ดู", "หนัง", "ใช่", "ไหม"],
  rom: ["kun", "chôp", "doo", "năng", "châi", "măi"],
  en: "You like to watch movies, right?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "กิน", "อาหาร", "ไทย", "ใช่", "ไหม"],
  rom: ["kun", "chôp", "gin", "aa-hăan", "Thai", "châi", "măi"],
  en: "You like to eat Thai food, right?",
  less: 6
},
{
  th: ["คุณ", "มาจาก", "อเมริกา", "ใช่", "ไหม"],
  rom: ["kun", "maa jàak", "à-may-rí-gaa", "châi", "măi"],
  en: "You are from America, right?",
  less: 6
},
{
  th: ["คุณ", "อายุ", "สาม", "สิบ", "ปี", "ใช่", "ไหม"],
  rom: ["kun", "aa-yú", "săam", "sìp", "bpee", "châi", "măi"],
  en: "You are 30 years old, right?",
  less: 6
},
{
  th: ["คุณ", "ชอบ", "อ่าน", "ใช่", "ไหม"],
  rom: ["kun", "chôp", "àan", "châi", "măi"],
  en: "You like to read, right?",
  less: 6
},
{
  th: ["พวก", "เขา", "ชอบ", "เล่น", "โทรศัพท์"],
  rom: ["pûak", "kăo", "chôp", "lên", "toh-rá-sàp"],
  en: "They like to use their phones.",
  less: 6
},
{
  th: ["ฉัน", "ชอบ", "ออกกำลังกาย", "และ", "ทำ", "งาน"],
  rom: ["chăn", "chôp", "òk gam-lang gaai", "láe", "tam", "ngaan"],
  en: "I like to exercise.",
  less: 6
},

// ===== LESSON 7 (Negatives) =====
{
  th: ["ผม", "ไม่", "ชอบ", "กิน", "ปลา"],
  rom: ["pŏm", "mâi", "chôp", "gin", "bplaa"],
  en: "I don't like to eat fish.",
  less: 7
},
{
  th: ["ฉัน", "ไม่", "กิน", "เนื้อ", "และ", "หมู"],
  rom: ["chăn", "mâi", "gin", "néuua", "láe", "mŏo"],
  en: "I don't eat beef and pork.",
  less: 7
},
{
  th: ["เขา", "ไม่", "ชอบ", "กิน", "หมู"],
  rom: ["kăo", "mâi", "chôp", "gin", "mŏo"],
  en: "He/she doesn't like to eat pork.",
  less: 7
},
{
  th: ["ผม", "ไม่", "ชอบ", "ออกกำลังกาย"],
  rom: ["pŏm", "mâi", "chôp", "òk gam-lang gaai"],
  en: "I don't like to exercise.",
  less: 7
},
{
  th: ["ฉัน", "ไม่", "ชอบ", "ทำอาหาร"],
  rom: ["chăn", "mâi", "chôp", "tam aa-hăan"],
  en: "I don't like to cook.",
  less: 7
},
{
  th: ["เขา", "ไม่", "ชอบ", "เรียน"],
  rom: ["kăo", "mâi", "chôp", "rian"],
  en: "He/she doesn't like to study.",
  less: 7
},
{
  th: ["พวกเขา", "ไม่", "ชอบ", "กิน", "อาหาร", "ไทย"],
  rom: ["pûak kăo", "mâi", "chôp", "gin", "aa-hăan", "Thai"],
  en: "They don't like to eat Thai food.",
  less: 7
},
{
  th: ["ผม", "ไม่", "เห็น", "คุณ", "ครับ"],
  rom: ["pŏm", "mâi", "hĕn", "kun", "kráp"],
  en: "I don't see you. (male)",
  less: 7
},
{
  th: ["ฉัน", "ไม่", "ได้ยิน", "คุณ", "ค่ะ"],
  rom: ["chăn", "mâi", "dâai yin", "kun", "kâ"],
  en: "I don't hear you. (female)",
  less: 7
},
{
  th: ["คุณ", "เห็น", "ผม", "ไหม"],
  rom: ["kun", "hĕn", "pŏm", "măi"],
  en: "Do you see me?",
  less: 7
},
{
  th: ["คุณ", "ได้ยิน", "ฉัน", "ไหม", "คะ"],
  rom: ["kun", "dâai yin", "chăn", "măi", "ká"],
  en: "Do you hear me?",
  less: 7
},
{
  th: ["เขา", "ไม่", "เห็น", "ผม"],
  rom: ["kăo", "mâi", "hĕn", "pŏm"],
  en: "He/she doesn't see me.",
  less: 7
},
{
  th: ["ผม", "ไม่", "พูด", "ภาษา", "ไทย"],
  rom: ["pŏm", "mâi", "pôot", "paa-săa", "Thai"],
  en: "I don't speak Thai.",
  less: 7
},
{
  th: ["ฉัน", "พูด", "ภาษา", "ญี่ปุ่น"],
  rom: ["chăn", "pôot", "paa-săa", "yêe-pùn"],
  en: "I speak Japanese.",
  less: 7
},
{
  th: ["เขา", "ไม่", "พูด", "ภาษา", "อังกฤษ"],
  rom: ["kăo", "mâi", "pôot", "paa-săa", "ang-grìt"],
  en: "He/she doesn't speak English.",
  less: 7
},
{
  th: ["ผม", "ไม่", "ชอบ", "คุย"],
  rom: ["pŏm", "mâi", "chôp", "kui"],
  en: "I don't like to talk.",
  less: 7
},
{
  th: ["ฉัน", "ไม่", "บอก", "คุณ"],
  rom: ["chăn", "mâi", "bòk", "kun"],
  en: "I won't tell you.",
  less: 7
},
{
  th: ["ผม", "ไม่", "เข้าใจ", "ครับ"],
  rom: ["pŏm", "mâi", "kâo jai", "kráp"],
  en: "I don't understand.",
  less: 7
},
{
  th: ["คุณ", "เข้าใจ", "ไหม", "ครับ"],
  rom: ["kun", "kâo jai", "măi", "kráp"],
  en: "Do you understand? (male speaker)",
  less: 7
},
{
  th: ["เขา", "ไม่", "เข้าใจ", "ภาษา", "ไทย"],
  rom: ["kăo", "mâi", "kâo jai", "paa-săa", "Thai"],
  en: "He/she doesn't understand Thai.",
  less: 7
},
{
  th: ["ผม", "รู้", "จัก", "เขา"],
  rom: ["pŏm", "róo", "jàk", "kăo"],
  en: "I know him/her.",
  less: 7
},
{
  th: ["เขา", "ไม่", "รู้", "จัก", "ผม"],
  rom: ["kăo", "mâi", "róo", "jàk", "pŏm"],
  en: "He/she doesn't know me.",
  less: 7
},
{
  th: ["ฉัน", "รู้", "จัก", "คุณ", "ใช่", "ไหม"],
  rom: ["chăn", "róo", "jàk", "kun", "châi", "măi"],
  en: "I know you, right?",
  less: 7
},
{
  th: ["ฉัน", "ไม่", "รัก", "เขา"],
  rom: ["chăn", "mâi", "rák", "kăo"],
  en: "I don't love him/her.",
  less: 7
},
{
  th: ["ผม", "ชอบ", "กิน", "แต่", "ไม่", "ชอบ", "ทำอาหาร"],
  rom: ["pŏm", "chôp", "gin", "dtàe", "mâi", "chôp", "tam aa-hăan"],
  en: "I like to eat, but I don't like to cook.",
  less: 7
},
{
  th: ["ฉัน", "ชอบ", "เล่น", "แต่", "ไม่", "ชอบ", "เรียน"],
  rom: ["chăn", "chôp", "lên", "dtàe", "mâi", "chôp", "rian"],
  en: "I like to play, but I don't like to study.",
  less: 7
},
{
  th: ["ผม", "ชอบ", "กิน", "เนื้อ", "แต่", "ไม่", "ชอบ", "กิน", "ไก่"],
  rom: ["pŏm", "chôp", "gin", "néuua", "dtàe", "mâi", "chôp", "gin", "gài"],
  en: "I like to eat beef, but I don't like to eat chicken.",
  less: 7
},
{
  th: ["ฉัน", "ชอบ", "หมา", "แต่", "ไม่", "ชอบ", "แมว"],
  rom: ["chăn", "chôp", "măa", "dtàe", "mâi", "chôp", "maew"],
  en: "I like dogs, but I don't like cats.",
  less: 7
},
{
  th: ["เขา", "รู้จัก", "ผม", "แต่", "ไม่", "ชอบ"],
  rom: ["kăo", "róo jàk", "pŏm", "dtàe", "mâi", "chôp"],
  en: "He/she knows me, but doesn't like me.",
  less: 7
},
{
  th: ["ผม", "ชอบ", "ดื่ม", "เบียร์", "แต่", "ไม่", "ชอบ", "ดื่ม", "นม"],
  rom: ["pŏm", "chôp", "dèum", "bia", "dtàe", "mâi", "chôp", "dèum", "nom"],
  en: "I like to drink beer, but I don't like to drink milk.",
  less: 7
},
{
  th: ["เรา", "ชอบ", "กิน", "ปลา", "และ", "ผัก"],
  rom: ["rao", "chôp", "gin", "bplaa", "láe", "pàk"],
  en: "We like to eat fish and vegetables.",
  less: 7,
  answers: [
    ["เรา", "ชอบ", "กิน", "ปลา", "และ", "ผัก"],
    ["เรา", "ชอบ", "กิน", "ผัก", "และ", "ปลา"]
  ]
},
{
  th: ["เขา", "ไม่", "ชอบ", "กิน", "หมู", "และ", "เนื้อ"],
  rom: ["kăo", "mâi", "chôp", "gin", "mŏo", "láe", "néuua"],
  en: "He/she doesn't like to eat pork and beef.",
  less: 7,
  answers: [
    ["เขา", "ไม่", "ชอบ", "กิน", "หมู", "และ", "เนื้อ"],
    ["เขา", "ไม่", "ชอบ", "กิน", "เนื้อ", "และ", "หมู"]
  ]
},
{
  th: ["คุณ", "ดู", "มีความสุข"],
  rom: ["kun", "doo", "mee kwaam sùk"],
  en: "You look happy.",
  less: 7
},
{
  th: ["เขา", "โกรธ", "ใช่", "ไหม"],
  rom: ["kăo", "gròht", "châi", "măi"],
  en: "He/she is angry, right?",
  less: 7
},
{
  th: ["คุณ", "ดู", "ไม่", "มีความสุข"],
  rom: ["kun", "doo", "mâi", "mee kwaam sùk"],
  en: "You don't look happy.",
  less: 7
},
{
  th: ["ผม", "ไม่", "โกรธ", "ครับ"],
  rom: ["pŏm", "mâi", "gròht", "kráp"],
  en: "I'm not angry. (male speaker)",
  less: 7
},
{
  th: ["ฉัน", "มีความสุข", "แต่", "เหนื่อย", "ค่ะ"],
  rom: ["chăn", "mee kwaam sùk", "dtàe", "nèuay", "kâ"],
  en: "I'm happy but tired. (female speaker)",
  less: 7
},
{
  th: ["พวกเขา", "มีความสุข", "และ", "ตื่นเต้น"],
  rom: ["pûak kăo", "mee kwaam sùk", "láe", "dtùen dtên"],
  en: "They are happy and excited.",
  less: 7
},
{
  th: ["เขา", "กลัว", "และ", "กังวล"],
  rom: ["kăo", "glua", "láe", "gang-won"],
  en: "He/she is scared and worried.",
  less: 7
},
{
  th: ["คุณ", "ดู", "เหนื่อย", "และ", "เศร้า"],
  rom: ["kun", "doo", "nèuay", "láe", "sâo"],
  en: "You look tired and sad.",
  less: 7
},
{
  th: ["คุณ", "กลัว", "ใช่", "ไหม"],
  rom: ["kun", "glua", "châi", "măi"],
  en: "You are scared, right?",
  less: 7
},
{
  th: ["พรุ่งนี้", "ฉัน", "จะ", "ไป", "ทำ", "งาน", "ค่ะ"],
  rom: ["prûng-née", "chăn", "jà", "bpai", "tam", "ngaan", "kâ"],
  en: "Tomorrow I will go to work.",
  less: 7,
  answers: [
    ["พรุ่งนี้", "ฉัน", "จะ", "ไป", "ทำ", "งาน", "ค่ะ"],
    ["ฉัน", "จะ", "ไป", "ทำ", "งาน", "ค่ะ", "พรุ่งนี้"]
  ]
},
{
  th: ["คืนนี้", "ผม", "จะ", "เรียน", "ภาษา", "ไทย"],
  rom: ["keun née", "pŏm", "jà", "rian", "paa-săa", "thai"],
  en: "Tonight I will study Thai.",
  less: 7,
  answers: [
    ["คืนนี้", "ผม", "จะ", "เรียน", "ภาษา", "ไทย"],
    ["ผม", "จะ", "เรียน", "ภาษา", "ไทย", "คืนนี้"]
  ]
},
{
  th: ["พรุ่งนี้", "เรา", "จะ", "ไป", "ประเทศ", "จีน"],
  rom: ["prûng-née", "rao", "jà", "bpai", "bprà-têt", "jeen"],
  en: "Tomorrow we will go to China.",
  less: 7,
  answers: [
    ["พรุ่งนี้", "เรา", "จะ", "ไป", "ประเทศ", "จีน"],
    ["เรา", "จะ", "ไป", "ประเทศ", "จีน", "พรุ่งนี้"]
  ]
},
{
  th: ["วันนี้", "ฉัน", "จะ", "ทำ", "อาหาร", "ไทย"],
  rom: ["wan née", "chăn", "jà", "tam", "aa-hăan", "thai"],
  en: "Today I will cook Thai food.",
  less: 7,
  answers: [
    ["วันนี้", "ฉัน", "จะ", "ทำ", "อาหาร", "ไทย"],
    ["ฉัน", "จะ", "ทำ", "อาหาร", "ไทย", "วันนี้"]
  ]
},
{
  th: ["ผม", "จะ", "ไม่", "ไป", "ทำ", "งาน", "พรุ่งนี้"],
  rom: ["pŏm", "jà", "mâi", "bpai", "tam", "ngaan", "prûng-née"],
  en: "I will not go to work tomorrow.",
  less: 7,
  answers: [
    ["ผม", "จะ", "ไม่", "ไป", "ทำ", "งาน", "พรุ่งนี้"],
    ["พรุ่งนี้", "ผม", "จะ", "ไม่", "ไป", "ทำ", "งาน"]
  ]
},
{
  th: ["คืนนี้", "จะ", "ทำ", "อะไร", "ครับ"],
  rom: ["keun née", "jà", "tam", "à-rai", "kráp"],
  en: "What will you do tonight? (male)",
  less: 7,
  answers: [
    ["คืนนี้", "จะ", "ทำ", "อะไร", "ครับ"],
    ["จะ", "ทำ", "อะไร", "ครับ", "คืนนี้"]
  ]
},
{
  th: ["พรุ่งนี้", "คุณ", "จะ", "ทำ", "อะไร", "คะ"],
  rom: ["prûng-née", "kun", "jà", "tam", "à-rai", "ká"],
  en: "What will you do tomorrow? (female)",
  less: 7,
  answers: [
    ["พรุ่งนี้", "คุณ", "จะ", "ทำ", "อะไร", "คะ"],
    ["คุณ", "จะ", "ทำ", "อะไร", "คะ", "พรุ่งนี้"]
  ]
},
{
  th: ["พรุ่งนี้", "คุณ", "จะ", "ไป", "ทำ", "งาน", "ไหม"],
  rom: ["prûng-née", "kun", "jà", "bpai", "tam", "ngaan", "măi"],
  en: "Will you go to work tomorrow?",
  less: 7,
  answers: [
    ["พรุ่งนี้", "คุณ", "จะ", "ไป", "ทำ", "งาน", "ไหม"],
    ["คุณ", "จะ", "ไป", "ทำ", "งาน", "ไหม", "พรุ่งนี้"]
  ]
},
{
  th: ["พรุ่งนี้", "ไป", "ดู", "หนัง", "กัน", "ไหม"],
  rom: ["prûng-née", "bpai", "doo", "năng", "gan", "măi"],
  en: "Shall we go watch a movie tomorrow?",
  less: 7,
  answers: [
    ["พรุ่งนี้", "ไป", "ดู", "หนัง", "กัน", "ไหม"],
    ["ไป", "ดู", "หนัง", "กัน", "ไหม", "พรุ่งนี้"]
  ]
},
{
  th: ["คืนนี้", "เรา", "ไป", "ออกกำลังกาย", "กัน", "ไหม"],
  rom: ["keun née", "rao", "bpai", "òk gam-lang gaai", "gan", "măi"],
  en: "Shall we go exercise tonight?",
  less: 7,
  answers: [
    ["คืนนี้", "เรา", "ไป", "ออกกำลังกาย", "กัน", "ไหม"],
    ["เรา", "ไป", "ออกกำลังกาย", "กัน", "ไหม", "คืนนี้"]
  ]
},
{
  th: ["คืนนี้", "ไป", "กิน", "ข้าว", "กัน", "ไหม"],
  rom: ["keun née", "bpai", "gin", "kâao", "gan", "măi"],
  en: "Shall we go eat tonight?",
  less: 7,
  answers: [
    ["คืนนี้", "ไป", "กิน", "ข้าว", "กัน", "ไหม"],
    ["ไป", "กิน", "ข้าว", "กัน", "ไหม", "คืนนี้"]
  ]
},
{
  th: ["คืนนี้", "ผม", "จะ", "เรียน", "ภาษา", "ไทย", "แล้ว", "ก็", "เล่น", "เกม"],
  rom: ["keun née", "pŏm", "jà", "rian", "paa-săa", "thai", "láew", "gôr", "lên", "gem"],
  en: "Tonight I will study Thai and then play games.",
  less: 7,
  answers: [
    ["คืนนี้", "ผม", "จะ", "เรียน", "ภาษา", "ไทย", "แล้ว", "ก็", "เล่น", "เกม"],
    ["ผม", "จะ", "เรียน", "ภาษา", "ไทย", "แล้ว", "ก็", "เล่น", "เกม", "คืนนี้"]
  ]
},
{
  th: ["ฉัน", "จะ", "ไป", "กิน", "ข้าว", "แล้ว", "ก็", "เรียน", "ภาษา", "อังกฤษ"],
  rom: ["chăn", "jà", "bpai", "gin", "kâao", "láew", "gôr", "rian", "paa-săa", "ang-grìt"],
  en: "I will go eat and then study English.",
  less: 7
},

// ===== LESSON 8 (To Be: keu / bpen / yòo) =====
{
  th: ["นี่", "คือ", "อะไร", "คะ"],
  rom: ["nêe", "keu", "à-rai", "ká"],
  en: "What is this? (female speaker)",
  less: 8
},
{
  th: ["นั่น", "คือ", "อะไร", "ครับ"],
  rom: ["nân", "keu", "à-rai", "kráp"],
  en: "What is that? (male speaker)",
  less: 8
},
{
  th: ["มัน", "คือ", "อะไร"],
  rom: ["man", "keu", "à-rai"],
  en: "What is it?",
  less: 8
},
{
  th: ["นี่", "คือ", "ไก่", "หรือ", "หมู"],
  rom: ["nêe", "keu", "gài", "rĕu", "mŏo"],
  en: "Is this chicken or pork?",
  less: 8,
  answers: [
    ["นี่", "คือ", "ไก่", "หรือ", "หมู"],
    ["นี่", "คือ", "หมู", "หรือ", "ไก่"]
  ]
},
{
  th: ["นั่น", "คือ", "หมา", "หรือ", "แมว"],
  rom: ["nân", "keu", "măa", "rĕu", "maew"],
  en: "Is that a dog or a cat?",
  less: 8,
  answers: [
    ["นั่น", "คือ", "หมา", "หรือ", "แมว"],
    ["นั่น", "คือ", "แมว", "หรือ", "หมา"]
  ]
},
{
  th: ["คุณ", "กิน", "ไก่", "หรือ", "ปลา"],
  rom: ["kun", "gin", "gài", "rĕu", "bplaa"],
  en: "Do you eat chicken or fish?",
  less: 8,
  answers: [
    ["คุณ", "กิน", "ไก่", "หรือ", "ปลา"],
    ["คุณ", "กิน", "ปลา", "หรือ", "ไก่"]
  ]
},
{
  th: ["นี่", "ไม่ใช่", "รถยนต์"],
  rom: ["nêe", "mâi châi", "rót yon"],
  en: "This is not a car.",
  less: 8
},
{
  th: ["นี่", "ไม่ใช่", "ผลไม้", "นี่", "คือ", "ผัก"],
  rom: ["nêe", "mâi châi", "pŏn-lá-mái", "nêe", "keu", "pàk"],
  en: "This is not a fruit, this is a vegetable.",
  less: 8
},
{
  th: ["มัน", "ไม่ใช่", "หมู", "มัน", "คือ", "เนื้อ"],
  rom: ["man", "mâi châi", "mŏo", "man", "keu", "néuua"],
  en: "It is not pork, it is beef.",
  less: 8
},
{
  th: ["นั่น", "ไม่ใช่", "แท็กซี่"],
  rom: ["nân", "mâi châi", "táek-sêe"],
  en: "That is not a taxi.",
  less: 8
},
{
  th: ["นั่น", "ไม่ใช่", "รถยนต์", "นั่น", "คือ", "รถตุ๊กๆ"],
  rom: ["nân", "mâi châi", "rót yon", "nân", "keu", "rót túk túk"],
  en: "That is not a car, that is a tuk tuk.",
  less: 8
},
{
  th: ["มัน", "ไม่ใช่", "น้ำ", "มัน", "คือ", "เบียร์"],
  rom: ["man", "mâi châi", "náam", "man", "keu", "bia"],
  en: "It is not water, it is beer.",
  less: 8
},
{
  th: ["นั่น", "คือ", "แมว", "ใช่ไหม"],
  rom: ["nân", "keu", "maew", "châi măi"],
  en: "That is a cat, right?",
  less: 8
},
{
  th: ["นี่", "คือ", "เนื้อ", "ใช่ไหม"],
  rom: ["nêe", "keu", "néuua", "châi măi"],
  en: "This is beef, right?",
  less: 8
},
{
  th: ["ผม", "เป็น", "ครู", "ครับ"],
  rom: ["pŏm", "bpen", "kroo", "kráp"],
  en: "I am a teacher.",
  less: 8
},
{
  th: ["เขา", "อายุ", "30", "ปี", "และ", "เป็น", "คน", "ญี่ปุ่น"],
  rom: ["kăo", "aa-yú", "săam-sìp", "bpee", "láe", "bpen", "kon", "yêe-bpùn"],
  en: "He/she is 30 years old and Japanese.",
  less: 8
},
{
  th: ["ฉัน", "เป็น", "พนักงาน", "ออฟฟิศ"],
  rom: ["chăn", "bpen", "pá-nák ngaan", "óf-fít"],
  en: "I am an office worker.",
  less: 8
},
{
  th: ["ผม", "ชื่อ", "ปีเตอร์", "ผม", "เป็น", "นักธุรกิจ"],
  rom: ["pŏm", "chûu", "Peter", "pŏm", "bpen", "nák tú-rá gìt"],
  en: "My name is Peter. I am a businessman.",
  less: 8
},
{
  th: ["เขา", "เป็น", "หมอ", "อายุ", "สี่สิบ", "ปี"],
  rom: ["kăo", "bpen", "mŏr", "aa-yú", "sèe sìp", "bpee"],
  en: "He/she is a 40 years old doctor.",
  less: 8
},
{
  th: ["เขา", "ไม่ใช่", "หมอ", "เขา", "เป็น", "ตำรวจ"],
  rom: ["kăo", "mâi châi", "mŏr", "kăo", "bpen", "dtam-rùat"],
  en: "He/she is not a doctor, he/she is a police officer.",
  less: 8
},
{
  th: ["เขา", "เป็น", "ตำรวจ", "ฝรั่งเศส"],
  rom: ["kăo", "bpen", "dtam-rùat", "fà-ràng-sèt"],
  en: "He is a French policeman.",
  less: 8
},
{
  th: ["ฉัน", "เป็น", "พยาบาล"],
  rom: ["chăn", "bpen", "pá-yaa-baan"],
  en: "I am a nurse.",
  less: 8
},
{
  th: ["ผม", "อายุ", "21", "ปี", "และ", "เป็น", "นักเรียน"],
  rom: ["pŏm", "aa-yú", "yîi-sìp-èt", "bpee", "láe", "bpen", "nák rian"],
  en: "I am 21 years old and a student.",
  less: 8
},
{
  th: ["เขา", "เป็น", "คนขับรถ"],
  rom: ["kăo", "bpen", "kon kàp rót"],
  en: "He/she is a driver.",
  less: 8
},
{
  th: ["คุณ", "ทำงาน", "อะไร"],
  rom: ["kun", "tam ngaan", "à-rai"],
  en: "What do you do for work?",
  less: 8
},
{
  th: ["ผม", "ไม่ใช่", "ครู", "ผม", "เป็น", "ผู้จัดการ"],
  rom: ["pŏm", "mâi châi", "kroo", "pŏm", "bpen", "pôo-jàt-gaan"],
  en: "I am not a teacher. I'm a manager.",
  less: 8
},
{
  th: ["เขา", "ไม่ใช่", "หมอ", "เขา", "เป็น", "พยาบาล"],
  rom: ["kăo", "mâi châi", "mŏr", "kăo", "bpen", "pá-yaa-baan"],
  en: "He/she is not a doctor, he/she is a nurse.",
  less: 8
},
{
  th: ["เรา", "เป็น", "คน", "อังกฤษ"],
  rom: ["rao", "bpen", "kon", "ang-grìt"],
  en: "We are British.",
  less: 8
},
{
  th: ["ผม", "ชื่อ", "ปีเตอร์", "และ", "เป็น", "โปรแกรมเมอร์"],
  rom: ["pŏm", "chûu", "Peter", "láe", "bpen", "proh-graem-mer"],
  en: "My name is Peter and I am a programmer.",
  less: 8
},
{
  th: ["พวกเขา", "เป็น", "คน", "อเมริกัน"],
  rom: ["pûak kăo", "bpen", "kon", "à-may-rí-gan"],
  en: "They are American.",
  less: 8
},
{
  th: ["เขา", "เป็น", "คน", "ญี่ปุ่น"],
  rom: ["kăo", "bpen", "kon", "yêe-pùn"],
  en: "He/she is Japanese.",
  less: 8
},
{
  th: ["เขา", "ไม่ใช่", "คน", "ไทย"],
  rom: ["kăo", "mâi châi", "kon", "Thai"],
  en: "He/she is not Thai.",
  less: 8
},
{
  th: ["คุณ", "เป็น", "คน", "อังกฤษ", "ใช่ไหม"],
  rom: ["kun", "bpen", "kon", "ang-grìt", "châi măi"],
  en: "You are British, right?",
  less: 8
},
{
  th: ["ผม", "เป็น", "คน", "อังกฤษ", "และ", "เป็น", "ครู"],
  rom: ["pŏm", "bpen", "kon", "ang-grìt", "láe", "bpen", "kroo"],
  en: "I am British and a teacher.",
  less: 8
},
{
  th: ["เขา", "ชื่อ", "เจมส์", "เขา", "เป็น", "นักธุรกิจ"],
  rom: ["kăo", "chûu", "James", "kăo", "bpen", "nák tú-rá gìt"],
  en: "His name is James. He is a businessman.",
  less: 8
},
{
  th: ["เขา", "เป็น", "นักธุรกิจ", "อายุ", "สี่", "สิบ", "ห้า", "ปี"],
  rom: ["kăo", "bpen", "nák tú-rá gìt", "aa-yú", "sèe", "sìp", "hâa", "bpee"],
  en: "He/she is 45 years old and a businessman.",
  less: 8
},
{
  th: ["ผม", "อยู่", "บ้าน", "ครับ"],
  rom: ["pŏm", "yòo", "bâan", "kráp"],
  en: "I am at home. (male speaker)",
  less: 8
},
{
  th: ["ฉัน", "อยู่", "โรงเรียน", "ค่ะ"],
  rom: ["chăn", "yòo", "rohng rian", "kâ"],
  en: "I am at school. (female speaker)",
  less: 8
},
{
  th: ["เขา", "ทำ", "งาน", "ที่", "ออฟฟิศ"],
  rom: ["kăo", "tam", "ngaan", "têe", "óf-fít"],
  en: "He/she is working at the office.",
  less: 8
},
{
  th: ["ฉัน", "เป็น", "ผู้จัดการ", "ที่", "โรงแรม", "ค่ะ"],
  rom: ["chăn", "bpen", "pôo-jàt-gaan", "têe", "rohng raem", "kâ"],
  en: "I am a manager at a hotel.",
  less: 8
},
{
  th: ["เรา", "อยู่", "ร้าน", "อาหาร"],
  rom: ["rao", "yòo", "ráan", "aa-hăan"],
  en: "We are at the restaurant.",
  less: 8
},
{
  th: ["คุณ", "อยู่", "บ้าน", "ไหม"],
  rom: ["kun", "yòo", "bâan", "măi"],
  en: "Are you at home?",
  less: 8
},
{
  th: ["ผม", "ไม่", "อยู่", "บ้าน"],
  rom: ["pŏm", "mâi", "yòo", "bâan"],
  en: "I am not at home.",
  less: 8
},
{
  th: ["พวก", "เขา", "ไม่", "อยู่", "บ้าน"],
  rom: ["pûak", "kăo", "mâi", "yòo", "bâan"],
  en: "They are not at home.",
  less: 8
},
{
  th: ["เขา", "ไม่", "อยู่", "โรงเรียน"],
  rom: ["kăo", "mâi", "yòo", "rohng rian"],
  en: "He/she is not at school.",
  less: 8
},
{
  th: ["เขา", "เรียน", "อยู่", "ที่", "โรงเรียน"],
  rom: ["kăo", "rian", "yòo", "têe", "rohng rian"],
  en: "He/she is studying at the school.",
  less: 8
},
{
  th: ["คุณ", "อยู่", "บ้าน", "หรือ", "ออฟฟิศ"],
  rom: ["kun", "yòo", "bâan", "rĕu", "óf-fít"],
  en: "Are you at home or at work (office)?",
  less: 8,
  answers: [
    ["คุณ", "อยู่", "บ้าน", "หรือ", "ออฟฟิศ"],
    ["คุณ", "อยู่", "ออฟฟิศ", "หรือ", "บ้าน"]
  ]
},
{
  th: ["ผม", "ชื่อ", "ปีเตอร์", "ผม", "เป็น", "คน", "อังกฤษ"],
  rom: ["pŏm", "chûu", "Peter", "pŏm", "bpen", "kon", "ang-grìt"],
  en: "My name is Peter, I am British.",
  less: 8
},
{
  th: ["เขา", "เป็น", "พนักงานออฟฟิศ", "มา", "จาก", "ฝรั่งเศส"],
  rom: ["kăo", "bpen", "pá-nák ngaan óf-fít", "maa", "jàak", "fà-ràng-sèt"],
  en: "She is an office worker from France.",
  less: 8
},
{
  th: ["เขา", "เป็น", "หมอ", "ที่", "โรงพยาบาล"],
  rom: ["kăo", "bpen", "mŏr", "têe", "rohng pá-yaa-baan"],
  en: "He/she is a doctor at a hospital.",
  less: 8
},
{
  th: ["เรา", "กิน", "พิซซ่า", "อยู่"],
  rom: ["rao", "gin", "pít-sâa", "yòo"],
  en: "We are eating a pizza. (right now)",
  less: 8
},
{
  th: ["ฉัน", "ทำงาน", "อยู่", "ที่", "ออฟฟิศ"],
  rom: ["chăn", "tam ngaan", "yòo", "têe", "òp-fít"],
  en: "I'm working at the office.",
  less: 8
},
{
  th: ["ผม", "เรียน", "ภาษา", "ไทย", "อยู่", "ที่", "บ้าน"],
  rom: ["pŏm", "rian", "paa-săa", "Thai", "yòo", "têe", "bâan"],
  en: "I'm studying Thai at home.",
  less: 8
},
{
  th: ["เขา", "เป็น", "โปรแกรมเมอร์", "มา", "จาก", "จีน"],
  rom: ["kăo", "bpen", "proh-graem-mêr", "maa", "jàak", "jeen"],
  en: "He is a programmer from China.",
  less: 8
},
{
  th: ["คุณ", "เหนื่อย", "หรือ", "เศร้า"],
  rom: ["kun", "nèuay", "rĕu", "sâo"],
  en: "Are you tired or sad?",
  less: 8
},

{
  th: ["คุณ", "กลัว", "หรือ", "ตื่นเต้น"],
  rom: ["kun", "glua", "rĕu", "dtèun dtên"],
  en: "Are you scared or excited?",
  less: 8
},

{
  th: ["ฉัน", "เป็น", "คนขาย", "ที่", "ห้าง"],
  rom: ["chăn", "bpen", "kon kăai", "têe", "hâang"],
  en: "I'm a shopkeeper at a mall.",
  less: 8
},

{
  th: ["ฉัน", "เป็น", "พนักงานเสิร์ฟ", "ที่", "ร้าน", "กาแฟ"],
  rom: ["chăn", "bpen", "pá-nák-ngaan sèrf", "têe", "ráan", "gaa-fae"],
  en: "I'm a waitress at a cafe.",
  less: 8
},
{
  th: ["เรา", "พักผ่อน", "อยู่", "ที่", "บ้าน"],
  rom: ["rao", "pák pòn", "yòo", "têe", "bâan"],
  en: "We're resting at home.",
  less: 8
},
{
  th: ["คุณ", "ดู", "โกรธ", "เป็น", "อะไร"],
  rom: ["kun", "doo", "gròht", "bpen", "à-rai"],
  en: "You look angry. What's the matter?",
  less: 8
},
{
  th: ["คุณ", "ดู", "เหนื่อย", "เป็น", "อะไร"],
  rom: ["kun", "doo", "nèuay", "bpen", "à-rai"],
  en: "You look sad. What's the matter?",
  less: 8
},
{
  th: ["ขอโทษ", "ครับ", "ห้องน้ำ", "อยู่", "ไหน", "ครับ"],
  rom: ["kŏr tôht", "kráp", "hông náam", "yòo", "năi", "kráp"],
  en: "Excuse me. Where is the bathroom?",
  less: 8
},
{
  th: ["เมื่อวาน", "ไป", "ทำ", "งาน", "ใช่", "ไหม"],
  rom: ["mêua waan", "bpai", "tam", "ngaan", "châi", "măi"],
  en: "You went to work yesterday, right?",
  less: 8
},
{
  th: ["เมื่อวาน", "เรา", "ไม่ได้", "อยู่", "บ้าน"],
  rom: ["mêua waan", "rao", "mâi dâai", "yòo", "bâan"],
  en: "Yesterday we weren't at home.",
  less: 8
},
{
  th: ["เมื่อวาน", "ผม", "ไม่ได้", "ไป", "ทำ", "งาน"],
  rom: ["mêua waan", "pŏm", "mâi dâai", "bpai", "tam", "ngaan"],
  en: "Yesterday I didn't go to work.",
  less: 8
},
{
  th: ["เมื่อวาน", "ฉัน", "ไม่ได้", "เรียน", "ภาษาไทย"],
  rom: ["mêua waan", "chăn", "mâi dâai", "rian", "paa-săa thai"],
  en: "Yesterday I didn't study Thai.",
  less: 8
},
{
  th: ["เมื่อคืน", "ทำ", "อะไร", "ครับ"],
  rom: ["mêua keun", "tam", "à-rai", "kráp"],
  en: "What did you do last night?",
  less: 8
},
{
  th: ["เมื่อวาน", "ฉัน", "กิน", "อาหาร", "อิตาเลียน"],
  rom: ["mêua waan", "chăn", "gin", "aa-hăan", "ì-dtaa-lian"],
  en: "Yesterday I ate Italian food.",
  less: 8
},
{
  th: ["เมื่อคืน", "ผม", "ดู", "หนัง", "ไทย"],
  rom: ["mêua keun", "pŏm", "doo", "năng", "thai"],
  en: "Last night I watched a Thai movie.",
  less: 8
},
{
  th: ["เมื่อคืน", "ฉัน", "เรียน", "ภาษาไทย", "แล้ว", "ก็", "กิน", "พิซซ่า"],
  rom: ["mêua keun", "chăn", "rian", "paa-săa thai", "láew", "gôr", "gin", "pít-sâa"],
  en: "Last night I studied Thai and then ate pizza.",
  less: 8
},
{
  th: ["เมื่อวาน", "ผม", "ทำ", "งาน", "แล้ว", "ก็", "เล่น", "เกม", "ที่", "บ้าน"],
  rom: ["mêua waan", "pŏm", "tam", "ngaan", "láew", "gôr", "lên", "gem", "têe", "bâan"],
  en: "Yesterday I worked and then played games at home.",
  less: 8
},
{
  th: ["เมื่อวาน", "ฉัน", "ทำ", "งาน", "ที่", "บ้าน"],
  rom: ["mêua waan", "chăn", "tam", "ngaan", "têe", "bâan"],
  en: "Yesterday I worked at home.",
  less: 8
},

// ===== LESSON 9 (Adjectives) =====
{
  th: ["อาหาร", "ไทย", "เผ็ด", "มาก"],
  rom: ["aa-hăan", "Thai", "pèt", "mâak"],
  en: "Thai food is very spicy.",
  less: 9
},
{
  th: ["ผม", "ชอบ", "กิน", "อาหาร", "เผ็ด"],
  rom: ["pŏm", "chôp", "gin", "aa-hăan", "pèt"],
  en: "I like to eat spicy food.",
  less: 9
},
{
  th: ["ฉัน", "ไม่", "ชอบ", "กิน", "อาหาร", "เผ็ด"],
  rom: ["chăn", "mâi", "chôp", "gin", "aa-hăan", "pèt"],
  en: "I don't like to eat spicy food.",
  less: 9
},
{
  th: ["เขา", "ใจดี", "และ", "ตลก", "มาก"],
  rom: ["kăo", "jai dee", "láe", "dtà-lòk", "mâak"],
  en: "He/she is very kind.",
  less: 9
},
{
  th: ["คน", "ไทย", "ใจดี", "มาก"],
  rom: ["kon", "Thai", "jai dee", "mâak"],
  en: "Thai people are very kind.",
  less: 9
},
{
  th: ["เขา", "หล่อ", "และ", "ฉลาด", "มาก", "ค่ะ"],
  rom: ["kăo", "lòr", "láe", "chà-làat", "mâak", "kâ"],
  en: "He is very handsome and smart. (female speaker)",
  less: 9
},
{
  th: ["คุณ", "ตลก", "มาก", "ค่ะ"],
  rom: ["kun", "dtà-lòk", "mâak", "kâ"],
  en: "You are very funny. (female speaker)",
  less: 9
},
{
  th: ["เขา", "ไม่", "ตลก"],
  rom: ["kăo", "mâi", "dtà-lòk"],
  en: "He/she is not funny.",
  less: 9
},
{
  th: ["พวกเขา", "ไม่", "ฉลาด"],
  rom: ["pûak kăo", "mâi", "chà-làat"],
  en: "They are not smart.",
  less: 9
},
{
  th: ["เขา", "ฉลาด", "และ", "ตลก"],
  rom: ["kăo", "chà-làat", "láe", "dtà-lòk"],
  en: "He/she is smart and funny.",
  less: 9,
  answers: [
    ["เขา", "ฉลาด", "และ", "ตลก"],
    ["เขา", "ตลก", "และ", "ฉลาด"]
  ]
},
{
  th: ["คุณ", "สวย", "และ", "ใจดี"],
  rom: ["kun", "sŭay", "láe", "jai dee"],
  en: "You are beautiful and kind.",
  less: 9,
  answers: [
    ["คุณ", "สวย", "และ", "ใจดี"],
    ["คุณ", "ใจดี", "และ", "สวย"]
  ]
},
{
  th: ["เขา", "สวย", "แต่", "หยาบคาย"],
  rom: ["kăo", "sŭay", "dtàe", "yàap kaai"],
  en: "She is beautiful, but rude.",
  less: 9
},
{
  th: ["อาหาร", "อร่อย", "แต่", "แพง", "มาก"],
  rom: ["aa-hăan", "à-ròi", "dtàe", "paeng", "mâak"],
  en: "The food is delicious, but very expensive.",
  less: 9
},
{
  th: ["ร้านอาหาร", "นี่", "แพง", "มาก"],
  rom: ["ráan aa-hăan", "nêe", "paeng", "mâak"],
  en: "This restaurant is very expensive.",
  less: 9
},
{
  th: ["อาหาร", "ที่", "ร้าน", "นี่", "อร่อย"],
  rom: ["aa-hăan", "têe", "ráan", "nêe", "à-ròi"],
  en: "The food at this restaurant is delicious.",
  less: 9
},
{
  th: ["ผม", "กิน", "พิซซ่า", "อร่อย", "มาก"],
  rom: ["pŏm", "gin", "pít-sâa", "à-ròi", "mâak"],
  en: "I am eating a very delicious pizza.",
  less: 9
},
{
  th: ["อากาศ", "ที่", "กรุงเทพ", "ร้อน", "มาก"],
  rom: ["aa-gàat", "têe", "krung-têp", "rón", "mâak"],
  en: "The weather in Bangkok is very hot.",
  less: 9
},
{
  th: ["อากาศ", "ที่", "ญี่ปุ่น", "หนาว", "มาก"],
  rom: ["aa-gàat", "têe", "yêe-pùn", "năao", "mâak"],
  en: "The weather in Japan is very cold.",
  less: 9
},
{
  th: ["คุณ", "ชอบ", "อากาศ", "ร้อน", "หรือ", "อากาศ", "หนาว"],
  rom: ["kun", "chôp", "aa-gàat", "rón", "rĕu", "aa-gàat", "năao"],
  en: "Do you like hot weather or cold weather?",
  less: 9,
  answers: [
    ["คุณ", "ชอบ", "อากาศ", "ร้อน", "หรือ", "อากาศ", "หนาว"],
    ["คุณ", "ชอบ", "อากาศ", "หนาว", "หรือ", "อากาศ", "ร้อน"]
  ]
},
{
  th: ["ฉัน", "ชอบ", "ชาเย็น", "มาก"],
  rom: ["chăn", "chôp", "chaa yen", "mâak"],
  en: "I like iced tea very much.",
  less: 9
},
{
  th: ["อาหาร", "ที่", "นี่", "ถูก", "และ", "อร่อย"],
  rom: ["aa-hăan", "têe", "nêe", "tòok", "láe", "à-ròi"],
  en: "The food here is cheap and delicious.",
  less: 9,
  answers: [
    ["อาหาร", "ที่", "นี่", "ถูก", "และ", "อร่อย"],
    ["อาหาร", "ที่", "นี่", "อร่อย", "และ", "ถูก"]
  ]
},
{
  th: ["แมว", "น่ารัก", "มาก"],
  rom: ["maew", "nâa-rák", "mâak"],
  en: "The cat is very cute.",
  less: 9
},
{
  th: ["เขา", "เป็น", "ผู้หญิง", "สวย"],
  rom: ["kăo", "bpen", "pôo yĭng", "sŭay"],
  en: "She is a beautiful woman.",
  less: 9
},
{
  th: ["เขา", "เป็น", "ผู้ชาย", "ฉลาด"],
  rom: ["kăo", "bpen", "pôo chaai", "chà-làat"],
  en: "He is a smart man.",
  less: 9
},
{
  th: ["เขา", "เป็น", "เด็ก", "น่ารัก"],
  rom: ["kăo", "bpen", "dèk", "nâa-rák"],
  en: "He/she is a cute kid.",
  less: 9
},
{
  th: ["ผม", "ชอบ", "ดู", "หนัง", "ตลก"],
  rom: ["pŏm", "chôp", "doo", "năng", "dtà-lòk"],
  en: "I like to watch funny movies.",
  less: 9
},
{
  th: ["เขา", "เป็น", "คน", "ตลก"],
  rom: ["kăo", "bpen", "kon", "dtà-lòk"],
  en: "He/she is a funny person.",
  less: 9
},
{
  th: ["คุณ", "เป็น", "คน", "ใจดี", "มาก"],
  rom: ["kun", "bpen", "kon", "jai dee", "mâak"],
  en: "You are a very kind person.",
  less: 9
},
{
  th: ["เขา", "เป็น", "คน", "ฉลาด", "ใช่ไหม"],
  rom: ["kăo", "bpen", "kon", "chà-làat", "châi măi"],
  en: "He/she is a smart person, right?",
  less: 9
},
{
  th: ["ภาษาไทย", "ยาก", "มาก"],
  rom: ["paa-săa Thai", "yâak", "mâak"],
  en: "Thai language is very difficult.",
  less: 9
},
{
  th: ["บทเรียน", "นี่", "ไม่", "ยาก"],
  rom: ["bòt-rian", "nêe", "mâi", "yâak"],
  en: "This lesson is not difficult.",
  less: 9
},
{
  th: ["ภาษา", "ไทย", "ง่าย", "หรือ", "ยาก"],
  rom: ["paa-săa", "Thai", "ngâai", "rĕu", "yâak"],
  en: "Is Thai language easy or difficult?",
  less: 9,
  answers: [
    ["ภาษา", "ไทย", "ง่าย", "หรือ", "ยาก"],
    ["ภาษา", "ไทย", "ยาก", "หรือ", "ง่าย"]
  ]
},
{
  th: ["ทำไม", "คุณ", "เรียน", "ภาษาไทย"],
  rom: ["tam-mai", "kun", "rian", "paa-săa Thai"],
  en: "Why do you study Thai?",
  less: 9
},
{
  th: ["ทำไม", "คุณ", "ไม่", "กิน"],
  rom: ["tam-mai", "kun", "mâi", "gin"],
  en: "Why don't you eat?",
  less: 9
},
{
  th: ["ผม", "ชอบ", "เขา", "เพราะ", "เขา", "ตลก", "มาก"],
  rom: ["pŏm", "chôp", "kăo", "prór", "kăo", "dtà-lòk", "mâak"],
  en: "I like him/her because he/she is very funny.",
  less: 9
},
{
  th: ["ผม", "เรียน", "ภาษาไทย", "เพราะ", "ผม", "ชอบ", "ประเทศไทย"],
  rom: ["pŏm", "rian", "paa-săa Thai", "prór", "pŏm", "chôp", "bprà-têt Thai"],
  en: "I study Thai because I like Thailand.",
  less: 9
},
{
  th: ["ผม", "ชอบ", "คุณ", "เพราะ", "คุณ", "ฉลาด", "ตลก", "และ", "สวย"],
  rom: ["pŏm", "chôp", "kun", "prór", "kun", "chà-làat", "dtà-lòk", "láe", "sŭay"],
  en: "I like you because you are smart, funny and beautiful.",
  less: 9,
  answers: [
    ["ผม", "ชอบ", "คุณ", "เพราะ", "คุณ", "ฉลาด", "ตลก", "และ", "สวย"],
    ["ผม", "ชอบ", "คุณ", "เพราะ", "คุณ", "ฉลาด", "สวย", "และ", "ตลก"],
    ["ผม", "ชอบ", "คุณ", "เพราะ", "คุณ", "ตลก", "ฉลาด", "และ", "สวย"],
    ["ผม", "ชอบ", "คุณ", "เพราะ", "คุณ", "ตลก", "สวย", "และ", "ฉลาด"],
    ["ผม", "ชอบ", "คุณ", "เพราะ", "คุณ", "สวย", "ฉลาด", "และ", "ตลก"],
    ["ผม", "ชอบ", "คุณ", "เพราะ", "คุณ", "สวย", "ตลก", "และ", "ฉลาด"]
  ]
},
{
  th: ["เธอ", "สวย", "และ", "ใจดี", "มาก"],
  rom: ["ter", "sŭay", "láe", "jai dee", "mâak"],
  en: "You are beautiful and very kind. (informal)",
  less: 9
},
{
  th: ["เธอ", "ดู", "เด็ก", "มาก"],
  rom: ["ter", "doo", "dèk", "mâak"],
  en: "You look very young. (informal)",
  less: 9
},
{
  th: ["หนัง", "น่าเบื่อ", "มาก", "เลย"],
  rom: ["năng", "nâa bèua", "mâak", "loie"],
  en: "The movie is very boring.",
  less: 9
},
{
  th: ["ฉัน", "กลัว", "เพราะ", "หนัง", "น่ากลัว", "เลย"],
  rom: ["chăn", "glue", "prór", "năng", "nâa glua", "mâak"],
  en: "I'm scared because the movie is very scary.",
  less: 9
},
{
  th: ["ทำไม", "คุณ", "เศร้า"],
  rom: ["tam-mai", "kun", "sâo"],
  en: "Why are you sad?",
  less: 9
},
{
  th: ["ทำไม", "คุณ", "โกรธ"],
  rom: ["tam-mai", "kun", "gròht"],
  en: "Why are you angry?",
  less: 9
},
{
  th: ["ทำไม", "คุณ", "ตื่นเต้น", "มาก"],
  rom: ["tam-mai", "kun", "dtùen dtên", "mâak"],
  en: "Why are you so excited?",
  less: 9
},
{
  th: ["ฉัน", "อยู่", "บ้าน", "เพราะ", "ไม่", "สบาย"],
  rom: ["chăn", "yòo", "bâan", "prór", "mâi", "sà-baai"],
  en: "I'm at home, because I don't feel well.",
  less: 9
},

// ===== LESSON 10 (Market, Taxi) =====
{
  th: ["นี่", "เท่าไหร่", "ครับ"],
  rom: ["nêe", "tâo rài", "kráp"],
  en: "How much is this?",
  less: 10
},
{
  th: ["นั่น", "เท่าไหร่", "คะ"],
  rom: ["nân", "tâo rài", "ká"],
  en: "How much is that?",
  less: 10
},
{
  th: ["เสื้อ", "นี่", "เท่าไหร่", "ครับ"],
  rom: ["sêuua", "nêe", "tâo rài", "kráp"],
  en: "How much is this shirt?",
  less: 10
},
{
  th: ["อันนี้", "แพง", "เกินไป"],
  rom: ["an nêe", "paeng", "gern bpai"],
  en: "This one is too expensive.",
  less: 10
},
{
  th: ["แพง", "เกินไป", "ลด", "ได้", "ไหม", "ครับ"],
  rom: ["paeng", "gern bpai", "lót", "dâai", "măi", "kráp"],
  en: "Too expensive. Can you lower the price?",
  less: 10
},
{
  th: ["ลด", "ได้", "ไหม", "คะ"],
  rom: ["lót", "dâai", "măi", "ká"],
  en: "Can you lower the price?",
  less: 10
},
{
  th: ["สอง", "ร้อย", "ได้", "ไหม", "ครับ"],
  rom: ["sŏng", "rói", "dâai", "măi", "kráp"],
  en: "Can you do 200? (bargaining)",
  less: 10
},
{
  th: ["หนึ่ง", "ร้อย", "ห้าสิบ", "บาท", "ได้", "ไหม", "ครับ"],
  rom: ["nèung", "rói", "hâa-sìp", "bàat", "dâai", "măi", "kráp"],
  en: "Can you do 150 baht? (bargaining)",
  less: 10
},
{
  th: ["แปดสิบ", "บาท", "ได้", "ไหม", "คะ"],
  rom: ["bpàet-sìp", "bàat", "dâai", "măi", "ká"],
  en: "Can you do 80 baht? (bargaining)",
  less: 10
},
{
  th: ["ขอโทษ", "ครับ", "นี่", "เท่าไหร่"],
  rom: ["kŏr tôht", "kráp", "nêe", "tâo rài"],
  en: "Excuse me, how much is this?",
  less: 10
},
{
  th: ["อาหาร", "นี่", "แพง", "เกินไป"],
  rom: ["aa-hăan", "nêe", "paeng", "gern bpai"],
  en: "This food is too expensive.",
  less: 10
},
{
  th: ["เสื้อ", "นี่", "ถูก", "และ", "สวย"],
  rom: ["sêuua", "nêe", "tòok", "láe", "sŭay"],
  en: "This shirt is cheap and beautiful.",
  less: 10,
  answers: [
    ["เสื้อ", "นี่", "ถูก", "และ", "สวย"],
    ["เสื้อ", "นี่", "สวย", "และ", "ถูก"]
  ]
},
{
  th: ["ผม", "ลอง", "ได้", "ไหม", "ครับ"],
  rom: ["pŏm", "long", "dâai", "măi", "kráp"],
  en: "Can I try it on?",
  less: 10
},
{
  th: ["ผม", "กิน", "เผ็ด", "ไม่", "ได้"],
  rom: ["pŏm", "gin", "pèt", "mâi", "dâai"],
  en: "I can't eat spicy food.",
  less: 10
},
{
  th: ["ฉัน", "กิน", "เผ็ด", "ได้", "ค่ะ"],
  rom: ["chăn", "gin", "pèt", "dâai", "kâ"],
  en: "I can eat spicy food.",
  less: 10
},
{
  th: ["คุณ", "กิน", "เผ็ด", "ได้", "ไหม"],
  rom: ["kun", "gin", "pèt", "dâai", "măi"],
  en: "Can you eat spicy food?",
  less: 10
},
{
  th: ["ผม", "พูด", "ภาษาไทย", "ได้", "นิดหน่อย"],
  rom: ["pŏm", "pôot", "paa-săa Thai", "dâai", "nít nòi"],
  en: "I can speak Thai a little bit.",
  less: 10
},
{
  th: ["ฉัน", "พูด", "ภาษาอังกฤษ", "ได้", "ค่ะ"],
  rom: ["chăn", "pôot", "paa-săa ang-grìt", "dâai", "kâ"],
  en: "I can speak English.",
  less: 10
},
{
  th: ["เขา", "พูด", "ภาษาไทย", "ไม่", "ได้"],
  rom: ["kăo", "pôot", "paa-săa Thai", "mâi", "dâai"],
  en: "He/she can't speak Thai.",
  less: 10
},
{
  th: ["คุณ", "พูด", "ภาษาอังกฤษ", "ได้", "ไหม"],
  rom: ["kun", "pôot", "paa-săa ang-grìt", "dâai", "măi"],
  en: "Can you speak English?",
  less: 10
},
{
  th: ["ฉัน", "ทำอาหาร", "ได้", "อร่อย", "มาก"],
  rom: ["chăn", "tam aa-hăan", "dâai", "à-ròi", "mâak"],
  en: "I can cook very well.",
  less: 10
},
{
  th: ["ผม", "ไป", "ได้", "ครับ"],
  rom: ["pŏm", "bpai", "dâai", "kráp"],
  en: "I can go.",
  less: 10
},
{
  th: ["ฉัน", "ไป", "ไม่", "ได้", "ค่ะ"],
  rom: ["chăn", "bpai", "mâi", "dâai", "kâ"],
  en: "I can't go.",
  less: 10
},
{
  th: ["เขา", "ไป", "ตลาด", "ไม่", "ได้"],
  rom: ["kăo", "bpai", "dtà-làat", "mâi", "dâai"],
  en: "He/she can't go to the market.",
  less: 10
},
{
  th: ["ไป", "สนามบิน", "เท่าไหร่", "ครับ"],
  rom: ["bpai", "sà-năam bin", "tâo rài", "kráp"],
  en: "How much to go to the airport?",
  less: 10
},
{
  th: ["ไป", "พัทยา", "เท่าไหร่", "คะ"],
  rom: ["bpai", "Pattaya", "tâo rài", "ká"],
  en: "How much to go to Pattaya?",
  less: 10
},
{
  th: ["ไป", "ตลาด", "เท่าไหร่", "ครับ"],
  rom: ["bpai", "dtà-làat", "tâo rài", "kráp"],
  en: "How much to go to the market?",
  less: 10
},
{
  th: ["แพง", "เกินไป", "สอง", "ร้อย", "บาท", "ได้", "ไหม", "ครับ"],
  rom: ["paeng", "gern bpai", "sŏng", "rói", "bàat", "dâai", "măi", "kráp"],
  en: "Too expensive. Can you do 200 baht?",
  less: 10
},
{
  th: ["ตรง", "ไป", "แล้ว", "เลี้ยว", "ขวา"],
  rom: ["dtrong", "bpai", "láew", "líao", "kwăa"],
  en: "Go straight and then turn right.",
  less: 10
},
{
  th: ["จอด", "ตรง", "นี่", "ครับ"],
  rom: ["jòt", "dtrong", "nêe", "kráp"],
  en: "Stop here.",
  less: 10
},
{
  th: ["จอด", "ตรง", "นั่น", "ค่ะ"],
  rom: ["jòt", "dtrong", "nân", "kâ"],
  en: "Stop over there.",
  less: 10
},
{
  th: ["ผม", "อยู่", "ตลาด", "ครับ"],
  rom: ["pŏm", "yòo", "dtà-làat", "kráp"],
  en: "I am at the market.",
  less: 10
},
{
  th: ["ผม", "ซื้อ", "อาหาร", "และ", "เครื่องดื่ม"],
  rom: ["pŏm", "séu", "aa-hăan", "láe", "krêuang dèum"],
  en: "I buy food and drinks.",
  less: 10,
  answers: [
    ["ผม", "ซื้อ", "อาหาร", "และ", "เครื่องดื่ม"],
    ["ผม", "ซื้อ", "เครื่องดื่ม", "และ", "อาหาร"]
  ]
},
{
  th: ["เขา", "อยู่", "ตลาด", "และ", "ซื้อ", "ผลไม้"],
  rom: ["kăo", "yòo", "dtà-làat", "láe", "séu", "pŏn-lá-mái"],
  en: "He/she is at the market and buying fruit.",
  less: 10
},
{
  th: ["อาหาร", "ที่", "ตลาด", "ถูก", "และ", "อร่อย"],
  rom: ["aa-hăan", "têe", "dtà-làat", "tòok", "láe", "à-ròi"],
  en: "The food at the market is cheap and delicious.",
  less: 10,
  answers: [
    ["อาหาร", "ที่", "ตลาด", "ถูก", "และ", "อร่อย"],
    ["อาหาร", "ที่", "ตลาด", "อร่อย", "และ", "ถูก"]
  ]
},
{
  th: ["ภาษา", "ไทย", "ยาก", "เกินไป"],
  rom: ["paa-săa", "thai", "yâak", "gern bpai"],
  en: "Thai language is too difficult.",
  less: 10
},
{
  th: ["อร่อย", "แต่", "เผ็ด", "เกินไป"],
  rom: ["à-ròi", "dtàe", "pèt", "gern bpai"],
  en: "It's delicious, but it's too spicy.",
  less: 10
},

// ===== LESSON 11 (Possession) =====
{
  th: ["รถ", "ของ", "คุณ", "สวย", "มาก"],
  rom: ["rót", "kŏng", "kun", "sŭay", "mâak"],
  en: "Your car is very beautiful.",
  less: 11
},
{
  th: ["หมา", "ของ", "คุณ", "น่ารัก", "มาก"],
  rom: ["măa", "kŏng", "kun", "nâa-rák", "mâak"],
  en: "Your dog is very cute.",
  less: 11
},
{
  th: ["ครู", "ของ", "ผม", "ดี", "มาก"],
  rom: ["kroo", "kŏng", "pŏm", "dee", "mâak"],
  en: "My teacher is very good.",
  less: 11
},
{
  th: ["แม่", "ของ", "ฉัน", "สวย", "มาก"],
  rom: ["mâe", "kŏng", "chăn", "sŭay", "mâak"],
  en: "My mother is very beautiful.",
  less: 11
},
{
  th: ["พ่อ", "ของ", "คุณ", "ตลก", "มาก"],
  rom: ["pôr", "kŏng", "kun", "dtà-lòk", "mâak"],
  en: "Your father is very funny.",
  less: 11
},
{
  th: ["ลูก", "ของ", "คุณ", "น่ารัก", "มาก"],
  rom: ["lôok", "kŏng", "kun", "nâa-rák", "mâak"],
  en: "Your child is very cute.",
  less: 11
},
{
  th: ["พ่อแม่", "ของ", "ผม", "ฉลาด", "และ", "ใจดี"],
  rom: ["pôr mâe", "kŏng", "pŏm", "chà-làat", "láe", "jai dee"],
  en: "My parents are smart and kind.",
  less: 11,
  answers: [
    ["พ่อแม่", "ของ", "ผม", "ฉลาด", "และ", "ใจดี"],
    ["พ่อแม่", "ของ", "ผม", "ใจดี", "และ", "ฉลาด"]
  ]
},
{
  th: ["โทรศัพท์", "ของ", "ฉัน", "ช้า", "มาก"],
  rom: ["toh-rá-sàp", "kŏng", "chăn", "cháa", "mâak"],
  en: "My phone is very slow.",
  less: 11
},
{
  th: ["รถ", "ของ", "ผม", "เร็ว", "มาก"],
  rom: ["rót", "kŏng", "pŏm", "reo", "mâak"],
  en: "My car is very fast.",
  less: 11
},
{
  th: ["บ้าน", "ของ", "คุณ", "ใหญ่", "และ", "สวย", "มาก"],
  rom: ["bâan", "kŏng", "kun", "yài", "láe", "sŭay", "mâak"],
  en: "Your house is big and very beautiful.",
  less: 11,
  answers: [
    ["บ้าน", "ของ", "คุณ", "ใหญ่", "และ", "สวย", "มาก"],
    ["บ้าน", "ของ", "คุณ", "สวย", "และ", "ใหญ่", "มาก"]
  ]
},
{
  th: ["พูด", "ช้าๆ", "ได้", "ไหม"],
  rom: ["pôot", "cháa cháa", "dâai", "măi"],
  en: "Can you speak slowly?",
  less: 11
},
{
  th: ["นี่", "คือ", "รถ", "ของ", "ผม"],
  rom: ["nêe", "keu", "rót", "kŏng", "pŏm"],
  en: "This is my car.",
  less: 11
},
{
  th: ["นั่น", "คือ", "บ้าน", "ของ", "ฉัน"],
  rom: ["nân", "keu", "bâan", "kŏng", "chăn"],
  en: "That is my house.",
  less: 11
},
{
  th: ["เขา", "เป็น", "แฟน", "ผม"],
  rom: ["kăo", "bpen", "faen", "pŏm"],
  en: "She is my girlfriend.",
  less: 11
},
{
  th: ["นี่", "คือ", "โทรศัพท์", "ของ", "คุณ", "ใช่ไหม"],
  rom: ["nêe", "keu", "toh-rá-sàp", "kŏng", "kun", "châi măi"],
  en: "This is your phone, right?",
  less: 11
},
{
  th: ["กุญแจ", "อยู่", "ที่", "ห้อง", "ของ", "ผม"],
  rom: ["gun-jae", "yòo", "têe", "hông", "kŏng", "pŏm"],
  en: "The key is in my room.",
  less: 11
},
{
  th: ["แม่", "ของ", "ฉัน", "ชอบ", "ทำอาหาร"],
  rom: ["mâe", "kŏng", "chăn", "chôp", "tam aa-hăan"],
  en: "My mother likes to cook.",
  less: 11
},
{
  th: ["แฟน", "ของ", "ผม", "อายุ", "ยี่สิบห้า", "ปี"],
  rom: ["faen", "kŏng", "pŏm", "aa-yú", "yêe-sìp-hâa", "bpee"],
  en: "My girlfriend is 25 years old.",
  less: 11
},
{
  th: ["แมว", "ของ", "ฉัน", "ไม่", "ชอบ", "ดื่ม", "นม"],
  rom: ["maew", "kŏng", "chăn", "mâi", "chôp", "dèum", "nom"],
  en: "My cat doesn't like to drink milk.",
  less: 11
},
{
  th: ["ทำไม", "คุณ", "ชอบ", "งาน", "ของ", "คุณ"],
  rom: ["tam-mai", "kun", "chôp", "ngaan", "kŏng", "kun"],
  en: "Why do you like your job?",
  less: 11,
  answers: [
    ["ทำไม", "คุณ", "ชอบ", "งาน", "ของ", "คุณ"],
    ["คุณ", "ชอบ", "งาน", "ของ", "คุณ", "ทำไม"]
  ]
},
{
  th: ["แฟน", "ของ", "ผม", "มาจาก", "อเมริกา"],
  rom: ["faen", "kŏng", "pŏm", "maa jàak", "à-may-rí-gaa"],
  en: "My girlfriend is from America.",
  less: 11
},
{
  th: ["แฟน", "ของ", "ผม", "เป็น", "คน", "อเมริกา"],
  rom: ["faen", "kŏng", "pŏm", "bpen", "kon", "à-may-rí-gan"],
  en: "My girlfriend is American.",
  less: 11
},
{
  th: ["ภรรยา", "ของ", "ผม", "เป็น", "คน", "ไทย"],
  rom: ["pan-rá-yaa", "kŏng", "pŏm", "bpen", "kon", "Thai"],
  en: "My wife is Thai.",
  less: 11
},
{
  th: ["สามี", "ของ", "ฉัน", "เป็น", "คน", "อเมริกา"],
  rom: ["săa-mee", "kŏng", "chăn", "bpen", "kon", "à-may-rí-gan"],
  en: "My husband is American.",
  less: 11
},
{
  th: ["แม่", "ของ", "ผม", "เป็น", "ครู"],
  rom: ["mâe", "kŏng", "pŏm", "bpen", "kroo"],
  en: "My mother is a teacher.",
  less: 11
},
{
  th: ["พ่อ", "ของ", "ฉัน", "เป็น", "หมอ"],
  rom: ["pôr", "kŏng", "chăn", "bpen", "mŏr"],
  en: "My father is a doctor.",
  less: 11
},
{
  th: ["ผม", "รัก", "ภรรยา", "ของ", "ผม"],
  rom: ["pŏm", "rák", "pan-rá-yaa", "kŏng", "pŏm"],
  en: "I love my wife.",
  less: 11
},
{
  th: ["แม่", "ของ", "คุณ", "อายุ", "เท่าไหร่"],
  rom: ["mâe", "kŏng", "kun", "aa-yú", "tâo rài"],
  en: "How old is your mother?",
  less: 11
},
{
  th: ["แม่", "ของ", "คุณ", "ชื่อ", "อะไร"],
  rom: ["mâe", "kŏng", "kun", "chûu", "à-rai"],
  en: "What is your mother's name?",
  less: 11
},
{
  th: ["พ่อ", "ของ", "คุณ", "ชื่อ", "อะไร"],
  rom: ["pôr", "kŏng", "kun", "chûu", "à-rai"],
  en: "What is your father's name?",
  less: 11
},
{
  th: ["แฟน", "ของ", "ผม", "ชื่อ", "โซฟี"],
  rom: ["faen", "kŏng", "pŏm", "chûu", "Sophie"],
  en: "My girlfriend's name is Sophie.",
  less: 11
},
{
  th: ["แล้ว", "แฟน", "ของ", "คุณ", "ล่ะ"],
  rom: ["láew", "faen", "kŏng", "kun", "lâ"],
  en: "And what about your girlfriend?",
  less: 11
},
{
  th: ["แล้ว", "พ่อ", "ของ", "คุณ", "ล่ะ"],
  rom: ["láew", "pôr", "kŏng", "kun", "lâ"],
  en: "And what about your father?",
  less: 11
},
{
  th: ["เพื่อน", "ของ", "ผม", "ใจดี", "และ", "ตลก"],
  rom: ["pêuan", "kŏng", "pŏm", "jai dee", "láe", "dtà-lòk"],
  en: "My friend is kind and funny.",
  less: 11,
  answers: [
    ["เพื่อน", "ของ", "ผม", "ใจดี", "และ", "ตลก"],
    ["เพื่อน", "ของ", "ผม", "ตลก", "และ", "ใจดี"]
  ]
},
{
  th: ["เพื่อน", "ของ", "ฉัน", "พูด", "ภาษาไทย", "ได้"],
  rom: ["pêuan", "kŏng", "chăn", "pôot", "paa-săa Thai", "dâai"],
  en: "My friend can speak Thai.",
  less: 11
},
{
  th: ["พ่อ", "ของ", "แฟน", "ผม", "อายุ", "แปดสิบ", "ปี"],
  rom: ["pôr", "kŏng", "faen", "pŏm", "aa-yú", "bpàet-sìp", "bpee"],
  en: "My girlfriend's father is 80 years old.",
  less: 11
},
{
  th: ["ผม", "ซื้อ", "ของ", "ที่", "ตลาด"],
  rom: ["pŏm", "séu", "kŏng", "têe", "dtà-làat"],
  en: "I buy stuff at the market.",
  less: 11
},
{
  th: ["ครอบครัว", "ของ", "ผม", "อยู่", "ที่", "อเมริกา"],
  rom: ["krôp krua", "kŏng", "pŏm", "yòo", "têe", "à-may-rí-gaa"],
  en: "My family is in America.",
  less: 11
},
{
  th: ["ลูกชาย", "ของ", "ฉัน", "เป็น", "หมอ"],
  rom: ["lôok chaai", "kŏng", "chăn", "bpen", "mŏr"],
  en: "My son is a doctor.",
  less: 11
},
{
  th: ["น้องสาว", "ของ", "ผม", "สวย", "และ", "ฉลาด"],
  rom: ["nóng săao", "kŏng", "pŏm", "sŭay", "láe", "chà-làat"],
  en: "My younger sister is beautiful and smart.",
  less: 11,
  answers: [
    ["น้องสาว", "ของ", "ผม", "สวย", "และ", "ฉลาด"],
    ["น้องสาว", "ของ", "ผม", "ฉลาด", "และ", "สวย"]
  ]
},
{
  th: ["พี่ชาย", "ของ", "ฉัน", "ชอบ", "กิน", "อาหารไทย"],
  rom: ["pêe chaai", "kŏng", "chăn", "chôp", "gin", "aa-hăan Thai"],
  en: "My elder brother likes to eat Thai food.",
  less: 11
},
{
  th: ["ฉัน", "ลืม", "กระเป๋าตังค์", "ไว้", "ที่", "บ้าน", "เพื่อน"],
  rom: ["chăn", "leum", "grà-bpăo dtang", "wái", "têe", "bâan", "pêuan"],
  en: "I forgot my wallet at my friend’s house.",
  less: 11
},
{
  th: ["ผม", "ลืม", "กุญแจ", "ไว้", "ใน", "รถ"],
  rom: ["pŏm", "leum", "gun-jae", "wái", "nai", "rót"],
  en: "I forgot the key in the car.",
  less: 11
},

// ===== LESSON 12 (Having) =====
{
  th: ["ผม", "มี", "หมา", "สอง", "ตัว"],
  rom: ["pŏm", "mee", "măa", "sŏng", "dtua"],
  en: "I have two dogs.",
  less: 12
},
{
  th: ["ฉัน", "มี", "แมว", "สาม", "ตัว"],
  rom: ["chăn", "mee", "maew", "săam", "dtua"],
  en: "I have three cats.",
  less: 12
},
{
  th: ["ผม", "ไม่", "มี", "รถยนต์"],
  rom: ["pŏm", "mâi", "mee", "rót yon"],
  en: "I don't have a car.",
  less: 12
},
{
  th: ["คุณ", "มี", "รถยนต์", "ไหม"],
  rom: ["kun", "mee", "rót yon", "măi"],
  en: "Do you have a car?",
  less: 12
},
{
  th: ["ผม", "มี", "รถยนต์", "สอง", "คัน"],
  rom: ["pŏm", "mee", "rót yon", "sŏng", "kan"],
  en: "I have two cars.",
  less: 12
},
{
  th: ["เขา", "มี", "มอเตอร์ไซค์", "หนึ่ง", "คัน"],
  rom: ["kăo", "mee", "mor-têr-sai", "nèung", "kan"],
  en: "He/she has one motorbike.",
  less: 12
},
{
  th: ["ผม", "ไม่", "มี", "เวลา"],
  rom: ["pŏm", "mâi", "mee", "way-laa"],
  en: "I don't have time.",
  less: 12
},
{
  th: ["คุณ", "มี", "เวลา", "ไหม"],
  rom: ["kun", "mee", "way-laa", "măi"],
  en: "Do you have time?",
  less: 12
},
{
  th: ["ผม", "ไม่", "มี", "เงิน"],
  rom: ["pŏm", "mâi", "mee", "ngern"],
  en: "I don't have money.",
  less: 12
},
{
  th: ["ผม", "มี", "คำถาม"],
  rom: ["pŏm", "mee", "kam-tăam"],
  en: "I have a question.",
  less: 12
},
{
  th: ["คุณ", "มี", "ปากกา", "ไหม", "ครับ"],
  rom: ["kun", "mee", "pàak gaa", "măi", "kráp"],
  en: "Do you have a pen?",
  less: 12
},
{
  th: ["ฉัน", "ไม่", "มี", "กุญแจ"],
  rom: ["chăn", "mâi", "mee", "gun-jae"],
  en: "I don't have the key.",
  less: 12
},
{
  th: ["แฟน", "ของ", "ผม", "มี", "แมว", "สอง", "ตัว"],
  rom: ["faen", "kŏng", "pŏm", "mee", "maew", "sŏng", "dtua"],
  en: "My girlfriend has two cats.",
  less: 12
},
{
  th: ["เพื่อน", "ของ", "ฉัน", "มี", "มอเตอร์ไซค์"],
  rom: ["pêuan", "kŏng", "chăn", "mee", "mor-têr-sai"],
  en: "My friend has a motorbike.",
  less: 12
},
{
  th: ["พ่อแม่", "ของ", "ผม", "ไม่", "มี", "เวลา"],
  rom: ["pôr mâe", "kŏng", "pŏm", "mâi", "mee", "way-laa"],
  en: "My parents don't have time.",
  less: 12
},
{
  th: ["คุณ", "มี", "หมา", "หรือ", "แมว", "ไหม"],
  rom: ["kun", "mee", "măa", "rĕu", "maew", "măi"],
  en: "Do you have a dog or a cat?",
  less: 12,
  answers: [
    ["คุณ", "มี", "หมา", "หรือ", "แมว", "ไหม"],
    ["คุณ", "มี", "แมว", "หรือ", "หมา", "ไหม"]
  ]
},
{
  th: ["คุณ", "มี", "แฟน", "ไหม", "คะ"],
  rom: ["kun", "mee", "faen", "măi", "ká"],
  en: "Do you have a boyfriend/girlfriend?",
  less: 12
},
{
  th: ["ผม", "ไม่", "มี", "รถยนต์", "แต่", "มี", "มอเตอร์ไซค์"],
  rom: ["pŏm", "mâi", "mee", "rót yon", "dtàe", "mee", "mor-têr-sai"],
  en: "I don't have a car, but I have a motorbike.",
  less: 12
},
{
  th: ["คุณ", "มี", "หมา", "กี่", "ตัว"],
  rom: ["kun", "mee", "măa", "gèe", "dtua"],
  en: "How many dogs do you have?",
  less: 12
},
{
  th: ["คุณ", "มี", "รถยนต์", "กี่", "คัน"],
  rom: ["kun", "mee", "rót yon", "gèe", "kan"],
  en: "How many cars do you have?",
  less: 12
},
{
  th: ["คุณ", "มี", "ลูก", "กี่", "คน"],
  rom: ["kun", "mee", "lôok", "gèe", "kon"],
  en: "How many children do you have?",
  less: 12
},
{
  th: ["คุณ", "มี", "พี่น้อง", "กี่", "คน"],
  rom: ["kun", "mee", "pêe nóng", "gèe", "kon"],
  en: "How many siblings do you have?",
  less: 12
},
{
  th: ["ผม", "ไม่", "มี", "พี่น้อง"],
  rom: ["pŏm", "mâi", "mee", "pêe nóng"],
  en: "I don't have any siblings.",
  less: 12
},
{
  th: ["ฉัน", "มี", "พี่ชาย", "หนึ่ง", "คน"],
  rom: ["chăn", "mee", "pêe chaai", "nèung", "kon"],
  en: "I have one elder brother.",
  less: 12
},
{
  th: ["ผม", "มี", "พี่สาว", "สอง", "คน"],
  rom: ["pŏm", "mee", "pêe săao", "sŏng", "kon"],
  en: "I have two elder sisters.",
  less: 12
},
{
  th: ["คุณ", "มี", "หมา", "น่ารัก", "มาก"],
  rom: ["kun", "mee", "măa", "nâa-rák", "mâak"],
  en: "You have a very cute dog.",
  less: 12
},
{
  th: ["ผม", "มี", "นัด"],
  rom: ["pŏm", "mee", "nát"],
  en: "I have an appointment.",
  less: 12
},
{
  th: ["ผม", "มี", "ประชุม", "สำคัญ"],
  rom: ["pŏm", "mee", "prà-chum", "săm-kan"],
  en: "I have an important meeting.",
  less: 12
},
{
  th: ["ขอโทษครับ", "ผม", "มี", "ประชุม", "สำคัญ"],
  rom: ["kŏr tôht kráp", "pŏm", "mee", "prà-chum", "săm-kan"],
  en: "Sorry, I have an important meeting.",
  less: 12
},
{
  th: ["เขา", "มี", "รถยนต์", "สี่", "คัน"],
  rom: ["kăo", "mee", "rót yon", "sèe", "kan"],
  en: "He/she has four cars.",
  less: 12
},
{
  th: ["ทำไม", "เขา", "มี", "รถยนต์", "สี่", "คัน"],
  rom: ["tam-mai", "kăo", "mee", "rót yon", "sèe", "kan"],
  en: "Why does he have four cars?",
  less: 12,
  answers: [
    ["ทำไม", "เขา", "มี", "รถยนต์", "สี่", "คัน"],
    ["เขา", "มี", "รถยนต์", "สี่", "คัน", "ทำไม"]
  ]
},
{
  th: ["เพราะ", "เขา", "รวย", "และ", "ชอบ", "รถยนต์"],
  rom: ["prór", "kăo", "ruay", "láe", "chôp", "rót yon"],
  en: "Because he is rich and likes cars.",
  less: 12
},
{
  th: ["เพื่อน", "ของ", "ฉัน", "มี", "หมา", "น่ารัก", "สาม", "ตัว"],
  rom: ["pêuan", "kŏng", "chăn", "mee", "măa", "nâa-rák", "săam", "dtua"],
  en: "My friend has three very cute dogs.",
  less: 12
},
{
  th: ["พ่อแม่", "ของ", "คุณ", "มี", "รถยนต์", "กี่", "คัน"],
  rom: ["pôr mâe", "kŏng", "kun", "mee", "rót yon", "gèe", "kan"],
  en: "How many cars do your parents have?",
  less: 12
},
{
  th: ["แฟน", "ของ", "ฉัน", "มี", "พี่น้อง", "สอง", "คน"],
  rom: ["faen", "kŏng", "chăn", "mee", "pêe nóng", "sŏng", "kon"],
  en: "My boyfriend has two siblings.",
  less: 12
},
{
  th: ["เรา", "มี", "ลูกชาย", "สอง", "คน", "และ", "ลูกสาว", "หนึ่ง", "คน"],
  rom: ["rao", "mee", "lôok chaai", "sŏng", "kon", "láe", "lôok săao", "nèung", "kon"],
  en: "We have two sons and one daughter.",
  less: 12,
  answers: [
    ["เรา", "มี", "ลูกชาย", "สอง", "คน", "และ", "ลูกสาว", "หนึ่ง", "คน"],
    ["เรา", "มี", "ลูกสาว", "หนึ่ง", "คน", "และ", "ลูกชาย", "สอง", "คน"]
  ]
},
{
  th: ["เรา", "มี", "บ้าน", "หนึ่ง", "หลัง", "และ", "รถยนต์", "สอง", "คัน"],
  rom: ["rao", "mee", "bâan", "nèung", "lăng", "láe", "rót yon", "sŏng", "kan"],
  en: "We have one house and two cars.",
  less: 12,
  answers: [
    ["เรา", "มี", "บ้าน", "หนึ่ง", "หลัง", "และ", "รถยนต์", "สอง", "คัน"],
    ["เรา", "มี", "รถยนต์", "สอง", "คัน", "และ", "บ้าน", "หนึ่ง", "หลัง"]
  ]
},
{
  th: ["เขา", "มี", "รถยนต์", "แพง", "ห้า", "คัน"],
  rom: ["kăo", "mee", "rót yon", "paeng", "hâa", "kan"],
  en: "He/she has five expensive cars.",
  less: 12
},
{
  th: ["พ่อ", "ของ", "ผม", "มี", "เงิน", "มาก"],
  rom: ["pôr", "kŏng", "pŏm", "mee", "ngern", "mâak"],
  en: "My father has a lot of money.",
  less: 12
},
{
  th: ["คุณ", "มี", "ใหญ่", "กว่า", "นี้", "ไหม", "ครับ"],
  rom: ["kun", "mee", "yài", "gwàa", "née", "măi", "kráp"],
  en: "Do you have a bigger size?",
  less: 12
},
{
  th: ["เขา", "เป็น", "คน", "รวย", "และ", "มี", "บ้าน", "ใหญ่"],
  rom: ["kăo", "bpen", "kon", "ruay", "láe", "mee", "bâan", "yài"],
  en: "He/she is a rich person and has a big house.",
  less: 12
},
{
  th: ["ผม", "ไม่", "มี", "เงิน", "และ", "ไม่", "มี", "เวลา"],
  rom: ["pŏm", "mâi", "mee", "ngern", "láe", "mâi", "mee", "way-laa"],
  en: "I don't have money and I don't have time.",
  less: 12
},
{
  th: ["พวกเขา", "มี", "ลูก", "สาม", "คน", "และ", "บ้าน", "ใหญ่"],
  rom: ["pûak kăo", "mee", "lôok", "săam", "kon", "láe", "bâan", "yài"],
  en: "They have three children and a big house.",
  less: 12
},
{
  th: ["พวกเขา", "ไม่", "มี", "รถยนต์", "แต่", "มี", "มอเตอร์ไซค์", "สอง", "คัน"],
  rom: ["pûak kăo", "mâi", "mee", "rót yon", "dtàe", "mee", "mor-têr-sai", "sŏng", "kan"],
  en: "They don't have a car, but they have two motorbikes.",
  less: 12
},
{
  th: ["เรา", "มี", "เพื่อน", "ที่", "ญี่ปุ่น", "สาม", "คน"],
  rom: ["rao", "mee", "pêuan", "têe", "yêe-pùn", "săam", "kon"],
  en: "We have three friends in Japan.",
  less: 12
},
{
  th: ["เรา", "ไม่", "มี", "เวลา", "เพราะ", "เรา", "มี", "ประชุม", "สำคัญ"],
  rom: ["rao", "mâi", "mee", "way-laa", "prór", "rao", "mee", "prà-chum", "săm-kan"],
  en: "We don't have time because we have an important meeting.",
  less: 12
},
{
  th: ["เธอ", "มี", "พี่น้อง", "กี่", "คน"],
  rom: ["ter", "mee", "pêe nóng", "gèe", "kon"],
  en: "How many siblings do you have? (informal)",
  less: 12
},
{
  th: ["เธอ", "มี", "หมา", "น่ารัก", "มาก", "และ", "ผม", "ชอบ", "มัน"],
  rom: ["ter", "mee", "măa", "nâa-rák", "mâak", "láe", "pŏm", "chôp", "man"],
  en: "You have a very cute dog and I like it. (informal)",
  less: 12
},

// ===== LESSON 13 (Restaurant, Cafe) =====
{
  th: ["ขอ", "เมนู", "ครับ"],
  rom: ["kŏr", "menu", "kráp"],
  en: "I would like a menu.",
  less: 13
},
{
  th: ["ขอ", "ผัดไทย", "กุ้ง", "ครับ"],
  rom: ["kŏr", "pàt thai", "gûng", "kráp"],
  en: "I would like a shrimp Pad Thai.",
  less: 13
},
{
  th: ["เอา", "ผัดไทย", "ไก่", "ครับ"],
  rom: ["ao", "pàt thai", "gài", "kráp"],
  en: "I want a chicken Pad Thai.",
  less: 13
},
{
  th: ["ขอ", "ต้มยำ", "กุ้ง", "ค่ะ"],
  rom: ["kŏr", "tôm yam", "gûng", "kâ"],
  en: "I would like a shrimp Tom Yum.",
  less: 13
},
{
  th: ["ขอ", "ส้มตำ", "ไม่", "เผ็ด", "ค่ะ"],
  rom: ["kŏr", "sôm-tam", "mâi", "pèt", "kâ"],
  en: "I would like a papaya salad, not spicy.",
  less: 13
},
{
  th: ["ขอ", "ผัดกระเพรา", "หมู", "ไม่", "เผ็ด", "ครับ"],
  rom: ["kŏr", "pàt grà prao", "mŏo", "mâi", "pèt", "kráp"],
  en: "I would like pork stir-fried basil, not spicy.",
  less: 13
},
{
  th: ["เอา", "ผัดกระเพรา", "ไก่", "ครับ"],
  rom: ["ao", "pàt grà prao", "gài", "kráp"],
  en: "I want chicken stir-fried basil.",
  less: 13
},
{
  th: ["ขอ", "ผัดซีอิ๊ว", "กลับบ้าน", "ครับ"],
  rom: ["kŏr", "pàt-see-íw", "glàp bâan", "kráp"],
  en: "I would like a pad see ew for takeaway.",
  less: 13
},
{
  th: ["ขอ", "อัน", "นี้", "ครับ"],
  rom: ["kŏr", "an", "née", "kráp"],
  en: "I would like this one.",
  less: 13
},
{
  th: ["เอา", "อัน", "นั้น", "ค่ะ"],
  rom: ["ao", "an", "nán", "kâ"],
  en: "I would like that one.",
  less: 13
},
{
  th: ["ขอ", "ผัดไทย", "กุ้ง", "กลับบ้าน", "ครับ"],
  rom: ["kŏr", "pàt thai", "gûng", "glàp bâan", "kráp"],
  en: "I would like a shrimp Pad Thai for takeaway.",
  less: 13
},
{
  th: ["ขอ", "ส้มตำ", "สอง", "จาน", "ค่ะ"],
  rom: ["kŏr", "sôm-tam", "sŏng", "jaan", "kâ"],
  en: "I would like two plates of papaya salad.",
  less: 13
},
{
  th: ["เอา", "ก๋วยเตี๋ยว", "สาม", "ชาม", "ครับ"],
  rom: ["ao", "kŭay-tĭeow", "săam", "chaam", "kráp"],
  en: "I want three bowls of boat noodles.",
  less: 13
},
{
  th: ["ขอ", "กาแฟ", "สี่", "แก้ว", "ค่ะ"],
  rom: ["kŏr", "kaa-fae", "sèe", "gâew", "kâ"],
  en: "I would like four cups of coffee.",
  less: 13
},
{
  th: ["เอา", "เบียร์", "สอง", "ขวด", "ครับ"],
  rom: ["ao", "bia", "sŏng", "kùat", "kráp"],
  en: "I want two bottles of beer.",
  less: 13
},
{
  th: ["ขอ", "น้ำ", "หนึ่ง", "ขวด", "ค่ะ"],
  rom: ["kŏr", "náam", "nèung", "kùat", "kâ"],
  en: "I would like one bottle of water.",
  less: 13
},
{
  th: ["เอา", "ไวน์แดง", "สอง", "แก้ว", "ครับ"],
  rom: ["ao", "wai daeng", "sŏng", "gâew", "kráp"],
  en: "I want two glasses of red wine.",
  less: 13
},
{
  th: ["ขอ", "ผัดซีอิ๊ว", "สอง", "จาน", "ครับ"],
  rom: ["kŏr", "pàt-see-íw", "sŏng", "jaan", "kráp"],
  en: "I would like two plates of pad see ew.",
  less: 13
},
{
  th: ["ขอ", "ต้มยำ", "ไก่", "สาม", "ชาม", "ค่ะ"],
  rom: ["kŏr", "tôm yam", "gài", "săam", "chaam", "kâ"],
  en: "I would like three bowls of chicken Tom Yum.",
  less: 13
},
{
  th: ["ขอ", "แกงเขียวหวาน", "ไก่", "ครับ"],
  rom: ["kŏr", "gaeng kĭeow wăan", "gài", "kráp"],
  en: "I would like chicken green curry.",
  less: 13
},
{
  th: ["เอา", "แกงมัสมั่น", "เนื้อ", "สอง", "ถ้วย", "ครับ"],
  rom: ["ao", "gaeng má-sà-màn", "néua", "sŏng", "tûay", "kráp"],
  en: "I want two bowls of beef massaman curry.",
  less: 13
},
{
  th: ["ขอ", "ข้าวเหนียวมะม่วง", "สอง", "จาน", "ค่ะ"],
  rom: ["kŏr", "kâao nĭeow má-mûang", "sŏng", "jaan", "kâ"],
  en: "I would like two plates of mango sticky rice.",
  less: 13
},
{
  th: ["ขอ", "ผัดไทย", "สอง", "กล่อง", "ครับ"],
  rom: ["kŏr", "pàt thai", "sŏng", "glòng", "kráp"],
  en: "I would like two boxes of Pad Thai for takeaway.",
  less: 13
},
{
  th: ["เอา", "ต้มยำ", "ไก่", "สาม", "ถุง", "ครับ"],
  rom: ["ao", "tôm yam", "gài", "săam", "tŭng", "kráp"],
  en: "I want three bags of chicken Tom Yum for takeaway.",
  less: 13
},
{
  th: ["ขอ", "ข้าวเหนียวมะม่วง", "สาม", "กล่อง", "กลับบ้าน", "ค่ะ"],
  rom: ["kŏr", "kâao nĭeow má-mûang", "săam", "glòng", "glàp bâan", "kâ"],
  en: "I would like three boxes of mango sticky rice for takeaway.",
  less: 13
},
{
  th: ["ขอ", "แกงเขียวหวาน", "ไก่", "และ", "ข้าวสวย", "ครับ"],
  rom: ["kŏr", "gaeng kĭeow wăan", "gài", "láe", "kâao sŭay", "kráp"],
  en: "I would like chicken green curry and steamed rice.",
  less: 13,
  answers: [
    ["ขอ", "แกงเขียวหวาน", "ไก่", "และ", "ข้าวสวย", "ครับ"],
    ["ขอ", "ข้าวสวย", "และ", "แกงเขียวหวาน", "ไก่", "ครับ"]
  ]
},
{
  th: ["ขอ", "กาแฟ", "หนึ่ง", "แก้ว", "และ", "น้ำ", "สอง", "ขวด", "ครับ"],
  rom: ["kŏr", "kaa-fae", "nèung", "gâew", "láe", "náam", "sŏng", "kùat", "kráp"],
  en: "I would like one cup of coffee and two bottles of water.",
  less: 13,
  answers: [
    ["ขอ", "กาแฟ", "หนึ่ง", "แก้ว", "และ", "น้ำ", "สอง", "ขวด", "ครับ"],
    ["ขอ", "น้ำ", "สอง", "ขวด", "และ", "กาแฟ", "หนึ่ง", "แก้ว", "ครับ"]
  ]
},
{
  th: ["ขอ", "ผัดไทย", "และ", "ต้มยำ", "ไก่", "ครับ"],
  rom: ["kŏr", "pàt thai", "láe", "tôm yam", "gài", "kráp"],
  en: "I would like a Pad Thai and a chicken Tom Yum.",
  less: 13,
  answers: [
    ["ขอ", "ผัดไทย", "และ", "ต้มยำ", "ไก่", "ครับ"],
    ["ขอ", "ต้มยำ", "ไก่", "และ", "ผัดไทย", "ครับ"]
  ]
},
{
  th: ["เอา", "แฮมเบอร์เกอร์", "และ", "โค้ก", "ครับ"],
  rom: ["ao", "haem ber-gêr", "láe", "kóhk", "kráp"],
  en: "I want a hamburger and a coke.",
  less: 13,
  answers: [
    ["เอา", "แฮมเบอร์เกอร์", "และ", "โค้ก", "ครับ"],
    ["เอา", "โค้ก", "และ", "แฮมเบอร์เกอร์", "ครับ"]
  ]
},
{
  th: ["ขอ", "เอสเพรสโซ", "ร้อน", "ครับ"],
  rom: ["kŏr", "espresso", "rón", "kráp"],
  en: "I would like a hot espresso.",
  less: 13
},
{
  th: ["ขอ", "เอสเพรสโซ", "ร้อน", "กลับบ้าน", "ครับ"],
  rom: ["kŏr", "espresso", "rón", "glàp bâan", "kráp"],
  en: "I would like a hot espresso for takeaway.",
  less: 13
},
{
  th: ["ขอ", "คาปูชิโน่", "เย็น", "สอง", "แก้ว", "ค่ะ"],
  rom: ["kŏr", "cappuccino", "yen", "sŏng", "gâew", "kâ"],
  en: "I would like two cups of iced cappuccino.",
  less: 13
},
{
  th: ["เอา", "คาปูชิโน่", "เย็น", "สอง", "แก้ว", "กลับบ้าน", "ครับ"],
  rom: ["ao", "cappuccino", "yen", "sŏng", "gâew", "glàp bâan", "kráp"],
  en: "I want two cups of iced cappuccino for takeaway.",
  less: 13
},
{
  th: ["ขอ", "กาแฟ", "ร้อน", "หนึ่ง", "แก้ว", "ค่ะ"],
  rom: ["kŏr", "kaa-fae", "rón", "nèung", "gâew", "kâ"],
  en: "I would like one cup of hot coffee.",
  less: 13
},
{
  th: ["ผม", "แพ้", "นม", "ครับ"],
  rom: ["pŏm", "páe", "nom", "kráp"],
  en: "I'm allergic to milk.",
  less: 13
},
{
  th: ["ฉัน", "แพ้", "ถั่วลิสง", "ค่ะ"],
  rom: ["chăn", "páe", "tùa-lí-sŏng", "kâ"],
  en: "I'm allergic to peanuts.",
  less: 13
},
{
  th: ["ผม", "กิน", "เผ็ด", "ไม่", "ได้", "ขอ", "ผัดไทย", "ไม่", "เผ็ด", "ครับ"],
  rom: ["pŏm", "gin", "pèt", "mâi", "dâai", "kŏr", "pàt thai", "mâi", "pèt", "kráp"],
  en: "I can't eat spicy food. I would like a Pad Thai, not spicy.",
  less: 13
},
{
  th: ["ขอโทษ", "ครับ", "ขอ", "เมนู", "หน่อย", "ครับ"],
  rom: ["kŏr tôht", "kráp", "kŏr", "menu", "nòi", "kráp"],
  en: "Excuse me, may I have a menu please.",
  less: 13
},
{
  th: ["อาหาร", "ที่", "ร้าน", "นี่", "อร่อย", "และ", "ไม่", "แพง"],
  rom: ["aa-hăan", "têe", "ráan", "nêe", "à-ròi", "láe", "mâi", "paeng"],
  en: "The food at this restaurant is delicious and not expensive.",
  less: 13,
  answers: [
    ["อาหาร", "ที่", "ร้าน", "นี่", "อร่อย", "และ", "ไม่", "แพง"],
    ["อาหาร", "ที่", "ร้าน", "นี่", "ไม่", "แพง", "และ", "อร่อย"]
  ]
},
{
  th: ["ผม", "ชอบ", "กิน", "ผัดกระเพรา", "หมู", "มาก", "ครับ"],
  rom: ["pŏm", "chôp", "gin", "pàt grà prao", "mŏo", "mâak", "kráp"],
  en: "I really like to eat pork stir-fried basil.",
  less: 13
},
{
  th: ["คุณ", "ชอบ", "กิน", "อาหาร", "ไทย", "เผ็ด", "ไหม", "คะ"],
  rom: ["kun", "chôp", "gin", "aa-hăan", "Thai", "pèt", "măi", "ká"],
  en: "Do you like to eat spicy Thai food?",
  less: 13
},

// ===== LESSON 14 (Future Tense) =====
{
  th: ["พรุ่งนี้", "ผม", "จะ", "ไปเยี่ยม", "พ่อแม่"],
  rom: ["prûng-née", "pŏm", "jà", "bpai yîam", "pôr mâe"],
  en: "Tomorrow I will visit my parents.",
  less: 14,
  answers: [
    ["พรุ่งนี้", "ผม", "จะ", "ไปเยี่ยม", "พ่อแม่"],
    ["ผม", "จะ", "ไปเยี่ยม", "พ่อแม่", "พรุ่งนี้"]
  ]
},
{
  th: ["คืนนี้", "ฉัน", "จะ", "โทรหา", "แฟน"],
  rom: ["keun née", "chăn", "jà", "toh hăa", "faen"],
  en: "Tonight I will call my boyfriend.",
  less: 14,
  answers: [
    ["คืนนี้", "ฉัน", "จะ", "โทรหา", "แฟน"],
    ["ฉัน", "จะ", "โทรหา", "แฟน", "คืนนี้"]
  ]
},
{
  th: ["ปี", "หน้า", "ผม", "จะ", "ไป", "ประเทศ", "ไทย", "กับ", "ครอบครัว"],
  rom: ["bpee", "nâa", "pŏm", "jà", "bpai", "bprà-têt", "Thai", "gàp", "krôp krua"],
  en: "Next year I will go to Thailand with my family.",
  less: 14,
  answers: [
    ["ปี", "หน้า", "ผม", "จะ", "ไป", "ประเทศ", "ไทย", "กับ", "ครอบครัว"],
    ["ผม", "จะ", "ไป", "ประเทศ", "ไทย", "กับ", "ครอบครัว", "ปี", "หน้า"]
  ]
},
{
  th: ["เดือน", "หน้า", "ฉัน", "จะ", "ไปเยี่ยม", "เพื่อน", "ที่", "ญี่ปุ่น"],
  rom: ["deuan", "nâa", "chăn", "jà", "bpai yîam", "pêuan", "têe", "yêe-pùn"],
  en: "Next month I will visit my friends in Japan.",
  less: 14,
  answers: [
    ["เดือน", "หน้า", "ฉัน", "จะ", "ไปเยี่ยม", "เพื่อน", "ที่", "ญี่ปุ่น"],
    ["ฉัน", "จะ", "ไปเยี่ยม", "เพื่อน", "ที่", "ญี่ปุ่น", "เดือน", "หน้า"]
  ]
},
{
  th: ["คุณ", "จะ", "ทำ", "อะไร", "คืนนี้"],
  rom: ["kun", "jà", "tam", "à-rai", "keun née"],
  en: "What will you do tonight?",
  less: 14,
  answers: [
    ["คุณ", "จะ", "ทำ", "อะไร", "คืนนี้"],
    ["คืนนี้", "คุณ", "จะ", "ทำ", "อะไร"]
  ]
},
{
  th: ["คุณ", "จะ", "ไป", "พัทยา", "กับ", "ใคร"],
  rom: ["kun", "jà", "bpai", "Pattaya", "gàp", "krai"],
  en: "Who will you go to Pattaya with?",
  less: 14
},
{
  th: ["ฉัน", "จะ", "ไป", "ประเทศ", "ฝรั่งเศส", "คนเดียว"],
  rom: ["chăn", "jà", "bpai", "bprà-têt", "fà-ràng-sèt", "kon dieow"],
  en: "I will go to France alone.",
  less: 14
},
{
  th: ["เสาร์อาทิตย์", "นี้", "คุณ", "จะ", "ทำ", "อะไร"],
  rom: ["săo aa-tít", "née", "kun", "jà", "tam", "à-rai"],
  en: "What will you do this weekend?",
  less: 14
},
{
  th: ["ผม", "จะ", "ไป", "พักผ่อน", "และ", "กิน", "อาหารทะเล"],
  rom: ["pŏm", "jà", "bpai", "pák pòn", "láe", "gin", "aa hăan tá-lay"],
  en: "I will go relax and eat seafood.",
  less: 14,
  answers: [
    ["ผม", "จะ", "ไป", "พักผ่อน", "และ", "กิน", "อาหารทะเล"],
    ["ผม", "จะ", "กิน", "อาหารทะเล", "และ", "ไป", "พักผ่อน"]
  ]
},
{
  th: ["อาทิตย์", "หน้า", "ฉัน", "จะ", "ไป", "ภูเก็ต", "กับ", "แฟน"],
  rom: ["aa-tít", "nâa", "chăn", "jà", "bpai", "Phuket", "gàp", "faen"],
  en: "Next week I will go to Phuket with my girlfriend.",
  less: 14,
  answers: [
    ["อาทิตย์", "หน้า", "ฉัน", "จะ", "ไป", "ภูเก็ต", "กับ", "แฟน"],
    ["ฉัน", "จะ", "ไป", "ภูเก็ต", "กับ", "แฟน", "อาทิตย์", "หน้า"]
  ]
},
{
  th: ["ผม", "จะ", "ไป", "เจอ", "เพื่อน", "และ", "ดื่ม", "เบียร์"],
  rom: ["pŏm", "jà", "bpai", "jer", "pêuan", "láe", "dèum", "bia"],
  en: "I will go meet my friends and drink beer.",
  less: 14
},
{
  th: ["พรุ่งนี้", "ผม", "จะ", "ซื้อ", "รถ", "ใหม่"],
  rom: ["prûng-née", "pŏm", "jà", "séu", "rót", "mài"],
  en: "Tomorrow I will buy a new car.",
  less: 14,
  answers: [
    ["พรุ่งนี้", "ผม", "จะ", "ซื้อ", "รถ", "ใหม่"],
    ["ผม", "จะ", "ซื้อ", "รถ", "ใหม่", "พรุ่งนี้"]
  ]
},
{
  th: ["ฉัน", "จะ", "ไม่", "ไป", "ปาร์ตี้", "คืนนี้"],
  rom: ["chăn", "jà", "mâi", "bpai", "paa-têe", "keun née"],
  en: "I won't go to the party tonight.",
  less: 14,
  answers: [
    ["ฉัน", "จะ", "ไม่", "ไป", "ปาร์ตี้", "คืนนี้"],
    ["คืนนี้", "ฉัน", "จะ", "ไม่", "ไป", "ปาร์ตี้"]
  ]
},
{
  th: ["ผม", "จะ", "ส่งข้อความหา", "คุณ", "พรุ่งนี้", "เช้า"],
  rom: ["pŏm", "jà", "sòng kôr kwaam hăa", "kun", "prûng-née", "cháo"],
  en: "I will text you tomorrow.",
  less: 14,
  answers: [
    ["ผม", "จะ", "ส่งข้อความหา", "คุณ", "พรุ่งนี้", "เช้า"],
    ["พรุ่งนี้", "เช้า", "ผม", "จะ", "ส่งข้อความหา", "คุณ"]
  ]
},
{
  th: ["เพื่อน", "ของ", "ผม", "จะ", "มา", "ปาร์ตี้"],
  rom: ["pêuan", "kŏng", "pŏm", "jà", "maa", "paa-têe"],
  en: "My friends will come to the party.",
  less: 14
},
{
  th: ["แฟน", "ของ", "ผม", "จะ", "มาเยี่ยม", "ผม", "พรุ่งนี้"],
  rom: ["faen", "kŏng", "pŏm", "jà", "maa yîam", "pŏm", "prûng-née"],
  en: "My girlfriend will come visit me tomorrow.",
  less: 14,
  answers: [
    ["แฟน", "ของ", "ผม", "จะ", "มาเยี่ยม", "ผม", "พรุ่งนี้"],
    ["พรุ่งนี้", "แฟน", "ของ", "ผม", "จะ", "มาเยี่ยม", "ผม"]
  ]
},
{
  th: ["วันศุกร์", "หน้า", "ผม", "จะ", "ไป", "เจอ", "เพื่อน"],
  rom: ["wan sùk", "nâa", "pŏm", "jà", "bpai", "jer", "pêuan"],
  en: "Next Friday I will meet my friends.",
  less: 14,
  answers: [
    ["วันศุกร์", "หน้า", "ผม", "จะ", "ไป", "เจอ", "เพื่อน"],
    ["ผม", "จะ", "ไป", "เจอ", "เพื่อน", "วันศุกร์", "หน้า"]
  ]
},
{
  th: ["วันอาทิตย์", "ฉัน", "จะ", "พักผ่อน", "อยู่", "บ้าน"],
  rom: ["wan aa-tít", "chăn", "jà", "pák pòn", "yòo", "bâan"],
  en: "On Sunday I will relax at home.",
  less: 14,
  answers: [
    ["วันอาทิตย์", "ฉัน", "จะ", "พักผ่อน", "อยู่", "บ้าน"],
    ["ฉัน", "จะ", "พักผ่อน", "อยู่", "บ้าน", "วันอาทิตย์"]
  ]
},
{
  th: ["พรุ่งนี้", "เช้า", "ผม", "จะ", "ไป", "วิ่ง"],
  rom: ["prûng-née", "cháo", "pŏm", "jà", "bpai", "wîng"],
  en: "Tomorrow morning I will go for a run.",
  less: 14,
  answers: [
    ["พรุ่งนี้", "เช้า", "ผม", "จะ", "ไป", "วิ่ง"],
    ["ผม", "จะ", "ไป", "วิ่ง", "พรุ่งนี้", "เช้า"]
  ]
},
{
  th: ["คืนพรุ่งนี้", "ฉัน", "จะ", "ออกกำลังกาย", "ที่", "บ้าน"],
  rom: ["keun prûng-née", "chăn", "jà", "òk gam-lang gaai", "têe", "bâan"],
  en: "Tomorrow night I will exercise at home.",
  less: 14,
  answers: [
    ["คืนพรุ่งนี้", "ฉัน", "จะ", "ออกกำลังกาย", "ที่", "บ้าน"],
    ["ฉัน", "จะ", "ออกกำลังกาย", "ที่", "บ้าน", "คืนพรุ่งนี้"]
  ]
},
{
  th: ["ผู้หญิง", "สวย", "คน", "นั้น", "คือ", "ใคร"],
  rom: ["pôo yĭng", "sŭay", "kon", "nán", "keu", "krai"],
  en: "Who is that beautiful woman?",
  less: 14
},
{
  th: ["เขา", "คือ", "แฟน", "ใหม่", "ของ", "ปีเตอร์"],
  rom: ["kăo", "keu", "faen", "mài", "kŏng", "Peter"],
  en: "She is Peter's new girlfriend.",
  less: 14
},
{
  th: ["ผู้ชาย", "คน", "นั้น", "หล่อ", "มาก"],
  rom: ["pôo chaai", "kon", "nán", "lòr", "mâak"],
  en: "That man is very handsome.",
  less: 14
},
{
  th: ["หมา", "ตัว", "นั้น", "น่ารัก", "มาก"],
  rom: ["măa", "dtua", "nán", "nâa-rák", "mâak"],
  en: "That dog is very cute.",
  less: 14
},
{
  th: ["รถ", "คัน", "นี้", "แพง", "มาก"],
  rom: ["rót", "kan", "née", "paeng", "mâak"],
  en: "This car is very expensive.",
  less: 14
},
{
  th: ["เด็ก", "คน", "นั้น", "เสียงดัง", "และ", "น่ารำคาญ", "มาก"],
  rom: ["dèk", "kon", "nán", "sĭang dang", "láe", "nâa ram-kaan", "mâak"],
  en: "That kid is very loud and annoying.",
  less: 14
},
{
  th: ["ผู้ชาย", "คน", "นั้น", "น่ารำคาญ", "มาก"],
  rom: ["pôo chaai", "kon", "nán", "nâa ram-kaan", "mâak"],
  en: "That man is very annoying.",
  less: 14
},
{
  th: ["ผม", "เรียน", "ภาษา", "ไทย", "เพราะ", "ปี", "หน้า", "ผม", "จะ", "ไป", "ประเทศ", "ไทย"],
  rom: ["pŏm", "rian", "paa-săa", "Thai", "prór", "bpee", "nâa", "pŏm", "jà", "bpai", "bprà-têt", "Thai"],
  en: "I study Thai because next year I will go to Thailand.",
  less: 14
},
{
  th: ["คืนนี้", "ฉัน", "จะ", "เรียน", "ภาษา", "อังกฤษ", "และ", "ดูหนัง"],
  rom: ["keun née", "chăn", "jà", "rian", "paa-săa", "ang-grìt", "láe", "doo năng"],
  en: "Tonight I will study English and watch movies.",
  less: 14,
  answers: [
    ["คืนนี้", "ฉัน", "จะ", "เรียน", "ภาษา", "อังกฤษ", "และ", "ดูหนัง"],
    ["ฉัน", "จะ", "เรียน", "ภาษา", "อังกฤษ", "และ", "ดูหนัง", "คืนนี้"],
    ["คืนนี้", "ฉัน", "จะ", "ดูหนัง", "และ", "เรียน", "ภาษา", "อังกฤษ"],
    ["ฉัน", "จะ", "ดูหนัง", "และ", "เรียน", "ภาษา", "อังกฤษ", "คืนนี้"]
  ]
},
{
  th: ["เรา", "จะ", "ดื่ม", "เบียร์", "และ", "ดู", "ฟุตบอล"],
  rom: ["rao", "jà", "dèum", "bia", "láe", "doo", "fút bon"],
  en: "We will drink beer and watch football.",
  less: 14,
  answers: [
    ["เรา", "จะ", "ดื่ม", "เบียร์", "และ", "ดู", "ฟุตบอล"],
    ["เรา", "จะ", "ดู", "ฟุตบอล", "และ", "ดื่ม", "เบียร์"]
  ]
},
{
  th: ["เสาร์", "นี้", "ฉัน", "จะ", "ไป", "คอนเสิร์ต", "กับ", "แฟน"],
  rom: ["săo", "née", "chăn", "jà", "bpai", "kon-sèrt", "gàp", "faen"],
  en: "This Saturday I will go to a concert with my boyfriend.",
  less: 14,
  answers: [
    ["เสาร์", "นี้", "ฉัน", "จะ", "ไป", "คอนเสิร์ต", "กับ", "แฟน"],
    ["ฉัน", "จะ", "ไป", "คอนเสิร์ต", "กับ", "แฟน", "เสาร์", "นี้"]
  ]
},
{
  th: ["เดือน", "หน้า", "ผม", "จะ", "ไป", "อิตาลี", "กับ", "ภรรยา"],
  rom: ["deuan", "nâa", "pŏm", "jà", "bpai", "Italy", "gàp", "pan-rá-yaa"],
  en: "Next month I will go to Italy with my wife.",
  less: 14,
  answers: [
    ["เดือน", "หน้า", "ผม", "จะ", "ไป", "อิตาลี", "กับ", "ภรรยา"],
    ["ผม", "จะ", "ไป", "อิตาลี", "กับ", "ภรรยา", "เดือน", "หน้า"]
  ]
},
{
  th: ["พรุ่งนี้", "ผม", "จะ", "โทรหา", "แม่", "ของ", "ผม"],
  rom: ["prûng-née", "pŏm", "jà", "toh hăa", "mâe", "kŏng", "pŏm"],
  en: "Tomorrow I will call my mother.",
  less: 14,
  answers: [
    ["พรุ่งนี้", "ผม", "จะ", "โทรหา", "แม่", "ของ", "ผม"],
    ["ผม", "จะ", "โทรหา", "แม่", "ของ", "ผม", "พรุ่งนี้"]
  ]
},
{
  th: ["ผม", "จะ", "ไม่", "ทำงาน", "วันเสาร์", "และ", "วันอาทิตย์"],
  rom: ["pŏm", "jà", "mâi", "tam ngaan", "wan săo", "láe", "wan aa-tít"],
  en: "I won't work on Saturday and Sunday.",
  less: 14,
  answers: [
    ["ผม", "จะ", "ไม่", "ทำงาน", "วันเสาร์", "และ", "วันอาทิตย์"],
    ["ผม", "จะ", "ไม่", "ทำงาน", "วันอาทิตย์", "และ", "วันเสาร์"]
  ]
},
{
  th: ["วันจันทร์", "หน้า", "ฉัน", "จะ", "มี", "นัด", "สำคัญ"],
  rom: ["wan jan", "nâa", "chăn", "jà", "mee", "nát", "săm-kan"],
  en: "Next Monday I will have an important appointment.",
  less: 14,
  answers: [
    ["วันจันทร์", "หน้า", "ฉัน", "จะ", "มี", "นัด", "สำคัญ"],
    ["ฉัน", "จะ", "มี", "นัด", "สำคัญ", "วันจันทร์", "หน้า"]
  ]
},
{
  th: ["ผม", "จะ", "เรียน", "ภาษา", "ไทย", "อยู่", "บ้าน", "คืนนี้"],
  rom: ["pŏm", "jà", "rian", "paa-săa", "Thai", "yòo", "bâan", "keun née"],
  en: "I will study Thai at home tonight.",
  less: 14,
  answers: [
    ["ผม", "จะ", "เรียน", "ภาษา", "ไทย", "อยู่", "บ้าน", "คืนนี้"],
    ["คืนนี้", "ผม", "จะ", "เรียน", "ภาษา", "ไทย", "อยู่", "บ้าน"]
  ]
},
{
  th: ["พรุ่งนี้", "ผม", "จะ", "ไป", "ตลาด", "และ", "ซื้อ", "ผลไม้"],
  rom: ["prûng-née", "pŏm", "jà", "bpai", "dtà-làat", "láe", "séu", "pŏn-lá-mái"],
  en: "Tomorrow I will go to the market and buy fruit.",
  less: 14,
  answers: [
    ["พรุ่งนี้", "ผม", "จะ", "ไป", "ตลาด", "และ", "ซื้อ", "ผลไม้"],
    ["ผม", "จะ", "ไป", "ตลาด", "และ", "ซื้อ", "ผลไม้", "พรุ่งนี้"]
  ]
},
{
  th: ["เขา", "จะ", "ไม่", "มา", "เพราะ", "เขา", "ไม่", "สบาย"],
  rom: ["kăo", "jà", "mâi", "maa", "prór", "kăo", "mâi", "sà-baai"],
  en: "He/she won't come because he/she is not feeling well.",
  less: 14
},
{
  th: ["คืนนี้", "คุณ", "จะ", "ไป", "เจอ", "เพื่อน", "ที่ไหน"],
  rom: ["keun née", "kun", "jà", "bpai", "jer", "pêuan", "têe năi"],
  en: "Where will you meet your friends tonight?",
  less: 14,
  answers: [
    ["คืนนี้", "คุณ", "จะ", "ไป", "เจอ", "เพื่อน", "ที่ไหน"],
    ["คุณ", "จะ", "ไป", "เจอ", "เพื่อน", "ที่ไหน", "คืนนี้"]
  ]
},
{
  th: ["อาทิตย์", "หน้า", "ผม", "จะ", "ไป", "กรุงเทพ", "กับ", "เพื่อน"],
  rom: ["aa-tít", "nâa", "pŏm", "jà", "bpai", "krung têp", "gàp", "pêuan"],
  en: "Next week I will go to Bangkok with my friends.",
  less: 14,
  answers: [
    ["อาทิตย์", "หน้า", "ผม", "จะ", "ไป", "กรุงเทพ", "กับ", "เพื่อน"],
    ["ผม", "จะ", "ไป", "กรุงเทพ", "กับ", "เพื่อน", "อาทิตย์", "หน้า"]
  ]
},
{
  th: ["คุณ", "จะ", "คุย", "กับ", "ใคร"],
  rom: ["kun", "jà", "kui", "gàp", "krai"],
  en: "Who will you talk with?",
  less: 14
},
{
  th: ["พรุ่งนี้", "เช้า", "ผม", "จะ", "ไป", "เจอ", "หมอ"],
  rom: ["prûng-née", "cháo", "pŏm", "jà", "bpai", "jer", "mŏr"],
  en: "Tomorrow morning I will go see the doctor.",
  less: 14,
  answers: [
    ["พรุ่งนี้", "เช้า", "ผม", "จะ", "ไป", "เจอ", "หมอ"],
    ["ผม", "จะ", "ไป", "เจอ", "หมอ", "พรุ่งนี้", "เช้า"]
  ]
},
{
  th: ["เธอ", "จะ", "มาเยี่ยม", "ผม", "อาทิตย์", "หน้า", "ใช่ไหม"],
  rom: ["ter", "jà", "maa yîam", "pŏm", "aa-tít", "nâa", "châi măi"],
  en: "You will come visit me next week, right? (informal)",
  less: 14
},

{
  th: ["พวกเขา", "จะ", "ไป", "ทะเล", "และ", "จะ", "สนุก", "มาก"],
  rom: ["pûak kăo", "jà", "bpai", "tá-lay", "láe", "jà", "sà-nùk", "mâak"],
  en: "They will go to the sea and will have a lot of fun.",
  less: 14
},
{
  th: ["ผม", "จะ", "คิดถึง", "คุณ", "มาก"],
  rom: ["pŏm", "jà", "kít tĕung", "kun", "mâak"],
  en: "I will miss you a lot.",
  less: 14
},
{
  th: ["คุณ", "จะ", "คิดถึง", "ผม", "รึเปล่า"],
  rom: ["kun", "jà", "kít tĕung", "pŏm", "réu bplào"],
  en: "Will you miss me or not?",
  less: 14
},
{
  th: ["คืนนี้", "เรา", "จะ", "ดื่ม", "เบียร์", "สาม", "ขวด"],
  rom: ["keun née", "rao", "jà", "dèum", "bia", "săam", "kùat"],
  en: "Tonight we will drink three bottles of beer.",
  less: 14,
  answers: [
    ["คืนนี้", "เรา", "จะ", "ดื่ม", "เบียร์", "สาม", "ขวด"],
    ["เรา", "จะ", "ดื่ม", "เบียร์", "สาม", "ขวด", "คืนนี้"]
  ]
},
{
  th: ["พรุ่งนี้", "คุณ", "จะ", "ซื้อ", "มะม่วง", "กี่", "ถุง"],
  rom: ["prûng-née", "kun", "jà", "séu", "má-mûang", "gèe", "tŭng"],
  en: "How many bags of mangoes will you buy tomorrow?",
  less: 14,
  answers: [
    ["พรุ่งนี้", "คุณ", "จะ", "ซื้อ", "มะม่วง", "กี่", "ถุง"],
    ["คุณ", "จะ", "ซื้อ", "มะม่วง", "กี่", "ถุง", "พรุ่งนี้"]
  ]
},
{
  th: ["วันอังคาร", "ผม", "จะ", "ไม่", "ไป", "ทำ", "งาน", "เพราะ", "ผม", "ไม่มี", "รถ"],
  rom: ["wan ang-kaan", "pŏm", "jà", "mâi", "bpai", "tam", "ngaan", "prór", "pŏm", "mâi mee", "rót"],
  en: "On Tuesday I won't go to work because I don't have a car.",
  less: 14
},
{
  th: ["วันพุธ", "เรา", "จะ", "ไป", "ตลาด", "ใหม่", "เพราะ", "ถูก", "กว่า"],
  rom: ["wan pút", "rao", "jà", "bpai", "dtà-làat", "mài", "prór", "tòok", "gwàa"],
  en: "On Wednesday we will go to the new market because it's cheaper.",
  less: 14
},
{
  th: ["ปี", "หน้า", "พวกเขา", "จะ", "มี", "บ้าน", "หลัง", "ใหม่"],
  rom: ["bpee", "nâa", "pûak kăo", "jà", "mee", "bâan", "lăng", "mài"],
  en: "Next year they will have a new house.",
  less: 14
},
{
  th: ["เพื่อน", "ของ", "ผม", "จะ", "ไป", "และ", "ผม", "ก็", "จะ", "ไป"],
  rom: ["pêuan", "kŏng", "pŏm", "jà", "bpai", "láe", "pŏm", "gôr", "jà", "bpai"],
  en: "My friend will go, and I will go too.",
  less: 14
},
{
  th: ["วันพฤหัสบดี", "ฉัน", "จะ", "เจอ", "พี่สาว", "ใน", "เมือง"],
  rom: ["wan pá-réu-hàt-sà-bor-dee", "chăn", "jà", "jer", "pêe săao", "nai", "mueang"],
  en: "On Thursday I will meet my elder sister in the city.",
  less: 14
},
{
  th: ["ผม", "จะ", "ไม่", "ลืม", "โทร", "หา", "เขา", "วันนี้"],
  rom: ["pŏm", "jà", "mâi", "leum", "toh", "hăa", "kăo", "wan née"],
  en: "I won't forget to call him today.",
  less: 14
},
{
  th: ["เธอ", "จะ", "ไม่", "ไป", "เพราะ", "เธอ", "เบื่อ"],
  rom: ["ter", "jà", "mâi", "bpai", "prór", "ter", "bèua"],
  en: "She won't go because she's bored.",
  less: 14
},
{
  th: ["เรา", "จะ", "ไม่", "ซื้อ", "รถ", "คัน", "นั้น", "เพราะ", "ไม่มี", "ตังค์"],
  rom: ["rao", "jà", "mâi", "séu", "rót", "kan", "nán", "prór", "mâi mee", "dtang"],
  en: "We won't buy that car because we don't have money.",
  less: 14
},
{
  th: ["พรุ่งนี้", "คุณ", "จะ", "ไป", "สนามบิน", "รึเปล่า"],
  rom: ["prûng-née", "kun", "jà", "bpai", "sà-năam bin", "réu bplào"],
  en: "Will you go to the airport tomorrow or not?",
  less: 14
},
{
  th: ["เที่ยว", "ให้", "สนุก", "นะ"],
  rom: ["tîeow", "hâi", "sà-nùk", "ná"],
  en: "Have a nice trip.",
  less: 14
},
{
  th: ["คืนนี้", "เรา", "จะ", "กิน", "ข้าว", "ที่", "บ้าน", "ของ", "พ่อแม่"],
  rom: ["keun née", "rao", "jà", "gin", "kâao", "têe", "bâan", "kŏng", "pôr mâe"],
  en: "Tonight we will eat at my parents' house.",
  less: 14,
  answers: [
    ["คืนนี้", "เรา", "จะ", "กิน", "ข้าว", "ที่", "บ้าน", "ของ", "พ่อแม่"],
    ["เรา", "จะ", "กิน", "ข้าว", "ที่", "บ้าน", "ของ", "พ่อแม่", "คืนนี้"]
  ]
},
{
  th: ["อาทิตย์", "หน้า", "พวกเขา", "จะ", "ไป", "ดู", "ช้าง", "ที่", "เชียงใหม่"],
  rom: ["aa-tít", "nâa", "pûak kăo", "jà", "bpai", "doo", "cháng", "têe", "Chiang Mai"],
  en: "Next week they will go see elephants in Chiang Mai.",
  less: 14,
  answers: [
    ["อาทิตย์", "หน้า", "พวกเขา", "จะ", "ไป", "ดู", "ช้าง", "ที่", "เชียงใหม่"],
    ["พวกเขา", "จะ", "ไป", "ดู", "ช้าง", "ที่", "เชียงใหม่", "อาทิตย์", "หน้า"]
  ]
},

// ===== LESSON 15 (Wanting) =====
{
  th: ["ผม", "อยาก", "เรียน", "ภาษา", "ไทย"],
  rom: ["pŏm", "yàak", "rian", "paa-săa", "Thai"],
  en: "I want to learn Thai.",
  less: 15
},
{
  th: ["ฉัน", "อยาก", "กิน", "อาหารญี่ปุ่น", "คืนนี้"],
  rom: ["chăn", "yàak", "gin", "aa-hăan yêe-pùn", "keun née"],
  en: "I want to eat Japanese food tonight.",
  less: 15,
  answers: [
    ["ฉัน", "อยาก", "กิน", "อาหารญี่ปุ่น", "คืนนี้"],
    ["คืนนี้", "ฉัน", "อยาก", "กิน", "อาหารญี่ปุ่น"]
  ]
},
{
  th: ["ผม", "อยาก", "ไปเที่ยว", "ญี่ปุ่น", "เพราะ", "วัฒนธรรม", "น่าสนใจ", "มาก"],
  rom: ["pŏm", "yàak", "bpai tîeow", "yêe-pùn", "prór", "wát-tá-ná-tam", "nâa sŏn jai", "mâak"],
  en: "I want to travel to Japan because the culture is very interesting.",
  less: 15
},
{
  th: ["ผม", "อยาก", "คุย", "กับ", "คุณ"],
  rom: ["pŏm", "yàak", "kui", "gàp", "kun"],
  en: "I want to talk with you.",
  less: 15
},
{
  th: ["คุณ", "อยาก", "ไปเที่ยว", "ที่ไหน", "ปีหน้า"],
  rom: ["kun", "yàak", "bpai tîeow", "têe năi", "bpee nâa"],
  en: "Where do you want to travel next year?",
  less: 15,
  answers: [
    ["คุณ", "อยาก", "ไปเที่ยว", "ที่ไหน", "ปีหน้า"],
    ["ปีหน้า", "คุณ", "อยาก", "ไปเที่ยว", "ที่ไหน"]
  ]
},
{
  th: ["คืนนี้", "ผม", "อยาก", "กิน", "พิซซ่า"],
  rom: ["keun née", "pŏm", "yàak", "gin", "pít-sâa"],
  en: "Tonight I want to eat pizza.",
  less: 15,
  answers: [
    ["คืนนี้", "ผม", "อยาก", "กิน", "พิซซ่า"],
    ["ผม", "อยาก", "กิน", "พิซซ่า", "คืนนี้"]
  ]
},
{
  th: ["พรุ่งนี้", "ฉัน", "อยาก", "พักผ่อน", "อยู่", "บ้าน"],
  rom: ["prûng-née", "chăn", "yàak", "pák pòn", "yòo", "bâan"],
  en: "Tomorrow I want to rest at home.",
  less: 15,
  answers: [
    ["พรุ่งนี้", "ฉัน", "อยาก", "พักผ่อน", "อยู่", "บ้าน"],
    ["ฉัน", "อยาก", "พักผ่อน", "อยู่", "บ้าน", "พรุ่งนี้"]
  ]
},
{
  th: ["ผม", "อยาก", "ไป", "ร้าน", "อาหาร", "กับ", "คุณ"],
  rom: ["pŏm", "yàak", "bpai", "ráan", "aa-hăan", "gàp", "kun"],
  en: "I want to go to a restaurant with you.",
  less: 15
},
{
  th: ["ผม", "เรียน", "ภาษา", "ไทย", "เพราะ", "อยาก", "คุย", "กับ", "คน", "ไทย"],
  rom: ["pŏm", "rian", "paa-săa", "Thai", "prór", "yàak", "kui", "gàp", "kon", "Thai"],
  en: "I study Thai because I want to talk with Thai people.",
  less: 15
},
{
  th: ["ผม", "ไม่", "อยาก", "ไป", "ร้าน", "อาหาร"],
  rom: ["pŏm", "mâi", "yàak", "bpai", "ráan", "aa-hăan"],
  en: "I don't want to go to a restaurant.",
  less: 15
},
{
  th: ["ฉัน", "ไม่", "อยาก", "ทำงาน", "พรุ่งนี้"],
  rom: ["chăn", "mâi", "yàak", "tam ngaan", "prûng-née"],
  en: "I don't want to work tomorrow.",
  less: 15,
  answers: [
    ["ฉัน", "ไม่", "อยาก", "ทำงาน", "พรุ่งนี้"],
    ["พรุ่งนี้", "ฉัน", "ไม่", "อยาก", "ทำงาน"]
  ]
},
{
  th: ["ผม", "ไม่", "อยาก", "กิน", "อาหาร", "ทะเล"],
  rom: ["pŏm", "mâi", "yàak", "gin", "aa-hăan", "tá-lay"],
  en: "I don't want to eat seafood.",
  less: 15
},
{
  th: ["ผม", "ไม่", "อยาก", "เจอ", "กับ", "พ่อแม่", "ของ", "คุณ"],
  rom: ["pŏm", "mâi", "yàak", "jer", "gàp", "pôr mâe", "kŏng", "kun"],
  en: "I don't want to meet with your parents.",
  less: 15
},
{
  th: ["คืนนี้", "ฉัน", "จะ", "ดู", "หนัง", "น่ากลัว", "กับ", "น้องชาย"],
  rom: ["keun née", "chăn", "jà", "doo", "năng", "nâa glua", "gàp", "nóng chaai"],
  en: "Tonight I'll watch a scary movie with my younger brother.",
  less: 15,
  answers: [
    ["คืนนี้", "ฉัน", "จะ", "ดู", "หนัง", "น่ากลัว", "กับ", "น้องชาย"],
    ["ฉัน", "จะ", "ดู", "หนัง", "น่ากลัว", "กับ", "น้องชาย", "คืนนี้"]
  ]
},
{
  th: ["เดือน", "หน้า", "ผม", "จะ", "ไป", "หัวหิน", "กับ", "ครอบครัว"],
  rom: ["deuan", "nâa", "pŏm", "jà", "bpai", "Hŭa Hĭn", "gàp", "krôp krua"],
  en: "Next month I'll go to Hua Hin with my family.",
  less: 15,
  answers: [
    ["เดือน", "หน้า", "ผม", "จะ", "ไป", "หัวหิน", "กับ", "ครอบครัว"],
    ["ผม", "จะ", "ไป", "หัวหิน", "กับ", "ครอบครัว", "เดือน", "หน้า"]
  ]
},
{
  th: ["คืนนี้", "คุณ", "อยาก", "ทำ", "อะไร"],
  rom: ["keun née", "kun", "yàak", "tam", "à-rai"],
  en: "What do you want to do tonight?",
  less: 15,
  answers: [
    ["คืนนี้", "คุณ", "อยาก", "ทำ", "อะไร"],
    ["คุณ", "อยาก", "ทำ", "อะไร", "คืนนี้"]
  ]
},
{
  th: ["ผม", "อยาก", "ไป", "ดู", "หนัง", "กับ", "เพื่อน"],
  rom: ["pŏm", "yàak", "bpai", "doo", "năng", "gàp", "pêuan"],
  en: "I want to go to the cinema with my friends.",
  less: 15
},
{
  th: ["คืนนี้", "คุณ", "อยาก", "ดู", "หนัง", "เรื่อง", "อะไร"],
  rom: ["keun née", "kun", "yàak", "doo", "năng", "rêuang", "à-rai"],
  en: "What movie do you want to watch tonight?",
  less: 15,
  answers: [
    ["คืนนี้", "คุณ", "อยาก", "ดู", "หนัง", "เรื่อง", "อะไร"],
    ["คุณ", "อยาก", "ดู", "หนัง", "เรื่อง", "อะไร", "คืนนี้"]
  ]
},
{
  th: ["ฉัน", "ไม่", "อยาก", "ดู", "หนัง", "เรื่อง", "นั้น"],
  rom: ["chăn", "mâi", "yàak", "doo", "năng", "rêuang", "nán"],
  en: "I don't want to watch that movie.",
  less: 15
},
{
  th: ["ผม", "ไม่", "ชอบ", "หนัง", "เรื่อง", "นี้"],
  rom: ["pŏm", "mâi", "chôp", "năng", "rêuang", "née"],
  en: "I don't like this movie.",
  less: 15
},
{
  th: ["แฟน", "ของ", "ผม", "ชอบ", "ดู", "หนัง", "เรื่อง", "Titanic"],
  rom: ["faen", "kŏng", "pŏm", "chôp", "doo", "năng", "rêuang", "Titanic"],
  en: "My girlfriend likes to watch the movie Titanic.",
  less: 15
},
{
  th: ["คุณ", "อยาก", "ไปเที่ยว", "ไหม"],
  rom: ["kun", "yàak", "bpai tîeow", "măi"],
  en: "Do you want to hang out?",
  less: 15
},
{
  th: ["คุณ", "อยาก", "ไป", "ดู", "หนัง", "ไหม"],
  rom: ["kun", "yàak", "bpai", "doo", "năng", "măi"],
  en: "Do you want to go to the cinema?",
  less: 15
},
{
  th: ["พรุ่งนี้", "คุณ", "อยาก", "ทำ", "อะไร"],
  rom: ["prûng-née", "kun", "yàak", "tam", "à-rai"],
  en: "What do you want to do tomorrow?",
  less: 15,
  answers: [
    ["พรุ่งนี้", "คุณ", "อยาก", "ทำ", "อะไร"],
    ["คุณ", "อยาก", "ทำ", "อะไร", "พรุ่งนี้"]
  ]
},
{
  th: ["เสาร์อาทิตย์", "นี้", "คุณ", "อยาก", "ทำ", "อะไร"],
  rom: ["săo aa-tít", "née", "kun", "yàak", "tam", "à-rai"],
  en: "What do you want to do this weekend?",
  less: 15
},
{
  th: ["คุณ", "อยาก", "กิน", "พิซซ่า", "หรือ", "แฮมเบอร์เกอร์"],
  rom: ["kun", "yàak", "gin", "pít-sâa", "rĕu", "haem ber-gêr"],
  en: "Do you want to eat pizza or a hamburger?",
  less: 15,
  answers: [
    ["คุณ", "อยาก", "กิน", "พิซซ่า", "หรือ", "แฮมเบอร์เกอร์"],
    ["คุณ", "อยาก", "กิน", "แฮมเบอร์เกอร์", "หรือ", "พิซซ่า"]
  ]
},
{
  th: ["ผม", "อยาก", "มี", "หมา", "หรือ", "แมว"],
  rom: ["pŏm", "yàak", "mee", "măa", "rĕu", "maew"],
  en: "I want to have a dog or a cat.",
  less: 15,
  answers: [
    ["ผม", "อยาก", "มี", "หมา", "หรือ", "แมว"],
    ["ผม", "อยาก", "มี", "แมว", "หรือ", "หมา"]
  ]
},
{
  th: ["คืนนี้", "ผม", "จะ", "ดู", "หนัง", "หรือ", "เรียน", "ภาษา", "ไทย"],
  rom: ["keun née", "pŏm", "jà", "doo", "năng", "rĕu", "rian", "paa-săa", "Thai"],
  en: "Tonight I will watch a movie or study Thai.",
  less: 15,
  answers: [
    ["คืนนี้", "ผม", "จะ", "ดู", "หนัง", "หรือ", "เรียน", "ภาษา", "ไทย"],
    ["คืนนี้", "ผม", "จะ", "เรียน", "ภาษา", "ไทย", "หรือ", "ดู", "หนัง"]
  ]
},
{
  th: ["เดือน", "หน้า", "ผม", "อยาก", "ไป", "ภูเก็ต", "หรือ", "กระบี่", "กับ", "แฟน"],
  rom: ["deuan", "nâa", "pŏm", "yàak", "bpai", "Phuket", "rĕu", "Krabi", "gàp", "faen"],
  en: "Next month I want to go to Phuket or Krabi with my girlfriend.",
  less: 15,
  answers: [
    ["เดือน", "หน้า", "ผม", "อยาก", "ไป", "ภูเก็ต", "หรือ", "กระบี่", "กับ", "แฟน"],
    ["เดือน", "หน้า", "ผม", "อยาก", "ไป", "กระบี่", "หรือ", "ภูเก็ต", "กับ", "แฟน"]
  ]
},
{
  th: ["ฉัน", "อยาก", "สวย", "มาก"],
  rom: ["chăn", "yàak", "sŭay", "mâak"],
  en: "I want to be very beautiful.",
  less: 15
},
{
  th: ["ผม", "อยาก", "รวย", "มาก", "มาก"],
  rom: ["pŏm", "yàak", "ruay", "mâak", "mâak"],
  en: "I want to be very very rich.",
  less: 15
},
{
  th: ["ผม", "อยาก", "ซื้อ", "รถ", "คัน", "นี้"],
  rom: ["pŏm", "yàak", "séu", "rót", "kan", "née"],
  en: "I want to buy this car.",
  less: 15
},
{
  th: ["ฉัน", "อยาก", "มี", "แฟน", "เพราะ", "ไม่", "อยาก", "เหงา"],
  rom: ["chăn", "yàak", "mee", "faen", "prór", "mâi", "yàak", "ngăo"],
  en: "I want to have a boyfriend because I don't want to be lonely.",
  less: 15
},
{
  th: ["ขอโทษ", "นะ", "ผม", "ต้อง", "กลับบ้าน"],
  rom: ["kŏr tôht", "ná", "pŏm", "dtông", "glàp bâan"],
  en: "Sorry, I have to go home.",
  less: 15
},
{
  th: ["ฉัน", "ต้อง", "ทำงาน", "เสาร์อาทิตย์"],
  rom: ["chăn", "dtông", "tam ngaan", "săo aa-tít"],
  en: "I have to work on the weekend.",
  less: 15
},
{
  th: ["วันนี้", "ภรรยา", "ของ", "ผม", "ต้อง", "ทำงาน"],
  rom: ["wan née", "pan-rá-yaa", "kŏng", "pŏm", "dtông", "tam ngaan"],
  en: "Today my wife has to work.",
  less: 15
},
{
  th: ["ผม", "ต้อง", "โทรหา", "เจ้านาย", "ของ", "ผม"],
  rom: ["pŏm", "dtông", "toh hăa", "jâo naai", "kŏng", "pŏm"],
  en: "I have to call my boss.",
  less: 15
},
{
  th: ["พรุ่งนี้", "ผม", "ต้อง", "ตื่น", "แต่เช้า"],
  rom: ["prûng-née", "pŏm", "dtông", "dtèun", "dtàe cháo"],
  en: "Tomorrow I have to wake up early.",
  less: 15,
  answers: [
    ["พรุ่งนี้", "ผม", "ต้อง", "ตื่น", "แต่เช้า"],
    ["ผม", "ต้อง", "ตื่น", "แต่เช้า", "พรุ่งนี้"]
  ]
},
{
  th: ["พรุ่งนี้", "ฉัน", "ต้อง", "ไป", "โรงเรียน"],
  rom: ["prûng-née", "chăn", "dtông", "bpai", "rohng rian"],
  en: "Tomorrow I have to go to school.",
  less: 15,
  answers: [
    ["พรุ่งนี้", "ฉัน", "ต้อง", "ไป", "โรงเรียน"],
    ["ฉัน", "ต้อง", "ไป", "โรงเรียน", "พรุ่งนี้"]
  ]
},
{
  th: ["ผม", "อยาก", "ไปเที่ยว", "แต่", "พรุ่งนี้", "ต้อง", "ทำงาน"],
  rom: ["pŏm", "yàak", "bpai tîeow", "dtàe", "prûng-née", "dtông", "tam ngaan"],
  en: "I want to hang out, but tomorrow I have to work.",
  less: 15
},
{
  th: ["เรา", "ต้อง", "มี", "วีซ่า", "เพื่อ", "ไป", "ประเทศจีน"],
  rom: ["rao", "dtông", "mee", "visa", "pêua", "bpai", "bprà-têt jeen"],
  en: "We have to have a visa in order to go to China.",
  less: 15
},
{
  th: ["พรุ่งนี้", "ว่าง", "ไหม"],
  rom: ["prûng-née", "wâang", "măi"],
  en: "Are you free tomorrow?",
  less: 15
},
{
  th: ["วันศุกร์", "ฉัน", "ว่าง", "แล้ว", "เจอกัน", "นะ"],
  rom: ["wan sùk", "chăn", "wâang", "láew", "jer gan", "ná"],
  en: "I'm free on Friday, so let's meet.",
  less: 15
},
{
  th: ["ภรรยา", "ของ", "ผม", "อยาก", "มี", "ลูก", "แต่", "ผม", "ไม่", "อยาก", "มี"],
  rom: ["pan-rá-yaa", "kŏng", "pŏm", "yàak", "mee", "lôok", "dtàe", "pŏm", "mâi", "yàak", "mee"],
  en: "My wife wants to have children, but I don't want to.",
  less: 15
},
{
  th: ["คุณ", "ต้อง", "คุย", "กับ", "เขา"],
  rom: ["kun", "dtông", "kui", "gàp", "kăo"],
  en: "You have to talk with her.",
  less: 15
},
{
  th: ["คุณ", "อยาก", "มี", "ลูก", "กี่", "คน"],
  rom: ["kun", "yàak", "mee", "lôok", "gèe", "kon"],
  en: "How many children do you want to have?",
  less: 15
},
{
  th: ["ทำไม", "คุณ", "ไม่", "อยาก", "มี", "ลูก"],
  rom: ["tam-mai", "kun", "mâi", "yàak", "mee", "lôok"],
  en: "Why don't you want to have children?",
  less: 15
},
{
  th: ["พรุ่งนี้", "คุณ", "อยาก", "ไป", "พิพิธภัณฑ์", "ด้วยกัน", "ไหม"],
  rom: ["prûng-née", "kun", "yàak", "bpai", "pí-pít-tá-pan", "dûay gan", "măi"],
  en: "Do you want to go to a museum together tomorrow?",
  less: 15,
  answers: [
    ["พรุ่งนี้", "คุณ", "อยาก", "ไป", "พิพิธภัณฑ์", "ด้วยกัน", "ไหม"],
    ["คุณ", "อยาก", "ไป", "พิพิธภัณฑ์", "ด้วยกัน", "ไหม", "พรุ่งนี้"]
  ]
},
{
  th: ["เรา", "จะ", "ไป", "ออกกำลังกาย", "ด้วยกัน"],
  rom: ["rao", "jà", "bpai", "òk gam-lang gaai", "dûay gan"],
  en: "We are going to train together.",
  less: 15
},
{
  th: ["คุณ", "อยาก", "ไป", "นวด", "ด้วยกัน", "ไหม"],
  rom: ["kun", "yàak", "bpai", "nûat", "dûay gan", "măi"],
  en: "Do you want to go for a massage together?",
  less: 15
},
{
  th: ["เรา", "ไป", "ด้วยกัน", "ได้", "เพราะ", "วันอาทิตย์", "ผม", "หยุด"],
  rom: ["rao", "bpai", "dûay gan", "dâai", "prór", "wan aa-tít", "pŏm", "yùt"],
  en: "We can go together because Sunday is my day off.",
  less: 15
},
{
  th: ["หน้าร้อน", "ปี", "นี้", "คุณ", "อยาก", "ไปเที่ยว", "ที่ไหน"],
  rom: ["nâa rón", "bpee", "née", "kun", "yàak", "bpai tîeow", "têe năi"],
  en: "Where do you want to travel this summer?",
  less: 15
},
{
  th: ["ผม", "อยาก", "ไป", "ประเทศจีน", "แต่", "ภรรยา", "อยาก", "ไป", "ยุโรป"],
  rom: ["pŏm", "yàak", "bpai", "bprà-têt jeen", "dtàe", "pan-rá-yaa", "yàak", "bpai", "Europe"],
  en: "I want to go to China, but my wife wants to go to Europe.",
  less: 15
},
{
  th: ["ผม", "ต้อง", "เลือก", "ยุโรป", "เพราะ", "ภรรยา"],
  rom: ["pŏm", "dtông", "lêuak", "Europe", "prór", "pan-rá-yaa"],
  en: "I have to choose Europe because of my wife.",
  less: 15
},
{
  th: ["คุณ", "จะ", "เลือก", "อะไร"],
  rom: ["kun", "jà", "lêuak", "à-rai"],
  en: "What will you choose?",
  less: 15
},
{
  th: ["ผม", "ต้องการ", "ยา"],
  rom: ["pŏm", "dtông gaan", "yaa"],
  en: "I need medicine.",
  less: 15
},
{
  th: ["ผม", "ต้องการ", "รองเท้า", "ใหม่"],
  rom: ["pŏm", "dtông gaan", "rong táo", "mài"],
  en: "I need new shoes.",
  less: 15
},
{
  th: ["ผม", "ต้องการ", "ความช่วยเหลือ"],
  rom: ["pŏm", "dtông gaan", "kwaam chûay lĕua"],
  en: "I need help.",
  less: 15
},
{
  th: ["ลูกสาว", "ของ", "ฉัน", "ต้องการ", "ยา"],
  rom: ["lôok săao", "kŏng", "chăn", "dtông gaan", "yaa"],
  en: "My daughter needs medicine.",
  less: 15
},
{
  th: ["ขอ", "ปากกา", "หน่อย", "ครับ"],
  rom: ["kŏr", "pàak gaa", "nòi", "kráp"],
  en: "I would like a pen, please.",
  less: 15
},
{
  th: ["คุณ", "หา", "อะไร"],
  rom: ["kun", "hăa", "à-rai"],
  en: "What are you looking for?",
  less: 15
},
{
  th: ["ผม", "อยาก", "ไป", "กิน", "ผัดไทย", "กับ", "เพื่อน"],
  rom: ["pŏm", "yàak", "bpai", "gin", "pàt thai", "gàp", "pêuan"],
  en: "I want to go and eat Pad Thai with my friends.",
  less: 15
},
{
  th: ["แฟน", "ของ", "ผม", "ต้อง", "ทำงาน", "วันอาทิตย์", "นี้"],
  rom: ["faen", "kŏng", "pŏm", "dtông", "tam ngaan", "wan aa-tít", "née"],
  en: "My girlfriend has to work this Sunday.",
  less: 15
},

{
  th: ["ผม", "อยาก", "ได้", "รองเท้า", "ใหม่"],
  rom: ["pŏm", "yàak", "dâai", "rong táo", "mài"],
  en: "I want to get new shoes.",
  less: 15
},
{
  th: ["ฉัน", "อยาก", "ได้", "เสื้อยืด", "สีดำ"],
  rom: ["chăn", "yàak", "dâai", "sêua yêut", "sĕe dam"],
  en: "I want a black T-shirt.",
  less: 15
},
{
  th: ["ผม", "อยาก", "ได้", "โทรศัพท์", "ใหม่"],
  rom: ["pŏm", "yàak", "dâai", "toh-rá-sàp", "mài"],
  en: "I want a new phone.",
  less: 15
},
{
  th: ["ฉัน", "ไม่", "อยาก", "ได้", "กระเป๋าตังค์", "สีดำ"],
  rom: ["chăn", "mâi", "yàak", "dâai", "grà-bpăo dtaang", "sĕe dam"],
  en: "I don't want a black wallet.",
  less: 15
},
{
  th: ["วันเกิด", "นี้", "คุณ", "อยาก", "ได้", "อะไร"],
  rom: ["wan gèrt", "née", "kun", "yàak", "dâai", "à-rai"],
  en: "What do you want for your birthday?",
  less: 15
},
{
  th: ["ลูกสาว", "ของ", "ผม", "อยาก", "ได้", "แมว"],
  rom: ["lôok săao", "kŏng", "pŏm", "yàak", "dâai", "maew"],
  en: "My daughter wants a cat.",
  less: 15
},
{
  th: ["ผม", "ไม่", "อยาก", "ได้", "ยา", "แต่", "ผม", "ต้องการ", "ยา"],
  rom: ["pŏm", "mâi", "yàak", "dâai", "yaa", "dtàe", "pŏm", "dtông gaan", "yaa"],
  en: "I don't want medicine, but I need medicine.",
  less: 15
},
{
  th: ["คุณ", "อยาก", "ได้", "หมา", "หรือ", "แมว"],
  rom: ["kun", "yàak", "dâai", "măa", "rĕu", "maew"],
  en: "Do you want a dog or a cat?",
  less: 15,
  answers: [
    ["คุณ", "อยาก", "ได้", "หมา", "หรือ", "แมว"],
    ["คุณ", "อยาก", "ได้", "แมว", "หรือ", "หมา"]
  ]
},
{
  th: ["ผม", "คิด", "ว่า", "อร่อย"],
  rom: ["pŏm", "kít", "wâa", "à-ròi"],
  en: "I think it's delicious.",
  less: 15
},
{
  th: ["ฉัน", "คิด", "ว่า", "หนัง", "เรื่อง", "นี้", "สนุก", "มาก"],
  rom: ["chăn", "kít", "wâa", "năng", "rêuang", "née", "sà-nùk", "mâak"],
  en: "I think this movie is really fun.",
  less: 15
},
{
  th: ["ผม", "คิด", "ว่า", "ภาษา", "ไทย", "ยาก"],
  rom: ["pŏm", "kít", "wâa", "paa-săa", "Thai", "yâak"],
  en: "I think Thai is difficult.",
  less: 15
},
{
  th: ["ฉัน", "คิด", "ว่า", "ร้าน", "นี้", "แพง"],
  rom: ["chăn", "kít", "wâa", "ráan", "née", "paeng"],
  en: "I think this shop is expensive.",
  less: 15
},
{
  th: ["คุณ", "คิด", "ยังไง", "เกี่ยวกับ", "ประเทศ", "ไทย"],
  rom: ["kun", "kít", "yang ngai", "gìeow gàp", "bprà-têt", "Thai"],
  en: "What do you think about Thailand?",
  less: 15
},
{
  th: ["คุณ", "คิด", "ยังไง", "เกี่ยวกับ", "ร้าน", "นี้"],
  rom: ["kun", "kít", "yang ngai", "gìeow gàp", "ráan", "née"],
  en: "What do you think about this restaurant?",
  less: 15
},
{
  th: ["คุณ", "คิด", "ยังไง", "เกี่ยวกับ", "หนัง", "เรื่อง", "นี้"],
  rom: ["kun", "kít", "yang ngai", "gìeow gàp", "năng", "rêuang", "née"],
  en: "What do you think about this movie?",
  less: 15
},
{
  th: ["พูด", "อีกครั้ง", "ได้", "ไหม"],
  rom: ["pôot", "èek kráng", "dâai", "măi"],
  en: "Can you say it again?",
  less: 15
},
{
  th: ["ผม", "อยากได้", "รองเท้า", "ใหม่", "เพราะ", "ผม", "อยาก", "แข็งแรง"],
  rom: ["pŏm", "yàak dâai", "rong táo", "mài", "prór", "pŏm", "yàak", "kăeng raeng"],
  en: "I want new shoes because I want to be fit.",
  less: 15
},
{
  th: ["ฉัน", "คิด", "ว่า", "ส้มตำ", "อร่อย", "แต่", "เผ็ด", "มาก"],
  rom: ["chăn", "kít", "wâa", "sôm dtam", "à-ròi", "dtàe", "pèt", "mâak"],
  en: "I think papaya salad is delicious, but very spicy.",
  less: 15
},
{
  th: ["ผม", "อยากได้", "หมา", "สอง", "ตัว"],
  rom: ["pŏm", "yàak dâai", "măa", "sŏng", "dtua"],
  en: "I want to have two dogs.",
  less: 15
},
{
  th: ["หน้าหนาว", "นี้", "ผม", "อยาก", "ไปเที่ยว", "ธรรมชาติ"],
  rom: ["nâa năao", "née", "pŏm", "yàak", "bpai tîeow", "tam-má-châat"],
  en: "This winter I want to travel in nature.",
  less: 15
},
{
  th: ["คุณ", "คิด", "ยังไง", "เกี่ยวกับ", "อาหาร", "ไทย"],
  rom: ["kun", "kít", "yang ngai", "gìeow gàp", "aa-hăan", "Thai"],
  en: "What do you think about Thai food?",
  less: 15
},
{
  th: ["ฉัน", "อยากได้", "เสื้อยืด", "และ", "อยาก", "ไปเที่ยว"],
  rom: ["chăn", "yàak dâai", "sêua yêut", "láe", "yàak", "bpai tîeow"],
  en: "I want a T-shirt and I want to go traveling.",
  less: 15
},
{
  th: ["คุณ", "อยาก", "ไป", "นวดไทย", "ด้วยกัน", "ไหม"],
  rom: ["kun", "yàak", "bpai", "nûat thai", "dûay gan", "măi"],
  en: "Do you want to go for a Thai massage together?",
  less: 15
},
{
  th: ["วันนี้", "ผม", "หยุด", "ผม", "อยาก", "พักผ่อน", "อยู่", "บ้าน"],
  rom: ["wan née", "pŏm", "yùt", "pŏm", "yàak", "pák pòn", "yòo", "bâan"],
  en: "Today is my day off, I want to rest at home.",
  less: 15
},
{
  th: ["ผม", "คิด", "ว่า", "ร้าน", "อาหาร", "นี้", "ดี", "มาก"],
  rom: ["pŏm", "kít", "wâa", "ráan", "aa-hăan", "née", "dee", "mâak"],
  en: "I think this restaurant is very good.",
  less: 15
},

// ===== LESSON 16 (Past) =====

{
  th: ["เมื่อวาน", "ผม", "ไป", "หา", "หมอ"],
  rom: ["mêua waan", "pŏm", "bpai", "hăa", "mŏr"],
  en: "Yesterday I went to see the doctor.",
  less: 16
},
{
  th: ["เมื่อคืน", "ฉัน", "นอน", "ดึก"],
  rom: ["mêua keun", "chăn", "non", "dèuk"],
  en: "Last night I went to bed late.",
  less: 16
},
{
  th: ["เมื่อวาน", "ฝนตก", "ทั้งวัน"],
  rom: ["mêua waan", "fŏn-dtòk", "táng wan"],
  en: "It rained all day yesterday.",
  less: 16
},
{
  th: ["อาทิตย์", "ที่แล้ว", "ผม", "ไม่", "สบาย"],
  rom: ["aa-tít", "têe láew", "pŏm", "mâi", "sà-baai"],
  en: "Last week I was sick.",
  less: 16
},
{
  th: ["สาม", "เดือน", "ที่แล้ว", "ผม", "เริ่ม", "เรียน", "ภาษา", "ไทย"],
  rom: ["săam", "deuan", "têe láew", "pŏm", "rêrm", "rian", "paa-săa", "Thai"],
  en: "Three months ago I started learning Thai.",
  less: 16
},
{
  th: ["เมื่อคืน", "ฉัน", "กับ", "เพื่อนๆ", "กิน", "เยอะ"],
  rom: ["mêua keun", "chăn", "gàp", "pêuan pêuan", "gin", "yúh"],
  en: "Last night I ate a lot with my friends.",
  less: 16
},
{
  th: ["วันศุกร์", "ที่แล้ว", "พวกเรา", "ไป", "ทะเล"],
  rom: ["wan sùk", "têe láew", "pûak rao", "bpai", "tá-lay"],
  en: "Last Friday we went to the sea.",
  less: 16
},
{
  th: ["ผม", "ซื้อ", "รถยนต์", "คัน", "นี้", "สอง", "ปี", "ที่แล้ว"],
  rom: ["pŏm", "séu", "rót yon", "kan", "née", "sŏng", "bpee", "têe láew"],
  en: "I bought this car two years ago.",
  less: 16
},
{
  th: ["ผม", "ไป", "ภูเก็ต", "กับ", "แฟน", "มา"],
  rom: ["pŏm", "bpai", "Phuket", "gàp", "faen", "maa"],
  en: "I went to Phuket with my girlfriend. (and came back)",
  less: 16
},
{
  th: ["อาทิตย์", "ที่แล้ว", "เรา", "ไป", "เวียดนาม", "มา"],
  rom: ["aa-tít", "têe láew", "rao", "bpai", "Vietnam", "maa"],
  en: "Last week we went to Vietnam. (and came back)",
  less: 16
},
{
  th: ["เขา", "ไป", "โรงพยาบาล", "มา"],
  rom: ["kăo", "bpai", "rohng pá-yaa-baan", "maa"],
  en: "He/she went to the hospital. (and came back)",
  less: 16
},
{
  th: ["เมื่อเช้านี้", "ผม", "ไป", "กิน", "ข้าว", "กับ", "เพื่อนๆ", "มา"],
  rom: ["mêua cháo née", "pŏm", "bpai", "gin", "kâao", "gàp", "pêuan pêuan", "maa"],
  en: "This morning I went out to eat with a friends. (and came back)",
  less: 16
},
{
  th: ["ฉัน", "กลับ", "บ้าน", "แล้ว"],
  rom: ["chăn", "glàp", "bâan", "láew"],
  en: "I'm already home.",
  less: 16
},
{
  th: ["วันนี้", "ผม", "กิน", "ของหวาน", "แล้ว"],
  rom: ["wan née", "pŏm", "gin", "kŏng wăan", "láew"],
  en: "I already had dessert today.",
  less: 16
},
{
  th: ["ผม", "จ่าย", "บิล", "แล้ว"],
  rom: ["pŏm", "jàai", "bin", "láew"],
  en: "I've already paid the bill.",
  less: 16
},
{
  th: ["ฉัน", "บอก", "คุณ", "แล้ว"],
  rom: ["chăn", "bòk", "kun", "láew"],
  en: "I already told you.",
  less: 16
},
{
  th: ["เขา", "เลิก", "สูบบุหรี่", "แล้ว"],
  rom: ["kăo", "lêrk", "sòop bù-rèe", "láew"],
  en: "He/she quit smoking.",
  less: 16
},
{
  th: ["ผม", "ไม่", "อ้วน", "แล้ว"],
  rom: ["pŏm", "mâi", "ûan", "láew"],
  en: "I'm not fat anymore.",
  less: 16
},
{
  th: ["ผม", "ทำการบ้าน", "เสร็จ", "แล้ว"],
  rom: ["pŏm", "tam gaan bâan", "sèt", "láew"],
  en: "I've finished my homework.",
  less: 16
},
{
  th: ["ผม", "ไม่ได้", "กิน", "ข้าว"],
  rom: ["pŏm", "mâi dâai", "gin", "kâao"],
  en: "I didn't eat (a meal).",
  less: 16
},
{
  th: ["ผม", "ไม่ได้", "ไป", "ปาร์ตี้"],
  rom: ["pŏm", "mâi dâai", "bpai", "bpaa-dtêe"],
  en: "I didn't go to the party.",
  less: 16
},
{
  th: ["เมื่อวาน", "ฉัน", "ไม่ได้", "ทำงาน"],
  rom: ["mêua waan", "chăn", "mâi dâai", "tam ngaan"],
  en: "Yesterday I didn't work.",
  less: 16
},
{
  th: ["ผม", "ไม่ได้", "กิน", "อาหารเช้า"],
  rom: ["pŏm", "mâi dâai", "gin", "aa-hăan cháo"],
  en: "I didn't eat breakfast.",
  less: 16
},
{
  th: ["ผม", "เคย", "ไป", "ญี่ปุ่น"],
  rom: ["pŏm", "koie", "bpai", "yêe-pùn"],
  en: "I have been to Japan before.",
  less: 16
},
{
  th: ["ฉัน", "เคย", "กิน", "ทุเรียน"],
  rom: ["chăn", "koie", "gin", "tú-rian"],
  en: "I have eaten durian before.",
  less: 16
},
{
  th: ["ผม", "ไม่เคย", "ไป", "เชียงใหม่"],
  rom: ["pŏm", "mâi koie", "bpai", "chiang-mài"],
  en: "I've never been to Chiang Mai.",
  less: 16
},
{
  th: ["คุณ", "เคย", "ทำ", "อาหารไทย", "ไหม"],
  rom: ["kun", "koie", "tam", "aa-hăan Thai", "măi"],
  en: "Have you ever cooked Thai food?",
  less: 16
},
{
  th: ["ผม", "ยัง", "ทำงาน", "อยู่"],
  rom: ["pŏm", "yang", "tam ngaan", "yòo"],
  en: "I'm still working.",
  less: 16
},
{
  th: ["เขา", "ยัง", "ไม่", "มา"],
  rom: ["kăo", "yang", "mâi", "maa"],
  en: "He/she hasn't arrived yet.",
  less: 16
},
{
  th: ["พวกเรา", "กำลัง", "กิน", "ข้าว", "อยู่"],
  rom: ["pûak rao", "gam-lang", "gin", "kâao", "yòo"],
  en: "We're eating. (group/all of us)",
  less: 16
},

{
  th: ["เมื่อคืน", "เรา", "ดู", "หนัง", "ด้วยกัน"],
  rom: ["mêua keun", "rao", "doo", "năng", "dûay gan"],
  en: "Last night we watched a movie together.",
  less: 16
},
{
  th: ["อาทิตย์", "ที่แล้ว", "พวกเขา", "ไป", "ไต้หวัน"],
  rom: ["aa-tít", "têe láew", "pûak kăo", "bpai", "tâi-wăn"],
  en: "Last week they went to Taiwan.",
  less: 16
},
{
  th: ["สอง", "เดือน", "ที่แล้ว", "ผม", "เริ่ม", "ออกกำลังกาย"],
  rom: ["sŏng", "deuan", "têe láew", "pŏm", "rêrm", "òk gam-lang gaai"],
  en: "Two months ago I started exercising.",
  less: 16
},
{
  th: ["เมื่อวาน", "เธอ", "ทำ", "อะไร", "อะ"],
  rom: ["mêua waan", "ter", "tam", "à-rai", "à"],
  en: "What did you do yesterday? (informal)",
  less: 16
},
{
  th: ["เมื่อคืน", "ฝนตก", "ทั้งคืน"],
  rom: ["mêua keun", "fŏn-dtòk", "táng keun"],
  en: "It rained all night last night.",
  less: 16
},
{
  th: ["สอง", "อาทิตย์", "ที่แล้ว", "ผม", "ซื้อ", "โทรศัพท์", "ใหม่"],
  rom: ["sŏng", "aa-tít", "têe láew", "pŏm", "séu", "toh-rá-sàp", "mài"],
  en: "Two weeks ago I bought a new phone.",
  less: 16
},
{
  th: ["พวกเรา", "ไป", "สิงคโปร์", "มา"],
  rom: ["pûak rao", "bpai", "sĭng-ká-poh", "maa"],
  en: "We went to Singapore. (and came back)",
  less: 16
},
{
  th: ["เมื่อเช้านี้", "ผม", "ไป", "ตลาด", "มา"],
  rom: ["mêua cháo née", "pŏm", "bpai", "dtà-làat", "maa"],
  en: "This morning I went to the market. (and came back)",
  less: 16
},
{
  th: ["เขา", "ไป", "หา", "หมอ", "มา"],
  rom: ["kăo", "bpai", "hăa", "mŏr", "maa"],
  en: "He/she went to see the doctor. (and came back)",
  less: 16
},
{
  th: ["พวกเขา", "ไป", "เที่ยว", "ทะเล", "มา"],
  rom: ["pûak kăo", "bpai", "tîeow", "tá-lay", "maa"],
  en: "They went on a trip to the sea. (and came back)",
  less: 16
},
{
  th: ["ผม", "อาบน้ำ", "แล้ว"],
  rom: ["pŏm", "àap náam", "láew"],
  en: "I've already showered.",
  less: 16
},
{
  th: ["เรา", "กิน", "ข้าว", "เสร็จ", "แล้ว"],
  rom: ["rao", "gin", "kâao", "sèt", "láew"],
  en: "We've finished eating.",
  less: 16
},
{
  th: ["พี่", "เลิก", "งาน", "แล้ว"],
  rom: ["pêe", "lêrk", "ngaan", "láew"],
  en: "I've already finished work. (older speaker)",
  less: 16
},
{
  th: ["ผม", "ไม่", "หิว", "แล้ว"],
  rom: ["pŏm", "mâi", "hĭw", "láew"],
  en: "I'm not hungry anymore.",
  less: 16
},
{
  th: ["เธอ", "ตื่น", "แล้ว", "เหรอ"],
  rom: ["ter", "dtèun", "láew", "rŏr"],
  en: "Oh, you're already awake?",
  less: 16
},
{
  th: ["น้อง", "ไม่", "สบาย", "แล้ว"],
  rom: ["nóng", "mâi", "sà-baai", "láew"],
  en: "My younger sibling is sick now.",
  less: 16
},
{
  th: ["เมื่อคืน", "ผม", "ไม่ได้", "นอนหลับ"],
  rom: ["mêua keun", "pŏm", "mâi dâai", "non làp"],
  en: "Last night I didn't sleep.",
  less: 16
},
{
  th: ["ฉัน", "ไม่ได้", "อ่าน", "หนังสือ"],
  rom: ["chăn", "mâi dâai", "àan", "năng-sĕu"],
  en: "I didn't read the book.",
  less: 16
},
{
  th: ["เรา", "ไม่ได้", "เจอ", "กัน", "นาน"],
  rom: ["rao", "mâi dâai", "jer", "gan", "naan"],
  en: "We haven't seen each other for a long time.",
  less: 16
},
{
  th: ["ทำไม", "เธอ", "ไม่ได้", "มา", "อะ"],
  rom: ["tam-mai", "ter", "mâi dâai", "maa", "à"],
  en: "Why didn't you come? (informal)",
  less: 16
},
{
  th: ["พวกเขา", "เคย", "ไป", "ไต้หวัน"],
  rom: ["pûak kăo", "koie", "bpai", "tâi-wăn"],
  en: "They have been to Taiwan before.",
  less: 16
},
{
  th: ["ผม", "ไม่เคย", "กิน", "ทุเรียน"],
  rom: ["pŏm", "mâi koie", "gin", "tú-rian"],
  en: "I've never eaten durian.",
  less: 16
},
{
  th: ["คุณ", "เคย", "ไป", "สิงคโปร์", "ไหม"],
  rom: ["kun", "koie", "bpai", "sĭng-ká-poh", "măi"],
  en: "Have you ever been to Singapore?",
  less: 16
},
{
  th: ["เรา", "เคย", "ลอง", "นวดไทย"],
  rom: ["rao", "koie", "long", "nûat tai"],
  en: "We have tried Thai massage before.",
  less: 16
},
{
  th: ["เขา", "ยัง", "นอน", "อยู่"],
  rom: ["kăo", "yang", "non", "yòo"],
  en: "He/she is still sleeping.",
  less: 16
},
{
  th: ["ร้าน", "ยัง", "ไม่", "เปิด"],
  rom: ["ráan", "yang", "mâi", "bpèrt"],
  en: "The shop isn't open yet.",
  less: 16
},
{
  th: ["พวกเรา", "กำลัง", "ทำงาน", "อยู่"],
  rom: ["pûak rao", "gam-lang", "tam ngaan", "yòo"],
  en: "We're working right now.",
  less: 16
},
{
  th: ["ฉัน", "ยัง", "หิว", "อยู่"],
  rom: ["chăn", "yang", "hĭw", "yòo"],
  en: "I'm still hungry.",
  less: 16
},
{
  th: ["เธอ", "กิน", "ข้าว", "หรือยัง"],
  rom: ["ter", "gin", "kâao", "rěu yang"],
  en: "Have you eaten yet?",
  less: 16
},
{
  th: ["พ่อ", "กำลัง", "ขับรถ", "อยู่"],
  rom: ["pôr", "gam-lang", "kàp rót", "yòo"],
  en: "Dad is driving.",
  less: 16
},

{
  th: ["อาทิตย์", "ที่แล้ว", "พ่อ", "ป่วย", "มาก"],
  rom: ["aa-tít", "têe láew", "pôr", "bpùay", "mâak"],
  en: "Last week my dad was very sick.",
  less: 16
},
{
  th: ["เมื่อวาน", "ผม", "เป็น", "ไข้"],
  rom: ["mêua waan", "pŏm", "bpen", "kâi"],
  en: "Yesterday I had a fever.",
  less: 16
},
{
  th: ["สอง", "อาทิตย์", "ที่แล้ว", "ฉัน", "เป็นหวัด"],
  rom: ["sŏng", "aa-tít", "têe láew", "chăn", "bpen wàt"],
  en: "Two weeks ago I had a cold.",
  less: 16
},
{
  th: ["ตอนนี้", "ผม", "ปวดหัว", "และ", "เจ็บคอ"],
  rom: ["dton-née", "pŏm", "bpùat hŭa", "láe", "jèp kor"],
  en: "Right now I have a headache and a sore throat.",
  less: 16,
  answers: [
    ["ตอนนี้", "ผม", "ปวดหัว", "และ", "เจ็บคอ"],
    ["ตอนนี้", "ผม", "เจ็บคอ", "และ", "ปวดหัว"]
  ]
},
{
  th: ["เมื่อคืน", "ฉัน", "อ้วก", "และ", "ท้องเสีย"],
  rom: ["mêua keun", "chăn", "ûak", "láe", "tóng-sĭa"],
  en: "Last night I threw up and had diarrhea.",
  less: 16,
  answers: [
    ["เมื่อคืน", "ฉัน", "อ้วก", "และ", "ท้องเสีย"],
    ["เมื่อคืน", "ฉัน", "ท้องเสีย", "และ", "อ้วก"]
  ]
},
{
  th: ["เมื่อวาน", "ฉัน", "ปวดหัว", "มาก"],
  rom: ["mêua waan", "chăn", "bpùat hŭa", "mâak"],
  en: "Yesterday I had a bad headache.",
  less: 16
},
{
  th: ["เมื่อวาน", "น้อง", "ปวดท้อง", "ทั้งวัน"],
  rom: ["mêua waan", "nóng", "bpùat tóng", "táng wan"],
  en: "Yesterday my younger sibling had a stomach ache all day.",
  less: 16
},
{
  th: ["ตอนนี้", "ผม", "เวียนหัว", "และ", "คลื่นไส้"],
  rom: ["dton-née", "pŏm", "wian hŭa", "láe", "klêun sâi"],
  en: "Right now I feel dizzy and nauseous.",
  less: 16,
  answers: [
    ["ตอนนี้", "ผม", "เวียนหัว", "และ", "คลื่นไส้"],
    ["ตอนนี้", "ผม", "คลื่นไส้", "และ", "เวียนหัว"]
  ]
},
{
  th: ["เมื่อคืน", "ผม", "ไอ", "ทั้งคืน"],
  rom: ["mêua keun", "pŏm", "ai", "táng keun"],
  en: "Last night I coughed all night.",
  less: 16
},
{
  th: ["คิดว่า", "เธอ", "ยัง", "ไม่", "สบาย"],
  rom: ["kít wâa", "ter", "yang", "mâi", "sà-baai"],
  en: "I think you're still not feeling well.",
  less: 16
},
{
  th: ["เมื่อวาน", "ผม", "ดู", "หนัง", "สนุก", "สาม", "เรื่อง"],
  rom: ["mêua waan", "pŏm", "doo", "năng", "sà-nùk", "săam", "rêuang"],
  en: "Yesterday I watched three fun movies.",
  less: 16
},
{
  th: ["เมื่อคืน", "ผม", "กิน", "ผัดไทย", "อร่อย", "กับ", "เพื่อน"],
  rom: ["mêua keun", "pŏm", "gin", "pàt thai", "à-ròi", "gàp", "pêuan"],
  en: "Last night I ate a delicious Pad Thai with my friends.",
  less: 16
},
{
  th: ["คุณ", "เคย", "ไป", "ญี่ปุ่น", "หรือ", "ไต้หวัน", "ไหม"],
  rom: ["kun", "koie", "bpai", "yêe-pùn", "rĕu", "tâi-wăn", "măi"],
  en: "Have you ever been to Japan or Taiwan?",
  less: 16,
  answers: [
    ["คุณ", "เคย", "ไป", "ญี่ปุ่น", "หรือ", "ไต้หวัน", "ไหม"],
    ["คุณ", "เคย", "ไป", "ไต้หวัน", "หรือ", "ญี่ปุ่น", "ไหม"]
  ]
},

{
  th: ["อาทิตย์", "ที่แล้ว", "เรา", "กิน", "ส้มตำ", "สอง", "จาน"],
  rom: ["aa-tít", "têe láew", "rao", "gin", "sôm dtam", "sŏng", "jaan"],
  en: "Last week we ate two plates of papaya salad.",
  less: 16
},
{
  th: ["เธอ", "เคย", "ลอง", "อาหารไทย", "เผ็ด", "ไหม"],
  rom: ["ter", "koie", "long", "aa-hăan Thai", "pèt", "măi"],
  en: "Have you ever tried spicy Thai food?",
  less: 16
},
{
  th: ["เมื่อคืน", "พวกเรา", "ดื่ม", "เบียร์", "สาม", "แก้ว"],
  rom: ["mêua keun", "pûak rao", "dèum", "bia", "săam", "gâew"],
  en: "Last night we drank three glasses of beer.",
  less: 16
},
{
  th: ["ปี", "ที่แล้ว", "ผม", "ซื้อ", "รถยนต์", "สีดำ", "หนึ่ง", "คัน"],
  rom: ["bpee", "têe láew", "pŏm", "séu", "rót yon", "sĕe dam", "nèung", "kan"],
  en: "Last year I bought one black car.",
  less: 16
},
{
  th: ["พวกเขา", "ยัง", "ไม่ได้", "จ่าย", "เงิน"],
  rom: ["pûak kăo", "yang", "mâi dâai", "jàai", "ngern"],
  en: "They haven't paid yet.",
  less: 16
},
{
  th: ["เมื่อวาน", "ฉัน", "ไม่ได้", "ไป", "ทำงาน", "เพราะ", "ไม่", "สบาย"],
  rom: ["mêua waan", "chăn", "mâi dâai", "bpai", "tam ngaan", "prór", "mâi", "sà-baai"],
  en: "Yesterday I didn't go to work because I was sick.",
  less: 16
},
{
  th: ["วันนี้", "ผม", "ไม่ได้", "ไป", "ทำงาน"],
  rom: ["wan née", "pŏm", "mâi dâai", "bpai", "tam ngaan"],
  en: "Today I didn't go to work.",
  less: 16
},
{
  th: ["สอง", "ปี", "ที่แล้ว", "พี่ชาย", "ของฉัน", "เคย", "เรียน", "ภาษา", "ไทย", "ที่", "กรุงเทพ"],
  rom: ["sŏng", "bpee", "têe láew", "pêe chaai", "kŏng chăn", "koie", "rian", "paa-săa", "Thai", "têe", "krung têp"],
  en: "Two years ago my older brother studied Thai in Bangkok.",
  less: 16
},
{
  th: ["คุณ", "จะ", "กลับบ้าน", "เมื่อไหร่"],
  rom: ["kun", "jà", "glàp bâan", "mêua rai"],
  en: "When will you come home/go home?",
  less: 16
},
{
  th: ["คุณ", "จะ", "ไป", "ญี่ปุ่น", "เมื่อไหร่"],
  rom: ["kun", "jà", "bpai", "yêe-pùn", "mêua rai"],
  en: "When will you go to Japan?",
  less: 16
},
{
  th: ["เธอ", "ซื้อ", "รถ", "ใหม่", "เมื่อไหร่"],
  rom: ["ter", "séu", "rót", "mài", "mêua rai"],
  en: "When did you buy a new car?",
  less: 16
},
{
  th: ["คุณ", "ทำการบ้าน", "เสร็จ", "เมื่อไหร่"],
  rom: ["kun", "tam gaan bâan", "sèt", "mêua-rài"],
  en: "When did you finish your homework?",
  less: 16
},
{
  th: ["เร็ว ๆ นี้", "ผม", "ไป", "พัทยา", "มา"],
  rom: ["reo reo née", "pŏm", "bpai", "Pattaya", "maa"],
  en: "Recently I went to Pattaya.",
  less: 16
},
{
  th: ["เร็ว ๆ นี้", "ฉัน", "ซื้อ", "โทรศัพท์", "ใหม่"],
  rom: ["reo reo née", "chăn", "séu", "toh-rá-sàp", "mài"],
  en: "Recently I bought a new phone.",
  less: 16
},
{
  th: ["เร็ว ๆ นี้", "ผม", "จะ", "ไป", "ญี่ปุ่น"],
  rom: ["reo reo née", "pŏm", "jà", "bpai", "yêe-pùn"],
  en: "I'm going to Japan soon.",
  less: 16
},
{
  th: ["อาทิตย์", "ที่แล้ว", "ผม", "ยุ่ง", "มาก", "เลย"],
  rom: ["aa-tít", "têe láew", "pŏm", "yûng", "mâak", "loei"],
  en: "Last week I was really busy.",
  less: 16
},
{
  th: ["กีฬา", "โปรด", "ของ", "คุณ", "คือ", "อะไร"],
  rom: ["gee-laa", "bpròht", "kŏng", "kun", "keu", "à-rai"],
  en: "What's your favorite sport?",
  less: 16
},
{
  th: ["อาหาร", "โปรด", "ของ", "คุณ", "คือ", "อะไร"],
  rom: ["aa-hăan", "bpròht", "kŏng", "kun", "keu", "à-rai"],
  en: "What's your favorite food?",
  less: 16
},
{
  th: ["คุณ", "ชอบ", "อาหาร", "ไทย", "หรือ", "อาหาร", "ฝรั่ง", "มากกว่า", "กัน"],
  rom: ["kun", "chôp", "aa-hăan", "thai", "rĕu", "aa-hăan", "fà-ràng", "mâak gwàa", "gan"],
  en: "Do you like Thai food or Western food more?",
  less: 16
},
{
  th: ["คุณ", "ชอบ", "อากาศ", "ร้อน", "หรือ", "อากาศ", "หนาว", "มากกว่า", "กัน"],
  rom: ["kun", "chôp", "aa-gàat", "rón", "rĕu", "aa-gàat", "năao", "mâak gwàa", "gan"],
  en: "Do you like hot weather or cold weather more?",
  less: 16
},
{
  th: ["ผม", "ชอบ", "ดื่ม", "กาแฟ", "มากกว่า", "ชา"],
  rom: ["pŏm", "chôp", "dèum", "gaa-fae", "mâak gwàa", "chaa"],
  en: "I like coffee more than tea.",
  less: 16
},
{
  th: ["หนัง", "โปรด", "ของ", "คุณ", "คือ", "อะไร"],
  rom: ["năng", "bpròht", "kŏng", "kun", "keu", "à-rai"],
  en: "What's your favorite movie?",
  less: 16
},
{
  th: ["อาหาร", "โปรด", "ของ", "ฉัน", "คือ", "ราเม็ง"],
  rom: ["aa-hăan", "bpròht", "kŏng", "chăn", "keu", "raa-men"],
  en: "My favorite food is ramen.",
  less: 16
},
{
  th: ["คุณ", "อยาก", "ไป", "เที่ยว", "จีน", "หรือ", "ญี่ปุ่น", "มากกว่ากัน"],
  rom: ["kun", "yàak", "bpai", "tîeow", "jeen", "rĕu", "yêe-bpùn", "mâak gwàa gan"],
  en: "Would you rather visit China or Japan?",
  less: 16
},
{
  th: ["เรา", "เคย", "ไป", "เชียงใหม่", "สอง", "ครั้ง"],
  rom: ["rao", "koie", "bpai", "chiang-mài", "sŏng", "kráng"],
  en: "We have been to Chiang Mai two times.",
  less: 16
},
{
  th: ["เมื่อวาน", "ฉัน", "ยุ่ง", "มาก", "เลย"],
  rom: ["mêua waan", "chăn", "yûng", "mâak", "loei"],
  en: "Yesterday I was really busy.",
  less: 16
}
];
