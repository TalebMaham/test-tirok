@echo off

REM Variables de configuration PostgreSQL
set PG_USER=postgres
set PG_DB=tirok_db

REM Chemin vers le fichier SQL de réinitialisation (fixtures)
set SQL_FILE=base.sql

REM Chemin vers le fichier SQL de fixtures
set FIXTURES_FILE=fixtures.sql

REM Fonction pour vider la base de données
echo Suppression de la base de données...
dropdb --if-exists -U %PG_USER% %PG_DB%
echo Base de données supprimée.

REM Fonction pour recréer la base de données
echo Création de la base de données...
createdb -U %PG_USER% %PG_DB%
echo Base de données créée.
REM Fonction pour charger le fichier SQL de réinitialisation
echo Chargement du fichier SQL de réinitialisation...
psql -U %PG_USER% -d %PG_DB% -a -f %SQL_FILE%
echo Fichier SQL de réinitialisation chargé avec succès.

REM Fonction pour charger le fichier SQL de fixtures
echo Chargement du fichier de fixtures SQL...
psql -U %PG_USER% -d %PG_DB% -a -f %FIXTURES_FILE%
echo Fichier de fixtures SQL chargé avec succès.


echo Réinitialisation de la base de données terminée.
