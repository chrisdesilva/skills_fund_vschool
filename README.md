# Skills Fund partner loan application template
This template can be used to generate new partner websites for Skills Fund loan applications. See steps below for using the template.

## Steps to creating new partner site
### Creating Hubspot form
1. Navigate to marketing -> lead capture -> forms
2. Search for the school being converted to Site C
3. Clone the form
4. Click publish
5. Copy the embed code (the only part you need is the form id)

### Writing the code
1. From the partner template repo, click the green Use this template button.
2. Type a name in the Respository name field following this format: skills_fund_SCHOOLNAME
3. After new repo is generated, click Clone or download button inside of new repo
4. Copy link
5. In the terminal, navigate to the correct folder, currently "Site C Pages", and type `git clone REPO_LINK`
6. In the terminal, cd into the new project folder and run `yarn` or `npm install`
7. After packages have finished installing, go to gatsby-config.js -> siteMetadata -> headline, update SCHOOLNAME and save
  * *If updating Google Analytics tracking code, update in this file as well as src -> constants -> programInfo.js*
8. Download school logo, move it to src -> images, rename it logo_SCHOOLNAME.png
9. Open src -> constants -> programinfo.js and update all information. Check comments for clarifying directions. 
10. After all changes have been made, run `git status` to confirm changes, `git commit -am "Fill in template with SCHOOL info"` and `git push`

### Setting up the subdomain
1. If subdomain already exists on GoDaddy, set TTL to 600 seconds, otherwise leave GoDaddy tab open
2. Go to Netlify and click New Site from Git -> click Github -> search for repo name -> deploy site
3. Click domain settings and rename random string to school name (ie. flatiron.netlify.com)
4. **AFTER SITE HAS BEEN SUCCESSFULLY DEPLOYED**, go to GoDaddy tab. If A name record exists, copy "host" then delete record. Click "Add" then select CNAME as type. Paste previous "host" into this new record, set "Points to" value to netlify subdomain (ie. flatiron.netlify.com). TTL can be left at 1 hour. Click save.
5. Back on Netlify, click "Domain Settings" and add custom domain using the "host" from GoDaddy, followed by skills.fund (ie. flatiron.skillsfund)
6. Page will usually load quickly. Don't panic if you don't see it on your laptop right away. Check url from an incognito tab or from your phone. 
