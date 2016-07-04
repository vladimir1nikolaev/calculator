var Calculator;
var tmps = {
    first: [],
    second: []
};
Calculator = function (opt) {
    var that = this;
    // console.log(this.getButton());
    this.$el = $(opt.el);
    this.getButton().map(function (item) {
        var $item = $(this);
        if (that[$item.data('button')]) {
            that.on.call($item, 'click', function (evt) {
                // console.log('я сработал');
                that[$item.data('button')]();
            });
        }
    });


};

Calculator.prototype.getButton = function () {
    return this.$el.find('.b-buttons .item');
};

Calculator.prototype.on = function (event, callback) {
    $(this).on(event, callback);
};
Calculator.prototype.showResult = function (dec, isNotNum) {
    console.log(dec);
    // this.$el.find('#result-string').val(); // строка вывода результата
    var haveDot = false;
    var resultStr = this.$el.find('#result-string').val();
    if (isNotNum) {
        for (var i = 0; i < resultStr.length; i++) {
            if (resultStr[i] === dec) {
                haveDot = true;
                break;
            }
        }
        if (!haveDot) {
            this.$el.find('#result-string').val(resultStr + dec);
        }
    } else {
        resultStr === '0' ? this.$el.find('#result-string').val(dec) : this.$el.find('#result-string').val(resultStr + dec);
    }

};

Calculator.prototype.getNumbers = function (dec, isNotNum) {
    if (!isNotNum) {
        tmps.first.push(dec);
    } else if (tmps.second === []) {
        tmps.second = tmps.first;
    } else {

    }
};

Calculator.prototype.nine = function () {
    this.showResult('9', false);
};

Calculator.prototype.eight = function () {
    this.showResult('8', false);
};

Calculator.prototype.seven = function () {
    this.showResult('7', false);
};

Calculator.prototype.six = function () {
    this.showResult('6', false);
};

Calculator.prototype.five = function () {
    this.showResult('5', false);
};

Calculator.prototype.four = function () {
    this.showResult('4', false);
};

Calculator.prototype.three = function () {
    this.showResult('3', false);
};

Calculator.prototype.two = function () {
    this.showResult('2', false);
};

Calculator.prototype.one = function () {
    this.showResult('1', false);
};

Calculator.prototype.zero = function () {
    this.showResult('0', false);
};

Calculator.prototype.dote = function () {
    this.showResult('.', true);
};

Calculator.prototype.sum = function () {
    this.showResult('+', true);
};

Calculator.prototype.subtraction = function () {
    this.showResult('-', true);
};

Calculator.prototype.delenie = function () {
    this.showResult('/', true);
};

Calculator.prototype.multiplic = function () {
    this.showResult('*', true);
};

Calculator.prototype.delete = function () {
    // this.showResult('', true);
};

Calculator.prototype.sqrt = function () {
    // this.showResult('+', true);
};

Calculator.prototype.percent = function () {
    // this.showResult('+', true);
};

Calculator.prototype.decUnderOne = function () {
    // this.showResult('+', true);
};

Calculator.prototype.xStepenY = function () {
    this.showResult('^', true);
};

Calculator.prototype.change_polar = function () {
    // this.showResult('+', true);
};

Calculator.prototype.count_up = function () {
    // this.showResult('+', true);
};