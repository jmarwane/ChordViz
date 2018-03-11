function jmarViz(data) {
  var first_chord_index = 3;
  console.log(data);
  var chord_positions = data.columns.slice(first_chord_index);
  // column = "Verse1";
  // all_chords = d3
  //   .map(data, function(d) {
  //     return d[column];
  //   })
  //   .keys();
  // console.log(all_chords);
  // var nest_expression = " var nested_data = d3.nest()";
  // chord_positions.forEach(function(p) {
  //   nest_expression += ".key(function(d){return d." + p + ";})";
  // });
  // nest_expression += ".entries(data)";
  // eval(nest_expression)
  // console.log(nested_data);

  // make a node lookup map
  var gstruct = (function() {
    var lol = {};
    var id = 0;

    chord_positions.forEach(p => {
      var nested_data = d3
        .nest()
        .key(d => {
          return d[p];
        })
        .entries(data);
      lol[p] = {};
      d3
        .map(data, d => {
          return d[p];
        })
        .keys()
        .forEach(k => {
          lol[p][k] = {};
          lol[p][k].id = id;
          lol[p][k].value = 0;
          lol[p][k].next = {};
          lol[p][k].previous = {};
          id++;
        });
    });

    return lol;
  })();

  function update_gstruct(new_data) {
    data.forEach(d => {
      var p = 0;
      while(p<chord_positions.length+1){
        actual = chord_positions[p];
        next = chord_positions[p+1];

        gstruct[actual][d[actual]].value += 1;

        if(gstruct[actual][d[actual]].next[d[next]] === undefined){
          gstruct[actual][d[actual]].next[d[next]] = {'values': 0} //complete here
        }

        gstruct[next].next[d[next]].value

      }

      // chord_positions.forEach((p,i) => {
      //   gstruct[p][d[p]] +=1;
      //   try {
      //     gstruct[chord_positions[p]]
      //   }


      // });
    });
  }
  console.log(gstruct);
}
