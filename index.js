'use strict';

const _ = require('lodash');

const defaultStyle = ' font-family: verdana,arial,sans-serif; font-size:11px; color:#333333; border-width: 1px; border-color: #666666; border-collapse: collapse; ';
const defaultThStyle = ' border-width: 1px; padding: 8px; border-style: solid; border-color: #666666; background-color: #dedede; ';
const defaultTdStyle = ' border-width: 1px; padding: 8px; border-style: solid; border-color: #666666; background-color: #ffffff; ';

const ZnsTable = module.exports = function(dataArray, header, style, thStyle, tdStyle) {
    this.dataArray = dataArray;
    this.header = header;
    this.style = style || defaultStyle;
    this.thStyle = thStyle || defaultThStyle;
    this.tdStyle = tdStyle || defaultTdStyle;
    return this;
};

ZnsTable.prototype.getData = function() {
    const self = this;

    if (!_.isArray(self.header) && _.isArray(self.dataArray) && self.dataArray.length > 0) {
        const line = {};
        _.forEach(self.dataArray, (val) => _.merge(line, val));
        this.header = _.map(line, (val, key) => key);
    }

    this.body = _.chain(self.dataArray).map((item) => {
        const line = {};
        for (let i = 0; i < self.header.length; ++i) {
            line[self.header[i]] = '';
        }

        return _.chain(line).merge(item).pick(self.header).map(val => val).value();
    }).value();

    return this;
};

ZnsTable.prototype.makeHtml = function() {
    const self = this;
    let html = `<table style="${self.style}">`;
    if (_.isArray(self.header)) {
        html += '<tr>';
        for (let h = 0; h < self.header.length; ++h) {
            html += `<th style="${self.thStyle}">${self.header[h]}</th>`;
        }
        html += '</tr>';

        for (let r = 0; r < self.body.length; ++r) {
            html += '<tr>';
            for (let d = 0; d < self.body[r].length; ++d) {
                html += `<td style="${self.tdStyle}">${self.body[r][d]}</td>`;
            }
            html += '</tr>';
        }
    }

    html += '</table>';
    return html;
};

ZnsTable.prototype.print = function() {
    return this.getData().makeHtml();
};
