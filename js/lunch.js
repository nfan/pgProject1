define(['underscore', 'Backbone', 'jquery',
        'text!lunch.html!strip',
        'jqueryui',
        'jqueryuiTouch'
       ],
    function(_, Backbone, $, LunchHtml) {
        var lunch = Backbone.View.extend({
                locations: ['桃屋', '醉爱', '清华园宾馆', '肉夹馍'],
                persons: ['nfan','shshen', 'wqu', 'mjiao', 'yewang'],
                events: {
                    'click #btnAdd': 'onAdd',
                    'click #btnSubmit': 'onSubmit',
                    'click #btnEven': 'onEven',
                    'click #btnRecharge': 'onRecharge',
                    'click #btnRemove': 'onRemove'
                },
                
                initialize: function(options) {
                    _.bindAll(this, 'render', 'onAdd', 'onSubmit', 'onEven', 'onRecharge', 'onRemove', 'setHandler', 'refreshCnt');
                },

                render: function() {
                    var html = LunchHtml;
                    this.$el.html(html);
                    $("#location").autocomplete({source: this.locations});
                    $("#sum").click(this.refreshCnt);
                    $("#sum").blur(this.refreshCnt);
                    this.onAdd();
                    return this;
                    
                },

                onAdd: function() {
	    			var el = $(this.$el.find("#tmplPerson").html());
	    			this.$el.find("#content ol").append(el);
	    			this.setHandler(el);
	    			this.refreshCnt();
                },
		
				onSubmit: function() {
					var param = {type: "lunch"};
					
					var link="mailto:shenshanliang@gmail.com";
					
					var d = new Date();
					var curr_date = d.getDate();
				    var curr_month = d.getMonth() + 1; //Months are zero based
				    var curr_year = d.getFullYear();

				    param.date = curr_year + "-" + curr_month + "-" + curr_date;
				    param.location = $("#location").val();
					param.sum = $("#sum").val();
					
					var fees = [];
					$("#content li").each(function(idx, el) {
		        			var fee = {};
		        			fee[$(el).find(".name").val()] = $(el).find(".fee").val();
		        			fees.push(fee);
		    		});
		    		
		    		param.fees = fees;
		    		
		    		var subject = JSON.stringify(param);
		    		
		    		var el = $("#linkSubmit");
		    		el.attr("href", link + "?" + "subject=" + subject);
		    		window.location.href = el.attr("href");

				},

				onEven: function() {
					var sum = parseFloat($("#sum").val());
		    			var cnt = parseFloat($("#cnt").val());
		    			var av = sum/cnt;
		    			$("#content li input.fee").each(function(idx, el) {
		        			$(el).val(av);
		    			});
		    			this.refreshCnt();
				},
				
				onRecharge: function() {
						this.remove();//remove view and unbind events
						require(['recharge'], function(Recharge) {
	                        var app = new Recharge();
							$("body").append(app.render().el);
	                    });
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
				      max: 100,
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

            return lunch;
    }
);
