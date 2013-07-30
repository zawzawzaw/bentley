define(['backbone', 'jquery', 'views/print'], function(Backbone, $, PrintView){

	var PrintsView = Backbone.View.extend({
		el : "#carAndProductList",
		render : function(){
			console.log(this.collection);

			var self = this;

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