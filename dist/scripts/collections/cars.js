define(["backbone","models/car"],function(e,t){var n=e.Collection.extend({model:t,url:function(){return"../../../b/api/salesrecord/"},parse:function(e,t){return e.salesrecord},sync:function(e,t,n){var r=this,i=_.extend({type:"GET",dataType:"json",url:r.url,processData:!1},n);return $.ajax(i)}});return n});