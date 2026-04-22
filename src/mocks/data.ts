import { type StudentData } from '@/components/TopClassmates'
import { type TrainerType } from '@/features/trainers-engine/trainersMap'

export const areas = [
	{ id: 1, value: 'Магас' },
	{ id: 2, value: 'Карабулак' },
	{ id: 3, value: 'Малгобек' },
	{ id: 4, value: 'Назрань' },
	{ id: 5, value: 'Сунжа' },
]
export const countries = [
	{ id: 1, value: 'Россия' },
	{ id: 2, value: 'Китай' },
]
export const schools = [
	{ id: 1, name: "ГБОУ 'СОШ № 3 г. Назрань'" },
	{ id: 2, name: "ГБОУ 'Средняя общеобразовательная школа № 7 г. Назрань'" },
	{ id: 3, name: 'Средняя Образовательная Школа 4' },
	{ id: 4, name: 'Гимназия №1 г. Назрань' },
	{ id: 5, name: "ГКОУ 'СОШ №5 с.п.Орджоникидзевское'" },
]
export const cities = [
	{ id: 1, name: 'Москва' },
	{ id: 2, name: 'Санкт-Петербург' },
	{ id: 3, name: 'Грозный' },
]
export const globalAreas = [
	{ id: 77, name: 'Москва' },
	{ id: 78, name: 'Санкт-Петербург' },
	{ id: 50, name: 'Московская область' },
	{ id: 47, name: 'Ленинградская область' },
	{ id: 54, name: 'Новосибирская область' },
	{ id: 66, name: 'Свердловская область' },
	{ id: 52, name: 'Нижегородская область' },
	{ id: 74, name: 'Челябинская область' },
	{ id: 61, name: 'Ростовская область' },
	{ id: 63, name: 'Самарская область' },
	{ id: 36, name: 'Воронежская область' },
	{ id: 72, name: 'Тюменская область' },
	{ id: 34, name: 'Волгоградская область' },
	{ id: 64, name: 'Саратовская область' },
	{ id: 42, name: 'Кемеровская область' },
	{ id: 31, name: 'Белгородская область' },
]
export const regions = [
	{ id: 1, name: 'Москва' },
	{ id: 2, name: 'Санкт-Петербург' },
	{ id: 3, name: 'Московская область' },
	{ id: 4, name: 'Ленинградская область' },
	{ id: 5, name: 'Новосибирская область' },
	{ id: 6, name: 'Свердловская область' },
	{ id: 7, name: 'Республика Татарстан' },
	{ id: 8, name: 'Краснодарский край' },
	{ id: 9, name: 'Нижегородская область' },
	{ id: 10, name: 'Челябинская область' },
	{ id: 11, name: 'Ростовская область' },
	{ id: 12, name: 'Самарская область' },
]
export const classLevels = [
	{ id: 1, name: '1' },
	{ id: 2, name: '2' },
	{ id: 3, name: '3' },
	{ id: 4, name: '4' },
	{ id: 5, name: '5' },
	{ id: 6, name: '6' },
	{ id: 7, name: '7' },
	{ id: 8, name: '8' },
	{ id: 9, name: '9' },
	{ id: 10, name: '10' },
	{ id: 11, name: '11' },
]
export const tabs = [
	{ id: 0, name: 'Ингушетия' },
	{ id: 1, name: 'Др. регионы' },
]
export const courses = [
	{
		id: 1,
		title: 'Ингушский язык',
		description: 'Базовые навыки языка, алфавит, общение',
		moduleCount: 3,
		image: 'ingush_bg',
		modules: [
			{
				id: 1,
				moduleNumber: 1,
				title: 'Алфавит',
				lessonsCount: 12,
				courseId: 1,
			},
			{
				id: 2,
				moduleNumber: 2,
				title: 'Фонетика',
				lessonsCount: 10,
				courseId: 1,
			},
			{
				id: 3,
				moduleNumber: 3,
				title: 'Лексикология',
				lessonsCount: 15,
				courseId: 1,
			},
		],
	},
	{
		id: 2,
		title: 'Математика',
		description: 'Алгебра и геометрия для средней школы',
		moduleCount: 5,
		image: 'math_bg',
		modules: [
			{
				id: 4,
				moduleNumber: 1,
				title: 'Алгебраические выражения',
				lessonsCount: 14,
				courseId: 2,
			},
			{
				id: 5,
				moduleNumber: 2,
				title: 'Уравнения и неравенства',
				lessonsCount: 18,
				courseId: 2,
			},
			{
				id: 6,
				moduleNumber: 3,
				title: 'Геометрия: планиметрия',
				lessonsCount: 16,
				courseId: 2,
			},
			{
				id: 7,
				moduleNumber: 4,
				title: 'Тригонометрия',
				lessonsCount: 12,
				courseId: 2,
			},
			{
				id: 8,
				moduleNumber: 5,
				title: 'Начала анализа',
				lessonsCount: 10,
				courseId: 2,
			},
		],
	},
	{
		id: 3,
		title: 'Химия',
		description: 'Основы неорганической и органической химии',
		moduleCount: 4,
		image: 'chemistry_bg',
		modules: [
			{
				id: 9,
				moduleNumber: 1,
				title: 'Основные понятия',
				lessonsCount: 8,
				courseId: 3,
			},
			{
				id: 10,
				moduleNumber: 2,
				title: 'Периодический закон',
				lessonsCount: 12,
				courseId: 3,
			},
			{
				id: 11,
				moduleNumber: 3,
				title: 'Химические реакции',
				lessonsCount: 15,
				courseId: 3,
			},
			{
				id: 12,
				moduleNumber: 4,
				title: 'Органическая химия',
				lessonsCount: 18,
				courseId: 3,
			},
		],
	},
	{
		id: 4,
		title: 'История',
		description: 'Всемирная история с древности до наших дней',
		moduleCount: 4,
		image: 'world_history_bg',
		modules: [
			{
				id: 13,
				moduleNumber: 1,
				title: 'Древний мир',
				lessonsCount: 10,
				courseId: 4,
			},
			{
				id: 14,
				moduleNumber: 2,
				title: 'Средние века',
				lessonsCount: 12,
				courseId: 4,
			},
			{
				id: 15,
				moduleNumber: 3,
				title: 'Новое время',
				lessonsCount: 14,
				courseId: 4,
			},
			{
				id: 16,
				moduleNumber: 4,
				title: 'Новейшая история',
				lessonsCount: 16,
				courseId: 4,
			},
		],
	},
	{
		id: 5,
		title: 'Физика',
		description: 'Основы механики и термодинамики',
		moduleCount: 4,
		image: 'physics_bg',
		modules: [
			{
				id: 17,
				moduleNumber: 1,
				title: 'Кинематика',
				lessonsCount: 10,
				courseId: 5,
			},
			{
				id: 18,
				moduleNumber: 2,
				title: 'Динамика',
				lessonsCount: 14,
				courseId: 5,
			},
			{
				id: 19,
				moduleNumber: 3,
				title: 'Законы сохранения',
				lessonsCount: 12,
				courseId: 5,
			},
			{
				id: 20,
				moduleNumber: 4,
				title: 'Молекулярная физика',
				lessonsCount: 16,
				courseId: 5,
			},
		],
	},
	{
		id: 6,
		title: 'История России',
		description: 'От Древней Руси до современности',
		moduleCount: 5,
		image: 'russian_history_bg',
		modules: [
			{
				id: 21,
				moduleNumber: 1,
				title: 'Киевская Русь',
				lessonsCount: 8,
				courseId: 6,
			},
			{
				id: 22,
				moduleNumber: 2,
				title: 'Московское царство',
				lessonsCount: 10,
				courseId: 6,
			},
			{
				id: 23,
				moduleNumber: 3,
				title: 'Российская империя',
				lessonsCount: 14,
				courseId: 6,
			},
			{
				id: 24,
				moduleNumber: 4,
				title: 'СССР',
				lessonsCount: 16,
				courseId: 6,
			},
			{
				id: 25,
				moduleNumber: 5,
				title: 'Российская Федерация',
				lessonsCount: 12,
				courseId: 6,
			},
		],
	},
]
export const reviewsMockData = [
	{
		id: 1,
		name: 'Амина Т.',
		rating: 5,
		text: 'Прекрасный курс! Учитель объясняет очень доступно, материал усваивается легко. Задания интересные и полезные.',
		subject: 'Ингушский язык, 8 класс',
	},
	{
		id: 2,
		name: 'Ибрагим К.',
		rating: 4,
		text: 'Хорошая подача материала, но иногда не хватает практических примеров. В целом доволен прогрессом.',
		subject: 'Математика, 10 класс',
	},
	{
		id: 3,
		name: 'Залина А.',
		rating: 3,
		text: 'Курс неплохой, но ожидала больше интерактива. Теория объясняется понятно, а вот с практикой слабовато.',
		subject: 'Химия, 9 класс',
	},
	{
		id: 4,
		name: 'Адам Б.',
		rating: 5,
		text: 'Лучший преподаватель по физике! Сложные темы становятся простыми и понятными. Рекомендую всем одноклассникам.',
		subject: 'Физика, 11 класс',
	},
	{
		id: 5,
		name: 'Мадина С.',
		rating: 2,
		text: 'Разочарована курсом. Материал подается хаотично, нет четкой структуры. Некоторые темы объясняются слишком поверхностно.',
		subject: 'История России, 8 класс',
	},
	{
		id: 6,
		name: 'Аслан М.',
		rating: 4,
		text: 'Интересные лекции по всемирной истории, особенно понравились материалы по Древнему миру. Хотелось бы больше тестов для закрепления.',
		subject: 'История, 7 класс',
	},
	{
		id: 7,
		name: 'Лейла Х.',
		rating: 5,
		text: 'Ингушский язык преподается на высшем уровне! Виден прогресс уже после первого месяца занятий. Спасибо за качественный курс!',
		subject: 'Ингушский язык, 6 класс',
	},
]
export const TEST_CLASSMATES: StudentData[] = [
	{
		id: 1,
		type: 'classmates',
		class: '7 "Б"',
		name: 'Дзауров Ахмед',
		doneModules: 18,
		placeNumber: 1,
		points: 120,
		time: 157,
	},
	{
		id: 2,
		type: 'classmates',
		class: '7 "Б"',
		name: 'Кодзоева Мадина',
		doneModules: 15,
		placeNumber: 2,
		points: 115,
		time: 135,
	},
	{
		id: 3,
		type: 'classmates',
		class: '7 "Б"',
		name: 'Богатырев Исмаил',
		doneModules: 12,
		placeNumber: 3,
		points: 105,
		time: 110,
	},
	{
		id: 4,
		type: 'classmates',
		class: '7 "Б"',
		name: 'Эсмурзиева Амина',
		doneModules: 10,
		placeNumber: 4,
		points: 95,
		time: 90,
	},
]

