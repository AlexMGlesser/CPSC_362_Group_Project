#ifndef GAME_H
#define GAME_H
#include <iostream>
#include <string>
#include <vector>

/*=========================================
Class: Game

=========================================*/

class Game {
    private:

        std::string name; // name of the game
        std::string game_description; // brief description of the game
        std::vector<std::string> genres; // list of genres
        std::pair<std::string, bool> achievements; // pair of achievement name and its status (unlocked/locked)
        bool completionStatus; // true if completed, false otherwise
        bool finished_achievemnts; // true if all achievements are unlocked, false otherwise
        float hours_played; // total hours played

    public:
        



}

#endif