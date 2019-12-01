const { Schema, model } = require('mongoose');

const inventorySchema = new Schema({
  memberID: {
    type: String,
    unique: true,
  },
  coins: Number,
  inventory: [String],
  profileWallpapers: [
    {
      name: String,
      url: String,
      inUse: Boolean,
    },
  ],
  checkedIn: Boolean,
});

inventorySchema.methods.addCoins = async function(amount) {
  this.coins += amount;

  this.save();
  return true;
***REMOVED***

inventorySchema.methods.deductCoins = async function(amount) {
  this.coins -= amount;

  this.save();
  return true;
***REMOVED***

inventorySchema.methods.checkIn = async function() {
  this.coins += 50;
  this.checkedIn = true;

  this.save();
  return true;
***REMOVED***

model('Inventory', inventorySchema);
