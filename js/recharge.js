define(['underscore', 'Backbone', 'jquery',
        'text!recharge.html!strip',
        'jqueryui',
        'jqueryuiTouch'
       ],
    function(_, Backbone, $, RechargeHtml) {
        var recharge = Backbone.View.extend({
                persons: ['nfan','shshen', 'wqu', 'mjiao', 'yewang'],
                events: {
                    'click #btnAdd': 'onAdd',
                    'click #btnSubmit': 'onSubmit',
                    'click #btnRemove': 'onRemove',
                    'click #btnLunch': 'onLunch'
                },
                
                initialize: function(options) {
                    _.bindAll(this, 'render', 'onAdd', 'onLunch', 'onSubmit', 'onRemove', 'setHandler', 'refreshCnt');
                },

                render: function() {
                    var html = RechargeHtml;
                    this.$el.html(html);
                    $("#sum").click(this.refreshCnt);
                    $("#sum").blur(this.refreshCnt);
                    this.onAdd();
                    return this;
                    
                },

				onLunch: function() {
						this.remove();//remove view and unbind events
						require(['lunch'], function(Lunch) {
	                        var app = new Lunch();
							$("body").append(app.render().el);
	                    });
				},
				
                onAdd: function() {
	    			var el = $(this.$el.find("#tmplPerson").html());
	    			this.$el.find("#content ol").append(el);
	    			this.setHandler(el);
	    			this.refreshCnt();
                },
		
				onSubmit: function() {
					var param = {type: "recharge"};
					
					var link="mailto:shenshanliang@gmail.com";
					
					var d = new Date();
					var curr_date = d.getDate();
				    var curr_month = d.getMonth() + 1; //Months are zero based
				    var curr_year = d.getFullYear();

				    param.date = curr_year + "-" + curr_month + "-" + curr_date;

					param.sum = $("#sum1").val();
					
					var fees = [];
					$("#content li").each(function(idx, el) {
		        			var fee = {};
		        			fee[$(el).find(".name").val()] = $(el).find(".fee").val();
		        			fees.push(fee);
		    		});
		    		
		    		param.recharges = fees;
		    		
		    		var subject = JSON.stringify(param);
		    		
		    		var el = $("#linkSubmit");
		    		el.attr("href", link + "?" + "subject=" + subject);
		    		window.location.href = el.attr("href");


				},

				onRemove: function(evt){
					$(evt.target).parents("li").remove();
		    		this.refreshCnt();
				},
				
				setHandler: function(el) {
					var that = this;
					el.find("button").click(this.onRemove);
					el.find("input.name").autocomplete({source:this.persons});
					el.find("div.fee_slider").slider({
				      range: "min",
				      value: 0,
				      min: 0,
				      step: 10,
				      max: 500,
				      slide: function( event, ui ) {
				        el.find("input.fee").val( ui.value );
				        that.refreshCnt();
				      }
				    });
					el.find("input.fee").click(this.refreshCnt);
					el.find("input.fee").blur(this.refreshCnt);
				},
				
				refreshCnt: function(){
		    			var tmp = 0;
		    			var tot = 0;
		    			$("#content li .fee").each(function(idx, el){
		        			tmp++;
		        			tot+=parseFloat($(el).val());
		    			});
		    			$("#cnt").val(tmp);
		    			$("#sum1").html(tot);
		    			
		    			if(tot != parseFloat($("#sum").val())) {
		    				$("#sum1").css("color","red");
		    			} else {
		    				$("#sum1").css("color","green");
		    			}
				}
		
            });

            return recharge;
    }
);
