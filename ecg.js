document.querySelector('#fileInput').addEventListener('change', (e) => {
  readFile(e.target.files[0]);
});


function readFile(file) {
 
 const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
  const values = reader.result.split('\n').map(line => (+line.split(' '[2])));
  
  if(file.name=="ECG_RAW.txt") {


  
  var pwaveValue=0;
  var pwaveLocation=0;
  var pwaveArray=[];
  
  for (var p=0; p<500; p++){
  
  pwaveArray[p]= (((values[p]/(Math.pow(2,16)))-0.5)*3000)/1000
  
  }
  
  pwaveValue=Math.max(...pwaveArray);
  
  pwaveLocation = pwaveArray.indexOf(pwaveValue);
  
  console.log(pwaveValue + "At: " + pwaveLocation);
  
 
  var peak1=[];
 
  var limit1=1000;
  
  var averageP1 =0;
  
  
  
  var p1min =0;
  var p1minLocation =0;
  var p1minAverage =0;
  var p1maxAverage =0;
  
  var counter1=0;

  for (var i=0; i<limit1; i++){
  
  peak1[i] = (((values[i]/(Math.pow(2,16)))-0.5)*3000)/1000
  
  averageP1 += peak1[i];
  
  counter1 +=1;
  
  }
  
  averageP1 =  averageP1/counter1
  
  var p1=0;
  p1= Math.max(...peak1)
  var p1p = peak1.indexOf(p1)
  
  console.log("PEAK1: " + p1 + "AT: " +p1p)
 
 var peakPwave = (pwaveValue/p1)*100;
 
if (peakPwave <=20 && peakPwave >= 13){
  console.log ("P waves are present this indicates regular rhythm")
  }
  
  else{
console.log ("P waves are not present this indicates irregular rhythm, it may suggest a diagnosis of atrial fibrillation.")
  
  }
 
 p1min= Math.min(...peak1)
 p1minLocation= peak1.indexOf(p1min)
  
  console.log("P1 MIN: "+p1min+"AT: " + p1minLocation);
  
 p1maxAverage = p1  - averageP1;
 
 p1minAverage = averageP1 - p1min;
 
 
 if ((p1maxAverage/p1minAverage) > 3){
 
 console.log ("Your Righ Axis deviation  is type Lead III or II, which have the most positive deflection")
 
 }
 
 
else{

console.log ("Your Righ Axis deviation  is type Lead I , which is associated with right ventricular hypertrophy.")

}

if ((p1minAverage/p1maxAverage) >1.5){

console.log ("Your Left Axis deviation  is typeLead III or II , which is associated with associated with heart conduction abnormalities")

}
else{

console.log ("Your Left Axis deviation  is typeLead I , which is the most positive deflection this indicates you do not have heart abnormalties")

}









 
 
  
var PRinterval = p1p- pwaveLocation;

if ( PRinterval<=200 && PRinterval >=120){

console.log ("Healthy PR interval of:" +PRinterval+" ms");

}
else{

console.log ("Porlonged PR interval of: " +PRinterval+" ms, You may have First Degree Heart Block");

}


  var peak2=[];
 
  var limit2=1900;
  
  for (var j=0; j<limit2; j++) {
      
    peak2[j] = (((values[j]/(Math.pow(2,16)))-0.5)*3000)/1000

}
  
  var p2=0;
  p2= Math.max.apply(null, peak2)
  var p2p = peak2.indexOf(p2)
  
  console.log("PEAK2: " + p2 + "AT: " + p2p)
  

 
  var peak3=[];
  var limit3=1000;
  
  values.splice(0, 1900);

  for (var z=0; z<limit3; z++){
  
  peak3[z] = (((values[z]/(Math.pow(2,16)))-0.5)*3000)/1000
    
  }
  
  var p3=0;
  p3= Math.max.apply(null, peak3)
  var p3p = peak3.indexOf(p3)+1900;
  console.log("PEAK3: " + p3 + "AT: " + p3p)

 
  var peak4=[];
  var limit4=1000;
  let newarray=[];
  
  newarray= values.splice(1000, 1000);
    
  for (var y=0; y<newarray.length; y++){
  
  peak4[y] = (((newarray[y]/(Math.pow(2,16)))-0.5)*3000)/1000
  
  }  
    
  var p4=0;
  p4= Math.max(...peak4)
  var p4p = peak4.indexOf(p4) +2900;
  console.log("PEAK4: " + p4 + "AT: " + p4p)
 
 
 var rr1 = p2p-p1p;
 
 var rr2 = p4p-p3p;

 var averageRR =((rr1+rr2)/2)

 var BPM =0;
 
 BPM = Math.round((300/(averageRR/150)));
  
  var bpmUL=100;
  var bpmLL=60;
  
  if(BPM>bpmUL){
 
 console.log("Your BPM is " + BPM + " you have Tachycardia, please consult your physican")
 
 }
 
 else if(BPM<bpmLL){
 
 console.log("Your BPM is " + BPM + " you have Bradycardia, please consult your physician")
 
 }
  
  
 else {
 
  console.log("Your BPM is " + BPM + " you are experiencing normal behaviour" )
}


var heartRhythm = Math.abs(Math.round((rr1/rr2)));

if ((heartRhythm >= 1 && heartRhythm < 1.2 ) || (heartRhythm > 0.8 && heartRhythm <= 1)){
    
    console.log ("Your heart rhythm is Regular")
  
  }
  
  if (heartRhythm != heartRhythm ) {
  
    console.log ("Your heart rhythm is iregularly Irregular")
}

}

else if(file.name=="EMG_Monday.txt"){


var EMGarray=[]

for(var e=0; e<29000; e++){

EMGarray[e] = (((values[e]/(Math.pow(2,16)))-0.5)*3000)/1009;

}

var minEMG= Math.min(...EMGarray);
var maxEMG= Math.max(...EMGarray);
var EMGthreshold = maxEMG - minEMG;

console.log(EMGthreshold);

for (var t=0;t<4;t++ ){

document.querySelector('#fileInput').addEventListener('mousemove', (e) => {
readFile(e.target.files[0]);

console.log(t);

});


}

}



















}
}
