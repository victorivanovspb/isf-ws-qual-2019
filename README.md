# isf-ws-qual-2019
[![dependency status][dependency-image]][dependency-url]
[![devDependency status][devdependency-image]][devdependency-url]

[dependency-image]: https://img.shields.io/david/victorivanovspb/isf-ws-qual-2019.svg?style=flat
[dependency-url]: https://david-dm.org/victorivanovspb/isf-ws-qual-2019#info=devDependencies
[devdependency-image]: https://img.shields.io/david/dev/victorivanovspb/isf-ws-qual-2019.svg?style=flat
[devdependency-url]: https://david-dm.org/victorivanovspb/isf-ws-qual-2019#info=devDependencies

Серверная часть небольшого тестового задания. 

### Сборка и запуск
Запустить сервер:
```
$ npm run server
```
Запустить проверку линтером `eslint`:
```
$ npm run linter
```

### Внутреннее устройство

При подключении клиента к WebSocket-соединению сервер начинает методично с небольшим временным
интервалом отсылать объекты, имеющие представленную ниже структуру:

```
{
    method: 'obj_state',
    params: {
        timestamp: TIME_STAMP,
        obj_name: OBJ_NAME,
        obj_id: OBJ_ID,
        items: {
            state: STATE,
            progress: RATE
        }
    }
}
```

### Обратная связь
[github.com/victorivanovspb/isf-ws-qual-2019/issues](https://github.com/victorivanovspb/isf-ws-qual-2019/issues)
