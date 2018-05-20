define(['backbone', 'jquery'], function(Backbone, $){

	var PrintView = Backbone.View.extend({
		tagName : 'div',
		template : _.template($('#viewcartTemplate').html()),
		render : function(){

			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	});


	return PrintView;

})