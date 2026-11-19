// Логіка застосунку «Афіша подій міста» (варіант 5)
// Практикум 6: основи JavaScript - змінні, умови, цикли, функції.
// DOM поки не змінюємо, увесь результат виводимо в консоль (DevTools → Console).

console.log('app.js підключено');

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
