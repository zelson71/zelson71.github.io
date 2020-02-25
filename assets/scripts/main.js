const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Typing Method
TypeWriter.prototype.type = function () {
    //current index of word
    const current = this.words % this.words.length;
    //Get the full Text of current word
    const fullTxt = this.words[current];

    //check if word is deleting
    if (this.isDeleting) {
        //Remove a charachter
        this.txt = fullTxt.substring(0, this.txt.length - 1);



    } else {
        //add a charachter
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Type Speed
    let typeSpeed = 300;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    //if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        //make a pause at the end
        typeSpeed = this.wait;
        //set delete to True
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        //pause before typing next word
        typeSpeed = 800;
    }
    setTimeout(() => this.type(), 500)
}
// init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Initialize the typewriter
    new TypeWriter(txtElement, words, wait);

}
