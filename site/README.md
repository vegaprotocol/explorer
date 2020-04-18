# Vega Block Explorer: The Site
[![Netlify Status](https://api.netlify.com/api/v1/badges/4fff1f7f-315e-46dd-b821-2ddae569ebbc/deploy-status)](https://app.netlify.com/sites/vega-testnet-explorer/deploys)

This is the website portion of the block explorer. It provides the thing you click around in your browser.

# Building
This was built using [Sapper](https://sapper.svelte.dev/), which is a framework built atop [Svelte](https://svelte.dev/). It is not yet a good model for Svelte/Sapper usage.

## Getting started
> :warning: You will need to be using node 11
```bash
npm install
npm run dev
```

## Building for Netlify / static hosts
Sapper expects to be running on Node, but supports 'legacy' exports. We use the latter, which is as simple as
```bash
npm run export 
```

## Tests
There are no tests at present

# Dependencies
See [../README.md](../README.md) for the list of services this site uses. It's *a lot*, meaning this is pretty fragile.

# Deploying
Commits to `master` automatically deploy to https://explorer.vega.trading.

# Contributing
This project is in maintenance mode. Pull requests should only be created to fix glaring errors.
