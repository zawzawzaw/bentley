define(['backbone', 'jquery', 'views/searchresult'], function(Backbone, $, SearchresultView){

	var SearchresultsView = Backbone.View.extend({
		tagName : "div id=CustomerSearchResult",
		render : function(){

			var self = this;
			console.log(this.collection);

			if(this.collection.length>0) {

				this.collection.each(function(searchresult){
				 	self.addOne(searchresult);
				});
			}
		},
		addOne : function(searchresult){

			var searchresultView = new SearchresultView({ model: searchresult });
			$('#CustomerSearchForm').append(this.$el.append( searchresultView.render().el ));
		}
	});

	return SearchresultsView;
});