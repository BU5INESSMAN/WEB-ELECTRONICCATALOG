     # Electronics Store Project

     Интернет-магазин электроники.

     ## Требования
     - Node.js
     - PostgreSQL (user: postgres, password: 123123)

     ## Установка
     1. Клонируйте:
        ```bash
        git clone https://github.com/BU5INESSMAN/WEB-ELECTRONICCATALOG.git
        cd WEB-ELECTRONICCATALOG
        ```
     2. Зависимости:
        ```bash
        cd backend
        npm install
        cd ../client
        npm install
        ```
     3. Настройте `.env` в `backend`:
        ```
        JWT_SECRET=your-very-secure-secret-key-123456
        ```
     4. PostgreSQL:
        ```bash
        psql -U postgres
        CREATE DATABASE electronics_store;
        \q
        cd backend
        npm run seed
        ```
     5. Запуск:
        ```bash
        npm start
        cd ../client
        npm start
        ```
     6. Откройте: `http://localhost:3000`
     7. Регистрация: `http://localhost:3000/register`

     ## Автор
     Ряховский Михаил
     ```