export const TEST_PARALLEL: StudentData[] = [
	{
		id: 1,
		type: 'parallel',
		class: '7 "Б"',
		name: 'Дзауров Ахмед',
		doneModules: 18,
		placeNumber: 1,
		points: 120,
		time: 157,
	},
	{
		id: 2,
		type: 'parallel',
		class: '8 "А"',
		name: 'Мальсагова Зарина',
		doneModules: 16,
		placeNumber: 2,
		points: 118,
		time: 180,
	},
	{
		id: 3,
		type: 'parallel',
		class: '9 "В"',
		name: 'Тумгоева Тамара',
		doneModules: 14,
		placeNumber: 3,
		points: 110,
		time: 125,
	},
	{
		id: 4,
		type: 'parallel',
		class: '7 "Г"',
		name: 'Оздоев Руслан',
		doneModules: 12,
		placeNumber: 4,
		points: 100,
		time: 105,
	},
]

// Генерация тестовых данных с разными датами
const generateDate = (daysAgo: number): Date => {
	const date = new Date()
	date.setDate(date.getDate() - daysAgo)
	return date
}

export const candleDateMockData = [
	{ id: 1, date: generateDate(0), currentPoints: 90 },
	{ id: 2, date: generateDate(1), currentPoints: 75 },
	{ id: 3, date: generateDate(2), currentPoints: 60 },
	{ id: 4, date: new Date(2023, 11, 31), currentPoints: 45 },
	{ id: 5, date: new Date(2023, 12, 28), currentPoints: 80 },
	{ id: 6, date: new Date(2023, 10, 1), currentPoints: 30 },
	{ id: 7, date: new Date(2024, 1, 11), currentPoints: 65 },

	{ id: 8, date: new Date(2023, 0, 1), currentPoints: 100 },
	{ id: 9, date: new Date(2023, 11, 31), currentPoints: 14 },
	{ id: 10, date: new Date(2023, 1, 29), currentPoints: 50 },

	{ id: 11, date: new Date(2022, 5, 15), currentPoints: 70 },
	{ id: 12, date: new Date(2024, 7, 20), currentPoints: 85 },
]

