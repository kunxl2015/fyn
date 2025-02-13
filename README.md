## Requirements:
- Python 3.8
- Other dependencies in `Pipfile`

## Steps to setup client locally:
- Install `pipenv` for dependency management
    ```
    pip install pipenv
    ```
- Use pipenv to install other dependencies from `Pipfile`
    ```
    pipenv install --dev
    ```
- Activate the new virtual environment
    ```
    pipenv shell
    ```
- Copy .env file
   ```
   cp .env.example .env
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

## Steps to setup server locally:
- Move to the server directory
    ```
    cd server
    ```
- Install `pipenv` for dependency management
    ```
    pip install pipenv
    ```
- Use pipenv to install other dependencies from `Pipfile`
    ```
    pipenv install --dev
    ```
- Activate the new virtual environment
    ```
    pipenv shell
    ```
- Copy .env file
   ```
   cp .env.example .env
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
