# Dan Unthreader - beginner

## Level 5

_You hear cries for help. Captives must need rescuing._

> **TIP:** Combine `warrior.feel().getUnit().isEnemy()` and `warrior.feel().getUnit().isBound()` to see if there's a captive, and `warrior.rescue()` to rescue him. Don't attack captives.

### Floor Map

```
╔═══════╗
║@ CaaSC║
╚═══════╝

@ = Dan Unthreader (20 HP)
C = Captive (1 HP)
a = Archer (7 HP)
S = Thick Sludge (24 HP)
> = stairs
```

## Abilities

### Actions (only one per turn)

- `warrior.attack()`: Attack a unit in the given direction (forward by default) dealing 5 HP of damage.
- `warrior.rescue()`: Release a unit from his chains in the given direction (forward by default).
- `warrior.rest()`: Gain 10% of max health back, but do nothing more.
- `warrior.walk()`: Move one space in the given direction (forward by default).

### Senses

- `warrior.feel()`: Return the adjacent space in the given direction (forward by default).
- `warrior.health()`: Return an integer representing your health.
- `warrior.think()`: Think about your options before choosing an action (`console.log` replacement).

## Next Steps

When you're done editing `Player.js`, run the `warriorjs` command again.