export const histogramDateMockData = Array.from({ length: 7 }, (_, i) => ({
	date: generateDate(6 - i),
	currentPoints: Math.floor(Math.random() * 100),
}))

export const lessonContent = [
	{
		id: 1,
		title: 'Орфография как система правил правописания слов и форм слов',
		content: [
			{
				type: 'paragraph',
				text: 'Орфография русского языка — это система правил, регулирующих написание слов и их форм. Она включает в себя множество аспектов, которые важно учитывать при изучении языка. Вот основные моменты, которые можно рассмотреть в теории к уроку по орфографии:',
			},
			{
				type: 'section',
				title: '1. Основные понятия орфографии',
				items: [
					'Орфография — это раздел языкознания, изучающий правила написания слов.',
					'Орфограмма — это элемент слова, написание которого подчиняется определённым правилам.',
				],
			},
			{
				type: 'section',
				title: '2. Правила написания слов',
				items: [
					"Правила написания гласных и согласных: В русском языке существуют определённые правила, касающиеся написания гласных и согласных звуков. Например, в некоторых случаях гласные могут изменяться в зависимости от ударения (например, 'молоко' и 'молока').",
					'Правила переноса слов: Перенос слов на другую строку также подчиняется определённым правилам, например, нельзя переносить слова по слогам, если это нарушает их целостность.',
				],
			},
			{
				type: 'section',
				title: '3. Ударение',
				items: [
					"Ударение в русском языке может быть подвижным и неподвижным. Оно влияет на написание некоторых слов и может изменять их значение. Например, 'замок' (крепость) и 'замок' (устройство для запирания).",
				],
			},
			{
				type: 'section',
				title: '4. Сложные случаи орфографии',
				items: [
					"Слова с приставками: Правила написания слов с приставками могут быть сложными. Например, 'при-' и 'пере-' могут требовать разного написания в зависимости от корня слова.",
					"Слова с чередующимися гласными: В некоторых словах гласные могут чередоваться в зависимости от формы слова (например, 'берёг' и 'беречь').",
				],
			},
			{
				type: 'section',
				title: '5. Орфографические словари',
				items: [
					'Для проверки правильности написания слов используются орфографические словари. Они содержат информацию о правильном написании, ударении и других аспектах.',
				],
			},
			{
				type: 'section',
				title: '6. Практические задания',
				items: [
					'Важно включать в урок практические задания, которые помогут учащимся закрепить полученные знания. Это могут быть упражнения на написание слов, определение ударения, а также работа с текстами.',
				],
			},
			{
				type: 'section',
				title: 'Заключение',
				items: [
					'Орфография — это важный аспект владения русским языком, который требует внимания и практики. Понимание правил написания слов поможет учащимся не только в учебе, но и в повседневной жизни.',
				],
			},
			{
				type: 'note',
				text: 'Эта структура может служить основой для вашего урока по орфографии русского языка.',
			},
		],
	},
	{
		id: 2,
		title: 'Орфография как система правил правописания слов и форм слов2',
		content: [
			{
				type: 'paragraph',
				text: 'Орфография русского языка — это система правил, регулирующих написание слов и их форм. Она включает в себя множество аспектов, которые важно учитывать при изучении языка. Вот основные моменты, которые можно рассмотреть в теории к уроку по орфографии:',
			},
			{
				type: 'section',
				title: '1. Основные понятия орфографии',
				items: [
					'Орфография — это раздел языкознания, изучающий правила написания слов.',
					'Орфограмма — это элемент слова, написание которого подчиняется определённым правилам.',
				],
			},
			{
				type: 'section',
				title: '2. Правила написания слов',
				items: [
					"Правила написания гласных и согласных: В русском языке существуют определённые правила, касающиеся написания гласных и согласных звуков. Например, в некоторых случаях гласные могут изменяться в зависимости от ударения (например, 'молоко' и 'молока').",
					'Правила переноса слов: Перенос слов на другую строку также подчиняется определённым правилам, например, нельзя переносить слова по слогам, если это нарушает их целостность.',
				],
			},
			{
				type: 'section',
				title: '3. Ударение',
				items: [
					"Ударение в русском языке может быть подвижным и неподвижным. Оно влияет на написание некоторых слов и может изменять их значение. Например, 'замок' (крепость) и 'замок' (устройство для запирания).",
				],
			},
			{
				type: 'section',
				title: '4. Сложные случаи орфографии',
				items: [
					"Слова с приставками: Правила написания слов с приставками могут быть сложными. Например, 'при-' и 'пере-' могут требовать разного написания в зависимости от корня слова.",
					"Слова с чередующимися гласными: В некоторых словах гласные могут чередоваться в зависимости от формы слова (например, 'берёг' и 'беречь').",
				],
			},
			{
				type: 'section',
				title: '5. Орфографические словари',
				items: [
					'Для проверки правильности написания слов используются орфографические словари. Они содержат информацию о правильном написании, ударении и других аспектах.',
				],
			},
			{
				type: 'section',
				title: '6. Практические задания',
				items: [
					'Важно включать в урок практические задания, которые помогут учащимся закрепить полученные знания. Это могут быть упражнения на написание слов, определение ударения, а также работа с текстами.',
				],
			},
			{
				type: 'section',
				title: 'Заключение',
				items: [
					'Орфография — это важный аспект владения русским языком, который требует внимания и практики. Понимание правил написания слов поможет учащимся не только в учебе, но и в повседневной жизни.',
				],
			},
			{
				type: 'note',
				text: 'Эта структура может служить основой для вашего урока по орфографии русского языка.',
			},
		],
	},
	{
		id: 3,
		title: 'Орфография как система правил правописания слов и форм слов3',
		content: [
			{
				type: 'paragraph',
				text: 'Орфография русского языка — это система правил, регулирующих написание слов и их форм. Она включает в себя множество аспектов, которые важно учитывать при изучении языка. Вот основные моменты, которые можно рассмотреть в теории к уроку по орфографии:',
			},
			{
				type: 'section',
				title: '1. Основные понятия орфографии',
				items: [
					'Орфография — это раздел языкознания, изучающий правила написания слов.',
					'Орфограмма — это элемент слова, написание которого подчиняется определённым правилам.',
				],
			},
			{
				type: 'section',
				title: '2. Правила написания слов',
				items: [
					"Правила написания гласных и согласных: В русском языке существуют определённые правила, касающиеся написания гласных и согласных звуков. Например, в некоторых случаях гласные могут изменяться в зависимости от ударения (например, 'молоко' и 'молока').",
					'Правила переноса слов: Перенос слов на другую строку также подчиняется определённым правилам, например, нельзя переносить слова по слогам, если это нарушает их целостность.',
				],
			},
			{
				type: 'section',
				title: '3. Ударение',
				items: [
					"Ударение в русском языке может быть подвижным и неподвижным. Оно влияет на написание некоторых слов и может изменять их значение. Например, 'замок' (крепость) и 'замок' (устройство для запирания).",
				],
			},
			{
				type: 'section',
				title: '4. Сложные случаи орфографии',
				items: [
					"Слова с приставками: Правила написания слов с приставками могут быть сложными. Например, 'при-' и 'пере-' могут требовать разного написания в зависимости от корня слова.",
					"Слова с чередующимися гласными: В некоторых словах гласные могут чередоваться в зависимости от формы слова (например, 'берёг' и 'беречь').",
				],
			},
			{
				type: 'section',
				title: '5. Орфографические словари',
				items: [
					'Для проверки правильности написания слов используются орфографические словари. Они содержат информацию о правильном написании, ударении и других аспектах.',
				],
			},
			{
				type: 'section',
				title: '6. Практические задания',
				items: [
					'Важно включать в урок практические задания, которые помогут учащимся закрепить полученные знания. Это могут быть упражнения на написание слов, определение ударения, а также работа с текстами.',
				],
			},
			{
				type: 'section',
				title: 'Заключение',
				items: [
					'Орфография — это важный аспект владения русским языком, который требует внимания и практики. Понимание правил написания слов поможет учащимся не только в учебе, но и в повседневной жизни.',
				],
			},
			{
				type: 'note',
				text: 'Эта структура может служить основой для вашего урока по орфографии русского языка.',
			},
		],
	},
]
export const initialLessons = [
	{
		id: 1,
		completed: false,
		number: 1,
		title: 'Морфемика как раздел лингвистики',
		text: 'Морфемика как раздел лингвистики',
		task: {
			id: 1,
			sentence:
				'Купил1 как-то обувной мастер {{1}} для того, чтобы {{2}} обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.',
			type: 'missing-word',
			missingWords: [
				{ id: 1, word: 'гвозди', missedLetter: 'в', wordNumber: 1 },
				{ id: 2, word: 'починить', missedLetter: 'и', wordNumber: 2 },
			],
		},
	},
	{
		id: 2,
		completed: false,
		number: 2,
		text: 'Состав слова. Морфемный анализ слов',
		title: 'Состав слова. Морфемный анализ слов',
		task: {
			id: 1,
			type: 'choice-right',
			title: 'Найдите однокоренные слова с чередующимися согласными в корне.',
			variants: [
				{
					id: 1,
					content: 'Скачок, скачка',
					correct: false,
				},
				{
					id: 2,
					content: 'Сбор, соберу',
					correct: true,
				},
				{
					id: 3,
					content: 'Дружок, дружочек',
					correct: false,
				},
				{
					id: 4,
					content: 'Срывать, сорвать',
					correct: false,
				},
			],
		},
	},
	{
		id: 3,
		completed: false,
		number: 3,
		text: 'Орфография как система правил правописания слов и форм слов',
		title: 'Орфография как система правил правописания слов и форм слов',
		task: {
			id: 3,
			sentence: 'На {{1}} небе светила яркая {{2}}, а под ней шумело {{3}} море.',
			type: 'missing-dnd',
			missingWords: [
				{ id: 1, word: 'ночном', missedLetter: 'о', wordNumber: 1 },
				{ id: 2, word: 'луна', missedLetter: 'у', wordNumber: 2 },
				{ id: 3, word: 'тёмное', missedLetter: 'ё', wordNumber: 3 },
			],
			slots: [
				{ id: 1, correct: 'о', current: null },
				{ id: 2, correct: 'у', current: null },
				{ id: 3, correct: 'ё', current: null },
			],
			letters: [
				{ id: 1, char: 'в' },
				{ id: 2, char: 'о' },
				{ id: 3, char: 'и' },
				{ id: 4, char: 'а' },
			],
		},
	},
]

