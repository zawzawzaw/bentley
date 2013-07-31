define(['backbone', 'jquery', 'views/print'], function(Backbone, $, PrintView){

	var PrintsView = Backbone.View.extend({
		el : "#CarAndProductList",
		render : function(){

			var self = this;

			this.$el.html('');

			this.$el.append('<h3 id="printPreview">Purchased Products</h3>');

			this.collection.each(function(cart){
				self.addOne(cart);
			});
		},
		addOne : function(cart){

			var printView = new PrintView({ model: cart });
			this.$el.append( printView.render().el );
		}
	});

	return PrintsView;
});