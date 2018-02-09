# ChordViz
## Dataviz course project : visualization of chord progressions in music
Dans le cadre des projet du MOS: Visualisation interactive des données, nous choisissions le projet intitulé: __Visualisation de l'enchaînement d'accords d'un certain nombre de chansons:__
* sélection par artiste, chanson...
* Possibilité de retrouver une chanson en sélectionnant une progression harmonique.

Dans un premier temps nous réfléchissions à se baser sur la théorie des graphes pour visualiser l'enchaînement d'accords d'un certain nombre de chansons dans la base de données que nous choisissions. Mais cela présente un problème d'ordre des accords et une collision  entre eux comme le montre la figure ci-dessous, alors la personne n'arrivera pas d'pprendre la bonne chanson.
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

