import * as os from "os";

/**
 * 获取当前网络的所有IPv4地址
 * @returns {string[]} IPv4地址数组
 */
export function getCurrentNetAllIpv4Address(): string[] {
  let ipv4: string[] = [];
  const network = os.networkInterfaces();
  for (let net in network) {
    const netTemp = network[net];
    if (netTemp && netTemp instanceof Array && netTemp.length > 0) {
      const temp1 = netTemp
        .filter((item) => {
          return item.family === "IPv4";
        })
        .map((item) => {
          return item.address;
        });
      ipv4 = [...ipv4, ...temp1];
    }
  }

  return ipv4;
}

/**
 * 获取随机IP地址
 * @param ipArr - IP地址数组，可选参数，默认为获取当前网络的所有IPv4地址
 * @returns 随机IP地址
 */
export function getRandomIp(ipArr?: string[]): string {
  if (!ipArr || !(ipArr instanceof Array) || typeof ipArr[0] !== "string") {
    ipArr = getCurrentNetAllIpv4Address();
  }
  const randomIndex = Math.floor(Math.random() * ipArr.length);
  return ipArr[randomIndex];
}
