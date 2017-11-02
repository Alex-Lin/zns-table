# zns-table #

`npm i zns-table`

```javascript
var ZnsTable = require('zns-table');

var dataArray = [{
    title1: 'value1',
    title2: 'value2',
    title3: 'value3'
}, {
    title2: 'value2',
    title3: 'value3'
}, {
    title1: 'value1',
    title2: 'value2',
    title3: 'value3'
}, {
    title1: 'value1',
    title3: 'value3'
}]

var table = new ZnsTable(dataArray);
console.log(table.print());

// custom header
table = new ZnsTable(dataArray, ['title1', 'title3']);
console.log(table.print());
```
