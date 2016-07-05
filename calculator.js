var Calculator;

Calculator = function (opt) {
    var that = this;
    this.nowOperator = '';
    this.elems = [];
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
    var trying = this.$el.find('#result-string').val().split(this.nowOperator);
    // console.log(!!trying[1]);
    var haveSymb = false;
    var resultStr = !!trying[1] && dec === '.' ? trying[1] : this.$el.find('#result-string').val();
    if (isNotNum) {
        for (var i = 0; i < resultStr.length; i++) {
            if (resultStr[i] === dec) {
                haveSymb = true;
                break;
            }
        }
        if (!haveSymb) {
            this.$el.find('#result-string').val(this.$el.find('#result-string').val() + dec);
        }
    } else {
        resultStr === '0' ? this.$el.find('#result-string').val(dec) : this.$el.find('#result-string').val(resultStr + dec);
    }

};

Calculator.prototype.decimal = function (item) {
    if (item.data('args') !== '.' ) {
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
    var result;
    if (way === 'two') {
        this.elems = this.$el.find('#result-string').val().split(this.nowOperator);
        first = Number(this.elems[0]);
        second = Number(this.elems[1]);
        switch (this.nowOperator) {
            case '/':
                if (second !== 0) {
                    result = first / second;
                    this.$el.find('#result-string').val(result.toString());
                } else {
                    alert('Делить на ноль нельзя!');
                    this.setInitState();
                }
                break;
            case '*':
                result = first * second;
                this.$el.find('#result-string').val(result.toString());
                break;
            case '-':
                result = first - second;
                this.$el.find('#result-string').val(result.toString());
                break;
            case '+':
                result = first + second;
                this.$el.find('#result-string').val(result.toString());
                break;
            case '^':
                result = Math.pow(first, second);
                this.$el.find('#result-string').val(result.toString());
                break;
            case '%':
                result = first / 100 * second;
                this.$el.find('#result-string').val(result.toString());
            case '=':
                break;

        }
    } else {
        first = Number(this.$el.find('#result-string').val());
        switch (item.data('args')) {
            case 'delete':
                this.setInitState();
                break;
            case 'sqrt':
                if (first >= 0) {
                    result = Math.sqrt(first);
                    this.$el.find('#result-string').val(result.toString());
                } else {
                    alert('Нельзя получить корень иррационального числа!');
                    this.setInitState();
                }
                break;
            case 'change_polar':
                result = first * -1;
                this.$el.find('#result-string').val(result.toString());
                break;
            case 'decUnderOne':
                result = 1 / first;
                this.$el.find('#result-string').val(result.toString());
                break;

        }
    }
    this.nowOperator = '';
};

Calculator.prototype.setInitState = function () {
    this.$el.find('#result-string').val('0');
    this.nowOperator = '';
    this.elems = [];
};