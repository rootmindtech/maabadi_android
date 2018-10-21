(function(){
    "use strict";

    var app = angular.module('schoolApp');


	app.controller('studentChartController',['$scope','sharedProperties', function($scope,sharedProperties){



           /* $scope.loadSummaryChart=function () {*/


            	var json=null;


            	// $scope.$watch(function () { return sharedProperties.getCCPortfolio(); }, function (newValue, oldValue) {


            	      //  if (newValue !== oldValue) {

            	        	//alert(' newValue = '+JSON.stringify(newValue));

            	        	//alert(' newValue2 = '+newValue.accountsWrapper.length);

            	        	//json = newValue;

            	               var columnChart = new CanvasJS.Chart("columnChartContainer", {

                               		theme: "theme1",//theme1
                               		animationEnabled: true,
                               		title:{
                               			text: "Attendance Chart - " +sharedProperties.getAcademicYearIDValue()
                               		},
                               		   // change to true
                               		data: [
                               		{
                               			// Change type to "bar", "area", "spline", "pie",etc.
                               			type: "column",
                               			indexLabelFontFamily: "Helvetica",
                                        indexLabelFontSize: 12,
                                        indexLabelFontColor: "Black",
                                        indexLabelLineColor: "darkgrey",
                               			dataPoints:[

                               				{ label: "Jan",  y: 10  },  // 30
                               				{ label: "Feb",  y: 15   },
                               				{ label: "Mar",  y: 25   },
                               				{ label: "Apr",  y: 30  },
                               				{ label: "May",  y: 28  },
                               				{ label: "Jun",  y: 22  },
                               				{ label: "Jul",  y: 20  },
                               				{ label: "Aug",  y: 26  },
                               				{ label: "Sep",  y: 30  },
                               				{ label: "Oct",  y: 30  },
                               				{ label: "Nov",  y: 25  },
                               				{ label: "Dec",  y: 30  }

                               			]
                               		}
                               		]
                               	});
                               	columnChart.render();






                           json = [{label: "Hindhi",  "yvalue": 10  }, {label: "English", "yvalue": 15  },{label: "Telugu",  "yvalue": 25   },{ label: "Maths", "yvalue": 30  },{ label: "Physics", "yvalue": 28  },
                                                                               { label: "Social", "yvalue": 22  }];

							if(json !=null)
                                                    	{
                                        	                var dataPoints = [];

                                        	                for(var i=0;i<=json.length-1;i++){

                                        	                    dataPoints.push({label: json[i].label,  y: json[i].yvalue});
                                        	                	//dataPoints.push({x: json.creditCardsWrapper[i].creditCardType, y:30});
                                        	               		// dataPoints.push({label: key, y: json[key], legendText:key});

                                        	                }

                                        	                CanvasJS.addColorSet("percentShades",
                                        	                                     [//colorSet Array
                                        	                                        "#F2784B",
                                        	                                        "#F5AB35",
                                        	                                        "#D35400",
                                        	                                        "#00B16A",
                                        	                                        "#36D7B7",
                                        	                                        "#F62459"
                                      	                                      ]);

                                        	                var chart=null;

                                        	                //setTimeout(function(){
                            								// Android.showToast("push chart");
                                        	                chart = new CanvasJS.Chart("pieChartContainer", {
                                        	                                               colorSet: "percentShades",
                                        	                                               theme: "theme1",//theme1
																						   title:{
                               																	text: "Marks Pie Chart - " +sharedProperties.getAcademicYearIDValue()
                               															   },
                                        	                                               interactivityEnabled: true,
                                        	                                               axisY:{
                                        	                                               includeZero: false  //try changing it to true
                                        	                                               }
                                        	                                               ,
                                        	                                               legend:{
                                        	                                               verticalAlign: "right",
                                        	                                               horizontalAlign: "right",
                                        	                                               fontSize: 10,
                                        	                                               fontFamily: "Helvetica"
                                        	                                               },
                                        	                                               animationEnabled: true,
                                                                                           //animationDuration: 2000,   // change to true
                                        	                                               data: [
                                        	                                                      {
                                        	                                                      // Change type to "bar", "splineArea", "area", "spline", "pie",etc.
                                        	                                                      type: "pie",
                                        	                                                      indexLabelFontFamily: "Helvetica",
                                        	                                                      indexLabelFontSize: 12,
                                        	                                                      indexLabelFontColor: "Black",
                                        	                                                      indexLabelLineColor: "darkgrey",
                                        	                                                      indexLabel: "{label}, {y}%",
                                        	                                                      //startAngle:-20,
                                        	                                                      indexLabelPlacement: "inside",
                                        	                                                      //indexLabel: "{label}, #percent%",
                                        	                                                      toolTipContent: "{label}: {y} - <strong>#percent% </strong>",
                                        	                                                      showInLegend: true,
                                        	                                                      dataPoints:dataPoints
                                        	                                                      }
                                        	                                                ]
                                        	                                               });
                                        	                chart.render();


                             }

                               	var splineAreaChart = new CanvasJS.Chart("splineAreaChartContainer",
                                    {
                                      title:{
                                        text: "Multi-Series Spline Area Chart"
                                      },
                                      animationEnabled: true,
                                      data: [
                                      {
                                        type: "splineArea",
                                        color: "rgba(54,158,173,.7)",

										//English
										// x axis term -1 ,term-2, queterly.......
                                        dataPoints: [
                                        {y: 90},
                                        {y: 80},
                                        {y: 70},
                                        {y: 28},
                                        {y: 31},
                                        {y: 14},
                                        {y: 26},
                                        {y: 9},
                                        {y: 18},
                                        {y: 11},
                                        {y: 7},
                                        {y: 1}
                                        ]
                                      },
                                      {
                                        type: "splineArea",
                                        color: "rgba(194,70,66,.7)",
                                        //Maths
                                        // X axis term-1, term-2, queterly half..........
                                        dataPoints: [
                                        {y: 95},
                                        {y: 92},
                                        {y: 85},
                                        {y: 16},
                                        {y: 12},
                                        {y: 14},
                                        {y: 18},
                                        {y: 14},
                                        {y: null},
                                        {y: 12},
                                        {y: 17},
                                        {y: 14}
                                        ]
                                      }

                                      ]
                                    });

                                    splineAreaChart.render();

                       // }

            	        	//}

            	  //  });

            	/*$scope.$watch(

       				   'portfolio.getAccountPortfolio()',

       				   function(newValue, oldValue) {
       				     //if ( newValue !== oldValue ) {

       				       //return newValue;
       				    	 alert('watch value = '+newValue);
       				    	 json=newValue;
       				     //}
       				   },true
       				 );*/


            	/* $scope.$apply(function() {
                  alert('value changed ');
                     json=sharedProperties.getAccountPortfolio();

                     alert('value json '+json);
                   });*/


            	//json=sharedProperties.getAccountPortfolio();

                //},2000);
           //}

            //window.onload = loadChart;


          // $scope.loadSummaryChart();

	}]);



})();

