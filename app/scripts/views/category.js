define(['backbone','jquery'], function(Backbone, $){

	var CategoryView = Backbone.View.extend({
		tagName: 'div',
		template : _.template($('#categoryTemplate').html()),
		render : function(){

			$('#finishCart').hide();
			$('#total').hide();

			this.$el.html( this.template(this.model.toJSON()) );

			return this;
			
		}
	});

	return CategoryView;
});