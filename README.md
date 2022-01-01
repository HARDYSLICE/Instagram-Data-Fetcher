# instagram-data-fetcher
A simple project made with npm packages used to fetch instagram data quickly

**DISCLAIMER**
Instagram has gone to great lengths to prevent scraping and other unauthorized access to their public content. Using this may harm your account and I won't be responsible for it.

Download all the modules with:
```
npm i
```
Head over to the config file and add the following:
USERNAME, PASSWORD, SESSIONID of the account you would like to scrap with.
You can get the sessionID from cookies or application tab for chrome and storage tab for firefox. LEARN MORE HERE: https://skylens.io/blog/how-to-find-your-instagram-session-id

Go to the target file and add your targets. Please note that you'll need to add shortcode for post scraping.


Error codes while tag scraping:
```
302: Request error
406: Parsing error
204: No content
401: Authentication required
429: Rate limit excedeed
409: Conflict
```

PACKAGES:
https://www.npmjs.com/package/user-instagram
https://www.npmjs.com/package/instagram-scraping
https://www.npmjs.com/package/instagram-better-scrape
