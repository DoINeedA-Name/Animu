//Dependencies
const { Schema, model } = require('mongoose');

/**
 * Pet Personality
 * ================
 * Pet personality affects how fast they get unhappy, and how longer they can stay unfed
 *
 * Types
 * ------
 * 0 - Normal
 * 1 - Can stay hungry for longer but gets unhappy faster
 * 2 - Can stay happy for longer but gets hungry faster
 * 3 - Can stay happy/hungry for longer
 * 4 - Can't say happy/hungry for longer
 */

//Schema
const petSchema = new Schema({
  memberID: {
    type: String,
    unique: true,
  },
  petType: String,
  petName: String,
  personality: {
    type: Number,
    min: 0,
    max: 4,
    default: Math.round(Math.random() * 4),
  },
  happiness: {
    type: Number,
    min: 0,
    max: 100,
    default: 80,
  }, // 1 - 100, If below x (depends upon personality) for 7 days, pet run aways | If x (depends upon personality), pet runs away instantly
  happinessCap: {
    type: Number,
    min: 30,
    max: 100,
    default: 100,
  }, // Cap for happiness, will decrease when pet is unfed
  hunger: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  }, // If surpasses 100, your pet dies
  petUnhappyForHours: {
    type: Number,
    default: 0,
  }, // If x (depends upon personality), pet runs away
  toys: [], // Toys will affect rate at which happiness drops/increases
});

// Schema Methods
petSchema.methods.notFedInHour = function() {
  this.hunger +=
    this.personality === 1 || this.personality === 3
      ? 3
      : this.personality === 2 || this.personality === 4
      ? 5
      : 4;

  this.save();
  return this.hunger;
***REMOVED***

petSchema.methods.notPlayedInHour = function() {
  this.happiness -=
    this.personality === 2 || this.personality === 3
      ? 4
      : this.personality === 1 || this.personality === 4
      ? 6
      : 5;

  if (this.happiness <= this.happinessCap) this.happiness = this.happinessCap;

  this.save();
  return this.happiness;
***REMOVED***

petSchema.methods.petFed = function() {
  this.hunger -=
    this.personality === 1 || this.personality === 3
      ? 40
      : this.personality === 2 || this.personality === 4
      ? 20
      : 30;

  const hungerEndurability =
    this.personality === 1 || this.personality === 3
      ? 70
      : this.personality === 2 || this.personality === 4
      ? 40
      : 50;

  if (this.hunger >= hungerEndurability) this.happinessCap = 100;

  this.save();
  return this.hunger;
***REMOVED***

petSchema.methods.petHappy = function(rate) {
  this.happiness +=
    this.personality === 2 || this.personality === 3
      ? rate * 1.5
      : this.personality === 1 || this.personality === 4
      ? rate * 0.5
      : rate;

  if (this.happiness <= this.happinessCap) this.happiness = this.happinessCap;

  this.save();
  return this.happiness;
***REMOVED***

//Model
model('Pet', petSchema);
