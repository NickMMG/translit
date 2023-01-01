$('body').on('input', '.input-ru', function(){          // ввод только русских букв
	this.value = this.value.replace(/[^а-яё?.!,;:\s]/gi, '');
});
const buttonText = document.querySelector('button');
const inputText = document.querySelector('input');
const text = document.querySelector('.main-card');
const library = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ы: 'y',
  ь: "'",
  ъ: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
  ' ': ' ',
  ',': ',',
  '.': '.',
  '?': '?',
  '!': '!',
  ';': ';',
  ':': ':',
  А: 'A',
  Б: 'B',
  В: 'V',
  Г: 'G',
  Д: 'D',
  Е: 'E',
  Ё: 'E',
  Ж: 'ZH',
  З: 'Z',
  И: 'I',
  Й: 'I',
  К: 'K',
  Л: 'L',
  М: 'M',
  Н: 'N',
  О: 'O',
  П: 'P',
  Р: 'R',
  С: 'S',
  Т: 'T',
  У: 'U',
  Ф: 'F',
  Х: 'KH',
  Ц: 'TS',
  Ч: 'CH',
  Ш: 'SH',
  Щ: 'SHCH',
  Ы: 'Y',
  Ь: "'",
  Ъ: '',
  Э: 'E',
  Ю: 'YU',
  Я: 'YA',
};
function translate(textValue) { // функция для перевода текста
  let result = '';
  for (let i = 0; i < textValue.length; i += 1) {
    for (let s = 0; s < Object.keys(library).length; s += 1) {
      if (textValue[i] === Object.keys(library)[s]) {
        result += Object.values(library)[s];
      }
    }
  } return result;
}
function number() { // функция по нумерации строчек
  return (document.querySelectorAll('.li')).length + 1;
}
buttonText.addEventListener('click', (event) => { // событие по клику - перевод и добавление новых блоков в столбец с подсказкой и без
  event.preventDefault();
  const valueText = inputText.value;
  if (valueText === '' || valueText === ' '.repeat(valueText.length)) {
    alert('Введите, пожалуйста, текст на латинском!');
  } else if (valueText.length < 8) {
    const newDivLi = document.createElement('div');
    const newDivText = document.createElement('div');
    const newSpanCyrillic = document.createElement('span');
    const newSpanLatin = document.createElement('span');
    const newSpanNumbering = document.createElement('span');
    const imgDelete = document.createElement('img');
    newSpanCyrillic.innerText = valueText;
    newSpanCyrillic.setAttribute('class', 'cyrillic');
    newSpanLatin.setAttribute('class', 'latin');
    newDivText.setAttribute('class', 'text');
    imgDelete.setAttribute('class', 'delete');
    imgDelete.setAttribute('src', './icons/ex.png');
    newDivLi.setAttribute('class', 'li');
    newSpanNumbering.setAttribute('class', 'numbering');
    newSpanLatin.innerText = translate(valueText);
    newSpanNumbering.innerText = number();
    newSpanCyrillic.append(newSpanNumbering);
    newDivText.append(newSpanCyrillic, newSpanLatin, imgDelete);
    newDivLi.append(newDivText);
    text.appendChild(newDivLi);
  } else {
    const newDivLi = document.createElement('div');
    const newDivText = document.createElement('div');
    const newSpanCyrillic = document.createElement('span');
    const newSpanLatin = document.createElement('span');
    const imgDelete = document.createElement('img');
    const newSpanNumbering = document.createElement('span');
    newSpanCyrillic.innerText = `${String(valueText).slice(0, 7)}...`;
    newSpanCyrillic.setAttribute('class', 'cyrillic');
    newSpanLatin.setAttribute('class', 'latin');
    newDivText.setAttribute('class', 'text');
    newDivLi.setAttribute('class', 'li');
    imgDelete.setAttribute('class', 'delete');
    imgDelete.setAttribute('src', './icons/ex.png');
    newSpanNumbering.setAttribute('class', 'numbering');
    newSpanLatin.innerText = `${String(translate(valueText)).slice(0, 7)}...`;
    newSpanNumbering.innerText = number();
    newSpanCyrillic.append(newSpanNumbering);
    newDivText.append(newSpanCyrillic, newSpanLatin, imgDelete);
    newDivLi.append(newDivText);
    text.appendChild(newDivLi);
    const secretCyrillic = document.createElement('div');
    const secretLatin = document.createElement('div');
    secretCyrillic.innerText = valueText;
    secretCyrillic.setAttribute('class', 'secretCyrillic');
    secretLatin.setAttribute('class', 'secretLatin');
    secretLatin.innerText = translate(valueText);
    newDivText.append(secretCyrillic);
    newDivText.append(secretLatin);
  }
});
text.addEventListener('click', (event) => { // удаление одной строки, по нажатию на крестик (кроме первой)
  const divText = event.target.parentNode;
  if ((event.target.previousSibling.previousSibling.children)[0].innerText !== '1') {
    divText.parentNode.remove();
    for (let i = 0; i < (document.querySelectorAll('.li')).length; i += 1) {
      document.querySelectorAll('.numbering')[i].innerText = i + 1;
    }
  }
});
const deleteDiv = document.querySelector('.deleteDiv');
deleteDiv.addEventListener('click', () => { // удалени всех строк, кроме первой
  const arrDelete = document.querySelectorAll('.li');
  for (let i = 1; i < arrDelete.length; i += 1) {
    arrDelete[i].remove();
  }
});
