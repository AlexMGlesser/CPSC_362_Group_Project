#ifndef GAMELIST_H
#define GAMELIST_H
#include <iostream>
#include <string>
#include <vector>
#include "Game.cpp"
#include "Game.hpp"

class Game_List {
    public:

        //Constructor
        Game_List(int gameCount, std::string accountName, std::map<std::string, Game> gameList);

        //Destructor
        ~Game_List();


        // Getters
        int getGameCount() { return game_count };
        std::string getAccountName() { return account_name };
        std::map<std::string, Game> getGameList() { return game_list };

        //Setters
        void setGameCount(int new_count) { game_count = new_count };
        void setAccountName(std::string new_name) { account_name = new_name };
        void setGameList(std::map<std::string, Game> new_game_list) { game_list = new_game_list };


    private:

        std::string account_name;
        int game_count;
        std::map<std::string, Game> game_list;


}

#endif