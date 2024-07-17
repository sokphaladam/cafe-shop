const END_POINT = 'https://api.telegram.org/bot';
const TOKEN = '7327708886:AAFixnOHLs2YDQwVgs4CVZmj3gQH2voeuws';
const CHAT_ID = '-1002167732104';
// 7327708886
// 271503400

export class Telegram {
  
  private url = `${END_POINT}${TOKEN}`;

  constructor(){}

  public async getMe(){
    const res = await fetch(this.url + '/getMe');
    const json = await res.json();
    return json;
  }

  public async sendMessage(text: string){
    const res = await fetch(`${this.url}/sendMessage?chat_id=${CHAT_ID}&text=${text}&parse_mode=HTML`);
    const json = await res.json();
    return json;
  }

  public async sendPhoto(text: string, img: string){
    const res = await fetch(`${this.url}/sendPhoto?chat_id=${CHAT_ID}&photo=${img}&caption=${text}&parse_mode=HTML`);
    const json = await res.json();
    return json;
  }
}