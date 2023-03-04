class SlidingImage {
    constructor(imgSrc, duration, side, options = []) {
      this.imgSrc = imgSrc;
      this.duration = duration;
      this.side = side;
      this.options = options;
      this.position = 0;
      this.maxPosition = window.innerWidth;
      this.interval = null;
    }
  
    createImageElement(imgSrc, useStyles = true) {
        const img = document.createElement('img');
        img.src = imgSrc;

        if (useStyles === true) {
            img.style.position = 'fixed';
            img.style.top = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            img.style.left = '-150%';
            img.style.marginLeft = '150px';
        } else {
            img.setAttribute("class", "card")
        }

        document.body.appendChild(img);
      
        return img;
    }
  
    slide() {
      this.interval = setInterval(() => {
        if (this.position >= this.maxPosition) {
          clearInterval(this.interval);
          this.position = 0;
          this.showOptions();
          this.changeLabel("Vyber správný obrázek", "label")
        } else {
          this.position++;
          this.imgElement.style[this.side] = this.position + "px";
        }
      }, this.duration);
    }
  
    showOptions() {
        const optionsContainer = document.createElement('div');
        optionsContainer.setAttribute("class", "options-container");

        this.options.forEach((optionSrc) => {
        const option = this.createImageElement(optionSrc, false);
        optionsContainer.appendChild(option);
  
        option.addEventListener('click', () => {
          if (optionSrc === this.imgSrc) {
            alert('OK!');
          } else {
            alert('Máš to blbě, demente!');
          }
        });
      });
  
      document.body.appendChild(optionsContainer);
    }
  
    start() {
      this.imgElement = this.createImageElement(this.imgSrc);
      this.slide();
    }
  
    stop() {
      clearInterval(this.interval);
    }

    changeLabel(message, labelId) {
        document.getElementById(labelId).innerHTML = message;
    }
  }