# Description

Vercel deployed pre-production browser game. 
Its fully Vue.js based game, using free icons from opengameart.com.

I decided to use TailWind CSS in order to safe some time styling
Aplication is using vueQuery as a caching tool for fetching and data mutation in order to reduce requests to backend
As a backend it is using Cloud Firestore.


# game

You can access game by navigation to [https://vercelgame.](https://vuegame.vercel.app/)
It still requires some improvements (Knight and ninja animations are flashing, no transition for Arena page)
![image](https://user-images.githubusercontent.com/94323029/223115029-497ba40f-4b79-4d04-8771-2d1298a2a1e6.png)

You can increase enemy level by typing + sign under his avatar:

![image](https://user-images.githubusercontent.com/94323029/223115163-f8e772e6-6863-4623-a55a-d07b1a74d57a.png)

It will increase exp he gives on kill but also his strength so he will be harder to kill

While leveling up your character you are gaining experience points which you can spent on one of 2 skills: magic power and strength

Strength increases your attack power while Magic power increases your heal ratio

You can use 1 of 2 actions per turn - Heal and Attack. You will display them by moving your cursor on your champ:

![image](https://user-images.githubusercontent.com/94323029/223115792-4dadaf54-6cf0-4428-b074-35815484cec4.png)

You will not be able to use any of them while action is in progress.
Once game is finished (either you or Bandit is killed) HP and monster level will be reseted and you will be able to start again.

![image](https://user-images.githubusercontent.com/94323029/223116166-90535e22-8387-409f-8172-3948991d52b3.png)

There is also 1 thing which i started and which requires additional work - Crafting system. Each of the items have unique statistic. You will be able to upgrade items by spending crafting points ( ranks from basic through rare to legendary ). Each of these items statistics increases your str/mp/def. Def is unique statistic which reduce your damage taken (already in dmg formula):

![image](https://user-images.githubusercontent.com/94323029/223116781-c74dddd8-fd35-4351-be32-f46c0ab1cc37.png)


# Planned improvements

As mentioned before here are some pending actions which will be implemented:
- Fix image animation
- Add crafting system
- Code reorganization
- Auto testing to be added







