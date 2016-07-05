var Calculator;

Calculator = function (opt) {
    var that = this;
    this.nowOperator = '';
    this.elems = [];
    // this.operations = {};
    // this.secondEl = '';
    // console.log(this.getButton());
    this.$el = $(opt.el);
    this.getButton().map(function (item) {
        var $item = $(this);
        if (that[$item.data('button')]) {
            that.on.call($item, 'click', function (evt) {
                // console.log('я сработал');
                that[$item.data('button')]($item);
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
    // console.log(dec);
    // this.$el.find('#result-string').val(); // строка вывода результата
    var haveDot = false;
    var resultStr = this.$el.find('#result-string').val();
    // console.log(resultStr);
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

// Calculator.prototype.getNumbers = function (dec, isNotNum) {
//     if (!isNotNum) {
//         tmps.first.push(dec);
//     } else if (tmps.second === []) {
//         tmps.second = tmps.first;
//     } else {
//
//     }
// };

Calculator.prototype.decimal = function (item) {
    if (item.data('args') !== '.') {
        this.showResult(item.data('args'), false)
    } else {
        this.showResult(item.data('args'), true);
    }
    // console.log(item);
};

Calculator.prototype.operator = function (item) {
    if (item.data('args').length === 1) {
        if (this.nowOperator === '') {
            // this.firstEl = Number(this.$el.find('#result-string').val());
            this.showResult(item.data('args'), true);
            this.nowOperator = item.data('args');
        } else {
            // console.log(this.elems);
            this.getResult('two', item);
        }
    } else {
        this.getResult('one', item);
    }
};

Calculator.prototype.getResult = function (way, item) {
    var first;
    var second;
    var result;
    if (way === 'two') {
        this.elems = this.$el.find('#result-string').val().split(this.nowOperator);
        first = Number(this.elems[0]);
        second = Number(this.elems[1]);
        switch (item.data('args')) {
            case '/':
                if (second !== 0) {
                    result = first / second;
                    this.$el.find('#result-string').val(result.toString());
                } else {
                    alert('Делить на ноль нельзя!');
                    // setInitState();
                }
                break;
            case '*':
                result = firstSum * secondSum;
                app.$input.val(result.toString());
                break;
            case '-':
                result = firstSum - secondSum;
                app.$input.val(result.toString());
                break;
            case '+':
                result = firstSum + secondSum;
                app.$input.val(result.toString());
                break;
            case '^':
                result = Math.pow(firstSum, secondSum)
                app.$input.val(result.toString());
                break;
            case '=':
                if (!!result) {
                    app.$input.val(result.toString());
                    app.prevValue = app.$input.val()
                } else {
                    app.$input.val('0');
                }
                app.prevOperator = '';
                break;

        }
    } else {

    }
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