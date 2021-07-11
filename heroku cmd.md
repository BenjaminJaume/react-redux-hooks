heroku git:remote -a wodeke

heroku run bash

npx sequelize db:migrate
npx sequelize db:seed:all
