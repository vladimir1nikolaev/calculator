var Calculator = function (opt) {
    var that = this;
    this.$el = $(opt.el);
    this.getButton().map(function(item){
        var $item = $(item);
        if(that[$item.data('d')] ) {
            that.on.call(item, 'click', that[$(item).data('d')])
        }
    })


};
Calculator.prototype.getButton = function () {
    return this.$el.find('.b-buttons .item');
};
Calculator.prototype.on = function (event, callback) {
    $(this).on(event, callback);
};
Calculator.prototype.pisca = function () {

}