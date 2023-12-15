[-] Add rules to stop player from performing illegal moves.
    - [] Add rule when no avaiable next positions found 

[x] Fix 'Back' not working[/or not updating the view]
[x] Fix 'Reset Board' not working[/or not updating the view]

[] Upload to live-cloud-server (maybe github)
[] Create documentation

[x] Fix 'Back' not updating state to BOARD_SQUARE_STATE_NEXT for the next positions
[x] Update color when clicked on cell, without user moving cursor 

[] If enought time is available refactor/rewrite code structure again.
- [x] modulate the codebase, currenlty everything is inside main.js
- [] rewrite/refactor using the new methodology 'modules'


[x] Place board not working after reset board (neither autoSolver, neither user)

[] Complete 'boardModule.js'
[] Maybe refactor/rewrite board management (boardManager) (boardModule:90)
- [] Rewrite boardSquare to contain only its state
- [] Rewrite boardManager to manage nextAvailablePositions and the positions of the boardSquares (may already be done by the matrixModule)