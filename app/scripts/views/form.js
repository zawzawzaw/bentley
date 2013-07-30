define(['backbone', 'jquery', 'collections/carts', 'views/finishcart', 'views/prints'], function(Backbone, $, cartsCollection, FinishCartView, PrintsView){

	var formView = Backbone.View.extend({
		el : '#CustomerRegistrationForm',
		template : _.template($('#customerForm').html()),
		productListing : $('#ProductListing'),
		events : {
			'click .submit' : 'submit',
			'click .edit' : 'edit',
		},
		render : function() {

			this.$el.show();
			var html = this.template();
			this.$el.html(html);

		},
		edit: function(e){

			e.preventDefault();
			this.productListing.show();
			this.$el.hide();

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
			var self = this;
			this.model.save({},{
	            success: function(model, response) {
	                self.save(response.id);

	                self.productListing.show();
	                
					self.$el.hide();

	                var printsView = new PrintsView({ collection : cartsCollection });

	                printsView.render();

	                $('.deleteFromCart').remove();
	                $('.finishCart').remove();

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

		}
	});	

	return formView;
});