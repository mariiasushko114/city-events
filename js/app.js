// Логіка застосунку «Афіша подій міста» (варіант 5)
// Практикум 6: основи JavaScript - змінні, умови, цикли, функції (вивід у консоль).
// Практикум 7: маніпуляція DOM - картки подій генеруються з масиву events.

console.log('app.js підключено');

// Практикум 7, крок 2: прибираємо статичні картки-заглушки з практикуму 2
// (у HTML вони лишилися як орієнтир структури картки)
const staticCards = document.querySelectorAll('#events-list .card');
staticCards.forEach(card => card.remove());

// Дані: масив подій. Значення category збігаються з value в <select> фільтра на сторінці
const events = [
    { title: 'Вечір джазу просто неба', category: 'concert' },
    { title: 'Вистава «Лісова пісня»', category: 'theatre' },
    { title: 'Фотовиставка «Місто восени»', category: 'exhibition' },
    { title: 'Ярмарок ремесел', category: 'festival' },
    { title: 'Концерт симфонічного оркестру «Музика кіно»', category: 'concert' },
    { title: 'Прем’єра комедії «Конотопська відьма»', category: 'theatre' },
    { title: 'Виставка сучасного українського плаката', category: 'exhibition' },
    { title: 'Фестиваль вуличної їжі на набережній', category: 'festival' },
    { title: 'Органний вечір при свічках', category: 'concert' },
    { title: 'Лекція з історії міста', category: 'lecture' }
];

// Практикум 7, крок 3: контейнер, у який виводимо картки подій
const listContainer = document.querySelector('#events-list');

// Класифікує подію за категорією: повертає назву категорії та вид мистецтва (if/else)
function classifyEvent(event) {
    if (event.category === 'concert') {
        return 'Концерт - музика';
    } else if (event.category === 'theatre') {
        return 'Вистава - сценічне мистецтво';
    } else if (event.category === 'exhibition') {
        return 'Виставка - візуальне мистецтво';
    } else if (event.category === 'festival') {
        return 'Фестиваль - масовий захід';
    } else {
        return 'Інша подія - категорія не входить до фільтра';
    }
}

// Виводить у консоль події заданої категорії (цикл for...of) і повертає їх кількість
function printEventsByCategory(list, category) {
    let count = 0;
    console.log(`--- Події категорії "${category}" ---`);
    for (const event of list) {
        if (event.category === category) {
            count++;
            console.log(`${count}. ${event.title}`);
        }
    }
    console.log(`Знайдено: ${count} з ${list.length}`);
    return count;
}

// Скорочує текст до n символів і додає «…», якщо текст довший (стрілкова функція)
const shorten = (text, n) => text.length > n ? text.slice(0, n) + '…' : text;

// Крок 5: події однієї категорії
const selectedCategory = 'concert';
printEventsByCategory(events, selectedCategory);

// Крок 6: класифікація кожної події (класичний for - потрібен номер i)
console.log('--- Класифікація подій ---');
for (let i = 0; i < events.length; i++) {
    console.log(`${i + 1}. ${events[i].title} → ${classifyEvent(events[i])}`);
}

// Крок 7: короткі назви для карток (не довше 25 символів)
const maxTitleLength = 25;
console.log(`--- Короткі назви (до ${maxTitleLength} символів) ---`);
for (const event of events) {
    console.log(shorten(event.title, maxTitleLength));
}

// ===================== Практикум 7: маніпуляція DOM =====================

// Підписи категорій для бейджа і категорії, для яких є CSS-клас card--… та ілюстрація
const categoryLabels = {
    concert: 'Концерт',
    theatre: 'Вистава',
    exhibition: 'Виставка',
    festival: 'Фестиваль'
};

// Рендер списку подій: очищує контейнер і для кожної події створює картку
// <article class="card card--категорія" data-category="…"> з ілюстрацією,
// бейджем категорії (p) і назвою (h3), після чого додає її в #events-list
function renderEvents(list) {
    listContainer.innerHTML = '';

    list.forEach(event => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.dataset.category = event.category;          // атрибут data-category

        const knownCategory = event.category in categoryLabels;

        // Умовний клас за категорією: card--concert, card--exhibition тощо
        if (knownCategory) {
            card.classList.add(`card--${event.category}`);

            // Ілюстрація категорії: атрибути src і alt як властивості елемента
            const img = document.createElement('img');
            img.src = `assets/img/${event.category}.svg`;
            img.alt = `Ілюстрація до події: ${categoryLabels[event.category].toLowerCase()}`;
            img.width = 320;
            img.height = 180;
            card.append(img);
        }

        // p - категорія у вигляді кольорового бейджа
        const category = document.createElement('p');
        category.classList.add('card__badge');
        const badge = document.createElement('span');
        badge.classList.add('badge');
        if (knownCategory) badge.classList.add(`badge--${event.category}`);
        badge.textContent = knownCategory ? categoryLabels[event.category] : 'Інше';
        category.append(badge);

        // h3 - назва події (textContent: дані виводимо як текст, а не як HTML)
        const title = document.createElement('h3');
        title.textContent = event.title;

        card.append(category, title);
        listContainer.append(card);                      // крок 7: всередині циклу
    });
}

// Крок 8: виводимо список одразу при завантаженні сторінки
renderEvents(events);

// Крок 9: оновлюємо вже наявний елемент поза списком - лічильник подій
const eventsCount = document.querySelector('#events-count');
eventsCount.textContent = `Усього подій: ${events.length}`;
