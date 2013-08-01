define(['backbone', 'jquery', 'views/missingcat'], function(Backbone, $, MissingcatView){

	var MissingcatsView = Backbone.View.extend({
		el : "#MissingCat",
		render : function(){

			var self = this;

			this.$el.html('');
			if(this.collection.length>0) {
				this.$el.html('<h6 style="color: red;">Please make your selection in these categories</h6>');

				this.collection.each(function(check){
				 	self.addOne(check);
				});
			}
		},
		addOne : function(check){
			var missingcatView = new MissingcatView({ model: check });

			this.$el.append( missingcatView.render().el );
		}
	});

	return MissingcatsView;
});