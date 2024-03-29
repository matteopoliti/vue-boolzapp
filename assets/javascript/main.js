const { createApp } = Vue

  createApp({
    data() {
      return {
        selectedContact : 0,
        searchContact: "",
        intervalDate: null,
        newMessage : {
            date: "",
            message: "",
            status: 'sent'
        },
        newMessageReceived : {
            date: "",
            message: "Ok",
            status: 'received'
        },
        date: new Date(),
        autoReply: null,
        contacts: [
            {
                name: 'Michele',
                avatar: './assets/img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: './assets/img/avatar_2.jpg',
                visible: true,
                messages: [
                {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
                ],
            },
            {
                name: 'Samuele',
                avatar: './assets/img/avatar_3.jpg',
                visible: true,
                messages: [
                {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: './assets/img/avatar_4.jpg',
                visible: true,
                messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: './assets/img/avatar_5.jpg',
                visible: true,
                messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Claudia',
                avatar: './assets/img/avatar_6.jpg',
                visible: true,
                messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent'
                }
                ],
            },
            {
                name: 'Federico',
                avatar: './assets/img/avatar_7.jpg',
                visible: true,
                messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Davide',
                avatar: './assets/img/avatar_8.jpg',
                visible: true,
                messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received'
                }
                ],
            }
            ]
      }
    },
    created() {
        this.intervalDate = setInterval(() => {
          this.date = new Date();
        }, 10000);
        
    },
    methods: {
        changeContact(index){
            this.selectedContact = index;
            this.newMessage.message = "";
        },
        lastMessage(contact) {
            if (contact.messages.length > 0) {
                const lastMessage = contact.messages.slice(-1)[0];
                return `${lastMessage.message}`;
            }
            return "Nessun messaggio disponibile";
        },
        addNewMessage(){
            if(this.newMessage.message !== ""){
                this.newMessage.date = this.formatDate();

                const messages = this.contacts[this.selectedContact].messages; 
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i].status === 'empty') {
                        messages.splice(i, 1);
                    }
                }

                messages.push({ ...this.newMessage })
            }
            this.newMessage.message = "";
        },
        addNewMessageReceived(){
            if(this.newMessageReceived.message !== ""){
                this.newMessageReceived.date = this.formatDate();

                const messages = this.contacts[this.selectedContact].messages;
                
                messages.push({ ...this.newMessageReceived })
            }
        },
        replyInterval(){
            this.autoReply = setTimeout(() => {
                this.addNewMessageReceived()
            }, 2000)
        },
        handleClick() {
            this.addNewMessage();
            this.replyInterval();
          },
        formatDate() {
            const hours = this.date.getHours().toString().padStart(2, '0');
            const minutes = this.date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        filterContacts() {
            this.contacts.forEach(element => {
                if(element.name.toLowerCase().includes(this.searchContact.toLowerCase())){
                    element.visible = true;
                }else{
                    element.visible = false
                }
                
            });
        },
        remove(index) {
            const messages = this.contacts[this.selectedContact].messages;
        
            if (messages.length > 0) {
                messages.splice(index, 1);
            
                if (messages.length === 0) {
                    messages.push({
                        message: "",
                        status: "empty"
                    });
                }
            }
        },
    }
    
  }).mount('#app')