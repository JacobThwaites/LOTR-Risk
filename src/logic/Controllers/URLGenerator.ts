export class URLGenerator {
  private numberOfPlayers: number;
  constructor(numberOfPlayers: number) {
    this.numberOfPlayers = numberOfPlayers;
  }

  generateURL(): String {
    let result = "/";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    const URLLength = 10;
    for (let i = 0; i < URLLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
