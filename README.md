## Demo Video
[Video](https://drive.google.com/file/d/1i3sd0HQ0x6k1UfTVvcyjzdk8oQz1ljLJ/view?usp=sharing)

## Requirements:
- Python 3.11

## Steps to setup client locally:
Ensure you have the following installed:
- Node.js (>= 16.x)
- `pnpm` or `yarn` package manager

- Install dependencies
    ```sh
    cd client
    ```

    ```sh
    pnpm install
    # or
    yarn install
    ```

    - Start the development server
    ```sh
    pnpm run dev
    # or
    yarn dev
    ```


## Steps to setup server locally:
- Move to the server directory
    ```sh
    cd server
    ```
- Install `pipenv` for dependency management
    ```sh
    virtualenv venv
    ```
- Activate the new vritual environment
    ```sh
    venv\Scripts\activate # Windows (Command Prompt)

    .\venv\Scripts\Activate.ps1 # Windows (PowerShell)

    source venv/bin/activate # macOS/Linux
    ```
- Make database migrations
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
- Create a superuser
    ```
    python manage.py createsuperuser
    ```
- Run development server on localhost
    ```
    python manage.py runserver :8000
    ```
