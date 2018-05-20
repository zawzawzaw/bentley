define(['backbone', 'jquery'], function(Backbone, $){

	var MissingcatView = Backbone.View.extend({
		tagName : 'div',
		template: _.template($('#checkList').html()),
		render : function(){

			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	});


	return MissingcatView;

})