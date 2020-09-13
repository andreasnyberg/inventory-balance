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
Sell products from inventory by package deals (multiple products in one command). Currently the inventory offers package deals "1" (5 items of each product) & "2" (1 product "A", 2 product "B" & 3 product "C").
```
SP + <package deal number>
```
---

*Examples:*  
`IA13` adds 13 product "A".  
`SB11` sells 11 product "B".  
`SP2` sells package deal "2".