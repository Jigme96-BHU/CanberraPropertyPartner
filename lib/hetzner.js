import Client from 'ssh2-sftp-client';
import { parseREAXML } from './parseListings';

const SFTP_CONFIG = {
  host:         process.env.HETZNER_HOST,
  port:         22,
  username:     process.env.HETZNER_USERNAME,
  password:     process.env.HETZNER_PASSWORD,
  readyTimeout: 8000,
};

const FILE_PREFIX = 'inspectre_IRE-CANBERRAPP';

export async function fetchREAXML() {
  const sftp = new Client();
  try {
    await sftp.connect(SFTP_CONFIG);
    const files = await sftp.list('/');
    const xmlFiles = files
      .filter(f => f.name.startsWith(FILE_PREFIX) && f.name.endsWith('.xml'))
      .sort((a, b) => b.modifyTime - a.modifyTime);
    if (xmlFiles.length === 0) return null;
    const buffer = await sftp.get(`/${xmlFiles[0].name}`);
    return buffer.toString('utf8');
  } catch (error) {
    console.error('Hetzner SFTP error:', error.message);
    return null;
  } finally {
    await sftp.end();
  }
}

export async function getListings() {
  const xmlString = await fetchREAXML();
  return await parseREAXML(xmlString);
}
