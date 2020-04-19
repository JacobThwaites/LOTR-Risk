export class URLGenerator {
  private numberOfPlayers: number;
  constructor(numberOfPlayers: number) {
    this.numberOfPlayers = numberOfPlayers;
  }

  generateURL(): String {
    let url = "/";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    const URLLength = 10;
    for (let i = 0; i < URLLength; i++) {
      url += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return url;
  }
}
