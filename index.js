  import express from 'express';
  import { GologinApi } from 'gologin';
  import dotenv from 'dotenv';

  dotenv.config();

  const app = express();
  const port = process.env.PORT || 3000;

  const token = process.env.GOLOGIN_API_TOKEN;
  const profileId = process.env.profileId;
  const gologin = GologinApi({ token });

  // https://g.camp/profile%201
  app.get('/send-gmail', async (_req, res) => {
    try {
      const { browser } = await gologin.launch({profileId});

      console.log("the browser is : ",browser)
      const page = await browser.newPage();

      await page.goto('https://mail.google.com/mail/u/0/#inbox', { waitUntil: 'networkidle2' });

      await page.waitForSelector('div.T-I.T-I-KE.L3', { visible: true });
      await page.click('div.T-I.T-I-KE.L3');

      await page.waitForSelector('input[aria-label="To recipients"]', { visible: true });
      await page.type('input[aria-label="To recipients"]', 'tajmalnas36@gmail.com');

      await page.waitForSelector('div[aria-label="Message Body"][role="textbox"]', { visible: true });
      await page.type(
        'div[aria-label="Message Body"][role="textbox"]',
        'Hi, I am writing this to inform you I am from ResourcePlan...'
      );

      // Optionally send the email
      // await page.click('div[aria-label^="Send"]');

      await browser.close();

      console.log("Hii automation done")
      res.status(200).json({ success: true, message: 'Automation complete.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });