define(['backbone','jquery'], function(Backbone, $){

	var SearchUserView = Backbone.View.extend({
		tagName: 'div',
		template : _.template($('#searchResult').html()),
		render : function(){

			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		}
	})

	return SearchUserView;
});

