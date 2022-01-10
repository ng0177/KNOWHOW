var T = new Array();
T["kap_1"]="Arithmetik";
T["kap_2"]="Funktionen und ihre Darstellung";
T["kap_3"]="Geometrie";
T["kap_4"]="Lineare Algebra";
T["kap_5"]="Algebra und Diskrete Mathematik";
T["kap_6"]="Differentialrechnung";
T["kap_7"]="Unendliche Reihen";
T["kap_8"]="Integralrechnung";
T["kap_9"]="Differentialgleichungen";
T["kap_10"]="Variationsrechnung";
T["kap_11"]="Lineare Integralgleichungen";
T["kap_12"]="Funktionalanalysis";
T["kap_13"]="Vektoranalysis und Feldtheorie";
T["kap_14"]="Funktionentheorie";
T["kap_15"]="Integraltransformationen";
T["kap_16"]="Wahrscheinlichkeitsrechnung, Mathematische Statistik";
T["kap_17"]="Dynamische Systeme und Chaos";
T["kap_18"]="Optimierung";
T["kap_19"]="Numerische Mathematik";
T["kap_20"]="Computeralgebrasysteme";
T["kap_21"]="Tabellen";
T["kap_22"]="Literatur";
T["kap_23"]="Mathematische Zeichen";


document.onkeydown = tastensteuerung;
var next = "";
var prev = "" ;
var up = "" ;
var start = "../sonder/dt_bron.html" ;
function tastensteuerung(evt) {
	evt = (evt) ? evt : ((window.event) ? event : null);
	if ( ! document.getElementById) {
		return;
	}
	if ( (evt.keyCode == 37) && (prev != "") ) { // <- zurueck
		location.href = prev;
	} else if ( (evt.keyCode == 39) && (next != "") ) { // -> weiter
		location.href = next;
	}
}
//
var BildFensterHandle = null;
function neuesFenster(BildFensterHREF, BildFensterName) {
        breite = 640;
        hoehe = 640;
        var BildFensterEigenschaften = 'status=no,resizable=yes,scrollbars=yes,location=no,toolbar=no,menubar=no,width=' + breite + ',height=' + hoehe;

        if ((BildFensterHandle == null) || (BildFensterHandle.closed)) {
                BildFensterHandle = window.open(BildFensterHREF,BildFensterName,BildFensterEigenschaften);
        } else {
                BildFensterHandle.location.href = BildFensterHREF;
        }
        if (BildFensterHandle.focus) { BildFensterHandle.focus(); }
        //return false;
}

function bestimmeKap(url, trenner) {
	var kap = url.replace(/\.html?$/, "");
	var PosBS = -1;
	if ( (PosBS = kap.lastIndexOf(trenner)) != -1 ) {
		kap = kap.substring(0,PosBS);
	}
	if ( (PosBS = kap.lastIndexOf(trenner)) != -1 ) {
		kap = kap.substring(PosBS+1,kap.length);
	}
	if ( (PosBS = kap.lastIndexOf('\\')) != -1 ) {
		kap= kap.substring(PosBS+1,kap.length);
	}
	return(kap);
}
function pruefeIstKapIndex(url) {
	if (window.top.name != "Nachschlagen") {
		return(0);
	} else {
		var searchStr="index_[0-9]+\.html"; 
		var re = new RegExp(searchStr); 
		var IstKapIndex = url.match(re);
		return(IstKapIndex);
	}
}

function besimmeKapAusUrl(url) {
	var searchStr="^[a-zA-Z0-9_]+:\/\/"; 
	var re = new RegExp(searchStr); 
	var DateiLang = url.replace(re,"")
	var kap = "";
	if ( DateiLang.match('/') ) {
		kap = bestimmeKap(DateiLang, '/');
	} else {
		kap = bestimmeKap(DateiLang, '\\');
	}
	return kap;
}
//
window.onload=init;
//
function init() {
	window.defaultStatus='DeskTop Bronstein';
	if (window.focus) {window.focus();}
	//
	if ( ! document.getElementById) {
		return;
	}
	//
	if ( document.getElementById("cssstyle") && document.getElementById("cssstyle").href ) {
		var cssref = document.getElementById("cssstyle").href;
		var searchStr="\.css$"; var re = new RegExp(searchStr); 
		cssref = cssref.replace(re,"_js.css");
		document.getElementById("cssstyle").href = cssref;
	}
	//
	var kap = besimmeKapAusUrl(document.URL);
	//
	if (window.top.name != "Nachschlagen") {
		window.top.name = "cliXX";
	}
	//
	var IstKapIndex = pruefeIstKapIndex(document.URL);
	//
	var x = document.getElementsByTagName('a');
	for (var i=0;i<x.length;i++) {
		x[i].onmouseout = function ()  { window.status=window.defaultStatus; return true;}
		//
		if (x[i].id == 'index') {
			x[i].onclick = function() {neuesFenster('../index/main.html','Nachschlagen'); return false;}
		}
		if (x[i].id == 'inhalt') {
			x[i].onclick = function() {var searchStr="oikap"; var re = new RegExp(searchStr); var pRef = this.getAttribute('href').replace(re,"fikap"); neuesFenster(pRef,'Nachschlagen'); return false;}
		}
		if (x[i].getAttribute('href')) {  // Normale href Verweise aller Art
			pageRef = x[i].getAttribute('href'); // Achtung IE5
			if (x[i].id == 'next') {
				next = pageRef;
			} else if (x[i].id == 'prev') {
				prev = pageRef;
			} else if (x[i].id == 'up') {
				up = pageRef;
			}
			//
			kapRef = bestimmeKap(pageRef, '/');
			if ((kapRef != kap) && T[kapRef] && !IstKapIndex) {
				//
				var tkap = "Kapitel " + T[kapRef];
				x[i].setAttribute('title',tkap);
				x[i].onmouseover = function ()  {var pRef = this.getAttribute('href'); var kRef = bestimmeKap(pRef ,'/'); var kTitel = "Verweis auf Kapitel " +  T[kRef]; window.status = kTitel; return true;}
			} else if (pageRef.match(/^#/)) {
				x[i].onmouseover = function ()  {window.status='Sprung innerhalb der Seite'; return true;}
			} else {
				pageRef = x[i].getAttribute('href'); // Achtung IE5
				if (pageRef.match(/^http:\/\/www.harri-deutsch.de\/verlag\//)) {
					x[i].onmouseover = function ()  {window.status='Verweis auf die Internetseiten des Verlages'; return true;}
					x[i].onclick = function ()  {this.setAttribute('target','Extern');}
				} else if (pageRef.match(/^http:\/\/www.harri-deutsch.de\/cgi-bin\//)) {
					x[i].onmouseover = function ()  {window.status='Verweis auf die Internetseiten des Verlages'; return true;}
					x[i].onclick = function ()  {this.setAttribute('target','Extern');}
				} else if (pageRef.match(/http:\/\//)) {
					// alert (pageRef);
					x[i].onmouseover = function ()  {window.status='Externer Verweis'; return true;}
					x[i].onclick = function ()  {this.setAttribute('target','Extern');}
				} else if (pageRef.match(/@/)) {
					x[i].onmouseover = function ()  {window.status='Schreiben Sie eine E-Mail'; return true;}
				} else {
					x[i].onmouseover = function ()  {window.status=''; return true;}
				}
			}
		} else { // Rest z.B. Anker
			x[i].className += 'anker';
			x[i].onmouseover = function ()  {window.status=' '; return true;}
		}
	}
	x = null;
}
