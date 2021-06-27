// global variables
let testArr = [
{
  a: 'جــامــعــة',
  e: 'university'
},
{
  a: 'ســيــارة',
  e: 'car'
},
{
   a: 'صــبــاح',
   e: 'morning'
},
{
   a: 'بــاب',
   e: 'door'
},
{
  a: 'كــتــاب',
  e: 'book'
},
{
  a: 'غــرفــة',
  e: 'room'
},
{
  a: 'حــجــاب',
  e: 'hijab'
},
{
  a: 'جــار',
  e: 'neighbor (m)'
},
{
  a: 'خــبــز',
  e: 'bread'
},
{
  a: 'دجــاج',
  e: 'chicken'
}
]

let random = Math.floor(Math.random() * testArr.length)



const synth = window.speechSynthesis;

let letters = []
class Connector {
  constructor(isolated, initial, medial, final, name) {
    this.isolated = isolated;
    this.initial = initial;
    this.medial = medial;
    this.final = final;
    this.name = name;
    this.array();
  }
  name() {
    console.log(this)
  }
  morph() {
  if (this.innerText === this.isolated) {
    this.innerText = this.initial;
    return this.innerText
  } else if (this.innerText === this.initial) {
     this.innerText = this.medial;
     return this.innerText
  } else if (this.innerText === this.medial) {
     this.innerText = this.final;
     return this.innerText
  } else {
    this.innerText = this.isolated;
    return this.innerText
  }
} 
array() {
  letters.push(this)
}
}

class NonConnector {
  constructor(isolated, final, name) {
    this.isolated = isolated;
    this.final = final;
    this.name = name;
    this.array();
  }
  morph() {
    if (this.innerText === this.isolated) {
    this.innerText = this.final;
    return this.innerText
  } else {
     this.innerText = this.isolated;
     return this.innerText
  } 
  } 
  array() {
  letters.push(this)
}
}

// letters initializations
const hamzaAlif = new NonConnector('أ', 'ـأ','hamzaAlif')
const ba = new Connector('ب','بـ ','ـبـ','ـب', 'ba')
const ta = new Connector('ت','تـ','ـتـ','ـت', 'ta')
const tha = new Connector('ث','ثـ','ـثـ','ـث', 'tha')
const ja = new Connector('ج','جـ','ـجـ','ـج', 'ja')
const haah = new Connector('ح','حـ','ـحـ','ـح', 'haah')
const kha = new Connector('خ','خـ','ـخـ','ـخ', 'kha')
const dal = new NonConnector('د', 'ـد','dal')
const dhal = new NonConnector('ذ', 'ـذ','dhal')
const ra = new NonConnector('ر', 'ـر','ra')
const za = new NonConnector('ز', 'ـز','za')
const sin = new Connector('س','سـ','ـسـ','ـس', 'sin')
const shin = new Connector('ش','شـ','ـشـ','ـش', 'shin')
const saad = new Connector('ص','صـ','ـصـ','ـص', 'saad')
const daaD = new Connector('ض','ضـ','ـضـ','ـض', 'daaD')
const taah = new Connector('ط','طـ','ـطـ','ـط', 'taah')
const zaah = new Connector('ظ','ظـ','ـظـ','ـظ', 'zaah')
const ein = new Connector('ع','عـ','ـعـ','ـع', 'ein')
const ghein = new Connector('غ','غـ','ـغـ','ـغ', 'ghein')
const fa = new Connector('ف','فـ','ـفـ','ـف', 'fa')
const qa = new Connector('ق','قـ','ـقـ','ـق', 'qa')
const ka = new Connector('ك','كـ','ـكـ','ـك', 'ka')
const la = new Connector('ل','لـ','ـلـ','ـل', 'la')
const ma = new Connector('م','مـ','ـمـ','ـم', 'ma')
const na = new Connector('ن','نـ','ـنـ','ـن', 'na')
const ha = new Connector('ه','هـ','ـهـ','ـه', 'ha')
// long vowels
const alif = new NonConnector('ا', 'ـا', 'alif')
const wa = new NonConnector('و', 'ـو','wa')
const ya = new Connector('ي','يـ','ـيـ','ـي', 'ya')
// extras
// hamza as no connector with name as third 

const taMar = new NonConnector('ة', 'ـة','taMarbuta')

const hamzaYa = new Connector('ئ','ئـ','ـئـ','ـئ','hamzaYa')
const hamzaWaw = new NonConnector('ؤ', 'ـؤ','hamzaWaw')

const hamzaIsolated = new NonConnector('ء', 'ء','HamzaIsolated')
const alifTanween = new NonConnector('اً', 'اً','alifTanween')
const alifMadaa = new NonConnector('آ', 'آ','alifMadda')
const alifMaqsura = new NonConnector('ى', 'ـى','alifMaqsura')
const laamAlif = new NonConnector('ـلا','لا', 'laamAlif')



