import { Component } from '@angular/core';
import tonal from 'tonal'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent {
  constructor(){
    this.selectedChordType = "Major"
  }

  title = 'chord xperiment';
  header = "select a root chord";
  
  RootNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  ChordTypes = ["Major", "minor", "7", "M7", "m7"]

  chordProgression = [];
  
  chordDisplay;
  selectedChordType;

  addToChordProgression(chord: Chord){
    this.chordProgression.push(chord);    
  }

  displayChord(note){    
    this.chordDisplay = tonal.chord(note+this.selectedChordType)
    console.log(tonal.chord.names())
  }
}

class Chord{
  rootNote: string;
  type: string;
  length: number;

  constructor(rootNote, type, length){
    this.rootNote = rootNote;
    this.type = type;
    this.length
  } 
}

