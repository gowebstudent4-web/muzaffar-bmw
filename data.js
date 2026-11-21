/* Model ma'lumotlari — bosh sahifa karuseli va model.html uchun umumiy.
   Ko'rsatkichlar taxminiy (ommaviy manbalar bo'yicha). */
window.BMW_MODELS = [
  {
    id: 'm3', name: 'M3', tag: 'M', img: 'm3.jpg',
    hp: 510, acc: 3.5, top: 290, torque: 650,
    heroVideo: 'm3-a.mp4', filmVideo: 'm3-b.mp4',
    tagline: "Sport sedanlar etaloni — har kuni trekka tayyor.",
    lead: "M3 — to'rt eshikli avtomobilda poyga xarakterini kundalik qulaylik bilan birlashtirgan afsona.",
    text: "Birinchi M3 1986-yilda kuzov poygalari uchun yaratilgan. Bugungi avlod 3.0 litrli egizak turbo 6 silindrli dvigatel, 8 pog'onali M Steptronic va xohishga ko'ra orqa yoki to'liq privod bilan keladi. Shassi va rul aniqligi uni yo'lda ham, trekda ham haydovchining davomiga aylantiradi.",
    specs: [
      ['Dvigatel', '3.0 L, 6 silindr, egizak turbo'], ['Quvvat', '510 o.k.'], ['Moment', '650 Nm'],
      ['0–100 km/soat', '3.5 s'], ['Maks. tezlik', '290 km/soat'], ['Uzatma', '8 pog\'onali M Steptronic'],
      ['Privod', 'Orqa / M xDrive'], ['Og\'irlik', '≈ 1 800 kg']
    ],
    highlights: [
      ['Trek DNKsi', "Kuchaytirilgan kuzov, M differensial va sozlanuvchan haydash rejimlari."],
      ['Ikki xarakter', "Bir tugma bilan to'liq privoddan sof orqa privodga o'tish imkoniyati."],
      ['Kundalik qulaylik', "To'rt eshik, keng yukxona va zamonaviy raqamli salon."]
    ],
    gallery: ['m3.jpg', 'm3-2.jpg', 'm3-3.jpg', 'm3-4.jpg', 'snow.jpg', 'v:m3-a.mp4']
  },
  {
    id: 'm5', name: 'M5', tag: 'M Hybrid', img: 'm5.jpg',
    hp: 727, acc: 3.5, top: 305, torque: 1000,
    heroVideo: 'm5-a.mp4', filmVideo: 'm5-b.mp4',
    tagline: "Biznes-sedan qiyofasidagi super-avtomobil.",
    lead: "M5 tarixdagi eng kuchli versiyasida V8 va elektr motorni birlashtirdi — natija 727 ot kuchi.",
    text: "4.4 litrli V8 egizak turbo dvigatel va elektr motor jamoaviy ishlaydi: shaharda jimjit elektr rejimda, trassada esa 1000 Nm momentli bo'ron. M xDrive to'liq privodi kuchni yo'lga ishonchli yetkazadi, keng salon esa uzoq safarlarni yengil qiladi.",
    specs: [
      ['Dvigatel', '4.4 L V8 + elektr motor (gibrid)'], ['Quvvat', '727 o.k.'], ['Moment', '1 000 Nm'],
      ['0–100 km/soat', '3.5 s'], ['Maks. tezlik', '305 km/soat'], ['Uzatma', '8 pog\'onali M Steptronic'],
      ['Privod', 'M xDrive'], ['Elektr masofa', '≈ 67 km (WLTP)']
    ],
    highlights: [
      ['Gibrid kuch', "V8 va elektr motor birgalikda — eng kuchli seriyali M5."],
      ['Jimjit rejim', "Shahar ichida faqat elektr quvvatida harakatlanish."],
      ['Premium salon', "M sport o'rindiqlari, egilgan displey va yuqori sifatli materiallar."]
    ],
    gallery: ['m5.jpg', 'm5-2.jpg', 'm5-3.jpg', 'm5-4.jpg', 'v:m5-a.mp4']
  },
  {
    id: 'm2', name: 'M2', tag: 'M', img: 'bluecoupe.jpg',
    hp: 480, acc: 4.0, top: 285, torque: 600,
    heroVideo: 'm2-a.mp4', filmVideo: 'urban.mp4',
    tagline: "Kichik o'lcham, katta xarakter.",
    lead: "M2 — orqa privodli sof haydash zavqi uchun yaratilgan eng ixcham M kupe.",
    text: "Qisqa baza, keng iz va M3 bilan bir xil 6 silindrli dvigatel M2 ni burilishlarda juda chaqqon qiladi. Mexanik uzatma varianti esa haqiqiy haydovchilar uchun klassik tajriba taqdim etadi. Drift va trek kunlarining eng sevimli mashinasi.",
    specs: [
      ['Dvigatel', '3.0 L, 6 silindr, egizak turbo'], ['Quvvat', '480 o.k.'], ['Moment', '600 Nm'],
      ['0–100 km/soat', '4.0 s'], ['Maks. tezlik', '285 km/soat'], ['Uzatma', '8 pog\'onali avtomat / 6 mexanik'],
      ['Privod', 'Orqa'], ['Og\'irlik', '≈ 1 725 kg']
    ],
    highlights: [
      ['Orqa privod', "Faqat orqa g'ildiraklar — klassik M xarakteri."],
      ['Mexanik uzatma', "Pedal va richag bilan to'liq nazorat."],
      ['Ixcham kupe', "Qisqa baza burilishlarda maksimal chaqqonlik beradi."]
    ],
    gallery: ['bluecoupe.jpg', 'm2-2.jpg', 'm2-3.jpg', 'm2-4.jpg', 'v:closeup.mp4']
  },
  {
    id: 'x5', name: 'X5', tag: 'SAV', img: 'x5.jpg',
    hp: 530, acc: 4.3, top: 250, torque: 750,
    heroVideo: 'x5-a.mp4', filmVideo: 'x5-b.mp4',
    tagline: "Har qanday yo'l uchun hukmron qiyofa.",
    lead: "1999-yilda «Sports Activity Vehicle» tushunchasini yaratgan X5 bugun ham o'z sinfining yetakchisi.",
    text: "M60i versiyasidagi 4.4 litrli V8 va mild-gibrid tizimi katta krossoverni sport avtomobildek tezlashtiradi. xDrive to'liq privodi qor, tog' yo'li va shahar ko'chalarida bir xil ishonch beradi. Keng salon butun oila uchun qulay.",
    specs: [
      ['Dvigatel', '4.4 L V8, mild-gibrid'], ['Quvvat', '530 o.k.'], ['Moment', '750 Nm'],
      ['0–100 km/soat', '4.3 s'], ['Maks. tezlik', '250 km/soat'], ['Uzatma', '8 pog\'onali Steptronic'],
      ['Privod', 'xDrive'], ['Og\'irlik', '≈ 2 350 kg']
    ],
    highlights: [
      ['xDrive', "Aqlli to'liq privod har qanday ob-havoda barqarorlik beradi."],
      ['Pnevmo-osma', "Yo'l holatiga moslashadigan havo osmasi."],
      ['Oilaviy qulaylik', "Keng salon, katta yukxona va panorama tom."]
    ],
    gallery: ['x5.jpg', 'x5-2.jpg', 'x5-3.jpg', 'x5-4.jpg', 'ix-2.jpg', 'v:x5-a.mp4']
  },
  {
    id: 'i4', name: 'i4', tag: 'Electric', img: 'i4a.jpg',
    hp: 544, acc: 3.9, top: 225, torque: 795,
    heroVideo: 'i4-a.mp4', filmVideo: 'i4-b.mp4',
    tagline: "Elektr quvvatidagi gran kupe.",
    lead: "i4 M50 — elektr avtomobil ham haqiqiy haydash zavqini bera olishining isboti.",
    text: "Ikki elektr motor 544 ot kuchi va bir zumda keladigan 795 Nm moment beradi. Past joylashgan batareya og'irlik markazini pasaytiradi, shuning uchun i4 burilishlarda juda barqaror. Gran kupe shakli esa nafis siluet va amaliy yukxonani birlashtiradi.",
    specs: [
      ['Yuritma', 'Ikki elektr motor'], ['Quvvat', '544 o.k.'], ['Moment', '795 Nm'],
      ['0–100 km/soat', '3.9 s'], ['Maks. tezlik', '225 km/soat'], ['Uzatma', '1 pog\'onali'],
      ['Privod', "To'liq (AWD)"], ['Masofa', '≈ 520 km (WLTP)']
    ],
    highlights: [
      ['Bir zumda moment', "Elektr motor pedal bosilishi bilan to'liq kuch beradi."],
      ['Past og\'irlik markazi', "Pol ostidagi batareya barqaror boshqaruv beradi."],
      ['Tez quvvatlash', "Tezkor quvvatlash stansiyasida qisqa vaqtda yuzlab km."]
    ],
    gallery: ['i4a.jpg', 'i4-2.jpg', 'i4-3.jpg', 'tail.jpg', 'v:i4-a.mp4']
  },
  {
    id: 'ix', name: 'iX', tag: 'Electric', img: 'ixa.jpg',
    hp: 619, acc: 3.8, top: 250, torque: 1100,
    heroVideo: 'ix-a.mp4', filmVideo: 'ix-b.mp4',
    tagline: "Elektr davrining flagman krossoveri.",
    lead: "iX — yangi dizayn tili, ilg'or texnologiyalar va jimjit kuchning ramzi.",
    text: "iX M60 versiyasida ikki elektr motor 619 ot kuchi va 1100 Nm moment hosil qiladi. Salon minimalistik «lounge» uslubida: egilgan displey, barqaror materiallar va panorama tom. Uzoq masofa va tez quvvatlash uni kundalik hayot uchun qulay qiladi.",
    specs: [
      ['Yuritma', 'Ikki elektr motor'], ['Quvvat', '619 o.k.'], ['Moment', '1 100 Nm'],
      ['0–100 km/soat', '3.8 s'], ['Maks. tezlik', '250 km/soat'], ['Uzatma', '1 pog\'onali'],
      ['Privod', "To'liq (AWD)"], ['Masofa', '≈ 560 km (WLTP)']
    ],
    highlights: [
      ['Lounge salon', "Minimalistik dizayn, keng joy va tabiiy materiallar."],
      ['Egilgan displey', "Haydovchiga qaratilgan yagona katta ekran."],
      ['Barqarorlik', "Qayta ishlangan materiallar va nodir metallarsiz motorlar."]
    ],
    gallery: ['ixa.jpg', 'ixb.jpg', 'ix-3.jpg', 'grill.jpg', 'interior.jpg', 'v:ix-a.mp4']
  },
  {
    id: 's7', name: '7 Series', tag: 'Luxury', img: 'teal.jpg',
    hp: 544, acc: 4.2, top: 250, torque: 750,
    heroVideo: 's7-a.mp4', filmVideo: 's7-b.mp4',
    tagline: "Hashamat va texnologiyaning eng yuqori nuqtasi.",
    lead: "7 Series — orqa o'rindiqda o'tirish ham haydash kabi zavq beradigan flagman sedan.",
    text: "760i versiyasida 4.4 litrli V8 mild-gibrid dvigatel ipakdek silliq tezlanish beradi. Orqa yo'lovchilar uchun shiftdan tushadigan katta kinoekran, massaj o'rindiqlari va jimjit salon — bu g'ildirakdagi biznes-lounge.",
    specs: [
      ['Dvigatel', '4.4 L V8, mild-gibrid'], ['Quvvat', '544 o.k.'], ['Moment', '750 Nm'],
      ['0–100 km/soat', '4.2 s'], ['Maks. tezlik', '250 km/soat'], ['Uzatma', '8 pog\'onali Steptronic'],
      ['Privod', 'xDrive'], ['Og\'irlik', '≈ 2 400 kg']
    ],
    highlights: [
      ['Kinoteatr ekran', "Orqa yo'lovchilar uchun shiftdan tushadigan katta ekran."],
      ['Jimjit salon', "Akustik oynalar va havo osmasi bilan mukammal sukunat."],
      ['Yorituvchi panjara', "Tunda yorug'lik bilan ajralib turadigan old qism."]
    ],
    gallery: ['teal.jpg', 's7-2.jpg', 's7-3.jpg', 's7.jpg', 'v:s7-a.mp4']
  }
];
