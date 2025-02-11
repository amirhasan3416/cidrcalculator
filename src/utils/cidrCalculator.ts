interface CIDRResult {
  ipRange: string;
  numSubnets: number;
  ipsPerSubnet: number;
  networkIP: string;
  broadcastIP: string;
}

export function calculateCIDR(ip: string, prefix: number): CIDRResult | null {
  try {
    // Convert IP to binary
    const ipParts = ip.split('.').map(Number);
    if (ipParts.length !== 4 || ipParts.some(part => part < 0 || part > 255)) {
      return null;
    }

    const ipBinary = ipParts
      .map(part => part.toString(2).padStart(8, '0'))
      .join('');

    // Calculate subnet mask
    const totalBits = 32;
    const hostBits = totalBits - prefix;
    // Calculate number of subnets based on the network portion (prefix)
    const numSubnets = prefix > 0 ? Math.pow(2, Math.min(prefix - Math.floor(ipParts[0] / 64) * 8, 32)) : 1;
    const ipsPerSubnet = Math.pow(2, hostBits);

    // Calculate network address
    const networkBinary = ipBinary.substring(0, prefix) + '0'.repeat(hostBits);
    const networkIP = binaryToIP(networkBinary);

    // Calculate broadcast address
    const broadcastBinary = ipBinary.substring(0, prefix) + '1'.repeat(hostBits);
    const broadcastIP = binaryToIP(broadcastBinary);

    // Calculate IP range
    const firstIP = networkIP;
    const lastIP = broadcastIP;
    const ipRange = `${firstIP} - ${lastIP}`;

    return {
      ipRange,
      numSubnets,
      ipsPerSubnet: ipsPerSubnet - 2, // Subtract network and broadcast addresses
      networkIP,
      broadcastIP,
    };
  } catch (error) {
    return null;
  }
}

function binaryToIP(binary: string): string {
  const octets = binary.match(/.{8}/g) || [];
  return octets.map(octet => parseInt(octet, 2)).join('.');
}

export function isValidIP(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    const num = parseInt(part);
    return num >= 0 && num <= 255 && part === num.toString();
  });
}