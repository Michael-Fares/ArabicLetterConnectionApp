

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



const makeKeyboard = () => {
  const keyboard = document.getElementById('keyboard')
  letters.map((letter) => {
  const text = document.createTextNode(letter.isolated)
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
       console.log('drag has started')
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
}

// undo button event listener
const makeUndo = () => {
  const undo = document.querySelector('#undo')
  let letters = wordHolder.children
  undo.addEventListener('click', function(){
    if(wordHolder.children.length) {
    wordHolder.removeChild(letters.item(letters.length-1));
    console.log('remove')
    }
  })
}
makeUndo()

// testing if it can recognize the word جامعة


// maybe can use reEx to do this?
const testWord = () => {
  let grader = []
  // sample correct word
  let correctWord = 'جامعة'
  const correctWordArr = correctWord.split('');
  console.log(correctWordArr)
  
  let writtenWord = wordHolder.children

  for(let i=0; i<writtenWord.length; i++) {
  console.log('written word', writtenWord[i], 'written letter', writtenWord[i].innerText)
  grader.push(writtenWord[i].innerText)
  }
  console.log(grader)
  console.log(grader.join('ـ'))
}

