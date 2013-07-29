define(['backbone', 'jquery', 'collections/carts', 'views/finishcart', 'router'], function(Backbone, $, cartsCollection, FinishCartView, AppRouter){

	var formView = Backbone.View.extend({
		el : '#container2',
		template : _.template($('#customerForm').html()),
		events : {
			'click .submit' : 'submit',
			'click .edit' : 'edit',
		},
		render : function() {
			$('#container2').show();

			var html = this.template();
			this.$el.html(html);
		},
		edit: function(e){
			e.preventDefault();

			// var app_router = new AppRouter();
			$('#container').show();
			$('#container2').hide();

			console.log(AppRouter);
		},
		submit : function(e){
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

			this.model.set(values);

			this.model.url = function(){
				return "../../../ipad/b/api/submit/";
			};

			var customer_id = 0;
			var self = this;

			this.model.save({},{
	            success: function(model, response) {
	                self.save(response.id);
	            },
	            error: function(model, response) {
	                console.log('error! ' + response);
	            }
	        }, this);			
		},
		save: function(customer_id){
			var self = this;

			cartsCollection.each(function(cart){
				cart.set('customer_id' , customer_id);

				var finishCartView = new FinishCartView({ model : cart });
			}, this);

			alert('Success!');
		}
	});

	

	return formView;
});