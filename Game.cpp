#include "Game.h"
#include <string>
#include <iostream>
#include <vector>




/*=========================================
Class: Game

=========================================*/


Game::Game(std::string cname,
           std::string cdescription,
           std::vector<std::string> cgenres,
           std::pair<std::string, bool> cachievements,
           bool ccompletionStatus,
           bool cfinished_achievements,
           float chours_played) : name(std::move(cname)),
        game_description(std::move(cdescription)),
        genres(std::move(cgenres)),
        achievements(std::move(cachievements)),
        completionStatus(ccompletionStatus),
        finished_achievemnts(cfinished_achievements),
        hours_played(chours_played) {}

