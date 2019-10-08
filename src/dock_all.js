//DOCK ALL NESSESARY CSS AND JS FILES HERE FOR WEBPACK
import 'bootstrap';
import "./styles/dock_styles.scss";
require('./scripts/dock_scripts.js');

//this is my work around until I figure out how to get htmlwebpack options to load in partial files! 
//const mEmblem = require('./images/m_emblem_white_58x75.png');
//these both work the same
//document.getElementsByClassName("logo")[0].setAttribute('src', mEmblem);
//document.getElementById('mimage').setAttribute('src', youNameIt);