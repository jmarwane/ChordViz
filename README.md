# ChordViz
## Dataviz course project : visualization of chord progressions in music
Dans le cadre des projet du MOS: Visualisation interactive des données, nous choisissions le projet intitulé: __Visualisation de l'enchaînement d'accords d'un certain nombre de chansons:__
</br>
- sélection par artiste, chanson...
- Possibilité de retrouver une chanson en sélectionnant une progression harmonique.
Notre script D3.js consiste les fonctionnalités suivantes:
La durée des transitions pour l'apparition / dispartition des lignes
Le nombre de chansons dans la base de données
La plus petite opacité que peut avoir une ligne
La largeur des lignes
Renvoie le string correspondant à l'accord n°bar du morceau n°song
- Nombre maximal de mesures (si il est plus grand que le nombre de mesures de la plus grande chanson, c'est du gâchis parce que ça mettra des mesures vides à la fin, si il est plus petit les derniers accords ne seront pas affichés)
- Largeur d'un des rectangles contenant un nom d'accord
- Distances horizontale et verticale entre deux rectangles contenant un accord
- Largeur et hauteur du svg
- Un array contenant les entiers de 1 à MAX_BAR_ID
- Un array contenant les noms des accords les plus communs, "?" correspond aux autres accords
- Les dimensions de la zone d'affichage sur le svg
- Hauteur d'un des rectangles contenant un accord
- Taille de la police de caractères
- La variable qui gère le scrolling
- Le background (cliquer dessus active le scrolling)
- Des groupes d'éléments, bars[i] contient les rectangles contenant les noms des accords de la mesure i
- Les éléments sur lesquels on ne peut pas cliquer
- Un objet d3 permettant de générer les courbes
- On créé des groupes d'éléments dans lesquels on va stocker les courbes de chaque chanson
- On parcourt les chansons et on créé pour chaque chanson l'ensemble de ses courbes
- Une fonction qui gère la mise à jour des courbes quand on sélectionne / déselectionne un accord
