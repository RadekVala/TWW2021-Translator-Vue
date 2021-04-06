var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
      history: [],  
      message: 'Hello Vue!',
      tab: null,
      text: 'tab',
      inputLang: 'cs',
      languages: [
          { name: 'Czech', code: 'cs'},
          { name: 'English', code: 'en'},
          { name: 'German', code: 'de'},
        ],
      outputLang: 'en',
      result: null,
      userInput: '',
      userInputRules: [
        v => !!v || 'Text for translation is required.',
        v => v.length >= 3 || 'Insert at least 3 characters.',
      ],
      valid: false,
    },
    methods: {
      handleClick: function () {
          if(this.$refs.form.validate()){
            // form is valid    
            console.log(this.userInput);  
            
            // fetch to Mymemory API
            fetch('https://api.mymemory.translated.net/get?q=' + this.userInput + '&langpair=' + this.inputLang + '|' + this.outputLang)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.result = data.responseData.translatedText;

                    // save to history
                    this.history.unshift({
                        input: this.userInput,
                        output: this.result
                    });

                    // save history to LocalStorage
                    localStorage.setItem('history', JSON.stringify(this.history));
                });
          }
        
      }  
    },
    mounted () {
        if(localStorage.getItem('history')){
            this.history = JSON.parse(localStorage.getItem('history'));
        }
    }
})