export const exampleMissingData = [
	{
		id: 1,
		sentence:
			'Купил как-то обувной мастер {{1}} для того, чтобы {{2}} обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.',
		missingWords: [
			{ id: 1, word: 'гвозди', missedLetter: 'в', wordNumber: 1 },
			{ id: 2, word: 'починить', missedLetter: 'и', wordNumber: 2 },
		],
		completed: false,
		type: 'missing-word',
	},
	{
		id: 2,
		sentence: 'В лесу мы нашли {{1}} и решили {{2}} их домой.',
		missingWords: [
			{ id: 1, word: 'грибы', missedLetter: 'и', wordNumber: 1 },
			{ id: 2, word: 'принести', missedLetter: 'е', wordNumber: 2 },
		],
	},
	{
		id: 3,
		sentence: 'На {{1}} небе светила яркая {{2}}, а под ней шумело {{3}} море.',
		missingWords: [
			{ id: 1, word: 'ночном', missedLetter: 'о', wordNumber: 1 },
			{ id: 2, word: 'луна', missedLetter: 'у', wordNumber: 2 },
			{ id: 3, word: 'тёмное', missedLetter: 'ё', wordNumber: 3 },
		],
	},
	{
		id: 4,
		sentence: '{{1}} принёс {{2}} подарки для всех {{3}}.',
		missingWords: [
			{ id: 1, word: 'Дед Мороз', missedLetter: 'о', wordNumber: 1 },
			{ id: 2, word: 'новогодние', missedLetter: 'и', wordNumber: 2 },
			{ id: 3, word: 'детей', missedLetter: 'е', wordNumber: 3 },
		],
	},
	{
		id: 5,
		sentence: 'Художник взял {{1}} и начал {{2}} прекрасный {{3}}.',
		missingWords: [
			{ id: 1, word: 'кисть', missedLetter: 'и', wordNumber: 1 },
			{ id: 2, word: 'рисовать', missedLetter: 'о', wordNumber: 2 },
			{ id: 3, word: 'пейзаж', missedLetter: 'е', wordNumber: 3 },
		],
	},
]

