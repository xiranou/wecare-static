dev:
	cat .env.local | xargs -- yarn start

deploy:
	yarn run build && firebase deploy