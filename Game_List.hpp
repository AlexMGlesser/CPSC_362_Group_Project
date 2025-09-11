#ifndef GAMELIST_H
#define GAMELIST_H
#include <iostream>
#include <string>
#include <vector>
#include "Game.cpp"
#include "Game.hpp"

class Game_List {
    public:




    private:
        std::string account_name;
        int game_count;
        std::unordered_map<std::string, Game>;


}

#endif