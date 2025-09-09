#ifndef GAME_H
#define GAME_H
#include <iostream>
#include <string>
#include <vector>


class Game {
    public:
        // Constructor
        Game(std:string cname, std::string cdescription, std::vector<std::string> cgenres
             , std::pair<std::string, bool> cachievements, bool ccompleted
             , bool cfinished_achievemnts, float chours_played);

        // Destructor
        ~Game();

        // Getters:

        std::string getName() { return name; }
        std::string getDescription() { return game_description; }
        std::vector<std::string> getGenres() { return genres; }
        std::pair<std::string, bool> getAchievements() { return achievements; }
        bool getCompletionStatus() { return completionStatus; }
        bool getFinishedAchievements() { return finished_achievemnts; }
        float getHoursPlayed() { return hours_played; }

        // Setters:

        void setName(std::string newName) { name = newName; }
        void setDescription(std::string newDescription) { game_description = newDescription; }
        void setGenres(std::vector<std::string> newGenres) { genres = newGenres; }
        void setAchievemnents (std::pair<std::string, bool> newAchievements) { achievements = newAchievements; }
        void setCompleted(bool status) { completionStatus = status; }
        void setFinishedAchievements(bool status) { finished_achievemnts = status; }
        void setHoursPlayed(float hours) { hours_played = hours; }
    

    private:

        std::string name; // name of the game
        std::string game_description; // brief description of the game
        std::vector<std::string> genres; // list of genres
        std::pair<std::string, bool> achievements; // pair of achievement name and its status (unlocked/locked)
        bool completionStatus; // true if completed, false otherwise
        bool finished_achievemnts; // true if all achievements are unlocked, false otherwise
        float hours_played; // total hours played

};

#endif