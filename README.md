# ChordViz:
### Project made by:
__DIERS Antoine__

__EL IDRISSI Imane__

__Jebbari Marwane__
</br>
## Table of contents :

      . Introduction

      . the features of the application

      . Description of our new Data Base
      
      . Organization of elements
      
      . Possible interactions and interactions management
      
      . Improvements
      
      . Link to video

      . Conclusion
      
      . Resources
      
## Dataviz course project : visualization of chord progressions in music
As part of the MOS projects: Interactive visualization of data, we chose the project entitled: __Visualization of the sequence of chords of a number of songs:__

* selection by artist, song ...
* Ability to find a song by selecting a harmonic progression.

At first, we were thinking about relying on graph theory to visualize the sequence of chords of a certain number of songs in the database we choose. But this presents a problem of the order of the chords and a collision between them as shown in the figure below, then the person will not manage to play the good song as well as we will have an overlap in the ranges of selected chonsons.
<table border="0">
  <tr>
    <td>
      <img src="img/11.jpg" style="width: 70px height: 60;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> Chain graph of chords </h6>
    </td>
  </tr>
</table>

So, given the problems encountered by the first solution, we managed to propose a relevant model that meets the requirements of the specifications of our application.

<table border="0">
  <tr>
    <td>
      <img src="img/33.jpg" style="width: 80px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> visualization of a sequence of chords using rectangles </h6>
    </td>
  </tr>
</table>

<table border="0">
  <tr>
    <td>
      <img src="img/22.jpg" style="width: 80px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> Proposed operations </h6>
    </td>
  </tr>
</table>
At first, we worked on the following database:
<table border="0">
  <tr>
    <td>
      <img src="img/DB.JPG" style="width: 80px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> The database of songs </h6>
    </td>
  </tr>
</table>

## the features of the application:

Our D3.js script consists of the following features:

- Determine a duration of transitions for the appearance / dispartition of lines.

- Determine the number of songs in the database.

- Determine the smallest opacity that can have a line and the width of the lines.

- Send the string corresponding to the chord no. Bar of the song n ° song.

- Maximum number of measures (if it is larger than the number of measures of the biggest song, it's a mess because it will put empty measures at the end, if it is smaller the last chords will not be displayed ).

- Determine the width of one of the rectangles containing a chord name, the horizontal distances, the vertical between two rectangles containing a chord and the Width and height of the svg.

- Determine a list that contains the integers from 1 to MAX_BAR_ID, and another list containing the most common chord names, "?" corresponds to the other agreements.

- Determine the dimensions of the display area on the svg, the height of one of the rectangles containing a chord, and the size of the font.

- The management of scrolling.

- Determine groups of elements, bars [i] contains the rectangles containing the chord names of measure i. As well as the elements on which we can not click.

- Definition of an object d3 allowing to generate the curves.

- The creation of groups of elements in which we will store the curves of each song.

- Browse the songs and create for each song all of its curves.

- Implementation of a function that manages the update of the curves when one selects / deselects a chord.
<table border="0">
  <tr>
    <td>
      <img src="img/chord progressions.JPG" style="width: 80px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> the result of our script D3.js </h6>
    </td>
  </tr>
</table>

## Description of our new Data Base:

We used a csv database containing the following columns : 

* __Title :__ The song's title
* __Artist :__ The name of the interpreter
* __Genre :__ The musical style of the song
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

### Used functions :

* __update_valid_songs :__ This function takes into considiration the three global variables  __selected_song__, __selected_artist__ and __selected_chords__ .
In order to decide which songs are valid, it updates the global variable __valid_songs__ which is an array of size n (the number of songs). Which contains 1 in position i if the song i is valid.

* __display_valid_songs :__ This function uses the __valid_songs__ array to show only songs that are valid in the "songs" window (top right).

* __update_curves :__ This function uses the __valid_songs__ array to display only the curves of songs that are valid.
 
 ## Improvements:
<table border="0">
  <tr>
    <td>
      <img src="img/FirstViz.png" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> The first visualization </h6>
    </td>
  </tr>
</table>
Your comments and suggestions were really important for us to arrive at the final version of our application that responds wisely to the requirements of the specifications and it will help students learn to play on the instruments they want.
Please find in the following file: [UpData.md](https://www.github.com/jmarwane/ChordViz/blob/master/design/UpDate.md) details on improvement points made.

#### Click on the chords:

Clicking on a chord filters the songs, only the songs containing this chord to the selected measure are kept.
We can click on a single chord by measure but we can put a contriante on each measure.
(These changes also apply to the two menus on the right, ie, the artists songs and the one that do not meet the conditions disappear)

#### Select an artist in the right menu:

Keep only the songs of this artist, whether on the graph or in the song selection menu

#### Select a song in the right menu:

Change the line color of this song and put it on top of the others.

In order to facilitate the choices of the user, our application meets the requirements of the specifications and put into service 3 types of filters: Songs, Artists and Genre to facilitate the search of music.

<table border="0">
  <tr>
    <td>
      <img src="img/photo1.PNG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> Application interface in its final version </h6>
    </td>
  </tr>
</table>

When the user clicks on the A chord, it will display all the songs that start with that chord.
<table border="0">
  <tr>
    <td>
      <img src="img/photo2.PNG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> all songs that start with chord "A" </h6>
    </td>
  </tr>
</table>

<table border="0">
  <tr>
    <td>
      <img src="img/photo3.PNG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> The drop-down list of song choices </h6>
    </td>
  </tr>
</table>
By selecting, the desired choices the application visualizes the progression of the chords in red of the chosen song.
<table border="0">
  <tr>
    <td>
      <img src="img/photo4.PNG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6>  Chords progression of Imogen Heap's song hide and seek </h6>
    </td>
  </tr>
</table>

the genre filter keep just the songs of the genre selected, So when the user chooses the genre __Hip-Hop-Rap__, the application visualizes the progression of the songs of this type chosen and gives the choice to the user of the selected song.

<table border="0">
  <tr>
    <td>
      <img src="img/photo5.PNG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> Chords progression of all Hip-Hop-Rap songs  </h6>
    </td>
  </tr>
</table>
<table border="0">
  <tr>
    <td>
      <img src="img/photo6.PNG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> Chords progression of selected choice </h6>
    </td>
  </tr>
      
when we click on a sequence of chords, it allows us to get the songs that contain this sequence of music selected by the user.

</table>
</table>
<table border="0">
  <tr>
    <td>
      <img src="img/photo7.PNG" style="width: 100px;">
    </td>
  </tr>
  <tr>
    <td align="center">
      <h6> All songs that contain the selected chords </h6>
    </td>
  </tr>
</table>
the application allows the user to click on the chords that he wants to display all the songs containing the series of selected notes.

## Link to video:

[Here it is !! Thank you for watching and feel free to ask us](https://drive.google.com/file/d/1cKE___X-IDawzwk-W1w0SYpCABuhSL_n/view?usp=sharing)

## Conclusion:
  This project allowed us to master the notion of data interactions and apply the D3.js framework in order to visualize the musics chords progression that are in a database. The suggestions offered during the presentation allowed us to improve the functionality of our application. This project was an opportunity to use different techniques such as : Bootstrap, Html5, Css3, Java script and to understand the technical operation of the BI tool "Tableau Public" after its use in the first TP. Our app is dedicated to people passionate about learning instruments and exactly meets their needs.
## Resources:
 .  https://syntagmatic.github.io/parallel-coordinates/


