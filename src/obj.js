'use strict';

const getRandomInt = require('./common').getRandomInt;

/**
 * Генератор Id номеров.
 * @returns {IterableIterator<number>}
 */
function* generatorId() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

/**
 * Функция-обертка для генератора Id номеров.
 * @type {function(): number}
 */
const generateId = (() => {
    const g = generatorId();
    return () => g.next().value;
})();

/**
 * Объект, осуществляющий поступательное "движение" по состояниям (currentState) от 1 до N (states),
 * где в каждом состоянии нужно достичь 100% (currentRate).
 */
class Obj  {
    constructor() {
        this.id = generateId();
        this.name = `Object-${ this.id }`;
        this.states = getRandomInt(2, 6);
        this.complete = false;
        this.currentState = 1;
        this.currentRate = 0;
    }

    /**
     * Метод на основании генератора псевдослучайных чисел делает "шаг", увеличивая на некоторую положительную дельту
     * значение currentRate. При достижении величины "100" (по сути - 100%) просиходит "переход" на новое состояние
     * с обнулением currentRate. А в случае, когда все состояния пройдены, то объект объявляется "заполненным"
     * (complete = true) и после чего при вызове метода getNext будет возвращаться только значение null.
     * @returns {null|object}
     */
    getNext() {
        if (this.complete) {
            return null;
        }
        const updateRate = () => {
            let rate = this.currentRate + getRandomInt(10, 50);
            return rate < 100 ? rate : 100;
        };
        this.currentRate = updateRate();
        const result = {
            method: 'obj_state',
            params: {
                timestamp: `${ Date.now() }`,
                obj_name: `${ this.name }`,
                obj_id: `${ this.id }`,
                items: {
                    state: `State #${ this.currentState }`,
                    progress: `${ this.currentRate }%`
                }
            }
        };
        if (this.currentRate === 100) {
            if (this.currentState < this.states) {
                this.currentRate = 0;
                this.currentState += 1;
            } else {
                this.complete = true;
            }
        }
        return result;
    }

    /**
     * Метод показывает является ли объект полностью "заполненным".
     * @returns {boolean}
     */
    isComplete() {
        return this.complete;
    }

    /**
     * Возвращается отладочная информация по текущему состоянию/прогрессу.
     * @returns {string}
     */
    stat() {
        return `id[${ this.id }]: progress ${ this.currentRate}% in state ${ this.currentState}/${ this.states }`;
    }
}

module.exports = {
    Obj,
};



