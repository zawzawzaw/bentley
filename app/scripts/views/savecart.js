define(['backbone','jquery'], function(Backbone, $){

	var SaveCartView = Backbone.View.extend({
		initialize: function(){
			console.log(this.model.toJSON());

			this.model.url = function(){
				return "../../../../b/api/submit/";
			};

			this.model.save();
		}
	});

	return SaveCartView;
});