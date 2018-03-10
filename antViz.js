function antViz(data) {
    console.log(data)
    var background_color = "pink"
    var select_color = "red"
    var curves_color = "#6292C8"
        // La durée des transitions pour l'apparition / dispartition des lignes
    var transition_duration = 600
        // Le nombre de chansons dans la base de données
    var n_songs = data.length
        // La plus petite opacité que peut avoir une ligne
    var min_curves_opacity = 0.05;
    var curves_opacity = min_curves_opacity
        // La largeur des lignes
    var curves_width = 3
        // Renvoie le string correspondant à l'accord n°bar du morceau n°song
    function get_chord(song, bar) {
        if (bar < 9) {
            return (data[song]["Verse" + bar])
        } else {
            return (data[song]["Chorus" + (bar - 8)])
        }
    }
    // Largeur et hauteur du svg
    var w = window.innerWidth;
    var h = 400;
    // Un array contenant les entiers de 1 à 16
    var bars_id = Array(16).fill().map((e, i) => i + 1);
    // Un array contenant les noms des accords les plus communs, "?" correspond aux autres accords
    var chords = ['A', 'A#', 'A-', 'B', 'B#', 'B-', 'C', 'C#', 'C-', 'D', 'D#', 'D-', 'E', 'E#', 'E-', 'F', 'F#', 'G', 'G#', 'G-']
        // Le svg
    var svg = d3.select("#chart").append("svg").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + w + " " + h)
        // Les dimensions de la zone d'affichage sur le svg
    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    }
    var width = +svg.attr('viewBox').split(" ")[2] - margin.left - margin.right
    var height = +svg.attr('viewBox').split(" ")[3] - margin.top - margin.bottom
        // Largeur d'un des rectangles contenant un nom d'accord
    var rectangle_width = 20;
    var diagram_width_ratio = 1;
    var diagram_height_ratio = 0.9;
    // Distances horizontale et verticale entre deux rectangles contenant un accord
    var horizontal_padding = (diagram_width_ratio * width - 16 * rectangle_width) / 16;
    var vertical_padding = 0;
    // Hauteur d'un des rectangles contenant un accord
    var rectangle_height = -vertical_padding + diagram_height_ratio * height / chords.length;
    // Taille de la police de caractères
    var font_size = rectangle_height - 10;
    var boxes_color = "blue"
    var boxes_border_width = 2
    var boxes_width_1 = width * diagram_width_ratio / 2 + (margin.left - horizontal_padding) / 2
    var boxes_height_1 = height * diagram_height_ratio + rectangle_height
    var boxes_height_2 = height - boxes_height_1 + margin.top
    var boxes_x_1 = margin.left / 2
    var boxes_x_2 = margin.left / 2 + width * diagram_width_ratio / 2 + (margin.left - horizontal_padding) / 2
    var boxes_y_1 = margin.top / 2 + height * (1 - diagram_height_ratio)
    var boxes_y_2 = margin.top / 2
    svg.append("rect")
        .attr("width", boxes_width_1)
        .attr("height", boxes_height_1)
        .attr("x", boxes_x_1)
        .attr("y", boxes_y_1)
        .attr("class", "cerc")
        .attr("stroke-width", boxes_border_width)
        .attr("fill-opacity", 0)
        .attr("stroke", "blue");
    svg.append("rect")
        .attr("width", boxes_width_1)
        .attr("height", boxes_height_1)
        .attr("x", boxes_x_2)
        .attr("y", boxes_y_1)
        .attr("class", "cerc")
        .attr("stroke-width", boxes_border_width)
        .attr("fill-opacity", 0)
        .attr("stroke", "blue");
    svg.append("rect")
        .attr("width", boxes_width_1)
        .attr("height", boxes_height_2)
        .attr("x", boxes_x_1)
        .attr("y", boxes_y_2)
        .attr("class", "cerc")
        .attr("stroke-width", boxes_border_width)
        .attr("fill-opacity", 0)
        .attr("stroke", "blue");
    svg.append("text")
        .attr("x", boxes_x_1 + (boxes_width_1) / 2)
        .attr("y", boxes_y_2 + (boxes_height_2) / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("font-size", 1.5 * font_size)
        .style("stroke", "brown")
        .text("VERSE")
        .attr("class", "unclickable");
    svg.append("rect")
        .attr("width", boxes_width_1)
        .attr("height", boxes_height_2)
        .attr("x", boxes_x_2)
        .attr("y", boxes_y_2)
        .attr("class", "cerc")
        .attr("stroke-width", boxes_border_width)
        .attr("fill-opacity", 0)
        .attr("stroke", "grey");
    svg.append("text")
        .attr("x", boxes_x_2 + (boxes_width_1) / 2)
        .attr("y", boxes_y_2 + (boxes_height_2) / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("font-size", 1.5 * font_size)
        .style("stroke", "brown")
        .text("CHORUS")
        .attr("class", "unclickable");
    // Des groupes d'éléments, bars[i] contient les rectangles contenant les noms des accords de la mesure i
    var bars = new Array(16)
    for (i = 0; i < 16; i++) {
        bars[i] = d3.select("svg").append("g")
    }
    // Les éléments sur lesquels on ne peut pas cliquer
    var unclickable_elements = d3.select("svg").append("g").attr("class", "unclickable")
        // Un objet d3 permettant de générer les courbes
    var dacurve = {
        "d3Curve": d3.curveMonotoneX,
        "curveTitle": "curveMonotoneX"
    }
    var valid_songs = new Array(n_songs)
    var n_valid_songs = n_songs
    var selected_artist = "All Artists"
    var selected_song = -1
    var songs_curves = new Array(n_songs)
    data.forEach(function(d, i) {
        songs_curves[i] = d3.select("svg").append("g")
        valid_songs[i] = 1
    })


    //////////////////////////////////////////
    function update_valid_songs() {
        n_valid_songs = n_songs
        for (i = 0; i < n_songs; i++) {
            valid_songs[i] = 1
            song = data[i]
            if (selected_artist != "All Artists") {
                if (song["Artist"] != selected_artist) {
                    valid_songs[i] = 0
                    n_valid_songs = n_valid_songs - 1
                }
            }

            if (valid_songs[i] == 1) {
                for (j = 0; j < 16; j++) {
                    chord = get_chord(i, j + 1)
                    if (chords.indexOf(chord) < 0 && typeof chord != "undefined" && chord != "end" && chord != "" && chord != " ") {
                        chord = "?"
                    }
                    if (selected_chords[j] >= 0) {
                        if (chord != chords[selected_chords[j]]) {
                            valid_songs[i] = 0
                            n_valid_songs = n_valid_songs - 1
                        }
                    }
                }
            }
        }
        console.log(selected_artist)
        console.log(n_valid_songs)
    }

    var songs_id = new Array(n_valid_songs)
    var selected_chords = new Array(16)
    for (i = 0; i < 16; i++) {
        selected_chords[i] = -1
    }

    // Une fonction qui gère la mise à jour des courbes quand on sélectionne / déselectionne un accord
    function update_curves() {
        curves_opacity = min_curves_opacity + (1 - n_valid_songs / n_songs);
        console.log(a)
        for (i = 0; i < n_songs; i++) {
            if (i == selected_song) {
                songs_curves[i]
                    .selectAll("path").moveToFront();
            }
            if (valid_songs[i] == 0) {
                songs_curves[i]
                    .selectAll("path")
                    .transition()
                    .style("stroke-opacity", 0)
                    .duration(transition_duration)
            } else {
                songs_curves[i]
                    .selectAll("path")
                    .transition()
                    .style("stroke-opacity", curves_opacity)
                    .style("stroke", curves_color)
                    .duration(transition_duration)
            }
        }

    }
    // On parcourt les chansons et on créé pour chaque chanson l'ensemble de ses courbes
    data.forEach(function(d, i) {
            for (bar = 1; bar < 8; bar++) {
                current_chord = get_chord(i, bar)
                next_chord = get_chord(i, bar + 1)
                chord_id = chords.indexOf(current_chord)
                next_chord_id = chords.indexOf(next_chord)
                x = margin.left + (horizontal_padding + rectangle_width) * (bar - 1)
                y = margin.top + (1 - diagram_height_ratio) * height + (rectangle_height + vertical_padding) * chord_id
                y2 = margin.top + (1 - diagram_height_ratio) * height + (rectangle_height + vertical_padding) * next_chord_id
                line_data =
                    [{
                        song_id: i,
                        x: x + rectangle_width,
                        y: y + rectangle_height / 2
                    }, {
                        song_id: i,
                        x: x + rectangle_width + 0.1 * horizontal_padding,
                        y: y + rectangle_height / 2
                    }, {
                        song_id: i,
                        x: x + rectangle_width + 0.9 * horizontal_padding,
                        y: y2 + rectangle_height / 2
                    }, {
                        song_id: i,
                        x: x + rectangle_width + horizontal_padding,
                        y: y2 + rectangle_height / 2
                    }]
                a = min_curves_opacity + (1 - n_songs / n_songs);
                line =
                    songs_curves[i].append("path")
                    .datum(line_data)
                    .attr("class", "line")
                    .attr("class", "unclickable")
                    .attr("fill", "none")
                    .style("stroke", curves_color)
                    .style("stroke-opacity", a)
                    .style("stroke-width", curves_width)
                    .attr("d", d3.line()
                        .curve(dacurve.d3Curve)
                        .x(function(d) {
                            return d["x"];
                        })
                        .y(function(d) {
                            return d["y"];
                        }))
                    .on("click", function(curve_data) {})
            }
            for (bar = 9; bar < 16; bar++) {
                current_chord = get_chord(i, bar)
                next_chord = get_chord(i, bar + 1)
                chord_id = chords.indexOf(current_chord)
                next_chord_id = chords.indexOf(next_chord)
                x = margin.left + (horizontal_padding + rectangle_width) * (bar - 1)
                y = margin.top + (1 - diagram_height_ratio) * height + (rectangle_height + vertical_padding) * chord_id
                y2 = margin.top + (1 - diagram_height_ratio) * height + (rectangle_height + vertical_padding) * next_chord_id
                line_data =
                    [{
                        song_id: i,
                        x: x + rectangle_width,
                        y: y + rectangle_height / 2
                    }, {
                        song_id: i,
                        x: x + rectangle_width + 0.1 * horizontal_padding,
                        y: y + rectangle_height / 2
                    }, {
                        song_id: i,
                        x: x + rectangle_width + 0.9 * horizontal_padding,
                        y: y2 + rectangle_height / 2
                    }, {
                        song_id: i,
                        x: x + rectangle_width + horizontal_padding,
                        y: y2 + rectangle_height / 2
                    }]
                a = min_curves_opacity + (1 - n_songs / n_songs);
                line =
                    songs_curves[i].append("path")
                    .datum(line_data)
                    .attr("class", "line")
                    .attr("class", "unclickable")
                    .attr("fill", "none")
                    .style("stroke", curves_color)
                    .style("stroke-opacity", a)
                    .style("stroke-width", curves_width)
                    .attr("d", d3.line()
                        .curve(dacurve.d3Curve)
                        .x(function(d) {
                            return d["x"];
                        })
                        .y(function(d) {
                            return d["y"];
                        }))
                    .on("click", function(curve_data) {})
            }
        })
        // On créé les carrés correspondant aux accords
    chords.forEach(
        function(c, i) {
            bars_id.forEach(function(b, j) {
                var x = margin.left + (horizontal_padding + rectangle_width) * j
                var y = margin.top + (1 - diagram_height_ratio) * height + (rectangle_height + vertical_padding) * i
                var rect_data = [{
                        chord: i,
                        bar: j
                    }]
                    // On affiche le nom de l'accord
                unclickable_elements.append("text")
                    .attr("x", (x + rectangle_width / 2))
                    .attr("y", (y + rectangle_height / 2))
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .style("font-size", font_size)
                    .text(c);
                // On créé un rectangle transparent au dessus du texte
                bars[j].append('rect')
                    .attr("x", x)
                    .attr("y", y)
                    .attr("width", rectangle_width)
                    .attr("height", rectangle_height)
                    .attr("fill", "pink")
                    .attr("fill-opacity", 0)
                    .attr("stroke", "blue")
                    .data(rect_data)
                    .on("click", function(d) {
                        bars[j].selectAll("rect").each(function(dr) {
                            if (dr["chord"] != d["chord"]) {
                                d3.select(this).attr("fill-opacity", 0)
                                    .attr("stroke", "blue")
                            }
                        })
                        if (selected_chords[j] != d["chord"]) {
                            d3.select(this).attr("fill-opacity", 0.5)
                                .attr("stroke", "red")
                            selected_chords[j] = d["chord"]
                        } else {
                            d3.select(this).attr("fill-opacity", 0)
                                .attr("stroke", "blue")
                            selected_chords[j] = -1
                        }
                        update_valid_songs()
                        update_curves()
                        display_valid_songs()
                    });
            })
        })

    last_artist = ""
    var n_artists = 0
    for (i = 0; i < n_songs; i++) {
        if (data[i]["Artist"] != last_artist) {
            last_artist = data[i]["Artist"]
            n_artists = n_artists + 1
        }
    }
    artists = new Array(n_artists)
    j = 0
    for (i = 0; i < n_songs; i++) {
        if (data[i]["Artist"] != last_artist) {
            last_artist = data[i]["Artist"]
            artists[j] = last_artist
            j = j + 1
        }
    }

    function display_artists() {
        last_artist = "";

        d3.select('#artist')
            .append('option')
            .attr('value', 'All Artists')
            .text('All Artists')


        for (i = 0; i < n_artists; i++) {
            d3.select('#artist')
                .append('option')
                .attr('value', artists[i])
                .text(artists[i])
        }
    }
    display_artists();

    function handle_artist_selection() {
        $('#artist')
            .on('change', function() {
                console.log(this.value);
                selected_artist = this.value;
                selected_song = -1
                update_valid_songs()
                display_valid_songs()
                update_curves()

            });
    }
    handle_artist_selection()

    function display_valid_songs() {
        j = 0;

        $('#song').empty();

        d3.select('#song')
            .append('option')
            .attr('value', -1)
            .text('All Songs');

        for (i = 0; i < n_songs; i++) {
            if (valid_songs[i] == 1) {
                d3.select('#song')
                    .append('option')
                    .attr('value', i)
                    .text(data[i]["Artist"] + " - " + data[i]["Title"]);

                songs_id[j] = i
                j = j + 1
            }
        }
    };

    display_valid_songs();

    function handle_song_selection() {
        $('#song')
            .on('change', function() {
                console.log(this.value)
                selected_song = this.value;

                songs_curves.forEach((sc, i) => {
                    if (valid_songs[i] != 0) {
                        sc.selectAll("path")
                            .transition()
                            .style("stroke-opacity", curves_opacity)
                            .style("stroke", curves_color)
                            .duration(transition_duration)
                    }

                })

                if (this.value != -1) {
                    songs_curves[songs_id[this.value]]
                        .selectAll("path")
                        .transition()
                        .style("stroke-opacity", 1)
                        .style("stroke", select_color)
                        .duration(transition_duration)
                }
            });
    }
    handle_song_selection()
}