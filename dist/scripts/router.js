define(["jquery","underscore","backbone","views/cars","views/categories","views/products"],function(e,t,n,r,i,s){var o=n.Router.extend({routes:{"":"showCarModels","showcategories/:id":"showCategories","showproducts/:id":"showProducts","search/:query":"search","*other":"default"},showCarModels:function(){var e=new r;e.render()},showCategories:function(e){var t=new i;t.render(e)},showProducts:function(e){var t=new s;t.render(e)},search:function(e){console.log("what you searching for "+e)},"default":function(e){alert("no idea what you searching for: "+e)}}),u=function(){var e=new o;n.history.start()};return{initialize:u}});