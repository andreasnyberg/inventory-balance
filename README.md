# inventory-balance

Inventory balance CLI. The inventory contains the products "A", "B" and "C";

## Installation
* Clone repo
* `npm install`
* `npm start`

## Usage/commands

Display current inventory balance.
```
L
```
---
Toggle the 'auto doubler'.
```
T
```
*(The amount times two is automatically added to the inventory if a product was sold)*

---
Add product(s) to inventory.
```
I + <product> + <amount>
```
---
Sell product(s) from inventory.
```
S + <product> + <amount>
```
---

*Examples:*  
`IA13` adds 13 "A".  
`SB11` sells 11 "B".