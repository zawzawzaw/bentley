define(['backbone','jquery', 'views/searchresults'], function(Backbone, $, SearchresultsView){

	var SearchUsersView = Backbone.View.extend({
		el : '#CustomerSearchForm',
		template: _.template($('#searchUserForm').html()),
		events : {
			'click #search' : 'search'
		},
		render : function(){

			var html = this.template();
		
			this.$el.html(html);
			
		},
		search : function(e){

			e.preventDefault();

			$.fn.serializeObject = function()
			{
			    var o = {};
			    var a = this.serializeArray();
			    $.each(a, function() {
			        if (o[this.name] !== undefined) {
			            if (!o[this.name].push) {
			                o[this.name] = [o[this.name]];
			            }
			            o[this.name].push(this.value || '');
			        } else {
			            o[this.name] = this.value || '';
			        }
			    });
			    return o;
			};

			var values = $(this.el).find('form').serializeObject();
			var that = this;

			this.collection.fetch(
			{
				data: { search: values.search },
				processData: true,
		        success: function (collection, response) {
	        		var searchresultsView = new SearchresultsView({ collection : collection });
					searchresultsView.render();
		        },
		        error: function() {
		             console.log('Failed to fetch!');
		        }
		   }, this);
		}
	});

	return SearchUsersView;

});