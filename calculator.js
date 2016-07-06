var Calculator;

Calculator = function (opt) {
    var that = this;
    this.nowOperator = '';
    this.elems = [];
    this.$el = $(opt.el);
    this.rs = this.$el.find('#result-string');
    this.operations = {
        'delete': this.delete,
        'sqrt': this.sqrt,
        'change_polar': this.change_polar,
        'decUnderOne': this.decUnderOne,
        '+': this.sum,
        '-': this.substraction,
        '/': this.delenie,
        '*': this.multiple,
        '%': this.percent,
        '^': this.xStepenY,
        '=': this.count_up,
        '': this.count_up
    };
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
    var trying = this.rs.val().split(this.nowOperator);
    // console.log(!!trying[1]);
    var haveSymb = false;
    var resultStr = !!trying[1] && dec === '.' ? trying[1] : this.rs.val();
    if (isNotNum) {
        for (var i = 0; i < resultStr.length; i++) {
            if (resultStr[i] === dec) {
                haveSymb = true;
                break;
            }
        }
        if (!haveSymb) {
            this.rs.val(this.rs.val() + dec);
        }
    } else {
        resultStr === '0' ? this.rs.val(dec) : this.rs.val(resultStr + dec);
    }

};

Calculator.prototype.decimal = function (item) {
    if (item.data('args') !== '.') {
        this.showResult(item.data('args'), false)
    } else {
        this.showResult(item.data('args'), true);
    }
};

Calculator.prototype.operator = function (item) {
    if (item.data('args').length === 1) {
        if (this.nowOperator === '' && item.data('args') !== '=') {
            this.nowOperator = item.data('args');
            this.showResult(item.data('args'), true);
        } else {
            this.getResult('two', item);
        }
    } else {
        this.getResult('one', item);
    }
};

Calculator.prototype.getResult = function (way, item) {
    var first;
    var second;
    if (way === 'two') {
        this.elems = this.rs.val().split(this.nowOperator);
        first = Number(this.elems[0]);
        second = Number(this.elems[1]);
        this.operations[this.nowOperator].call(this, first, second);
    } else {
        first = Number(this.rs.val());
        this.operations[item.data('args')].call(this, first);
    }
    if (item.data('args').length === 1 && item.data('args') !== '=') {
        this.nowOperator = item.data('args');
        this.rs.val(this.rs.val() + item.data('args'));
    } else {
        this.nowOperator = '';
    }
};

Calculator.prototype.setInitState = function () {
    this.rs.val('0');
    this.nowOperator = '';
    this.elems = [];
};

Calculator.prototype.delenie = function (first, second) {
    if (second !== 0) {
        this.rs.val((first / second).toString());
    } else {
        alert('Делить на ноль нельзя!');
        this.setInitState();
    }
};

Calculator.prototype.multiple = function (first, second) {
    this.rs.val((first * second).toString());
};

Calculator.prototype.substraction = function (first, second) {
    this.rs.val((first - second).toString());
};

Calculator.prototype.sum = function (first, second) {
    this.rs.val((first + second).toString());
};

Calculator.prototype.xStepenY = function (first, second) {
    this.rs.val(Math.pow(first, second).toString());
};

Calculator.prototype.percent = function (first, second) {
    this.rs.val((first / 100 * second).toString());
};

Calculator.prototype.count_up = function (first, second) {
    this.rs.val(this.rs.val());
};

Calculator.prototype.delete = function (first) {
    this.setInitState();
};

Calculator.prototype.sqrt = function (first) {
    if (first >= 0) {
        this.rs.val(Math.sqrt(first).toString());
    } else {
        alert('Нельзя получить корень иррационального числа!');
        this.setInitState();
    }
};

Calculator.prototype.change_polar = function (first) {
    this.rs.val((first * -1).toString());
};

Calculator.prototype.decUnderOne = function (first) {
    this.rs.val((1 / first).toString());
};