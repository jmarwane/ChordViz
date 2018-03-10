var artists_svg = d3.select("body").append("svg")
.attr("width", (w-margin.right)-(boxes_x_1+2*boxes_width_1)-20)
.attr("height", (height/2+margin.top/2)*0.85-2)
.attr("transform", "translate(" + (2*boxes_x_1+4*boxes_width_1+3*margin.right/2-w+21) + "," + (-h + (h/2 + (height/2+margin.top/2)*0.15)-3) + ")")
var artists_group = artists_svg.append("g")
artists_group.append("rect")
.attr("width","100%")
.attr("height","100%")
.attr("fill","pink")
var songs_slider = svg.append("g")
.attr("class", "slider")
.attr("transform", "translate("+ (boxes_x_1+2*boxes_width_1+margin.right/2+(w-margin.right)-(boxes_x_1+2*boxes_width_1)-10) + ","+ (margin.top/2 + (height/2+margin.top/2)*0.15+15)+ "),rotate(90)");
var songs_slider_x = d3.scaleLinear()
.domain([0, 1])
.range([0, (height/2+margin.top/2)*0.75])
.clamp(true);
songs_slider.append("line")
.attr("class", "track")
.attr("x1", songs_slider_x.range()[0])
.attr("x2", songs_slider_x.range()[1])
.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
.attr("class", "track-inset")
.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
.attr("class", "track-overlay")
.call(d3.drag()
.on("start.interrupt", function() { songs_slider.interrupt(); })
.on("start drag", function() {
slider_pos = songs_slider_x.invert(d3.event.x)
max_translate = d3.max([0,(20*n_valid_songs - (height/2+margin.top/2)*0.85)])
songs_handle.attr("cx", songs_slider_x(slider_pos))
songs_group.selectAll("*").attr("transform","translate(0,"+ (-slider_pos*max_translate) +")")
}));
var songs_handle = songs_slider.insert("rect", ".track-overlay")
.attr("class", "handle")
.attr("r", 9);
var artists_slider = svg.append("g")
.attr("class", "slider")
.attr("transform", "translate("+ (boxes_x_1+2*boxes_width_1+margin.right/2+(w-margin.right)-(boxes_x_1+2*boxes_width_1)-10) + ","+(h/2+(margin.top/2 + (height/2+margin.top/2)*0.15+5))+ "),rotate(90)");
var artists_slider_x = d3.scaleLinear()
.domain([0, 1])
.range([0, (height/2+margin.top/2)*0.75])
.clamp(true);
artists_slider.append("line")
.attr("class", "track")
.attr("x1", artists_slider_x.range()[0])
.attr("x2", artists_slider_x.range()[1])
.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
.attr("class", "track-inset")
.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
.attr("class", "track-overlay")
.call(d3.drag()
.on("start.interrupt", function() { artists_slider.interrupt(); })
.on("start drag", function() {
slider_pos = artists_slider_x.invert(d3.event.x)
max_translate = d3.max([0,(20*n_artists - (height/2+margin.top/2)*0.85)])
artists_handle.attr("cx", artists_slider_x(slider_pos))
artists_group.selectAll("*").attr("transform","translate(0,"+ (-slider_pos*max_translate) +")")
}));
var artists_handle = artists_slider.insert("rect", ".track-overlay")
.attr("class", "handle")
.attr("r", 9);
last_artist = ""
var n_artists = 0
for(i = 0;i<n_songs;i++)
{
if (data[i]["Artist"] != last_artist)
{
last_artist = data[i]["Artist"]
n_artists = n_artists + 1
}
}
artists = new Array(n_artists)
j = 0
for(i = 0;i<n_songs;i++)
{
if (data[i]["Artist"] != last_artist)
{
last_artist = data[i]["Artist"]
artists[j] = last_artist
j = j+1
}
}
function display_artists()
{
x = 10
y = 0
artists_group.selectAll("*").remove()
last_artist = ""
for(i = 0;i<n_artists;i++)
{
artists_group.append("text").transition()
.attr("x",x)
.attr("y",y)
.attr("text-anchor", "central")
.attr("dominant-baseline", "text-before-edge")
.style("font-size", 0.8*font_size)
.text(artists[i])
.attr("class","unclickable")
.duration(transition_duration);
artists_group.append("rect")
.attr("width",(w-margin.right)-(boxes_x_1+2*boxes_width_1)-20)
.attr("height",20)
.attr("x",0)
.attr("y",y)
.attr("fill",select_color)
.attr("fill-opacity",0)
.attr("stroke","blue")
.data("")
artists_group.selectAll("rect")
.on("click", function(k,l)
{
artist = artists[l]
if (artist == selected_artist)
{
selected_artist = "All Artists"
d3.select(this).attr("fill-opacity",0)
}
else
{

artists_group.selectAll("rect").each(function()
{
d3.select(this).attr("fill-opacity",0)
})
d3.select(this).attr("fill-opacity",0.3)
selected_artist = artist
}
selected_song = -1
update_valid_songs()
display_selected_songs()
update_curves()
})
y = y+20
}
}
display_artists()


