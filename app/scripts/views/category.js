define(['backbone'], function(Backbone){

	var CategoryView = Backbone.View.extend({
		tagName: 'div',
		template : _.template($('#categoryTemplate').html()),
		render : function(){
			this.$el.html( this.template(this.model.toJSON()) );

			return this;
		}
	});

	return CategoryView;
});