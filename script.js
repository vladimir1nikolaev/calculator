$(function () {

        function updateInputValue(curr) {
            if (!!app.nowOperator) app.$input.val('0');
            app.nowOperator = '';
            var haveDot = false;
            var resultStr = app.$input.val();
            switch (curr) {
                case '0':
                    resultStr === '0' ? app.$input.val(curr) : app.$input.val(resultStr + curr);
                    break;
                case '.':
                    for (var i = 0; i < resultStr.length; i++) {
                        if (resultStr[i] === '.') {
                            haveDot = true;
                            break;
                        }
                    }
                    if (!haveDot)  app.$input.val(resultStr + curr);
                    break;
                default:
                    resultStr === '0' ? app.$input.val(curr) : app.$input.val(resultStr + curr);

            }

        }

        function twoValues(firstSum, secondSum, operator) {
            firstSum = Number(firstSum);
            secondSum = Number(secondSum);
            if (app.nowOperator == 'percent') secondSum = firstSum / 100 * secondSum;
            app.$input.val('');
            var result;
            switch (operator) {
                case 'delenie':
                    if (secondSum !== 0) {
                        result = firstSum / secondSum;
                        app.$input.val(result.toString());
                    } else {
                        alert('Делить на ноль нельзя!');
                        setInitState();
                    }
                    break;
                case 'multiplic':
                    result = firstSum * secondSum;
                    app.$input.val(result.toString());
                    break;
                case 'subtraction':
                    result = firstSum - secondSum;
                    app.$input.val(result.toString());
                    break;
                case 'sum':
                    result = firstSum + secondSum;
                    app.$input.val(result.toString());
                    break;
                case 'x^y':
                    result = Math.pow(firstSum, secondSum)
                    app.$input.val(result.toString());
                    break;
                case 'count-up':
                    if (!!result) {
                        app.$input.val(result.toString());
                        app.prevValue = app.$input.val()
                    } else {
                        app.$input.val('0');
                    }
                    app.prevOperator = '';
                    break;

            }
            app.prevValue = '';
        }

        function oneValue(firstSum, operator) {
            firstSum = Number(firstSum);
            app.$input.val('');
            var result;
            switch (operator) {
                case 'delete':
                    setInitState();
                    break;
                case 'sqrt':
                    if (firstSum >= 0) {
                        result = Math.sqrt(firstSum);
                        app.$input.val(result.toString());
                    } else {
                        alert('Нельзя получить корень иррационального числа!');
                        setInitState();
                    }
                    break;
                case 'change-polar':
                    result = firstSum * -1;
                    app.$input.val(result.toString());
                    break;
                case 'decUnderOne':
                    result = 1 / firstSum;
                    app.$input.val(result.toString());
                    break;
            }
        }

        function getWay(src) {
            switch (src) {
                case 'delete':
                case 'sqrt':
                case 'change-polar':
                case 'decUnderOne':
                    return 'oneWay';
                    break;
                case 'subtraction':
                case 'delenie':
                case 'multiplic':
                case 'sum':
                case 'percent':
                case 'x^y':
                case 'count-up':
                    return 'twoWays';
                    break;
            }
        }


        function setInitState() {
            app.prevValue = '';
            app.nowValue = '';
            app.$input.val('0');
        }

        var app = {
            $container: $('.container'),
            $input: $('#result-string'),
            $decimals: $('.button-decimal'),
            $operators: $('.button-operator'),
            prevValue: '',
            nowValue: '',
            prevOperator: '',
            nowOperator: ''
        };

        app.$decimals.on('click', function (evt) {
            var number = evt.target.id;
            updateInputValue(number);
        });
        app.$operators.on('click', function (evt) {
            var operator = evt.target.id;
            var checkWays = getWay(operator);
            if (checkWays == 'twoWays') {
                if (!!app.prevValue) {
                    app.nowOperator = operator;
                    app.nowValue = app.$input.val();
                    app.$input.val('0');
                    twoValues(app.prevValue, app.nowValue, app.prevOperator);
                } else {
                    app.prevOperator = operator;
                    app.prevValue = app.$input.val();
                    app.nowOperator = app.prevOperator;
                }
            } else {
                oneValue(app.$input.val(), operator);
            }
        });

    }
);