function display_selected_songs()
{
x = 10
y = 0

j = 0
songs_group.selectAll("*").remove()
for(i = 0;i<n_songs;i++)
{
if(valid_songs[i]==1)
{
songs_id[j] = i
songs_group.append("text").transition()
.attr("x",x)
.attr("y",y)
.attr("text-anchor", "central")
.attr("dominant-baseline", "text-before-edge")
.style("font-size", 0.8*font_size)
.text(data[i]["Artist"] + " - " + data[i]["Title"])
.attr("class","unclickable").duration(transition_duration);
songs_group.append("rect")
.attr("width",(w-margin.right)-(boxes_x_1+2*boxes_width_1)-20)
.attr("height",20)
.attr("x",0)
.attr("y",y)
.attr("fill", select_color)
.attr("fill-opacity",0)
.attr("stroke","blue")
.data("")
songs_group.selectAll("rect")
.on("click", function(k,l){
console.log(selected_song,songs_id[l])
if (selected_song == songs_id[l])
{
selected_song = -1
songs_curves[songs_id[l]]
.selectAll("path")
.transition()
.style("stroke-opacity",curves_opacity)
.style("stroke","grey")
.duration(transition_duration)
d3.select(this).attr("fill-opacity",0)
}
else
{
selected_song = songs_id[l]

songs_group.selectAll("rect").each(function(m,n){
console.log(n)
d3.select(this).attr("fill-opacity",0)
songs_curves[songs_id[n]]
.selectAll("path")
.transition()
.style("stroke-opacity",curves_opacity)
.style("stroke","grey")
.duration(transition_duration)
})
songs_curves[songs_id[l]]
.selectAll("path")
.transition()
.style("stroke-opacity",1)
.style("stroke",select_color)
.duration(transition_duration)
d3.select(this).attr("fill-opacity",0.3)
}
})
j = j+1
y = y+20
}
}
};
display_selected_songs()

/////////////////////////////////////////////
svg.append("rect")
.attr("width", (w-margin.right)-(boxes_x_1+2*boxes_width_1))
.attr("height", height/2+margin.top/2)
.attr("x",boxes_x_1+2*boxes_width_1+margin.right/2)
.attr("y",margin.top/2)
.attr("class","cerc")
.attr("stroke-width",boxes_border_width)
.attr("fill-opacity",0)
.attr("stroke","blue");
svg.append("rect")
.attr("width", (w-margin.right)-(boxes_x_1+2*boxes_width_1))
.attr("height", (height/2+margin.top/2)*0.15)
.attr("x",boxes_x_1+2*boxes_width_1+margin.right/2)
.attr("y",margin.top/2)
.attr("class","cerc")
.attr("stroke-width",boxes_border_width)
.attr("fill-opacity",0)
.attr("stroke",boxes_color);
svg.append("text")
.attr("x",boxes_x_1+2*boxes_width_1+margin.right/2+((w-margin.right)-(boxes_x_1+2*boxes_width_1))/2)
.attr("y", margin.top/2 + (height/2+margin.top/2)*0.15/2)
.attr("text-anchor", "middle")
.attr("dominant-baseline", "central")
.style("font-size", 1.3*font_size)
.style("stroke", "blue")
.text("SONGS")
.attr("class","unclickable");
svg.append("rect")
.attr("width", (w-margin.right)-(boxes_x_1+2*boxes_width_1))
.attr("height", height/2+margin.top/2)
.attr("x",boxes_x_1+2*boxes_width_1+margin.right/2)
.attr("y",h/2)
.attr("class","cerc")
.attr("stroke-width",boxes_border_width)
.attr("fill-opacity",0)
.attr("stroke","blue");
svg.append("rect")
.attr("width", (w-margin.right)-(boxes_x_1+2*boxes_width_1))
.attr("height", (height/2+margin.top/2)*0.15)
.attr("x",boxes_x_1+2*boxes_width_1+margin.right/2)
.attr("y",h/2)
.attr("class","cerc")
.attr("stroke-width",boxes_border_width)
.attr("fill-opacity",0)
.attr("stroke","blue");
svg.append("text")
.attr("x",boxes_x_1+2*boxes_width_1+margin.right/2+((w-margin.right)-(boxes_x_1+2*boxes_width_1))/2)
.attr("y", h/2 + (height/2+margin.top/2)*0.15/2)
.attr("text-anchor", "middle")
.attr("dominant-baseline", "central")
.style("font-size", 1.3*font_size)
.text("ARTISTS")
.style("stroke", "blue")
.attr("class","unclickable");
////////////////////////////////////
var valid_songs = new Array(n_songs)
var n_valid_songs = n_songs
var selected_artist = "All Artists"
var selected_song = -1
// On créé des groupes d'éléments dans lesquels on va stocker les courbes de chaque chanson
var songs_curves = new Array(n_songs)
data.forEach(function(d,i)
{
songs_curves[i] = d3.select("svg").append("g")
valid_songs[i] = 1
})



// On stocke les accords sur lesquels on a cliqué