# SPOOTIFY APP

[https://spootify-2edda.web.app/](https://spootify-2edda.web.app/)

---

Development Setup procedures:

1.  Run
    > npm install
    > create .env.development file with following arguments
           CLIENT_ID=<client_id_fromspotify_dashboard>
           CLIENT_SECRET=<<client_secret_fromspotify_dashboard>>
           CALLBACK_URL=http://localhost:9001/
    > To deploy application in production create .env file like as .env.development with production server details
    > npm run start
