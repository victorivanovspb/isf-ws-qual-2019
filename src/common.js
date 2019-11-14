'use strict';

/**
 * Псевдослучайным выбором возвращается значение из указанного диапазона.
 * @param {number} min - Нижняя граница диапазона
 * @param {number} max - Верхняя граница диапазона
 * @returns {number}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * "Подбрасывание монетки". Псевдослучайный выбор из двух вариантов.
 * @returns {boolean}
 */
function tossCoin() {
    return getRandomInt(0, 100) < 50;
}

module.exports = {
    getRandomInt,
    tossCoin,
};
