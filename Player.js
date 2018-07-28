let Warrior;

class Rule {
  constructor (name) {this.name = 'Generic rule'}
  applies(curState, prevState = null) {
    Warrior.think(`Evaluating rule ${this.name}`);
    return false;
  }
  action() {
    return (warrior) => {warrior.think('Nothing to do')}
  }
}

class RuleAttack extends Rule {
  constructor (name) {super(); this.name = 'Attack rule'}
  applies(curState, prevState = null) {
    super.applies();
    return !curState.empty;
  }
  action() {
    return (warrior) => {warrior.attack()}
  }
}

class RuleRest extends Rule {

  constructor (name) {super(); this.name = 'Rest rule'}


  applies(curState, prevState) {
    super.applies();

    function beingAttacked(){
      return curState.health < prevState.health;
    }

    function fullLife(){
      return curState.health >= 20;
    }

    function emptySquare(){
      return curState.empty;
    }
    
    if(!emptySquare()) return false;
    if(fullLife()) return false;
    if(beingAttacked()) return false;
    return true;
  }

  action() {
    return (warrior) => {warrior.rest()}
  }
}

class RuleWalk extends Rule {
  constructor (name) {super(); this.name = 'Walk rule'}
  applies(curState, prevState = null) {
    super.applies();
    return curState.empty;
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
    Warrior.think('deciding');
    let rule = this.rules.find((element)=>element.applies(currentState, previousState));
    return rule.action();
  }

}

class Player {

  constructor() {
    this.state = {};
    this.brain = new Brain();
  }

  getCurrentState() {
    return {
      health: this.warrior.health(),
      empty: this.warrior.feel().isEmpty()
    }
  }

  updateState() {
    this.previousState = this.state;
    this.state = this.getCurrentState();
  }

  playTurn(warrior) {
    Warrior = warrior;
    this.warrior = warrior;
    this.updateState();
    //warrior.think(JSON.stringify(this.state));
    let decision = this.brain.decide(this.state, this.previousState);
    decision(warrior);
  }
}
