'use strict';

const Obj = require('./obj').Obj;
const rand = require('./common');

/**
 * Фунция-генератор, осуществляющая (за каждый свой единичный вызов):
 * 1. При наличии лимита создание и добавление +1 объекта с вероятностью rand.tossCoin().
 * 2. Выбор одного из существующих объектов и его "продвижение" на 1 шаг: obj.getNext().
 * @param {number} min - Минимальное кол-во создаваемых объектов
 * @param {number} max - Максимальное кол-во создаваемых объектов
 * @returns {IterableIterator<Object>}
 */
function* generateSequence(min = 2, max = 10) {
    const mass = [];
    let limit = rand.getRandomInt(min, max);

    while (!(limit === 0 && mass.length === 0)) {
        if (limit > 0 && rand.tossCoin()) {
            mass.push(new Obj());
            limit -= 1;
        }
        if (mass.length > 0) {
            const i = mass.length > 1 ? rand.getRandomInt(0, mass.length - 1) : 0;
            const state = mass[i].getNext();

            console.log(`mass: ${ mass.length }, limits: ${ limit }`);
            mass.map(item => console.log(item.stat()));
            console.log();

            if (mass[i].isComplete()) {
                mass.splice(i,1);
            }
            yield state;
        }
    }
}

module.exports = {
    generateSequence,
};
