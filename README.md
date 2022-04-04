# PickUp backend

## Development
- When developmenting backend.
```sh
$ npm run dev
```
- When testing frontend.
```sh
$ npm run serve
```

# Deployment
- Build docker image.
```sh
$ docker build -t pickup-backend .

```
- Deploy image.
```sh
$ docker run -d --restart unless-stopped --name pickup -p 3000:3000 pickup-backend:latest
```
