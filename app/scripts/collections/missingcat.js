define(['backbone', 'models/missingcat'],function(Backbone, MissingcatModel){
	var MissingcatCollection = Backbone.Collection.extend({
		model : MissingcatModel
	});

	var missingcatCollection = new MissingcatCollection();

	return missingcatCollection;
});