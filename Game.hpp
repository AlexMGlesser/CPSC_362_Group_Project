#ifndef GAME_H
#define GAME_H
#include <iostream>
#include <string>
#include <vector>

/*=========================================
Class: Game
Variables string name, string description, vector<string> genres, vector<pair<string, bool>> achievements
, bool completion status, bool finished achievements status, float hours played
Status: Prototyped
TODO: Implement
=========================================*/

class Game {
    public:
        // Constructor
        Game(std:string cname, std::string cdescription, std::vector<std::string> cgenres
             , std::pair<std::string, bool> cachievements, bool ccompleted
             , bool cfinished_achievemnts, float chours_played);

        // Destructor
        ~Game();

        // Getters:

        /*========================================================
        Function Name: getName
        Inputs: None
        Outputs: string name
        Function description: Getter method for name of the game
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        std::string getName() { return name; }



        /*========================================================
        Function Name: getDescription
        Inputs: None
        Outputs: string game_description
        Function description: Getter method for description of the game
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        std::string getDescription() { return game_description; }



        /*========================================================
        Function Name: getGenres
        Inputs: None
        Outputs: vector<string> genres
        Function description: Getter method for list of Genres of the game
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        std::vector<std::string> getGenres() { return genres; }



        /*========================================================
        Function Name: getAchievements
        Inputs: None
        Outputs: pair<string, bool> achievements
        Function description: Getter method for list of achievements of the game and their status
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        std::pair<std::string, bool> getAchievements() { return achievements; }



        /*========================================================
        Function Name: getCompletionStatus
        Inputs: None
        Outputs: bool completionStatus
        Function description: Getter method for whether the game is completed or not
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        bool getCompletionStatus() { return completionStatus; }



        /*========================================================
        Function Name: getFinishedAchievements
        Inputs: None
        Outputs: bool finished_achievemnts
        Function description: Getter method for if all achievements are unlocked or not
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        bool getFinishedAchievements() { return finished_achievemnts; }



        /*========================================================
        Function Name: getHoursPlayed
        Inputs: None
        Outputs: float hours_played
        Function description: Getter method for hours played
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        float getHoursPlayed() { return hours_played; }



        // Setters:

        /*========================================================
        Function Name: setName
        Inputs: string newName
        Outputs: None
        Function description: Setter method for name of the game
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        void setName(std::string newName) { name = newName; }



        /*========================================================
        Function Name: setDescription
        Inputs: string newDescription
        Outputs: None
        Function description: Setter method for description of game
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        void setDescription(std::string newDescription) { game_description = newDescription; }



        /*========================================================
        Function Name: setGenres
        Inputs: vector<string> newGenres
        Outputs: None
        Function description: Setter method for Genres of the game
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        void setGenres(std::vector<std::string> newGenres) { genres = newGenres; }


        
        /*========================================================
        Function Name: setAchievements
        Inputs: string newAchievements
        Outputs: None
        Function description: Setter method for Achievment status of the game
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        void setAchievemnents (std::pair<std::string, bool> newAchievements) { achievements = newAchievements; }



        /*========================================================
        Function Name: setCompleted
        Inputs: bool status
        Outputs: None
        Function description: Setter method for completion status of the game
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        void setCompleted(bool status) { completionStatus = status; }



        /*========================================================
        Function Name: setFinishedAchievements
        Inputs: bool status
        Outputs: None
        Function description: Setter method for whether all achievements are unlocked or not
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
        void setFinishedAchievements(bool status) { finished_achievemnts = status; }



        /*========================================================
        Function Name: setHoursPlayed
        Inputs: float hours
        Outputs: None
        Function description: Setter method for number of hours played
        Status: Prototyped
        TODO: Implement
        ==========================================================*/
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