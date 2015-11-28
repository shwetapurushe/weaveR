//The Weave Widget from R
//@author Shweta Purushe
var weave;
var shweta;
HTMLWidgets.widget({

  name: 'weaveR',

  type: 'output',

  initialize: function(el, width, height) {
      var loadFlashContent = function() {
          var swfVersionStr = "10.2.0";
          // To use express install, set to playerProductInstall.swf, otherwise the empty string.
          var xiSwfUrlStr = "lib/weave-2.2/playerProductInstall.swf";
          var flashvars = {};
          var params = {};
          params.quality = "high";
          params.bgcolor = "#869ca7";
          params.allowscriptaccess = "sameDomain";
          params.allowfullscreen = "true";
          //params.base = window.location.protocol+"//"+window.location.host;
          var attributes = {};
          attributes.id = "weave";
          attributes.name = "weave";
          attributes.align = "middle";
          swfobject.embedSWF(
              "lib/weave-2.2/weave.swf", el.id,
              "70%", "800px",
              swfVersionStr, xiSwfUrlStr,
              flashvars, params, attributes);
          // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
          swfobject.createCSS(el.id, "display:block;text-align:left;");
         weave = document.getElementById('weave');
      };

      // el.id = "flashContent"
      $(document).ready(function() {
          setTimeout(loadFlashContent, 100);
      });

      return{
      }

  },

  renderValue: function(el, x, instance) {

      function checkWeaveReady (){
          return weave && weave.WeavePath && weave._jsonCall;
      }

      //SCATTER PLOT
      function scatterPlot() {
          if (checkWeaveReady())
            weave.path('SP').request('ScatterPlotTool')
            .state({ panelX : "0%", panelY : "0%"})
            .push('children', 'visualization','plotManager', 'plotters', 'plot').push('dataX').setColumn("x", "myData").pop().pop()
            .push('children', 'visualization','plotManager', 'plotters', 'plot').push('dataY').setColumn("y", "myData");

          else
              setTimeout(scatterPlot, 100);
      }

      //BARCHART
      function barChart (){
          if(checkWeaveReady()){
              //TODO use setColumns (last minute)
              weave.path('BC').request('CompoundBarChartTool')
              .state({ panelX : "0%", panelY : "50%"})
            .push('children', 'visualization', 'plotManager', 'plotters', 'plot')
            .push('heightColumns').push('ReferencedColumn').setColumn('x', 'myData').pop()
            .push('ReferencedColumn').setColumn('y', 'myData');
          }
          else
              setTimeout(barChart, 100)
      }

      //DATATABLE
      function dataTable (){
          if(checkWeaveReady()){
              //TODO use setColumns (last minute)
              weave.path('DT').request('TableTool')
                  .state({ panelX : "50%", panelY : "0%"})
                  .push('columns')
                  .push('ReferencedColumn3').setColumn('x', 'myData').pop()
                  .push('ReferencedColumn4').setColumn('y', 'myData');
          }
          else
              setTimeout(dataTable, 100)
      }


      function setColor(){
          if(checkWeaveReady())
              weave.path('defaultColorDataColumn').setColumn("x", "myData");
          else
              setTimeout(setColor, 100)
      }

      function create_CSV_dataSource(cols){
          if(checkWeaveReady()){
            //1. formatting for Weave
            var dCols = [cols.x, cols.y];//hard coded for now
            var columnNames = Object.keys(cols);//column titles
            var csvData = [];
            var rowCounter = 0;
            var currentRow = dCols[0];

              if(currentRow.length > 0)
                  rowCounter = currentRow.length;
              //handling single row entry, that is the column has only one record
              else{
                  rowCounter = 1;
              }
              var columnHeadingsCount = 1;
              rowCounter = rowCounter + columnHeadingsCount;//we add an additional row for column Headings
              csvData.unshift(columnNames);//first entry is column names
              for( var j = 1; j < rowCounter; j++)
              {
                  var tempList = [];//one added for every column in 'columns'
                  for(var f =0; f < dCols.length; f++){
                      //pick up one column
                      var currentCol = dCols[f];
                      if(currentCol.length > 0)//if it is an array
                      //the second index in the new list should coincide with the first index of the columns from which values are being picked
                          tempList[f]= currentCol[j-1];

                      //handling single record
                      else
                      {
                          tempList[f] = currentCol;
                      }

                  }
                  csvData[j] = tempList;//after the first entry (column Names)
              }

              shweta = csvData;

              //2. creating the CSVDataSource in Weave
              weave.path('myData').request('CSVDataSource').vars({rows:csvData}).exec('setCSVData(rows)');
          }
          else
              setTimeout(create_CSV_dataSource, 100, x.columns);
      }

      /*** Weave function calls **/
      //1. format the data from R and create CSVDataSource
      create_CSV_dataSource(x.columns);
      //2. create visualizations
      scatterPlot();
     // barChart();
      dataTable();
      //3. color it
      setColor();

  },

  resize: function(el, width, height, instance) {

  }

});
