#include <iostream>
#include "Game_List.h"


//Constructor
Game_List::Game_List(int gameCount, std::string accountName,
                     std::map<std::string, Game> gameList)
                     game_count(gameCount), account_name(std::move(accountName)),
                     game_list(std::move(gameList)) {}