const makeKeyboard = () => {
  const keyboard = document.getElementById('keyboard')
  letters.map((letter) => {
  const text = document.createTextNode(letter.isolated)
  letter.morph()
  const div = document.createElement('div')
    div.classList.add('letter-button')
    div.setAttribute('draggable', 'true')
    div.appendChild(text)
    keyboard.appendChild(div)
     div.addEventListener('click', function(){
       div.innerText = letter.morph()
     })
     // dragstart event listener added to every letter
     div.addEventListener('dragstart', function(ev){
       ev.dataTransfer.setData('text', ev.target.innerText)
      
     })
  })

}

makeKeyboard()


// set up drop event handlers

const wordHolder = document.querySelector('#word-holder')

wordHolder.addEventListener('dragover', dragover_handler);

wordHolder.addEventListener('drop', drop_handler);

function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "copy";
}
function drop_handler(ev) {
 ev.preventDefault();
 let data = ev.dataTransfer.getData('text')
 const div = document.createElement('div')
 div.innerText = data
 ev.target.appendChild(div);
 div.classList.add('animate__animated')
 div.classList.add('animate__fadeIn')
}



// undo button event listener
const makeUndo = () => {
  const undo = document.querySelector('#undo')
  let letters = wordHolder.children
  undo.addEventListener('click', function(){
    if(wordHolder.children.length) {
    wordHolder.removeChild(letters.item(letters.length-1));
    }
  })
}
makeUndo()


const testWord = () => {
  let grader = []
  // sample correct word
  let correctWord = testArr[random].a
  
  let writtenWord = wordHolder.children

  for(let i=0; i<writtenWord.length; i++) {
  grader.push(writtenWord[i].innerText)
  }
  let gradedWord = grader.join('')
  if(gradedWord === correctWord) {
  
  const correct = document.querySelector('.correct')
  correct.style.display = 'flex';

  correct.classList.add('animate__animated')
  correct.classList.add('animate__pulse')

  const utterThis = new SpeechSynthesisUtterance('!ممتاز')
utterThis.lang = "ar-SA"
utterThis.pitch = 1;
utterThis.rate = 0.8;
synth.speak(utterThis)

  setTimeout(function(){
    correct.style.display = 'none';
    while(wordHolder.firstChild) {
      wordHolder.removeChild(wordHolder.firstChild)
    }
  }, 3000)


  // reset the random index
  random = Math.floor(Math.random() * testArr.length)
  // remove word holder childten
 
  
  } else {
  wordHolder.classList.add('animate__headShake')
  setTimeout(function(){  wordHolder.classList.remove('animate__headShake')
}, 500)
wordHolder.classList.add('animate__headShake')
  }
}
   
const sayWord = () => {
const utterThis = new SpeechSynthesisUtterance(testArr[random].a)
utterThis.lang = "ar-SA"
utterThis.pitch = 1;
utterThis.rate = 0.8;
synth.speak(utterThis)
  }


// play word button event listener
const makePlay = () => {
  const play = document.querySelector('#play')
  play.addEventListener('click', function(event){
    event.preventDefault();
      sayWord()
  }
)
}
makePlay()

// show word event listener

const makeShowWord = () => {
  const word = document.createElement('div')
  const display = document.querySelector('#show-word')
  display.appendChild(word)
  const show = document.querySelector('#show')
  show.addEventListener('click', function(){
    if(word.innerText === '') {
    word.innerText = testArr[random].a
    show.innerText = 'Hide Word'
    } else {
      word.innerText = '';
      show.innerText = 'Show Word'

    }
  })
}
makeShowWord()

// font picking button
const makeFont = () => {
  const fonts = document.querySelector('#fonts')
  const glyphs = document.getElementsByClassName('letter-button')
  const display = document.querySelector('#show-word')
  fonts.addEventListener('change', function(){
    for(let i=0; i<glyphs.length; i++) {
    if(fonts.value === 'handwriting'){
      glyphs[i].style.fontFamily = 'Aref Ruqaa, serif'
      wordHolder.style.fontFamily = 'Aref Ruqaa, serif'
      display.style.fontFamily = 'Aref Ruqaa, serif'
    }
    if(fonts.value === 'print-font-1'){
      glyphs[i].style.fontFamily = 'Lateef, cursive'
      glyphs[i].style.fontSize = '50px'
      wordHolder.style.fontFamily = 'Lateef, cursive'
      display.style.fontFamily = 'Lateef, cursive'
    }
    if(fonts.value === 'print-font-2'){
      glyphs[i].style.fontFamily = 'Mirza, cursive'
      glyphs[i].style.fontSize = '40px'
      wordHolder.style.fontFamily = 'Mirza, cursive'
      display.style.fontFamily = 'Mirza, cursive'
    }
    if(fonts.value === 'default') {
      glyphs[i].style.fontFamily = 'serif'
      wordHolder.style.fontFamily = 'serif'
      display.style.fontFamily = 'serif'
      glyphs[i].style.fontSize = '40px'

    }
  }
  })
}
makeFont()

// show english button

const showEnglish = () => {
  const display = document.querySelector('#show-eng')
  const button = document.querySelector('#english')
  button.addEventListener('click', function(){
    if(display.innerText === '') {
    display.innerText = testArr[random].e
    display.style.fontSize = '40px'
    button.innerText = 'Hide English'
    } else if (display.innerText = testArr[random].e) {
      display.innerText = ''
    button.innerText = 'Show English'
    }
  })
}
showEnglish()