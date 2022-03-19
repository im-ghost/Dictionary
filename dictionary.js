

const input = elem("#search-input");

const result = elem("#result");


let load=new Loader();
load.start();
load.addText("Peculiar Dictionary Loading","0.5em");
load.animateText();
load.remove(1000);
function search(e){

 const value= input.value;

 

 fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+value).then(response=>response.json()).then(
data=>{
        let loader=new Loader();
loader.start();
loader.addText("Peculiar Dictionary Loading","0.5em");
loader.animateText();
loader.remove(3000);
        display(data)});

}



function display(array){

 if(array instanceof Array){

  let [word]=array;
  const container=document.createElement("div");
  let header=document.createElement("div");
  header.innerHTML=`<h3>${word.word.toUpperCase()}</h3>

  <h5>Transcription and Sound</h5>

  `
container.appendChild(header);
  

  for( phone of word.phonetics){
let audio=document.createElement("audio");
   if(phone.text){

  audio.innerHTML=`<p class="transcription">${phone.text}</p>`;
}
   if(phone.audio){

    audio.innerHTML=`<audio controls>

    <source src=${phone.audio} type="audio/mpeg"/>

    </audio>`;

   }
container.appendChild(audio);
  }

  

  for( meaning of word.meanings){

   if(meaning.partOfSpeech){
let partOfSpeech=document.createElement("div");
    partOfSpeech.innerHTML=`<h5 class="part-of-speech">Part of Speech-${meaning.partOfSpeech}</h5>`;
container.appendChild(partOfSpeech);
let meaning_heading=create("h4","Definition","def","def",container);
    for(let def of meaning.definitions){
let meaning=document.createElement("ul");

    meaning.innerHTML+=`<li class="definition">${def.definition}</li>`;

     if(def.synonyms.length>0){

      meaning.innerHTML+=`<li><h5>Synonyms</h5>`;

      for(let synonym of def.synonyms){
let synonyms=document.createElement("ul");
      ol.innerHTML+=`<li class="synonym">${synonym}</li>`;

      }

      meaning.appendChild(synonyms);

     }

     if(def.antonyms.length>0){
let antonyms=document.createElement("ul")
      meaning.innerHTML+=`<li><h5>antonyms</h5 ><ul>`;

      for(let antonym of def.antonyms){

       antonyms.innerHTML+=`<li class="antonym">${antonym}</li>`;

      }

     

     }

  container.appendChild(meaning);

      if(def.example){
let example=document.createElement("div");
       example.innerHTML="<h6>Example</h6>";

       example.innerHTML+=`<div class="example">\"${def.example}\"</div>`;

      }}

    if(meaning.synonyms.length>0){
let meaning_synonyms=document.createElement("div");
     meaning_synonyms.innerHTML=`<h4>synonyms</h4><ul>`;

      for(let synonym of meaning.synonyms){

       meaning_synonyms.innerHTML+=`<li class="pos-synonym">${synonym}</li>`;

      }

      container.appendChild(meaning_synonyms);

    }

    if(meaning.antonyms.length>0){
let meaning_antonyms=document.createElement("div");
     meaning_antonyms.innerHTML=`<h4>antonyms</h4><ul>`;

      for(let antonym of meaning.antonyms){

       meaning_antonyms.innerHTML+=`<li class="pos-antonym">${antonym}</li>`;

      }

      container.appendChild(meaning_antonyms);

    }

   }

  }

  

  

  result.innerHTML=container.innerHTML;

 }else{

  result.innerHTML=`<warning>

 Such word doesn't exist, or it is a country or language. No country definitions in this app, sorry :(<br/> Even names of languages don't qualify, except "English" </warning>`

 }

}
elem("#search").addEventListener ("click",()=>{search(input.value)});