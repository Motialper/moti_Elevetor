FROM node:18 AS build

# הגדרת משתני סביבה
ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider

# הגדרת ספריית העבודה
WORKDIR /app

# התקנת התלויות של האפליקציה
COPY package*.json ./
RUN npm install

# העתקת קבצי הקוד וההרצת build
COPY . .
RUN npm run build

# שלב 2: הגדרת שרת סטטי
FROM nginx:alpine

# העתקת build האפליקציה מהשלב הקודם
COPY --from=build /app/build /usr/share/nginx/html

# חשיפת הפורט בו האפליקציה תעבוד
EXPOSE 80

# הגדרת ה-Entrypoint ל-NGINX
CMD ["nginx", "-g", "daemon off;"]
