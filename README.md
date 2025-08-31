# BTD6 Roundle

This project uses the official BTD6 roundsets to create yet another Wordle clone to life. Test your knowledge on your BTD6 rounds.

## How to Play

Just like most Wordle clones, you will be trying to guess the answer---and here, the answer will be a BTD6 round.

Your goal is to guess the correct round within 6 guesses. Every guess, the following feedback is provided:

- Round Length
- Red Bloon Energy (RBE)
- Cash Earned (including End of Round Cash [EOR])
- Total Number of Bloons
- Bloon Types

This feedback will help you educate your next guesses.

## How the Bloon Type Feedback is Presented

One of the guess feedback elements is Bloon Type. This takes the Bloon Types within round you guess and tell you whether the correct round has those Bloon types.

Exact matches will be met with a green background and checkmark. Close matches will be met with a yellow background and a dash.

**Q:** What classifies as a close match?
**A:** If you guess a Bloon and it is considered close, it means that specific Bloon has a different property than the Bloon present in the correct round. For example, Round 48 has Purple Camo Regrows, and if you were to guess Round 32, the Purple Bloon would be a close match because it is the same Bloon, but with different properties.

**_Note:_** You can have all of the Bloon types right, but still be wrong. Take guessing Round 7 for Round 6 as the answer: both only have Reds, Blues, and Greens, but are different rounds.

## Stuff for Nerds

**Q:** How is the answer calculated?
**A:** Since I am lazy and don't want to spend money, a seeding algorithm takes the current day (UTC) from an external time server and generates a number between 1 and 140 (inclusive). This makes it so I don't have to pay for a server to host the answers, while also making the answer the same for everyone, everyday. This also prevents user machines having the wrong date causing answers to be mismatched.

**Q:** What is considered a close value for things like RBE?
**A:** While you _could_ look at my ugly code, here are the ranges:

- Round Length: within **5** seconds.
- RBE: within **15%**.
- Cash Earned: within **$500**.
- Total Bloons: within **15** Bloons.

**Q:** How is the web app built?
**A:** GitHub Actions deploying to GitHub Pages.

_I haven't gotten enough questions to fill this yet..._

Thanks for reading.
