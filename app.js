var inquirer = require('inquirer');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
//////////////////////////////////////////////////////////////////////
mongoose.connect("mongodb://localhost/dietManagerDB");
var db = mongoose.connection;

db.on("error", function(err) {
  // console.log("Mongoose Error: ", err);
});

db.once("openUri", function() {
  console.log("Mongoose connection successful.");
});
//////////////////////////////////////////////////////////////////////
var Schema = mongoose.Schema;

var mealSchema = new Schema({
  mealID:{
  	type: String
  },
  date: {
    type: String
  },
  food: {
    type: String
  }, 
  meal: {
  	type: String
  }
});

var Meals = mongoose.model("Meals", mealSchema);


//////////////////////////////////////////////////////////////////////
function start (){
//////////////////////////////////////////////////////////////////////
//			UI
console.log("WELCOME TO TIM'S MEAL TRACKER \n");
console.log("--------------------------------\n");
console.log("please select from the following options:");
//////////////////////////////////////////////////////////////////////
console.log('---------------------------------------- \n');
	inquirer.prompt(
	{
    type: 'list',
    name: 'selector',
    message: 'What do you want to do?',
    choices: [
      'view previous meals',
      'add a new meal']
	}).then(function (answers){
		// console.log(" logged" +  answers.selector);
		if (answers.selector == "view previous meals") {
			displayPrevious();
		}
		else if (answers.selector == "addd a new meal") {
			addMeal();
		}
		else{
			console.log("error - something went wrong");
		}

	});
}
start();
///////////////////////////////////////////////////////////////////////////
function displayPrevious(){
	//call to mongo db and relevant ui processing
	 Meals.find({}).exec(function(err, data) {

    if (err) {
      console.log(err);
    }
    else {
      console.log(data.date + " " + data.meal + " " + data.food);
    }
  });
}

function addMeal(){
	inquirer.prompt([
	{
		type: "input",
		message: "when did you eat this meal? (MM/DD/YR)",
		name: "inputDate"
	}, 
	{
		type: "input",
		message: "What did you eat?",
		name: "inputFood"
	}, 
	{
		type: "input",
		message: "what meal was this; breakfast, lunch or dinner?",
		name: "inputMeal"
	}]).then(function(){
		
	});
}