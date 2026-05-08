# ai-builder-rules

Placeholder repo wired up to the Heroku app **`build-rules`** (https://build-rules-2cc3a555fb8c.herokuapp.com).

The current contents are a minimal Node.js HTTP server so the Heroku build succeeds and a dyno boots — replace `index.js` / `package.json` with the real app whenever it's ready.

## Deploy

Right now deploys are triggered manually via the Heroku Build API against the GitHub tarball of `main`. To wire up auto-deploy on every push, connect the repo at https://dashboard.heroku.com/apps/build-rules/deploy/github (one-time GitHub OAuth).
