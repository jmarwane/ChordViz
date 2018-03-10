# ChordViz:
#### Projer réalisé par:
DIERS Antoine

EL IDRISSI Imane

Jebbari Marwane
</br>
## Dataviz course project : visualization of chord progressions in music
Dans le cadre des projets du MOS: Visualisation interactive des données, nous choisissions le projet intitulé: __Visualisation de l'enchaînement d'accords d'un certain nombre de chansons:__
* sélection par artiste, chanson...
* Possibilité de retrouver une chanson en sélectionnant une progression harmonique.

Dans un premier temps, nous réfléchissions à se baser sur la théorie des graphes pour visualiser l'enchaînement d'accords d'un certain nombre de chansons dans la base de données que nous choisissions. Mais cela présente un problème d'ordre des accords et une collision  entre eux comme le montre la figure ci-dessous, alors la personne n'arrivera pas de jouer la bonne chanson ainsi que nous aurons un chevauchement dans les gammes des chonsons selectionnées.
<table border="0">
  <tr>
    <td>
      <img src="11.jpg" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> Graphe d'enchainement des accords </h6>
    </td>
  </tr>
</table>

Alors, vu les problèmes rencontrés par la première solution, nous arrivions à proposer un modèle pertinent qui répond judicieusement aux exigences du cahier des charges de notre application.
<table border="0">
  <tr>
    <td>
      <img src="33.jpg" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> visualisation d'enchainement des accords à l'aide des réctangles </h6>
    </td>
  </tr>
</table>

<table border="0">
  <tr>
    <td>
      <img src="22.jpg" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> Les opérations proposées </h6>
    </td>
  </tr>
</table>
Dans un premier temps nous travaillions sur la base de données suivante:
<table border="0">
  <tr>
    <td>
      <img src="DB.JPG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> La base de données des chansons </h6>
    </td>
  </tr>
</table>
Notre script D3.js consiste les fonctionnalités suivantes:

- Déterminer une durée des transitions pour l'apparition / dispartition des lignes.

- Déterminer le nombre de chansons dans la base de données.

- Déterminer la plus petite opacité que peut avoir une ligne et La largeur des lignes.

- Renvoier le string correspondant à l'accord n°bar du morceau n°song.

- Nombre maximal de mesures (si il est plus grand que le nombre de mesures de la plus grande chanson, c'est du gâchis parce que ça mettra des mesures vides à la fin, si il est plus petit les derniers accords ne seront pas affichés).

- Déterminer la largeur d'un des rectangles contenant un nom d'accord, les distances horizontale, la verticale entre deux rectangles contenant un accord et la Largeur et la hauteur du svg.

- Déterminer une liste qui contient les entiers de 1 à MAX_BAR_ID, et une autre liste contenant les noms des accords les plus communs, "?" correspond aux autres accords.

- Déterminer les dimensions de la zone d'affichage sur le svg, la hauteur d'un des rectangles contenant un accord, et la taille de la police de caractères.

- La gestion du scrolling.

- Déterminer des groupes d'éléments, bars[i] contient les rectangles contenant les noms des accords de la mesure i. Ainsi que les éléments sur lesquels on ne peut pas cliquer.

- Définition d'unn objet d3 permettant de générer les courbes.

- La création des groupes d'éléments dans lesquels on va stocker les courbes de chaque chanson.

- Parcourir les chansons et créer pour chaque chanson l'ensemble de ses courbes.

- Implémentation d'une fonction qui gère la mise à jour des courbes quand on sélectionne / déselectionne un accord.

<table border="0">
  <tr>
    <td>
      <img src="chord progressions.JPG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> le résultat de notre script D3.js </h6>
    </td>
  </tr>
</table>

## Le lien ci-dessous, représente notre script en D3.js sur le blockbuilder:

-  https://bl.ocks.org/AntoineDiers/8c61a94e1a36de2485f7702ac7576373
# Rapport Technique

## Data Base:

We used a csv database containing the following columns : 

* __Title :__ The song's title
* __Artist :__ The name of the interpreter
* __Genre :__ The musical genre of the song
* __Verse1 :__ The first chord of the verse (ex : G-)
* __...__
* __Verse8 :__ The eighth (last) chord of the verse
* __Chorus1 :__ The first chord of the chorus
* __...__
* __Chorus8 :__ The eighth (last) chord of the chorus

We created this database ourselves from the site [hooktheory](https://www.hooktheory.com/theorytab) 

## Organization of elements:

The page contains several groups of items:

* __unclickable_elements :__ This group contains items that can not be clicked (useful for clicking on an item that is in background)
* __a group for each measure :__ 
* __un groupe de courbes pour chaque chanson :__ these groups contain the clickable squares of each measure.
* __songs_group :__ This group contains the rectangles and texts representing the titles of the songs in the "songs" window at the top right.
* __artists_group :__ This group contains rectangles and texts representing the names of the performers in the "artists" window at the bottom right.

## Possible interactions and interactions management:

### It is possible to : 

* Click on a chord in a bar to keep only the songs that have this chord on that chord.
* Click on the title of a song to highlight it on the diagram.
* Click on an artist to keep only the songs of this artist.

 These interactions are possible thanks to three global variables: __selected_song__, __selected_artist__ and __selected_chords__. 

### The interactions work as follows :

* __User action :__ for example click on an artist 
* __Update global variables :__ for example, if the user clicked on an artist, __selected_artist__ is updated.
* __Update valid songs :__  We browse the songs and for each song, we decide according to the three global variables mentioned above if it is valid.
* __Update the display:__ Show the curves of the valid songs and their titles in the "Songs" window.

### Functions used : 

* __update_valid_songs :__ This function takes into considiration the three global variables  __selected_song__, __selected_artist__ and __selected_chords__ .
In order to decide which songs are valid, it updates the global variable __valid_songs__ which is an array of size n (the number of songs). Which contains 1 in position i if the song i is valid.

* __display_valid_songs :__ This function uses the __valid_songs__ array to show only songs that are valid in the "songs" window (top right).

* __update_curves :__ This function uses the __valid_songs__ array to display only the curves of songs that are valid.



