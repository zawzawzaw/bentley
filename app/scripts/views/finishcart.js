define(['backbone','jquery'], function(Backbone, $){

	var FinishCartView = Backbone.View.extend({
		initialize: function(){

			this.model.url = function(){
				return "../../../ipad/b/api/saveorder/";
			};

			this.model.save({},{
	            success: function(model, response) {
	                console.log(response.order_id);
	            },
	            error: function(model, response) {
	                console.log('error! ' + response);
	            }
	        }, this);
	        
		}
	});

	return FinishCartView;
});