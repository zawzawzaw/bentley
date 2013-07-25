define(['backbone'], function(Backbone){

	var OneCarView = Backbone.View.extend({
		tagName : 'div',
		template : _.template($('#catelogueTemplate').html()),
		render : function(){
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		}
	});

	return OneCarView;

});