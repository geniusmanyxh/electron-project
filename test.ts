import * as os from "os";

const network = os.networkInterfaces();

// console.log(network);
let ipv4: string[] = [];
for (let net in network) {
  //   console.log(network[net]);
  const netTemp = network[net];
  if (netTemp && netTemp instanceof Array && netTemp.length > 0) {
    const temp1 = netTemp
      .filter((item) => {
        console.log(item.address);
        return item.family === "IPv4";
      })
      .map((item) => {
        return item.address;
      });
    ipv4 = [...ipv4, ...temp1];
  }
}
console.log(ipv4, Math.floor(Math.random() * ipv4.length));
