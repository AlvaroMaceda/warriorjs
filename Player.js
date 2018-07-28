class Rule {
  constructor (name) {this.name = 'Generic rule'}
  applies(currentState, previousState = null) {
    return false;
  }
  action() {
    return (warrior) => {warrior.think('Nothing to do')}
  }
}

class RuleAttack extends Rule {
  constructor (name) {super(); this.name = 'Attack rule'}
  applies(currentState, previousState = null) {
    return !warrior.feel().isEmpty();
  }
  action() {
    return (warrior) => {warrior.attack()}
  }
}

class RuleRest extends Rule {
  constructor (name) {super(); this.name = 'Rest rule'}
  applies(currentState, previousState = null) {
    if(!warrior.feel().isEmpty()) return false;
    if(!warrior.health()<20) return false;
  }
  action() {
    return (warrior) => {warrior.rest()}
  }
}

class RuleWalk extends Rule {
  constructor (name) {super(); this.name = 'Walk rule'}
  applies(currentState, previousState = null) {
    return !warrior.feel().isEmpty();
  }
  action() {
    return (warrior) => {warrior.walk()}
  }
}


class Brain {

  constructor() {
    this.rules = [
      //new RuleEscape(),
      new RuleAttack(),
      new RuleRest(),
      new RuleWalk()
    ]
  }

  decide(currentState, previousState) {
    rule = rules.find((element)=>element.applies(currentState, previousState));

  }

}

class Player {

  constructor() {
    this.previousState = {};
    this.brain = new Brain();
  }

  getCurrentState() {
    return {
      health: this.warrior.health(),
      empty: this.warrior.feel().isEmpty()
    }
  }

  playTurn(warrior) {

    this.warrior = warrior;
    this.state = this.getCurrentState();
    warrior.think(JSON.stringify(this.state));


    // Cool code goes here.
    if(warrior.feel().isEmpty()) {
      if(warrior.health()<20) {
        warrior.rest();
      } else {
        warrior.walk();
      }
    } else {
      warrior.attack();
    }
  }
}