export const exampleSelectData = [
	{
		id: 1,
		content: 'Скачок, скачка',
		correct: false,
	},
	{
		id: 2,
		content: 'Сбор, соберу',
		correct: true,
	},
	{
		id: 3,
		content: 'Дружок, дружочек',
		correct: false,
	},
	{
		id: 4,
		content: 'Срывать, сорвать',
		correct: false,
	},
]
export const attestationExampleData = [
	{
		id: 1,
		sentence:
			'Купил1 как-то обувной мастер {{1}} для того, чтобы {{2}} обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.',
		type: 'missing-word',
		missingWords: [
			{ id: 1, word: 'гвозди', missedLetter: 'в', wordNumber: 1 },
			{ id: 2, word: 'починить', missedLetter: 'и', wordNumber: 2 },
		],
		completed: false,
	},
	{
		id: 2,
		sentence: 'На {{1}} небе светила яркая {{2}}, а под ней шумело {{3}} море.',
		type: 'missing-dnd',
		missingWords: [
			{ id: 1, word: 'ночном', missedLetter: 'о', wordNumber: 1 },
			{ id: 2, word: 'луна', missedLetter: 'у', wordNumber: 2 },
			{ id: 3, word: 'тёмное', missedLetter: 'ё', wordNumber: 3 },
		],
		slots: [
			{ id: 1, correct: 'о', current: null },
			{ id: 2, correct: 'у', current: null },
			{ id: 3, correct: 'ё', current: null },
		],
		letters: [
			{ id: 1, char: 'в' },
			{ id: 2, char: 'о' },
			{ id: 3, char: 'и' },
			{ id: 4, char: 'а' },
			{ id: 5, char: 'у' },
			{ id: 6, char: 'ё' },
		],
		completed: false,
	},
	{
		id: 3,
		type: 'choice-right',
		title: 'Найдите однокоренные слова с чередующимися согласными в корне.',
		variants: [
			{
				id: 1,
				content: 'Скачок, скачка',
				correct: false,
			},
			{
				id: 2,
				content: 'Сбор, соберу',
				correct: true,
			},
			{
				id: 3,
				content: 'Дружок, дружочек',
				correct: false,
			},
			{
				id: 4,
				content: 'Срывать, сорвать',
				correct: false,
			},
		],
		completed: false,
	},
]
export const coursesB = [
	{
		id: 1,
		imageUrl: 'subjectbg1',
		title: 'Ингушский язык',
		description: 'Базовые навыки языка, алфавит, общение',
		modulesCount: 85,
		type: 'long' as const,
	},
	{
		id: 2,
		imageUrl: 'subjectbg2',
		title: 'Математика',
		description: 'Цифры, исчисления, арифметические вычисления',
		modulesCount: 58,
		type: 'long' as const,
	},
	{
		id: 3,
		imageUrl: 'subjectbg3',
		title: 'Чтение',
		description: 'Алфавит русского языка, чтение по слогам, фонетический разбор',
		modulesCount: 12,
		type: 'long' as const,
	},
	{
		id: 4,
		imageUrl: 'subjectbg4',
		title: 'Иностранный язык',
		description: 'База английского языка, алфавит и умение формировать предложения',
		modulesCount: 95,
		type: 'long' as const,
	},
	{
		id: 5,
		imageUrl: 'subjectbg5',
		title: 'Окружающий мир',
		description: 'Основы биологии, экологии и строения элементов',
		modulesCount: 62,
		type: 'long' as const,
	},
	{
		id: 6,
		imageUrl: 'subjectbg6',
		title: 'Русский язык',
		description: 'Алфавит, письмо и правописание, формирование предложений',
		modulesCount: 53,
		type: 'long' as const,
	},
	{
		id: 7,
		imageUrl: 'subjectbg7',
		title: 'ИЗО',
		description: 'Рисование простых фигур, основы форм, правила колористики',
		modulesCount: 49,
		type: 'long' as const,
	},
	{
		id: 8,
		imageUrl: 'subjectbg8',
		title: 'Информатика',
		description: 'Основы информационной грамотности, базовое использование ПК',
		modulesCount: 12,
		type: 'long' as const,
	},
]
export const barChartMockData = [
	{ date: new Date(2023, 9, 1), value: 150 },
	{ date: new Date(2023, 9, 2), value: 85 },
	{ date: new Date(2023, 9, 3), value: 120 },
	{ date: new Date(2023, 9, 4), value: 200 },
	{ date: new Date(2023, 9, 5), value: 65 },
	{ date: new Date(2023, 9, 6), value: 200 },
	{ date: new Date(2023, 9, 7), value: 45 },
	{ date: new Date(2023, 9, 8), value: 399 },
	{ date: new Date(2023, 9, 9), value: 95 },
	{ date: new Date(2023, 9, 10), value: 135 },
	{ date: new Date(2023, 9, 11), value: 175 },
	{ date: new Date(2023, 9, 12), value: 110 },
	{ date: new Date(2023, 9, 13), value: 110 },
	{ date: new Date(2023, 9, 14), value: 110 },
	{ date: new Date(2023, 9, 15), value: 110 },
	{ date: new Date(2023, 9, 16), value: 110 },
	{ date: new Date(2023, 9, 17), value: 110 },
	{ date: new Date(2023, 9, 11), value: 175 },
	{ date: new Date(2023, 9, 12), value: 110 },
	{ date: new Date(2023, 9, 13), value: 110 },
	{ date: new Date(2023, 9, 14), value: 110 },
	{ date: new Date(2023, 9, 15), value: 110 },
	{ date: new Date(2023, 9, 16), value: 110 },
	{ date: new Date(2023, 9, 17), value: 110 },
	{ date: new Date(2023, 9, 18), value: 175 },
	{ date: new Date(2023, 9, 19), value: 110 },
	{ date: new Date(2023, 9, 20), value: 110 },
	{ date: new Date(2023, 9, 21), value: 110 },
	{ date: new Date(2023, 9, 22), value: 110 },
	{ date: new Date(2023, 9, 23), value: 110 },
	{ date: new Date(2023, 9, 24), value: 110 },
]
export const testCardMock: {
	type: TrainerType
	payload: unknown
	title?: string
	subTitle?: string
	scoring: {
		points: number
		penaltyPerMistake: number
	}
}[] = [
	{
		type: 'accent-trainer',
		scoring: {
			points: 7,
			penaltyPerMistake: 3,
		},
		payload: {
			variants: [
				{ id: 1, letter: 'Б' },
				{ id: 2, letter: 'А' },
				{ id: 3, letter: 'Н' },
				{ id: 4, letter: 'Т' },
				{ id: 5, letter: 'Ы' },
			],
			correctVariantIds: [2],
		},
		title: 'Поставьте ударение',
	},
	// {
	// 	type: 'fix-sentence',
	// 	payload: {
	// 		sentence: 'Мы купили {{1}} яблоки.',
	// 		words: ['красное', 'красные', 'красную'],
	// 		correctAnswer: 'красные',
	// 	},
	// 	scoring: {
	// 		points: 7,
	// 		penaltyPerMistake: 3,
	// 	},
	// 	title: 'Исправьте предложение',
	// 	subTitle: 'test1',
	// },
	// {
	// 	type: 'alphabetic-sorter',
	// 	title: 'Расставь слова в алфавитном порядке',
	// 	subTitle: 'test2',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		slots: [
	// 			{
	// 				id: 1,
	// 				correctValue: 'абрикос',
	// 				slotTitle: '1',
	// 			},
	// 			{
	// 				id: 2,
	// 				correctValue: 'виноград',
	// 				slotTitle: '2',
	// 			},
	// 		],
	// 		variants: [
	// 			{
	// 				id: 1,
	// 				value: 'виноград',
	// 			},
	// 			{
	// 				id: 2,
	// 				value: 'абрикос',
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	type: 'category-matcher',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		items: [
	// 			{ id: 'w0', label: 'Яблоко', correct: 'cat-1', color: '#28da8f' },
	// 			{ id: 'w1', label: 'Морковь', correct: 'cat-0', color: '#da2848' },
	// 			{ id: 'w2', label: 'Банан', correct: 'cat-1', color: '#28da8f' },
	// 			{ id: 'w3', label: 'Картофель', correct: 'cat-0', color: '#da2848' },
	// 		],
	// 		categories: [
	// 			{ id: 'cat-0', label: 'Овощи', color: '#da2848' },
	// 			{ id: 'cat-1', label: 'Фрукты', color: '#28da8f' },
	// 		],
	// 	},
	// 	title: 'Соедини слова с нужной категорией',
	// },
	// {
	// 	type: 'colorize-words',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		tools: [
	// 			{
	// 				type: 'paint',
	// 				toolName: 'Люди и животные',
	// 				toolColor: '#698eff',
	// 			},
	// 			{
	// 				type: 'paint',
	// 				toolName: 'Неживые предметы и явления',
	// 				toolColor: '#ff4e8c',
	// 			},
	// 			{
	// 				type: 'erase',
	// 				toolName: 'Стереть',
	// 			},
	// 		],
	// 		variants: [
	// 			{ id: 1, content: 'Кошка', correctColor: '#698eff' },
	// 			{ id: 2, content: 'Стол', correctColor: '#ff4e8c' },
	// 			{ id: 3, content: 'Собака', correctColor: '#698eff' },
	// 			{ id: 4, content: 'Дождь', correctColor: '#ff4e8c' },
	// 			{ id: 5, content: 'Учитель', correctColor: '#698eff' },
	// 			{ id: 6, content: 'Ветер', correctColor: '#ff4e8c' },
	// 		],
	// 	},
	// 	title: 'Раскрась слова в нужные цвета',
	// },
	// {
	// 	type: 'conclusion',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 2,
	// 	},
	// 	payload: {
	// 		data: [
	// 			{
	// 				id: 1,
	// 				value: 'Слова в предложении предложении предложении предложении  {{связаны}} между собой {{по смыслу}} .',
	// 				completed: false,
	// 				variants: [
	// 					{
	// 						id: 1,
	// 						value: 'изменять',
	// 					},
	// 					{
	// 						id: 2,
	// 						value: 'заглавная',
	// 					},
	// 					{
	// 						id: 3,
	// 						value: 'по смыслу',
	// 					},
	// 					{
	// 						id: 4,
	// 						value: 'точка',
	// 					},
	// 					{
	// 						id: 5,
	// 						value: 'связаны',
	// 					},
	// 					{
	// 						id: 6,
	// 						value: 'собой',
	// 					},
	// 				],
	// 				slots: [
	// 					{ id: 1, current: null, correct: 'по смыслу' },
	// 					{ id: 2, current: null, correct: 'связаны' },
	// 				],
	// 			},
	// 		],
	// 	},
	// 	title: 'Сделай вывод',
	// },
	// {
	// 	type: 'delete-extra-letter',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		variants: [
	// 			{ id: 1, letter: 'М' },
	// 			{ id: 'extra-1', letter: 'Х' },
	// 			{ id: 2, letter: 'О' },
	// 			{ id: 3, letter: 'Л' },
	// 			{ id: 'extra-2', letter: 'Ь' },
	// 			{ id: 4, letter: 'О' },
	// 			{ id: 5, letter: 'К' },
	// 			{ id: 6, letter: 'О' },
	// 		],
	// 		correctVariantIds: ['extra-1', 'extra-2'],
	// 	},
	// 	title: 'Нажми на лишнюю букву',
	// },
	// {
	// 	type: 'drop-word-to-image',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		items: [
	// 			{ id: 1, imageUrl: '/castle.png', correctVariantId: 101 },
	// 			{ id: 2, imageUrl: '/sh.png', correctVariantId: 102 },
	// 			{ id: 3, imageUrl: '/ticva.png', correctVariantId: 103 },
	// 		],
	// 		variants: [
	// 			{ id: 101, value: 'castle' },
	// 			{ id: 102, value: 'sh' },
	// 			{ id: 103, value: 'ticva' },
	// 		],
	// 	},
	// 	title: 'Перемести слова к нужной картинке',
	// },
	// {
	// 	type: 'drop-word-to-text',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		items: [
	// 			{
	// 				id: 101,
	// 				content: 'Катись, катись, яблочко наливное, по серебряному блюдечку!',
	// 				correctVariantId: 3,
	// 			},
	// 			{
	// 				id: 102,
	// 				content: 'Яблоко - плод яблони, один из самых доступных источников витаминов.',
	// 				correctVariantId: 1,
	// 			},
	// 			{
	// 				id: 103,
	// 				content: 'Хочешь куснуть яблоко?',
	// 				correctVariantId: 2,
	// 			},
	// 		],
	// 		variants: [
	// 			{
	// 				id: 1,
	// 				value: 'энциклопедия',
	// 			},
	// 			{
	// 				id: 2,
	// 				value: 'разговор',
	// 			},
	// 			{
	// 				id: 3,
	// 				value: 'книга сказок',
	// 			},
	// 		],
	// 	},
	// 	title: 'Распредели по категориям',
	// 	subTitle: 'Перетащи подходящее слово к каждой картинке',
	// },
	// {
	// 	type: 'multi-quiz',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		variants: [
	// 			{ id: 1, itemNumber: 1, title: 'Общаться' },
	// 			{ id: 2, itemNumber: 2, title: 'Рычать' },
	// 			{ id: 3, itemNumber: 3, title: 'Передавать мысли' },
	// 			{ id: 4, itemNumber: 4, title: 'Петь песни' },
	// 		],
	// 		correctVariantIds: [1, 3],
	// 	},
	// 	title: 'Выберите все правильные варианты',
	// },
	// {
	// 	type: 'reorder-items',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		data: [
	// 			{ id: '1', content: 'C' },
	// 			{ id: '2', content: 'B' },
	// 			{ id: '3', content: 'E' },
	// 			{ id: '4', content: 'F' },
	// 			{ id: '5', content: 'A' },
	// 		],
	// 		correctOrderIds: ['5', '2', '1', '3', '4'],
	// 	},
	// 	title: 'Расставь буквы по порядку',
	// },
	// {
	// 	type: 'sequence-builder',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		slots: [
	// 			{
	// 				slotId: 'part-1',
	// 				content: 'Вступление',
	// 				correctValue: 'Однажды я увидел на стене необычную тень. Она была похожа на дракона.',
	// 			},
	// 			{
	// 				slotId: 'part-2',
	// 				content: 'Развитие событий',
	// 				correctValue: 'Я затаил дыхание и медленно подошёл ближе, чтобы рассмотреть чудовище.',
	// 			},
	// 			{
	// 				slotId: 'part-3',
	// 				content: 'Заключение',
	// 				correctValue: 'Оказалось, это была всего лишь тень от кактуса на подоконнике.',
	// 			},
	// 		],
	// 		variants: [
	// 			{
	// 				id: 1,
	// 				content: 'Оказалось, это была всего лишь тень от кактуса на подоконнике.',
	// 			},
	// 			{
	// 				id: 2,
	// 				content: 'Однажды я увидел на стене необычную тень. Она была похожа на дракона.',
	// 			},
	// 			{
	// 				id: 3,
	// 				content: 'Я затаил дыхание и медленно подошёл ближе, чтобы рассмотреть чудовище.',
	// 			},
	// 		],
	// 	},
	// 	title: 'Собери историю',
	// },
	// {
	// 	type: 'single-quiz',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		variants: [
	// 			{ id: 1, itemNumber: 1, title: 'useEffect' },
	// 			{ id: 2, itemNumber: 2, title: 'useState' },
	// 			{ id: 3, itemNumber: 3, title: 'useContext' },
	// 			{ id: 4, itemNumber: 4, title: 'useMemo' },
	// 		],
	// 		correctVariantId: 2,
	// 	},
	// 	title: 'Основы React',
	// 	subTitle: 'Какой хук используется для хранения состояния?',
	// },
	// {
	// 	type: 'word-by-image',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	payload: {
	// 		id: 'task_1',
	// 		correctAnswer: 'ГОРОД',
	// 		imageUrl: '/citt.jpg',
	// 		availableLetters: [
	// 			{ id: 1, letter: 'Г' },
	// 			{ id: 2, letter: 'О' },
	// 			{ id: 3, letter: 'З' },
	// 			{ id: 4, letter: 'Д' },
	// 			{ id: 5, letter: 'Р' },
	// 			{ id: 6, letter: 'О' },
	// 		],
	// 	},
	// 	title: 'Угадай слово по картинке',
	// 	subTitle: 'Собери слово из доступных букв',
	// },
	// {
	// 	type: 'word-picker',
	// 	scoring: {
	// 		points: 5,
	// 		penaltyPerMistake: 1,
	// 	},
	// 	title: 'Нажми на слова в которых ВСЕ согласные ТВЕРДЫЕ',
	// 	subTitle: 'Выберите существительные в предложении',
	// 	payload: {
	// 		text: 'Учёба и труд рядом идут',
	// 		correctValues: ['Учёба', 'труд'],
	// 	},
	// },
]
