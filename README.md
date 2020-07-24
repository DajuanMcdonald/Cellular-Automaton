# Cellular-Automaton
Collection of algorithms on a dimensional grid of specified shape. [initial grid: 2-dimensions]

Sets of rules specifies how cells evolve through timed steps. [initial rules: 4 rules]  [initial time: 1000ms]

# How it Works
Algorithmic simulations, particularly with a cell on a grid (of cells) [initial size: 25 X 25]
are visual computations when combined with rules that can change the 'state'
of a cell, imagine from 'OFF' to 'ON'. The visual part being difference in color. [initial color: black to white]

Timed steps or 'Evolutions' run cells through rules. For example:
  - A rule tells a cell to turn 'OFF' if a condition is 'True'
  - A rule tells a cell to turn 'ON' if a condition is 'True'
  - A rule tells a cell to turn 'OFF' if another condition is 'True'
  - A rule tells a cell to turn 'ON' if another condition is 'True'
  
# The Algorithm
if cell neighbors < 2
 turn off

if cell neighbors == 2 || cell neighbors == 3
 stay on

if cell neighbors == 3
 turn on
 
 if cell neighbors > 3
  turn off
  
  # Audience
  Philosophers,
  Biologist,
  Students with basic coding background
