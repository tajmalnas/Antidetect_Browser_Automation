import { GologinApi } from 'gologin';
import dotenv from 'dotenv';

dotenv.config(); // load environment variables

const token = process.env.GOLOGIN_API_TOKEN;
const profileId = process.env.profileId;

const gologin = GologinApi({ token });


async function main() {
  const { browser } = await gologin.launch({ profileId });
  const page = await browser.newPage();

  // Step 1: Go to Gmail
  await page.goto('https://mail.google.com/mail/u/0/#inbox', { waitUntil: 'networkidle2' });

  // Step 2: Click Compose
  await page.waitForSelector('div.T-I.T-I-KE.L3', { visible: true });
  await page.click('div.T-I.T-I-KE.L3');

  // Step 3: Type recipient email
  await page.waitForSelector('input[aria-label="To recipients"]', { visible: true });
  await page.type('input[aria-label="To recipients"]', 'tajmalnas36@gmail.com');

  // Step 4: Type message body
  await page.waitForSelector('div[aria-label="Message Body"][role="textbox"]', { visible: true });
  await page.type('div[aria-label="Message Body"][role="textbox"]', 'Hi, I am writing this to inform you I am from ResourcePlan...');

  // Step 5: Click Send
  // await page.waitForSelector('div[aria-label^="Send"]', { visible: true });
  // await page.click('div[aria-label^="Send"]');

  // Done!
  // console.log("Email sent.");

  // Optional: Keep open or close
  await browser.close();
}

main();
