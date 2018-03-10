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
