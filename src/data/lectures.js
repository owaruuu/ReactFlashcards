const lectures = [
    {
        lectureId: "25",
        name: "Voc 25 oct 2023",
        termList: [
            {
                id: 0,
                term: "せんてんせい",
                extra: "先天性",
                answer: "Hereditario, Desde que se nace",
            },
            {
                id: 1,
                term: "こうてんせい",
                extra: "後天性",
                answer: "Enfermedad o discapacidad adquirida",
            },
            { id: 2, term: "しっかん", extra: "疾患", answer: "Enfermedad" },
            {
                id: 3,
                term: "できごと",
                extra: "出来事",
                answer: "Diversos incidentes, asuntos y accidentes que ocurren en el mundo.",
            },
            {
                id: 4,
                term: "におい",
                extra: "匂い",
                answer: "Olor (en general bueno)",
            },
            { id: 5, term: "におい", extra: "臭い", answer: "Olor malo" },
            {
                id: 6,
                term: "においけし",
                extra: "臭い消し",
                answer: "Desodorante",
            },
            {
                id: 7,
                term: "からだつき",
                extra: "体つき",
                answer: "Físico(Forma de su cuerpo)tamaño del cuerpo/forma del cuerpo",
            },
            {
                id: 8,
                term: "たいかく",
                extra: "体かく",
                answer: "Físico(Forma de su cuerpo)tamaño del cuerpo/forma del cuerpo",
            },
            {
                id: 9,
                term: "かたはば",
                extra: "肩幅",
                answer: "Ancho de hombro/Largo de hombro",
            },
            { id: 10, term: "はば", extra: "幅", answer: "Ancho" },
            {
                id: 11,
                term: "かけがえのない",
                extra: "",
                answer: "Una expresión que significa que (la vida, el vínculo, la amistad, los recuerdos, etc.) no se puede sustituir, es única, es más importante que cualquier otra cosa y no quieres perderla nunca",
            },
            {
                id: 12,
                term: "じしょう",
                extra: "自称",
                answer: "Autodesignación",
            },
            {
                id: 13,
                term: "ほごしせつ",
                extra: "保護施設",
                answer: "Lugar de refugio",
            },
            { id: 14, term: "ほご", extra: "保護", answer: "Protección" },
            {
                id: 15,
                term: "しせつ",
                extra: "施設",
                answer: "Estructuras, edificios y su equipamiento utilizados en la vida social.",
            },
            { id: 16, term: "～のような", extra: "", answer: "Como, Parece" },
            { id: 17, term: "だまる", extra: "黙る", answer: "Callarse" },
            {
                id: 18,
                term: "ゆるい",
                extra: "緩い",
                answer: "Estado suelto,　suave etc..",
            },
            {
                id: 19,
                term: "きつい",
                extra: "",
                answer: "Estado firme, estricto(informal), intensa",
            },
            {
                id: 20,
                term: "せっする",
                extra: "接する",
                answer: "Tocar, hacer interaccion con alguien algo etc",
            },
            {
                id: 21,
                term: "したう",
                extra: "慕う",
                answer: "Respetar,admirar etc...",
            },
            {
                id: 22,
                term: "ちかごろ",
                extra: "近頃",
                answer: "Recientemente",
            },
            {
                id: 23,
                term: "さいきん",
                extra: "最近",
                answer: "Recientemente",
            },
            {
                id: 24,
                term: "ふくらむ",
                extra: "膨らむ",
                answer: "Ser Inflamado, Ser expandido (intransitivo)",
            },
            {
                id: 25,
                term: "ふくらませる",
                extra: "膨らませる",
                answer: "Hacer Inflamar",
            },
            {
                id: 26,
                term: "～のほう",
                extra: "",
                answer: "Parte de, Dirección de",
            },
            { id: 27, term: "～(の)ほうが", extra: "", answer: "Es mas" },
            {
                id: 28,
                term: "はやる",
                extra: "流行る",
                answer: "Estar de moda",
            },
            { id: 29, term: "りゅうこう", extra: "流行", answer: "Moda" },
            {
                id: 30,
                term: "うとい",
                extra: "疎い",
                answer: "Lento, No sabe (tanto) de un tema",
            },
            {
                id: 31,
                term: "きをつかう",
                extra: "気を使う",
                answer: "Cuidar, Dar atención",
            },
            { id: 32, term: "じゃっかん", extra: "若干", answer: "Poco" },
            {
                id: 33,
                term: "こめる",
                extra: "込める",
                answer: "Poner (emocion, esfuerzo en algo)",
            },
            {
                id: 34,
                term: "にじのはしをわたる",
                extra: "虹の橋を渡る",
                answer: "Morir la mascota (lit. cruzar el puente arcoiris)",
            },
            {
                id: 35,
                term: "ずかん",
                extra: "図鑑",
                answer: "Libro que utiliza diagramas y fotografías para explicar las cosas de forma conveniente para una comprensión sistemática de su clasificación, diferencias, etc.",
            },
            {
                id: 36,
                term: "じえいぎょう",
                extra: "自営業",
                answer: "Empresa independiente",
            },
            {
                id: 37,
                term: "かわいそう",
                extra: "可哀想",
                answer: "Pobrecito",
            },
            { id: 38, term: "かう", extra: "飼う", answer: "Tener mascota" },
            { id: 39, term: "しんせき", extra: "親戚", answer: "Parientes" },
            {
                id: 40,
                term: "しょじじょう",
                extra: "諸事情",
                answer: "Un eufemismo para cuando no quieres revelar la situación o la razón a la otra persona, o cuando la situación es complicada y difícil de explicar.",
            },
            {
                id: 41,
                term: "のらいぬ",
                extra: "野良犬, ノラ犬",
                answer: "Perro callejero",
            },
            {
                id: 42,
                term: "のらねこ",
                extra: "野良猫, ノラ猫",
                answer: "Gato callejero",
            },
            {
                id: 43,
                term: "ちょうなん",
                extra: "長男",
                answer: "Primer hijo",
            },
            { id: 44, term: "じなん", extra: "次男", answer: "Segundo hijo" },
            { id: 45, term: "さんなん", extra: "三男", answer: "Tercer hijo" },
            {
                id: 46,
                term: "ちょうじょ",
                extra: "長女",
                answer: "Primera hija",
            },
            { id: 47, term: "じじょ", extra: "次女", answer: "Segunda hija" },
            { id: 48, term: "さんじょ", extra: "三女", answer: "Tercera hija" },
            {
                id: 49,
                term: "くらす",
                extra: "暮らす",
                answer: "Vivir un dia cotidiano",
            },
            {
                id: 50,
                term: "くらし",
                extra: "暮らし",
                answer: "Vida cotidiana",
            },
            {
                id: 51,
                term: "じしつ",
                extra: "自室",
                answer: "Mi piesa, Su piesa",
            },
            { id: 52, term: "がめん", extra: "画面", answer: "Pantalla" },
            { id: 53, term: "ちゅうしん", extra: "中心", answer: "Centro" },
            { id: 54, term: "わかさ", extra: "若さ", answer: "Joventud" },
        ],
    },
    {
        lectureId: "3",
        name: "Leccion 1 Minna",
        termList: [
            { id: 0, term: "わたし watashi", extra: "私", answer: "Yo" },
            {
                id: 1,
                term: "わたしたち watashitachi",
                extra: "私達",
                answer: "Nosotros",
            },
            { id: 2, term: "あなた anata", extra: "", answer: "Usted" },
            {
                id: 3,
                term: "あのひと anohito",
                extra: "あの人",
                answer: "Aquella persona",
            },
            {
                id: 4,
                term: "あのかた anokata",
                extra: "あの方",
                answer: "Aquella persona(formal)",
            },
            {
                id: 5,
                term: "みなさん minasan",
                extra: "皆さん",
                answer: "Todos",
            },
            { id: 6, term: "さん san", extra: "", answer: "Señor" },
            {
                id: 7,
                term: "ちゃん chan",
                extra: "",
                answer: "Sufijo antiguamente para niñas pero hoy en dia cualquier sexo",
            },
            {
                id: 8,
                term: "くん kun",
                extra: "",
                answer: "Sufijo antiguamente para niños pero hoy en dia cualquier sexo",
            },
            {
                id: 9,
                term: "じん jin",
                extra: "人",
                answer: "Sufijo nacionalidad",
            },
            {
                id: 10,
                term: "せんせい sensei",
                extra: "先生",
                answer: "Profesor(para llamar atencion del profesor)",
            },
            {
                id: 11,
                term: "きょうし kyoushi",
                extra: "教師",
                answer: "Profesor(profesion, cuando te refieres a ti mismo)",
            },
            {
                id: 12,
                term: "がくせい gakusei",
                extra: "学生",
                answer: "Estudiante(cuando te refieres a ti mismo)",
            },
            {
                id: 45,
                term: "せいと seito",
                extra: "生徒",
                answer: "Estudiante(para llamar la atencion del estudiante)",
            },
            {
                id: 13,
                term: "かいしゃいん kaishain",
                extra: "会社員",
                answer: "Empleado de una empresa",
            },
            {
                id: 14,
                term: "しゃいん shain",
                extra: "社員",
                answer: "Empleado de la empresa",
            },
            {
                id: 15,
                term: "ぎんこういん ginkouin",
                extra: "銀行員",
                answer: "Empleado de banco",
            },
            { id: 16, term: "いしゃ isha", extra: "医者", answer: "Doctor" },
            {
                id: 17,
                term: "けんきゅうしゃ kenkyuusha",
                extra: "研究者",
                answer: "Investigador",
            },
            {
                id: 18,
                term: "エンジニア enjinia",
                extra: "",
                answer: "Ingeniero",
            },
            {
                id: 19,
                term: "だいがく daigaku",
                extra: "大学",
                answer: "Universidad",
            },
            {
                id: 20,
                term: "びょういん byouin",
                extra: "病院",
                answer: "Hospital",
            },
            {
                id: 21,
                term: "でんき denki",
                extra: "電気",
                answer: "Electricidad",
            },
            { id: 22, term: "だれ dare", extra: "誰", answer: "Quien" },
            {
                id: 23,
                term: "どなた donata",
                extra: "",
                answer: "Quien(formal)",
            },
            {
                id: 24,
                term: "さい sai",
                extra: "歳 / 才",
                answer: "Contador edad",
            },
            {
                id: 25,
                term: "なんさい nansai",
                extra: "何歳",
                answer: "Cuantos años",
            },
            {
                id: 26,
                term: "おいくつ oikutsu",
                extra: "お幾つ",
                answer: "Que edad(formal)",
            },
            { id: 27, term: "はい hai", extra: "", answer: "Si" },
            { id: 28, term: "いいえ iie", extra: "", answer: "No" },
            {
                id: 29,
                term: "しつれいですが shitsureidesuga",
                extra: "失礼ですが",
                answer: "Disculpe pero",
            },
            {
                id: 30,
                term: "おなまえは？ onamaewa",
                extra: "お名前は",
                answer: "Como se llama usted?",
            },
            {
                id: 31,
                term: "はじめまして hajimemashite",
                extra: "初めまして",
                answer: "Mucho gusto",
            },
            {
                id: 32,
                term: "どうぞよろしく douzoyoroshiku",
                extra: "",
                answer: "Encantado de conocerte",
            },
            {
                id: 33,
                term: "こちらは。。。さんです kochirawa...sandesu",
                extra: "",
                answer: "Le presento a...",
            },
            {
                id: 34,
                term: "。。。からきました ...karakimashita",
                extra: "",
                answer: "Vengo de...",
            },
            { id: 35, term: "アメリカ amerika", extra: "", answer: "EE.UU" },
            {
                id: 36,
                term: "イギリス igirisu",
                extra: "",
                answer: "Inglaterra",
            },
            { id: 37, term: "インド indo", extra: "", answer: "India" },
            {
                id: 38,
                term: "インドネシア indoneshia",
                extra: "",
                answer: "Indonesia",
            },
            {
                id: 39,
                term: "かんこく kankoku",
                extra: "韓国",
                answer: "Corea del sur",
            },
            { id: 40, term: "タイ tai", extra: "", answer: "Tailandia" },
            {
                id: 41,
                term: "ちゅうごく chuugoku",
                extra: "中国",
                answer: "China",
            },
            { id: 42, term: "ドイツ doitsu", extra: "", answer: "Alemania" },
            { id: 43, term: "にほん nihon", extra: "日本", answer: "Japon" },
            { id: 44, term: "フランス furansu", extra: "", answer: "Francia" },
        ],
    },
];

export default lectures;