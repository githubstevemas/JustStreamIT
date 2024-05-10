#  :movie_camera: JustStreamIT :mag:

Bienvenue sur JustStreamIt, plateforme web qui utilise l'api OCMovies pour visualiser en temps réel un classement des meilleurs films.

## Installation

Pour utiliser cette API localement, suivez ces étapes :

1. Clonez ce dépôt de code en exécutant la commande suivante dans votre terminal :
   ```
   git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
   ```

2. Rendez-vous dans le répertoire du projet en exécutant la commande :
   ```
   cd ocmovies-api-fr
   ```

3. Créez un environnement virtuel pour le projet en utilisant la commande appropriée selon votre système d'exploitation :
   - Sous Windows :
     ```
     python -m venv env
     ```
   - Sous macOS ou Linux :
     ```
     python3 -m venv env
     ```

4. Activez l'environnement virtuel en utilisant la commande appropriée selon votre système d'exploitation :
   - Sous Windows :
     ```
     env\Scripts\activate
     ```
   - Sous macOS ou Linux :
     ```
     source env/bin/activate
     ```

5. Installez les dépendances du projet en exécutant la commande suivante :
   ```
   pip install -r requirements.txt
   ```

6. Créez et alimentez la base de données avec la commande :
   ```
   python manage.py create_db
   ```

## Utilisation

Une fois les étapes d'installation terminées, vous pouvez démarrer le serveur en exécutant la commande suivante :
```
python manage.py runserver
```

Cela démarrera le serveur local et vous pourrez lancer le site en ouvrant le fichier index.html.


