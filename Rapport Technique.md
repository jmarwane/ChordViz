# Rapport Technique

## Base de données

Nous avons utilisé une base de données au format csv contenant les colonnes suivantes : 

* __Title :__ Le titre de la chanson
* __Artist :__ Le nom de l'interprète 
* __Genre :__ Le genre musical de la chanson
* __Verse1 :__ Le premier accord du couplet (ex : G-)
* __...__
* __Verse8 :__ Le huitième (dernier) accord du couplet
* __Chorus1 :__ Le premier accord du refrain
* __...__
* __Chorus8 :__ Le huitième (dernier) accord du refrain

Nous avons créé nous-même cette base de données à partir du site [hooktheory](https://www.hooktheory.com/theorytab) 

## Organisation de la page

_**`A REDIGER QUAND LES BOITES DES CHANSONS ET DES ARTISTES SERONT EN HTML ET PLUS DES SVG`**_

## Interractions possibles et gestion des interactions

### Il est possible de : 

* Cliquer sur un accord dans une mesure afin de ne conserver que les chansons qui ont cet accord à cette mesure.
* Cliquer sur le titre d'une chanson pour la mettre en valeur sur le diagramme.
* Cliquer sur un artiste pour ne conserver que les chansons de cet artiste 

Ces interactions sont possibles grâce à trois variables globales : __selected_song__, __selected_artist__ et __selected_chords__. 

### Les interactions fonctionnent comme suit :

* __Action de l'utilisateur :__ par exemple clic sur un artiste 
* __Mise à jour des variables globales :__ par exemple, si l'utilisateur a cliqué sur un artiste, __selected_artist__ est mise à jour.
* __Mise à jour des chansons valides :__ On parcourt les chansons et pour chaque chanson, on décide en fonction des trois variables globales mentionnées ci-dessus si celle-ci est valide
* __Mise à jour de l'affichage :__ On affiche les courbes des chansons valides et leurs titres dans la fenêtre "Songs"

### Fonctions utilisées : 

* __update_valid_songs :__ Cette fonction prend en compte les trois variables globales __selected_song__, __selected_artist__ et __selected_chords__ 
pour décider quelles chansons sont valides, elle met à jour la variable globale valid_songs qui est un tableau de taille n (le nombre de chansons) 
qui contient 1 en position i si la chanson i est valide.

* __display_valid_songs :__ Cette fonction utilise le tableau valid_songs pour n'afficher dans la fenêtre "songs" (en haut à droite) que les chansons qui sont valides.

* __update_curves :__ Cette fonction utilise le tableau valid_songs pour n'afficher que les courbes des chansons qui sont valides.

