define(['backbone','jquery'], function(Backbone, $){

	var CarView = Backbone.View.extend({
		tagName : 'div',
		template : _.template($('#catelogueTemplate').html()),
		render : function(){
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		}
	});

	return CarView;

});